const { connection } = require('../../config/db')

class searchController {
  index(req, res) {
    const searchTerm = req.query.q || ''
    const query = `SELECT * FROM products WHERE (ProductName LIKE ? OR Description LIKE ?) AND '${searchTerm}' != ''`

    connection.query(query, [`%${searchTerm}%`, `%${searchTerm}%`], (error, results) => {
      if (error) throw error
      res.render('search', { searchproducts: results})
    })
  }
}

module.exports = new searchController