// __A Google scraper using node.js, jsdom and jQuery__
//
// Source code is hosted on [GitHub](https://github.com/jmesnil/node-samples/)
//
// &copy; 2011 [Jeff Mesnil](http://jmesnil.net)
//
// ---

// Node.js modules required to run the scraper
var request = require('request'),
    jsdom   = require('jsdom');

// remove node and the file name from the arguments list
var args = process.argv.slice(2);

if (args.length != 1) {
  console.log('Usage: node scraper.js <query sentence>');
  process.exit(1);
}

// the query to search on Google
var query = escape(args[0]);
// Google URL that will be request and whose content will be scraped
var url = 'http://www.google.fr/search?hl=fr&source=hp&ie=ISO-8859-1&q=' + query + '&btnG=Recherche+Google'

request({ uri: url }, function (error, response, body) {
  // nothing to do if we get an error from Google
  if (error) {
    console.log('Error when contacting google.com: ' + error);
    process.exit(2);
  }
  // idem if the response is not OK
  if (response && response.statusCode !== 200) {
    console.log('Did not get a correct response from Google: ' + response);
    process.exit(2);
  }

  // use jsdom and jQueery to manipulate the DOM corresponding to the response's body
  jsdom.env({
    html: body,
    scripts: [
       // jQuery is loaded directly from its web site.
       // We could instead cache it locally for efficiency
      'http://code.jquery.com/jquery-1.5.min.js'
    ]
  }, function (err, window) {
    // alias jQuery object to the more familiar '$'
    var $ = window.jQuery;
    // print the URLS of the results listed by Google...
    $('a.l').each(function() {
      console.log($(this).attr('href'));
    });  
  });
});
