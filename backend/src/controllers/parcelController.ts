import { Request, Response } from 'express';
import * as parcelService from '../services/parcel';

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
