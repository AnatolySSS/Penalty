const mysql = require('mysql');

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "payfo",
    password: ""
  });
  // тестирование подключения
  connection.connect(function(err){
      if (err) {
        return console.error("Ошибка: " + err.message);
      }
      else{
        console.log("Подключение к серверу MySQL успешно установлено");
      }
   });

let query = "SELECT * FROM dtp_description";

connection.query(query, (err, result, field) => {
  console.log("Ошибки: " + err);
  console.log(result[0]['date']);
  //console.log(field);
});

// закрытие подключения
connection.end(function(err) {
if (err) {
  return console.log("Ошибка: " + err.message);
}
console.log("Подключение закрыто");
});
