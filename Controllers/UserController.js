const pool = require('../db') // импорт модуля бд

class UserController {
  async getAllUsers(req, res) {
    try {
      const user = await pool.query(`SELECT * FROM users`) // отправляет пулл в бд на получение данных всех юзеров
      res.json(user.rows) // данные преобразовываются в json и отправляются мне
    } catch (error) {
      console.log(error) // в случае ошибки вывод
    }
  }
  async createUser (req, res) {
    const {name, email} = req.body // принимается имя и емаил
    try {
      const user = await pool.query(`INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`, [name, email]);  // тут sql запрос чтоб вставлялись данные пользователя в таблицу
      res.json(user.rows); // преобразование в json формат
    } catch (error) {
      console.error('error', error)
    }
  }
  async updateUser(req, res) { 
    const id = parseInt(req.params.id, 10); // взаимодействует с айди
    const {name, email} = req.body // принимает имя и емаил
    try {
      const user = await pool.query(`UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *`, [name, email, id]); // sql запрос чтоб происходил апдейт данных пользователя в таблице
    } catch (error) {
      console.error('error', error)
    }
  }
  async deleteUser(req, res) {
    const id = req.params.id; // взаимодействие с id
    const user = await pool.query(`DELETE FROM users WHERE id = $1`, [id]) // sql запрос на удаление данных о пользователе в таблице
    res.json(user.rows[0]); // json берется 1 столбик
  }
}

module.exports = new UserController();