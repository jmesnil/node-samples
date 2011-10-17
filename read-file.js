var fs = require('fs');

fs.readFile('/usr/share/dict/words', 'utf8', function (err, data) {
  if (err) throw err;
  console.log(data);
});
