import { Request, Response } from 'express';
import * as userService from '../services/user';
import { IUser } from '../types/user';

interface CustomRequest extends Request {
  user?: IUser;
}


export const getProfile = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const user_id = req.user?.user_id;
    if (!user_id) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }
    const user = await userService.getUserProfile(user_id);
    res.status(200).json({ user });
    return;
  } catch (error: any) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: error.message || 'Failed to retrieve profile.' });
    return;
  }
};


export const updateProfile = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const user_id = req.user?.user_id;
    if (!user_id) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }
    const { username, email, phone_number, address, password } = req.body;
    await userService.updateUserProfile({ user_id, username, email, phone_number, address, password });
    res.status(200).json({ message: 'Profile updated successfully.' });
    return;
  } catch (error: any) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: error.message || 'Failed to update profile.' });
    return;
  }
};
