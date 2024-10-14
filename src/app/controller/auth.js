const { connection } = require ('../../config/db') 
const bcrypt = require ("bcrypt")
const jwt = require('jsonwebtoken');

class auth{
    login(req,res){
       res.render('loginup/login')
    }
    logout(req,res,next){
        res.cookie('token', '', {
            
            maxAge: 1 
          });
        res.redirect('/login')}
    
    signup(req,res,next){
        res.render('loginup/signup')
    }
   

    async signup_post(req, res) {
        let username = req.body.username;
        let password = req.body.password;
    
        // Đảm bảo các trường đầu vào tồn tại và không trống
        if (username && password) {
            // Thực hiện truy vấn để kiểm tra xem tài khoản đã tồn tại chưa
            connection.query('SELECT * FROM Users WHERE Username = ?', [username], async (error, results) => {
                // Nếu có lỗi với truy vấn, trả về lỗi
                if (error) {
                    console.error('Lỗi truy vấn:', error);
                    return res.status(500).send('Có lỗi xảy ra.');
                }
    
                // Nếu tài khoản đã tồn tại
                if (results.length > 0) {
                    return res.send('Tài khoản đã được đăng ký!');
                } else {
                    try {
                        // Băm mật khẩu
                        const hashedPassword = await bcrypt.hash(password, 10);
    
                        // Thực hiện truy vấn để thêm tài khoản mới
                        connection.query('INSERT INTO Users (Username, Password) VALUES (?, ?)', [username, hashedPassword], (error) => {
                            // Nếu có lỗi với truy vấn, trả về lỗi
                            if (error) {
                                console.error('Lỗi truy vấn:', error);
                                return res.status(500).send('Có lỗi xảy ra.');
                            }
    
                            // Gửi phản hồi thành công
                            res.send('Đăng ký thành công!');
                        });
                    } catch (err) {
                        console.error('Lỗi băm mật khẩu:', err);
                        return res.status(500).send('Có lỗi xảy ra.');
                    }
                }
            });
        } else {
            res.status(400).send('Tên đăng nhập và mật khẩu không được để trống.');
        }
    }
    async login_post(req, res) {
        let username = req.body.username;
        let password = req.body.password;

        // Kiểm tra sự tồn tại của người dùng
        connection.query('SELECT * FROM Users WHERE Username = ?', [username], (err, rows) => {
            if (err) {
                console.error('Lỗi truy vấn:', err);
                return res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
            }

            if (rows.length === 0) {
                console.log('Người dùng không tồn tại');
                return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }

            const user = rows[0]; // Lấy thông tin người dùng đầu tiên

            // So sánh mật khẩu
            bcrypt.compare(password, user.Password, (err, isMatch) => {
                if (err) {
                    console.error('Lỗi so sánh mật khẩu:', err);
                    return res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
                }

                if (!isMatch) {
                    console.log('Mật khẩu không chính xác');
                    return res.status(401).json({ message: 'Mật khẩu không chính xác' });
                }

                // Tạo token
                const token = jwt.sign({ID: user.ID }, 'mk'); // Sử dụng user._id
                console.log('Token:', token);

                // Thiết lập cookie
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 3600000 // 1 giờ
                });

                // Chuyển hướng người dùng
                return res.redirect('/');
            });
        });
    }
}
module.exports = new auth