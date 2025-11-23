const pool = require("../config/db");

/**
 * User model: handles user operations (for admins, doctors, and clients).
 * Each user has a role that defines their permissions in the system.
 */
const User = {
  /**
   * Create a new user (admin, doctor, or client).
   * @param {Object} userData - The user details.
   * @returns {number} The newly created user's ID.
   */
  create: async ({ firstName, lastName, email, password, phone, role }) => {
    const sql = "INSERT INTO users (first_name, last_name, email, password, phone, role) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await pool.execute(sql, [
      firstName,
      lastName,
      email,
      password,
      phone,
      role, // defines the access level: 'admin', 'doctor', or 'client'
    ]);
    return result.insertId;
  },

  /**
   * Find a user by their email address.
   * @param {string} email
   * @returns {Object} The user object if found, otherwise undefined.
   */
  findByEmail: async (email) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await pool.execute(sql, [email]);
    return rows[0];
  },

  /**
   * Find a user by their phone number.
   * @param {string} phone
   * @returns {Object} The user object if found.
   */
  findByPhone: async (phone) => {
    const sql = "SELECT * FROM users WHERE phone = ?";
    const [rows] = await pool.execute(sql, [phone]);
    return rows[0];
  },

  /**
   * Find a user by their unique ID.
   * @param {number} id
   * @returns {Object} The user object if found.
   */
  findById: async (id) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
  },

  /**
   * Retrieve all users in the system.
   * @returns {Array} List of all user objects.
   */
  findAll: async () => {
    const sql = "SELECT * FROM users";
    const [rows] = await pool.execute(sql);
    return rows;
  },

  /**
   * Find all users with a specific role (admin, doctor, or client).
   * @param {string} role - The user's role.
   * @returns {Array} List of users with the given role.
   */
  findByRole: async (role) => {
    const sql = "SELECT * FROM users WHERE role = ?";
    const [rows] = await pool.execute(sql, [role]);
    return rows;
  },

  /**
   * Update a user's information.
   * @param {number} id - The user's ID.
   * @param {Object} userData - The updated user details.
   * @returns {boolean} Whether the update succeeded.
   */
  update: async (id, { firstName, lastName, email, password, phone, role }) => {
    const sql = `UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ?, phone = ?, role = ? WHERE id = ?`;
    const [result] = await pool.execute(sql, [
      firstName,
      lastName,
      email,
      password,
      phone,
      role,
      id,
    ]);
    return result.affectedRows > 0;
  },

  /**
   * Delete a user from the database.
   * @param {number} id - The user's ID.
   * @returns {boolean} Whether the deletion was successful.
   */
  delete: async (id) => {
    const sql = "DELETE FROM users WHERE id = ?";
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows > 0;
  },
};

module.exports = User;
