import { pool, poolConnect, sql } from '../config/database';

export interface QueryParameter {
  name: string;
  type: any;
  value: any;
}

export const executeQuery = async (
  query: string,
  params: QueryParameter[] = []
): Promise<any> => {
  try {
    await poolConnect;
    const request = pool.request();

    params.forEach(param => {
      request.input(param.name, param.type, param.value);
    });

    const result = await request.query(query);
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

export const getConnection = async () => {
  await poolConnect;
  return pool;
};
