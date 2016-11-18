import express from 'express';
import cors from 'cors';

import pc from './pc.js';

const PC = new pc.PC();

const app = express();
app.use(cors());

app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

// app.get('/task3A', (req, res) => {
//
//   const board = PC.getField("board");
//   const monitor = PC.getField("monitor");
//
//   res.status(200).json({
//       board,
//       monitor,
//     });
//
// });
app.get('/task3A/volumes', (req, res) => {

  const volumes = PC.getVolumes();

  res.status(200).send(volumes);

});

app.get('/task3A*', (req, res) => {

  const field = PC.getSomeField(req.originalUrl);
  if (field === undefined) {
    res.status(404).send("Not Found");
  } else {
    res.status(200)
    if (typeof field === 'object') {
      console.log(typeof field);
      res.send(field);
    }else {
      console.log(typeof field);
      res.send(JSON.stringify(field));
    }
  }

});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
