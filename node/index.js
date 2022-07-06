const express = require('express');
const app = express();
const port = 5000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

app.get('/', function (req, res) {
    connection.query('CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))',
        function (error) {
            if (error) {
                throw error;
            }
        });

    connection.query(`INSERT INTO people(name) VALUES ('Full Cycle Rocks')`,
        function (error) {
            if (error) {
                throw error;
            };
        });

    connection.query('SELECT * FROM people',
        function (error, results) {
            if (error) {
                throw error;
            };

            var html = '<h1>Full Cycle Rocks!</h1>';
            html += '<ul>';
            for (var i in results) {
                html += "<li>" + results[i].name + "</li>";
            }
            html += "</ul>";

            res.send(html);
        });
});

app.listen(port, () => {
    console.log('Rodando porta ' + port);
});