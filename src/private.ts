import app from './app';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.APP_PORT_PRIVATE || 8001;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
