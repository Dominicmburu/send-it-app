import { sendEmail } from '../utils/email';


export const sendNotification = async (
  to: string,
  subject: string,
  message: string
): Promise<void> => {
  await sendEmail(to, subject, message);
};
