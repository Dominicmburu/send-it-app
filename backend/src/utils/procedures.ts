import pool from '../config/database';

export const callProcedure = async (procedureName: string, params: any[]): Promise<any> => {
  const placeholders = params.map(() => '?').join(', ');
  const sql = `CALL ${procedureName}(${placeholders})`;
  const [results] = await pool.query(sql, params);
  return results;
};
