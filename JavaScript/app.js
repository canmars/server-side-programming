import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT; // 3000

app.get('/', (req, res) => {
  res.send('Hello World!')}
  );

app.get('/api/products', (req, res) => {
  res.send('Hello World 2!')}
  );

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

