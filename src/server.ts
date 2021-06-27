import app from './app';
import { PORT } from './common/config';
import { connectToDB } from './db/connect';

connectToDB();
app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
