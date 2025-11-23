const pool = require("../config/db");

/**
 * Doctor model: handles doctor-specific operations,
 * including storing the specialty and linking doctor to user.
 */
const Doctor = {
  /**
   * Create a new doctor with specialty.
   * @param {Object} doctorData - Details including userId and specialty.
   * @returns {number} The new doctor ID.
   */
  create: async ({ userId, specialty }) => {
    const sql = "INSERT INTO doctors (user_id, specialty) VALUES (?, ?)";
    const [result] = await pool.execute(sql, [userId, specialty]);
    return result.insertId;
  },

  /**
   * Find doctor by user ID.
   * @param {number} userId
   * @returns {Object} Doctor details
   */
  findByUserId: async (userId) => {
    const sql = "SELECT * FROM doctors WHERE user_id = ?";
    const [rows] = await pool.execute(sql, [userId]);
    return rows[0];
  },

  /**
   * Find all doctors by specialty.
   * @param {string} specialty
   * @returns {Array} List of doctors matching the specialty.
   */
  findBySpecialty: async (specialty) => {
    const sql = "SELECT * FROM doctors WHERE specialty = ?";
    const [rows] = await pool.execute(sql, [specialty]);
    return rows;
  },

  /**
   * Retrieve all doctors.
   * @returns {Array} All doctors.
   */
  findAll: async () => {
    const sql = "SELECT * FROM doctors";
    const [rows] = await pool.execute(sql);
    return rows;
  },

  /**
   * Update doctor specialty.
   * @param {number} id - Doctor's ID.
   * @param {string} specialty - New specialty.
   * @returns {boolean} Whether update succeeded.
   */
  updateSpecialty: async (id, specialty) => {
    const sql = "UPDATE doctors SET specialty = ? WHERE id = ?";
    const [result] = await pool.execute(sql, [specialty, id]);
    return result.affectedRows > 0;
  },

  /**
   * Delete doctor.
   * @param {number} id - Doctor's ID.
   * @returns {boolean} Whether deletion succeeded.
   */
  delete: async (id) => {
    const sql = "DELETE FROM doctors WHERE id = ?";
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Doctor;
