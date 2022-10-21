import { ConnectOptions } from 'mongoose';

import { environment } from '../env';

interface DatabaseConfig {
  url: string;
  options?: ConnectOptions;
}

const databaseConfig: DatabaseConfig = {
  url: environment.MONGO_URI,
};

export default databaseConfig;
