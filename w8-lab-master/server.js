var http = require('http');
var fs = require('fs');

var Handlebars = require('handlebars');
var Sequelize = require('sequelize')

function run_server(db) {
  var hostname = '127.0.0.1';
  var port = 3000;

  var server = http.createServer(function(req, res) {
    if(req.url === '/' || req.url === '/index.html') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');

      // Your code goes here. You must call fetch_packages() to get `packages`.
      // Once you have `packages`, you can call `res.end(page_contents)` to
      // render the `page_contents` string as the page.
      //
      fetch_packages(db, function(packages){
      var page_contents = render_page(packages);
      res.end(page_contents);
      });
      
    } else {
      res.statusCode = 404;
      res.end();
    }
  });

  server.listen(port, hostname, function() {
      console.log(`Server running at http://${hostname}:${port}/`);
  });
}

function init_db() {
  var db = new Sequelize('shipments', 'user', 'pass', {
    dialect: 'sqlite',
    storage: 'shipments.sqlite'
  });
  return db;
}

function render_page(packages) {
  var template_source = fs.readFileSync('index.html', 'utf8');
  var template = Handlebars.compile(template_source);
  return template({packages: packages});
}

function fetch_packages(db, on_done) {
  // Your code goes here. You must return an array of objects that looks like
  // this (which you can infer from looking at what fields we reference in
  // index.html):
  //
     //[ { sent_on: '2016-06-27 14:31:03',
     //    due_on: '2016-06-28 08:00:00',
     //    received_on: null,
     //    shipper_name: 'Nils Olav',
     //    receiver_name: 'William Windsor',
     //    destination_address: 'Whipsnade Zoo, Whipsnade, England, Earth' },
     //  { sent_on: '2016-06-27 14:31:03',
     //    due_on: '2016-06-28 08:00:00',
     //    received_on: null,
     //    shipper_name: 'Nils Olav',
     //    receiver_name: 'William Windsor',
     //    destination_address: 'Whipsnade Zoo, Whipsnade, England, Earth' } ]
  //
  // Hint: the easiest way to do this is with SQL joins. If you don't know how
  // to use joins, you will have to issue multiple queries.
  db.query(
    'SELECT p1.sent_on, p1.due_on, p1.received_on, c1.name shipper_name, c2.name receiver_name, ' +
    '( a.street || "," || a.city || "," || a.country || ", " || a.planet ) destination_address ' + 
    'FROM packages p1 ' +
    'JOIN customers c1 ON p1.shipping_customer=c1.id '+
    'JOIN customers c2 ON p1.receiving_customer=c2.id '+
    'JOIN addresses a ON p1.destination_address=a.id '
  ).spread(function(packages, metadata) {
    on_done(packages);
  });
}

function main() {
  var db = init_db();
  run_server(db);
}

main();
