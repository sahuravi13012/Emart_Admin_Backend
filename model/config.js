const mysql = require("mysql");

const databaseConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecom",
});

databaseConnection.connect((err) => {
  err ? console.log(err.message) : console.log("Your Database is Connect");
});

module.exports = databaseConnection
