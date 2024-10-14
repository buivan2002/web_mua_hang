const { connection } = require('../../config/db');


class productController{
    index(req,res){
        let sql = `SELECT * FROM products`;
        connection.query(sql, function(err, data) { // data chứa kq truy vấn
           if (err) throw err;
           res.render('product',{listproduct:data}); //nạp view và truyền data
        });
    
}
}

module.exports = new productController