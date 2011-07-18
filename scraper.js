var request = require('request'),
    jsdom = require('jsdom');


var args = process.argv.slice(2);

if (args.length != 1) {
  console.log('Usage: node scraper.js <query sentence>');
  process.exit();

}

var query = escape(args[0]);
var url = 'http://www.google.fr/search?hl=fr&source=hp&ie=ISO-8859-1&q=' + query + '&btnG=Recherche+Google'

request({ uri:url }, function (error, response, body) {
  if (error && response.statusCode !== 200) {
    console.log('Error when contacting google.com')
  }

  jsdom.env({
    html: body,
    scripts: [
      'http://code.jquery.com/jquery-1.5.min.js'
    ]
  }, function (err, window) {
    var $ = window.jQuery;
    //console.log($('body').html());
    // jQuery is now loaded on the jsdom window created from 'agent.body'
    $('a.l').each(function() {
      console.log($(this).attr('href'));
   });  
  });
});
