import { environment } from 'env';

const authConfig = {
  secret: environment.JWT_SECRET,
}

export default authConfig;
