import express from 'express';
import cors from 'cors';
import parse from 'parse-color';

const app = express();
app.use(cors());

const invalidColor = (res => {
  return res.status(400).send('Invalid color');
});

app.get('/task2D', (req, res) => {

  let color = req.query.color || '';
  
  color = color.trim().toLowerCase();
  let size = color.length;
  console.log(color.indexOf('#'));
    
  if(color.indexOf('#') > -1) {
    size = size - 1;
  } else {
    color = '#' + color;
  }

  console.log(color.length + color);
  
  if(!size == 3  && !size == 6){
    invalidColor(res);
    return;
  }


  const hex = parse(color).hex;
  console.log(hex);

  if(!hex) {
    invalidColor(res);
    //res.status(400).send('Invalid color');
  }else{
    res.status(200).send(hex);
  }

});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
