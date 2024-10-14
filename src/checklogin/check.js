const jwt = require('jsonwebtoken');

class check {
    check_login (req, res, next){
    try{
        const token = req.cookies.token
        console.log('TOKEN', token)
    
        var ketqua = jwt.verify(token,'mk')
        console.log('DATA', ketqua)
        if(ketqua){
            next()
        }
    }
    catch (error) {
        return res.redirect('/login')
    }
}
}

module.exports = new check
