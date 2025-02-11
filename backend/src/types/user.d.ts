export interface IUser {
  user_id: number;
  username: string;
  email: string;
  password?: string;
  phone_number: string;
  address: string;
  role: 'user' | 'admin';
  created_at?: Date;
  updated_at?: Date;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
