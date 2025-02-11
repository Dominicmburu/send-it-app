import { Request, Response } from 'express';
import * as parcelService from '../services/parcel';
import * as notificationService from '../services/notification';


export const createParcel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sender_id, receiver_id, pickup_location, destination } = req.body;
    await parcelService.createParcelService({ sender_id, receiver_id, pickup_location, destination });
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
    const updatedParcel = await parcelService.updateParcelStatusService({ parcel_id, status });
    
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
