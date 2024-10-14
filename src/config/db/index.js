
const mysql = require ('mysql2')
const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mysqll',
    password: '123456',
    port: 3306  ,

  });  
  connection.connect((err) => {
    if (err) {
      console.error('Lỗi kết nối đến cơ sở dữ liệu:', err);
      return;
    }
    console.log('Đã kết nối đến cơ sở dữ liệu');
  });


module.exports = {connection}

