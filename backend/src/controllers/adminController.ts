import { Request, Response } from 'express';
import * as parcelService from '../services/parcel';
import * as notificationService from '../services/notification';


export const createParcel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sender_id, receiver_id, pickup_location, destination } = req.body;

    const updated_by = req.user?.user_id;

    if (!updated_by) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    await parcelService.createParcelService({ sender_id, receiver_id, pickup_location, destination, updated_by });
    res.status(201).json({ message: 'Parcel delivery order created successfully.' });
    return;
  } catch (error: any) {
    console.error("Create parcel error:", error);
    res.status(500).json({ message: error.message || 'Failed to create parcel.' });
    return;
  }
};


export const updateParcelStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { parcel_id, status } = req.body;

    const updated_by = req.user?.user_id;
    if (!updated_by) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const updatedParcel = await parcelService.updateParcelStatusService({ parcel_id, status, updated_by });
    
    if (updatedParcel && updatedParcel.receiver_email) {
      await notificationService.sendNotification(
        updatedParcel.receiver_email,
        'Parcel Status Update',
        `Your parcel with ID ${parcel_id} status has been updated to ${status}.`
      );
    }
    
    res.status(200).json({ message: 'Parcel status updated successfully.' });
    return; 
  } catch (error: any) {
    console.error("Update parcel status error:", error);
    res.status(500).json({ message: error.message || 'Failed to update parcel status.' });
    return;
  }
};

export const updateParcelDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { parcel_id, pickup_location, destination } = req.body;

    const updated_by = req.user?.user_id;
    if (!updated_by) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const updatedParcel = await parcelService.updateParcelDetailsService({ parcel_id, pickup_location, destination, updated_by });
    res.status(200).json({ message: 'Parcel details updated successfully.', parcel: updatedParcel });
  } catch (error: any) {
    console.error("Update parcel details error:", error);
    res.status(500).json({ message: error.message || 'Failed to update parcel details.' });
  }
};

export const deleteParcel = async (req: Request, res: Response): Promise<void> => {
  try {
    const parcel_id = Number(req.params.id);
    if (isNaN(parcel_id)) {
      res.status(400).json({ message: 'Invalid parcel id.' });
      return;
    }

    const updated_by = req.user?.user_id;
    if (!updated_by) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    await parcelService.deleteParcelService(parcel_id, updated_by);
    res.status(200).json({ message: 'Parcel deleted successfully.' });
  } catch (error: any) {
    console.error("Delete parcel error:", error);
    res.status(500).json({ message: error.message || 'Failed to delete parcel.' });
  }
};

export const getAllParcels = async (req: Request, res: Response): Promise<void> => {
  try {
    const parcels = await parcelService.getAllParcelsService();
    res.status(200).json({ parcels });
  } catch (error: any) {
    console.error("Get all parcels error:", error);
    res.status(500).json({ message: error.message || 'Failed to retrieve parcels.' });
  }
};
