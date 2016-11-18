export default function canonize(url) {
  const regExp = new RegExp('@?(https?:)?(\/\/)?(www\.)?([A-zА-я0-9]*[^\/]*\/)?(\/)?@?([A-zА-я0-9\.]*)', 'i');

  const urlMatch = url.match(regExp);
  console.log(urlMatch);
  const canonizeUserName = urlMatch[6] || '';
  console.log(canonizeUserName);
  if (canonizeUserName == '') {
    return 'Invalid username';
  }
  return '@'.concat(canonizeUserName);
}
