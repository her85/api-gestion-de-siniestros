// src/server.ts
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Claims Microservice running on http://localhost:${PORT}`);
  console.log(`📂 Database: SQLite (Temporary for Demo)`);
});