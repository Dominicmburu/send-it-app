import { Request, Response } from 'express';
import * as parcelService from '../services/parcel';
import { createCheckoutSession, getCheckoutSession, LOCATIONS } from '../utils/stripe';
import axios from 'axios';
import * as userService from '../services/user';

export const getParcelDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const parcel_id = Number(req.params.parcel_id) || Number(req.params.id);
    if (isNaN(parcel_id)) {
      res.status(400).json({ message: 'Invalid parcel id.' });
      return;
    }
    const parcel = await parcelService.getParcelDetailsService(parcel_id);
    res.status(200).json({ parcel });
    return;
  } catch (error: any) {
    console.error("Get parcel details error:", error);
    res.status(500).json({ message: error.message || 'Failed to retrieve parcel details.' });
    return;
  }
};


export const getUserParcels = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = req.user?.user_id;
    if (!user_id) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }
    const { sentParcels, receivedParcels } = await parcelService.getUserParcelsService(user_id);
    res.status(200).json({ sentParcels, receivedParcels });
    return;
  } catch (error: any) {
    console.error("Get user parcels error:", error);
    res.status(500).json({ message: error.message || 'Failed to retrieve user parcels.' });
    return;
  }
};

const calculateDistance = (loc1: { lat: number; lng: number }, loc2: { lat: number; lng: number }): number => {
  const R = 6371;
  const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
  const dLng = (loc2.lng - loc1.lng) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const locationCoordinates: { [location: string]: { lat: number; lng: number } } = {
  "nairobi": { lat: -1.2921, lng: 36.8219 },
  "nyeri": { lat: -0.4167, lng: 36.9500 },
  "kisumu": { lat: -0.0917, lng: 34.7680 },
  "kiambu": { lat: -1.0167, lng: 36.8333 },
  "narok": { lat: -1.0833, lng: 35.9167 },
  "nanyuki": { lat: 0.0167, lng: 37.0667 },
  "meru": { lat: 0.3167, lng: 37.6500 },
  "kakamega": { lat: 0.2833, lng: 34.7500 },
  "mombasa": { lat: -4.0500, lng: 39.6667 },
  "thika": { lat: -1.0333, lng: 37.0667 },
  "nakuru": { lat: -0.2833, lng: 36.0667 },
};


export const createParcel = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = req.user?.user_id;
    if (!user_id) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }
    const { receiver_id, pickup_location, destination, couponCode, sessionId } = req.body;
    const pickup = pickup_location.toLowerCase();
    const dest = destination.toLowerCase();

    if (!LOCATIONS.includes(pickup) || !LOCATIONS.includes(dest)) {
      res.status(400).json({ message: 'Invalid pickup or destination location.' });
      return;
    }

    const locPickup = locationCoordinates[pickup];
    const locDest = locationCoordinates[dest];
    const distance = calculateDistance(locPickup, locDest);

    const BASE_RATE = 50;
    const PER_KM_RATE = 10;
    const amount = Math.round((BASE_RATE + (distance * PER_KM_RATE)) * 100);

    if (sessionId) {
      const session = await getCheckoutSession(sessionId);
      if (session.payment_status !== 'paid') {
        res.status(402).json({ message: 'Payment not completed.' });
        return;
      }
      const metadata = session.metadata;
      if (!metadata) {
        res.status(500).json({ message: 'Metadata is missing from the session.' });
        return;
      }

      const sender_id = Number(metadata.sender_id);
      const receiver_id = Number(metadata.receiver_id);
      const pickup_location = metadata.pickup_location;
      const destination = metadata.destination;

      await parcelService.createParcelService({
        sender_id,
        receiver_id,
        pickup_location,
        destination,
        updated_by: sender_id,
      });

      const receiver = await userService.getUserProfile(receiver_id);
      const receiverPhone = receiver.phone_number;

      await axios.post("http://localhost:6000/send-sms", {
        to: receiverPhone,
        message: `Your parcel from ${pickup_location} to ${destination} has been created successfully.`,
      });
      // res.redirect('/user-dashboard');.
    }

    const domain = process.env.YOUR_DOMAIN;
    const session = await createCheckoutSession(
      amount,
      couponCode,
      'usd',
      domain,
      {
        sender_id: String(user_id),
        receiver_id: String(receiver_id),
        pickup_location: pickup,
        destination: dest,
      }
    );
    res.status(200).json({
      message: 'Redirect to Stripe Checkout',
      checkoutUrl: session.url,
      calculatedAmount: amount,
      distance: distance.toFixed(2) + ' km',
    });
  } catch (error: any) {
    console.error("User create parcel error:", error);
    res.status(500).json({ message: error.message || 'Failed to create parcel.' });
  }
};

export const confirmParcel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) {
      res.status(400).json({ message: 'Missing sessionId' });
      return;
    }
    const session = await getCheckoutSession(sessionId);
    if (session.payment_status !== 'paid') {
      res.status(402).json({ message: 'Payment not completed.' });
      return;
    }
    const metadata = session.metadata;
    if (!metadata) {
      res.status(500).json({ message: 'Metadata is missing from the session.' });
      return;
    }
    const sender_id = Number(metadata.sender_id);
    const receiver_id = Number(metadata.receiver_id);
    const pickup_location = metadata.pickup_location;
    const destination = metadata.destination;

    await parcelService.createParcelService({
      sender_id,
      receiver_id,
      pickup_location,
      destination,
      updated_by: sender_id,
    });
    res.status(201).json({ message: 'Parcel created successfully after payment.' });
  } catch (error: any) {
    console.error("Confirm parcel error:", error);
    res.status(500).json({ message: error.message || 'Failed to confirm parcel.' });
  }
};


export const updateParcelDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = req.user?.user_id;
    if (!user_id) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }
    const { parcel_id, pickup_location, destination } = req.body;
    const updated_by = user_id;
    const updatedParcel = await parcelService.updateParcelDetailsService({ parcel_id, pickup_location, destination, updated_by });
    res.status(200).json({ message: 'Parcel details updated successfully.', parcel: updatedParcel });
  } catch (error: any) {
    console.error("User update parcel details error:", error);
    res.status(500).json({ message: error.message || 'Failed to update parcel details.' });
  }
};

