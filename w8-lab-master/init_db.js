var fs = require('fs');
var Sequelize = require('sequelize')

function main() {
  var db = new Sequelize('shipments', 'user', 'pass', {
    dialect: 'sqlite',
    storage: 'shipments.sqlite',
  });

  var sql = fs.readFileSync('schema.sql', 'utf8');

  var queries = sql.split(';');

  var run_query = function() {
    if(queries.length === 0)
      return;

    var query = queries.shift();
    db.query(query).then(function() {
      //console.log(results);
      //console.log(metadata);
      run_query();
    });
  }

  run_query();
}

main();
