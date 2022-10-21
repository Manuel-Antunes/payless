import { environment } from 'env';

import app from './start/kernel/app';

app.server.listen(environment.PORT, () => {
  // eslint-disable-next-line
  console.log(`server running on port :${environment.PORT}`);
});
