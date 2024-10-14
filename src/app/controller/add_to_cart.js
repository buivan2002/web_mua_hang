const { connection } = require ('../../config/db') 
const bcrypt = require ("bcrypt")
const jwt = require('jsonwebtoken');

class add_to_cartController{
   
    index(req,res){
        const token = req.cookies.token; // Lấy token từ cookie

        if (!token) {
            return res.status(401).send('Access denied. No token provided.');
        }
    
        // Giải mã token để lấy userID
        jwt.verify(token, 'mk', (err, decoded) => {
            if (err) {
                return res.status(400).send('Invalid token.');
            }
    
            const userID = decoded.ID; // Lấy userID từ decoded
            const Product_ID = req.body.Product_ID; // Lấy Product_ID từ body
    
            // Kiểm tra xem Product_ID và userID có hợp lệ không
            if (!Product_ID || !userID) {
                return res.status(400).send('Product_ID and userID are required.');
            }
    
            // Thêm dữ liệu vào bảng UserOrders
            const query = 
            `INSERT INTO UserOrders (Product_ID, ID, quantity)
            VALUES (?, ?, 1)
            ON DUPLICATE KEY UPDATE quantity = quantity + 1;`;
            connection.query(query, [Product_ID, userID], (err, result) => {
                if ((err && err.code !== 'ER_DUP_ENTRY') ) {
                    console.error('Error inserting data: ' + err.stack);
                    return res.status(500).send('Error adding data to UserOrders.');
                }
                return res.redirect('/add_to_cart'); // Chuyển hướng về giỏ hàng sau khi thêm
            });
        });
    
}


    show(req, res) {
        const userID = req.cookies.token ? jwt.verify(req.cookies.token, 'mk').ID : null;
        if (!userID) {
        return res.status(401).send('Access denied. No token provided.');
        }
    
        const shopping_cart = 
        `SELECT UserOrders.*, Products.*
        FROM UserOrders
        JOIN Products ON UserOrders.Product_ID = Products.Product_ID
        WHERE UserOrders.ID = ?;`;
        connection.query(shopping_cart, [userID], (err, orders) => {
        if (err) {
            console.error('Error fetching orders: ' + err.stack);
            return res.status(500).send('Error fetching orders.');
        }
    
        res.render('shopping_cart', { listUserOrders: orders });
        });
    }


    delete(req, res) {
        const token = req.cookies.token; // Lấy token từ cookie

        if (!token) {
            return res.status(401).send('Access denied. No token provided.');
        }

        // Giải mã token để lấy userID
        jwt.verify(token, 'mk', (err, decoded) => {
            if (err) {
                return res.status(400).send('Invalid token.');
            }

        const userID = decoded.ID; // Lấy userID từ decoded    
        const Product_ID = req.params.Product_ID
        const query = 'DELETE FROM UserOrders WHERE Product_ID = ? AND ID = ?';
        connection.query(query, [Product_ID, userID], (err, results) => {
            if (err) {
                console.error('Lỗi khi xóa:', err.message);
                console.error(err.stack);

                return res.status(500).send('Xóa không thành công');
            }
            console.log(Product_ID, userID)
            res.redirect('back'); // Chuyển hướng về trang giỏ hàng
        });
    })
}

upQuantity(req, res) {
    const token = req.cookies.token; // Lấy token từ cookie
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    // Giải mã token để lấy userID
    jwt.verify(token, 'mk', (err, decoded) => {
        if (err) {
            return res.status(400).send('Invalid token.');
        }

        const userID = decoded.ID; // Lấy userID từ decoded    
        const Product_ID = req.body.Product_ID;
        const Quantity = parseInt(req.body.Quantity); // Đảm bảo là số

        if (Quantity <= 0) {
            // Gọi hàm xóa sản phẩm nếu số lượng bằng 0
            const query = 'DELETE FROM UserOrders WHERE Product_ID = ? AND ID = ?';
            
            connection.query(query, [Product_ID, userID], (err, results) => {
                if (err) {
                    console.error('Lỗi khi xóa:', err);
                    return res.status(500).send('Xóa không thành công');
                }
                            console.log(Product_ID, userID)

                return res.redirect('back'); // Chuyển hướng về trang giỏ hàng
            });
        } else {
            // Cập nhật số lượng sản phẩm nếu nó lớn hơn 0
            const query = 'UPDATE UserOrders SET Quantity = ? WHERE Product_ID = ? AND ID = ?';
            connection.query(query, [Quantity, Product_ID, userID], (err, results) => {
                if (err) {
                    console.error('Lỗi khi cập nhật:', err);
                    return res.status(500).json({ success: false, message: 'Cập nhật không thành công' });
                }
                console.log(Product_ID, Quantity);
                return res.redirect('back'); // Chuyển hướng về trang giỏ hàng
            });
        }
    });
}
}

module.exports = new add_to_cartController