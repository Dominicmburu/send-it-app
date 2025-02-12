import { pool, poolConnect, sql } from '../config/database';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

interface UpdateProfileInput {
  user_id: number;
  username: string;
  email: string;
  phone_number: string;
  address: string;
  password?: string;
}

export const getUserProfile = async (user_id: number): Promise<any> => {
  await poolConnect;
  const request = pool.request();
  request.input('p_user_id', sql.Int, user_id);
  const result = await request.execute('sp_getUserById');
  const user = result.recordset[0];
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const updateUserProfile = async ({
  user_id,
  username,
  email,
  phone_number,
  address,
  password,
}: UpdateProfileInput): Promise<void> => {
  await poolConnect;
  let hashedPassword: string | null = null;
  if (password) {
    const salt = randomBytes(16).toString('hex');
    const hashBuffer = (await scrypt(password, salt, 64)) as Buffer;
    hashedPassword = `${salt}.${hashBuffer.toString('hex')}`;
  }
  const request = pool.request();
  request.input('p_user_id', sql.Int, user_id);
  request.input('p_username', sql.VarChar(255), username);
  request.input('p_email', sql.VarChar(255), email);
  request.input('p_password', sql.VarChar(255), hashedPassword);
  request.input('p_phone_number', sql.VarChar(50), phone_number);
  request.input('p_address', sql.VarChar(255), address);
  request.input('p_role', sql.VarChar(10), null);
  request.input('p_action', sql.VarChar(10), 'UPDATE');
  await request.execute('sp_manageUser');
};