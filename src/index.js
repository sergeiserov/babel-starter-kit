import express from 'express';
import cors from 'cors';

import canonize from './canonize';

const app = express();
app.use(cors());
app.get('/task2C', (req, res) => {

  const username = req.query.username || '';

  const testUrl = 'telegram/qweqe23234';
  const canonizeUserName = canonize(username);
  res.send(canonizeUserName);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
