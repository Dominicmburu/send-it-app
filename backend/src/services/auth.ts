import bcrypt from 'bcrypt';
import { pool, poolConnect, sql } from '../config/database';
import { signToken } from '../utils/jwt';
import { sendEmail } from '../utils/email';
<<<<<<< HEAD
=======
import { randomBytes, scrypt as _scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2

interface RegisterInput {
  username: string;
  email: string;
  password: string;
  phone_number: string;
  address: string;
}

interface LoginInput {
  username: string;
  password: string;
}


export const registerUser = async ({
  username,
  email,
  password,
  phone_number,
  address,
}: RegisterInput): Promise<void> => {
  await poolConnect;
<<<<<<< HEAD
  const hashedPassword = await bcrypt.hash(password, 10);
  const role = 'user';
=======
  const salt = randomBytes(16).toString('hex');
  const hashBuffer = (await scrypt(password, salt, 64)) as Buffer;
  const hashedPassword = `${salt}.${hashBuffer.toString('hex')}`;
  const role = 'user';
  // const role = 'admin';
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2
  
  const request = pool.request();
  request.input('p_user_id', sql.Int, null);
  request.input('p_username', sql.VarChar(255), username);
  request.input('p_email', sql.VarChar(255), email);
  request.input('p_password', sql.VarChar(255), hashedPassword);
  request.input('p_phone_number', sql.VarChar(50), phone_number);
  request.input('p_address', sql.VarChar(255), address);
  request.input('p_role', sql.VarChar(10), role);
  request.input('p_action', sql.VarChar(10), 'INSERT');

  await request.execute('sp_manageUser');

  await sendEmail(
    email,
    'Welcome to Send-it App!',
    `Hello ${username},

Welcome to Send-it App! We're excited to have you on board.

Best regards,
The Send-it Team`
  );
};


export const loginUser = async ({ username, password }: LoginInput): Promise<string> => {
  await poolConnect;
  
  const request = pool.request();
  request.input('p_username', sql.VarChar(255), username);

  const result = await request.execute('sp_getUserByUsername');
  const user = result.recordset[0];

  if (!user) {
    throw new Error('Invalid credentials');
  }

<<<<<<< HEAD
  const isValid = await bcrypt.compare(password, user.password);
=======
  const [salt, storedHash] = user.password.split('.');
  if (!salt || !storedHash) {
    throw new Error('Invalid credentials');
  }

  const hashBuffer = (await scrypt(password, salt, 64)) as Buffer;
  const storedHashBuffer = Buffer.from(storedHash, 'hex');

  if (hashBuffer.length !== storedHashBuffer.length) {
    throw new Error('Invalid credentials');
  }

  const isValid = timingSafeEqual(hashBuffer, storedHashBuffer);
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  const token = signToken({ user_id: user.user_id, role: user.role });
  return token;
};