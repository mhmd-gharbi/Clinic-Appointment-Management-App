const pool = require("../config/db");

/**
 * Appointment model: manages scheduling, urgent requests, and status tracking.
 */
const Appointment = {
  /**
   * Create a new appointment (normal or urgent).
   * @param {Object} appointmentData - Includes clientId, doctorId, date, time, type, status.
   * @returns {number} Newly created appointment ID.
   */
  create: async ({ clientId, doctorId, date, time, type, status }) => {
    const sql = "INSERT INTO appointments (client_id, doctor_id, date, time, type, status) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await pool.execute(sql, [
      clientId,    // User ID of the client
      doctorId,    // Doctor's user ID
      date,        // Appointment date (YYYY-MM-DD)
      time,        // Appointment time (HH:MM)
      type,        // 'normal' or 'urgent'
      status,      // 'scheduled', 'completed', 'cancelled'
    ]);
    return result.insertId;
  },

  /**
   * Find all appointments for a specific client.
   * @param {number} clientId
   * @returns {Array} List of appointments for the client.
   */
  findByClient: async (clientId) => {
    const sql = "SELECT * FROM appointments WHERE client_id = ?";
    const [rows] = await pool.execute(sql, [clientId]);
    return rows;
  },

  /**
   * Find all appointments for a specific doctor.
   * @param {number} doctorId
   * @returns {Array} List of appointments for the doctor.
   */
  findByDoctor: async (doctorId) => {
    const sql = "SELECT * FROM appointments WHERE doctor_id = ?";
    const [rows] = await pool.execute(sql, [doctorId]);
    return rows;
  },

  /**
   * Find appointment by ID.
   * @param {number} id
   * @returns {Object} The appointment object.
   */
  findById: async (id) => {
    const sql = "SELECT * FROM appointments WHERE id = ?";
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
  },

  /**
   * Update appointment details.
   * @param {number} id - Appointment ID.
   * @param {Object} data - Updated fields (date, time, status).
   * @returns {boolean} Success state.
   */
  update: async (id, { date, time, status }) => {
    const sql = "UPDATE appointments SET date = ?, time = ?, status = ? WHERE id = ?";
    const [result] = await pool.execute(sql, [date, time, status, id]);
    return result.affectedRows > 0;
  },

  /**
   * Cancel an appointment (sets status to 'cancelled').
   * @param {number} id - Appointment ID.
   * @returns {boolean} Success state.
   */
  cancel: async (id) => {
    const sql = "UPDATE appointments SET status = 'cancelled' WHERE id = ?";
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows > 0;
  },

  /**
   * Delete appointment from the database.
   * @param {number} id - Appointment ID.
   * @returns {boolean} Success state.
   */
  delete: async (id) => {
    const sql = "DELETE FROM appointments WHERE id = ?";
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Appointment;
