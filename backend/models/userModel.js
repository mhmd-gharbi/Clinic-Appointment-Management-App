const pool = require("../config/db")

const User = {
  create: async ({ firstName, lastName, email, password, role }) => {
    const sql = `INSERT INTO users (first_name, last_name, email, password, role)
                 VALUES (?, ?, ?, ?, ?)`
    const [result] = await pool.execute(sql, [
      firstName,
      lastName,
      email,
      password,
      role,
    ])
    return result.insertId
  },

  findByEmail: async (email) => {
    const sql = `SELECT * FROM users WHERE email = ?`
    const [rows] = await pool.execute(sql, [email])
    return rows[0]
  },

  findById: async (id) => {
    const sql = `SELECT * FROM users WHERE id = ?`
    const [rows] = await pool.execute(sql, [id])
    return rows[0]
  },
}

module.exports = User
