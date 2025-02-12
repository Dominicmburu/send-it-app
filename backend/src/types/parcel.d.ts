export interface IParcel {
  parcel_id: number;
  sender_id: number;
  receiver_id: number;
  pickup_location: string;
  destination: string;
  status: 'pending' | 'in transit' | 'delivered' | 'cancelled';
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}
