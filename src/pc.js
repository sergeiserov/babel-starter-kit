import fetch from 'isomorphic-fetch';

function PC() {
  const urlModel = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
  this.pc = {};
  fetch(urlModel)
    .then(async res => {
      this.pc = await res.json();
    })
    .catch(err => {
      console.log('Not load', err);
    });
}

PC.prototype.getPC = function () {
  return this.pc;
};

PC.prototype.getVolumes = function () {

  const hddFull = this.getField("hdd");
  //console.log(hddFull);

  let hdd = hddFull.reduce((result, value) => {
    let volume = value.volume;
    let size = value.size;
    result[volume] = result[volume] || 0;
    result[volume] = result[volume] + size;

    console.log(result[volume]);
    return result;
  }, {});
  for(let key in hdd){
    hdd[key] = hdd[key].toString() + "B";
    //console.log(key);
  }
  //console.log(hdd);
  return hdd;
};
PC.prototype.getField = function (nameField) {

  return this.pc[nameField];

};

PC.prototype.getSomeField = function (originalUrl) {

  let nameFieldFull = originalUrl.split('/');
  nameFieldFull.splice(0, 2);
  var nameField = nameFieldFull.filter(function(path) {
    return path != '';
  });

  console.log(nameField);

  let field = this.pc;
  let currentObject = this.pc;
  nameField.forEach(currentField => {
    let legalField = false;
    for(let prop in currentObject) {
      if (currentObject.hasOwnProperty(prop) && prop === currentField) {
        legalField = true;
      }
    }
    if (!legalField) {
      field = undefined;
    } else {
      field = currentObject[currentField];
    }
    if (field === undefined) {
      return field;
    }
    currentObject = field;
  })

  return field;

};

exports.PC = PC;
