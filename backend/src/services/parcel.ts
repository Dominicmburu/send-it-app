import { pool, poolConnect, sql } from '../config/database';

interface CreateParcelInput {
  sender_id: number;
  receiver_id: number;
  pickup_location: string;
  destination: string;
}

interface UpdateParcelStatusInput {
  parcel_id: number;
  status: string;
}


export const getParcelDetailsService = async (parcel_id: number): Promise<any> => {
  await poolConnect;
  const request = pool.request();
  request.input('p_parcel_id', sql.Int, parcel_id);
  const result = await request.execute('sp_getParcelById');
  const parcel = result.recordset[0];
  if (!parcel) {
    throw new Error('Parcel not found');
  }
  return parcel;
};


export const getUserParcelsService = async (user_id: number): Promise<{
  sentParcels: any[];
  receivedParcels: any[];
}> => {
  await poolConnect;
  const request = pool.request();
  request.input('p_user_id', sql.Int, user_id);
  const result = await request.execute('sp_getParcelsByUserId');

  const recordsets = result.recordsets as sql.IRecordSet<any>[];

  const sentParcels = recordsets[0] || [];
  const receivedParcels = recordsets[1] || [];
  return { sentParcels, receivedParcels };
};



export const createParcelService = async ({
  sender_id,
  receiver_id,
  pickup_location,
  destination,
}: CreateParcelInput): Promise<void> => {
  await poolConnect;
  const request = pool.request();
  request.input('p_parcel_id', sql.Int, null); // New parcel: no ID
  request.input('p_sender_id', sql.Int, sender_id);
  request.input('p_receiver_id', sql.Int, receiver_id);
  request.input('p_pickup_location', sql.VarChar(255), pickup_location);
  request.input('p_destination', sql.VarChar(255), destination);
  request.input('p_status', sql.VarChar(20), 'pending');  // Default status
  request.input('p_action', sql.VarChar(20), 'INSERT');
  await request.execute('sp_manageParcel');
};


export const updateParcelStatusService = async ({
  parcel_id,
  status,
}: UpdateParcelStatusInput): Promise<any> => {
  await poolConnect;
  const request = pool.request();
  request.input('p_parcel_id', sql.Int, parcel_id);
  // For the unused parameters, pass null
  request.input('p_sender_id', sql.Int, null);
  request.input('p_receiver_id', sql.Int, null);
  request.input('p_pickup_location', sql.VarChar(255), null);
  request.input('p_destination', sql.VarChar(255), null);
  request.input('p_status', sql.VarChar(20), status);
  request.input('p_action', sql.VarChar(20), 'UPDATE_STATUS');
  const result = await request.execute('sp_manageParcel');
  // Assuming the stored procedure returns the updated parcel as the first row of the recordset.
  return result.recordset[0];
};