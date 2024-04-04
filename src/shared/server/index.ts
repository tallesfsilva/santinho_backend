 

import 'dotenv/config';
import { app } from './app';
import '@shared/database';

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

