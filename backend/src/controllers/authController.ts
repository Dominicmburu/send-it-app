import { Request, Response } from 'express';
import * as authService from '../services/auth';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, phone_number, address } = req.body;
    await authService.registerUser({ username, email, password, phone_number, address });
    res.status(201).json({ message: 'User registered successfully.' });
    return;
  } catch (error: any) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message || 'Registration failed.' });
    return;
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const token = await authService.loginUser({ username, password });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 
    });
    
    res.status(200).json({ message: 'Login successful' });
    return;
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(401).json({ message: error.message || 'Login failed.' });
    return;
  }
};

export const logout = (req: Request, res: Response): void => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    res.status(200).json({ message: 'Logout successful' });
    return;
  } catch (error: any) {
    console.error("Logout error:", error);
    res.status(500).json({ message: error.message || 'Logout failed.' });
    return;
  }
};
