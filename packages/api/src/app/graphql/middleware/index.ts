import { mutationMiddleware } from './mutation';
import { shieldMiddleware } from './shield';
import { validatorsMiddleware } from './validators';

export const middlewares = [
  shieldMiddleware,
  mutationMiddleware,
  validatorsMiddleware,
];
