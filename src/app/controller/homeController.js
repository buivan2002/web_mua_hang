class homeController{
    index(req,res){
        const token = req.cookies.token; // Lấy token từ cookie
        const isLoggedIn = !!token; // Kiểm tra xem người dùng đã đăng nhập hay chưa
        res.render('home',  { isLoggedIn });

    }
    show(req,res){
        res.send('home')
    }
}

module.exports = new homeController