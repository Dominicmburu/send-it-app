import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config: sql.config = {
  server: process.env.DB_HOST as string, 
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  options: {
    encrypt: false,
    trustServerCertificate: true,
<<<<<<< HEAD
    instanceName: process.env.DB_INSTANCE || 'SQLEXPRESS',
=======
    // instanceName: process.env.DB_INSTANCE || 'SQLEXPRESS',
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
<<<<<<< HEAD
  },
=======
  }
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect()
  .then(() => {
    console.log('Connected to SQL Server');
  })
  .catch(err => {
    console.error('Database Connection Failed: ', err);
    throw err;
  });

export { sql, pool, poolConnect };
