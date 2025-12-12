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
   * Find all appointments (for Admin).
   * @returns {Array} List of all appointments with client and doctor names.
   */
  findAll: async () => {
    const sql = `
      SELECT a.*, 
             c.first_name as client_first_name, c.last_name as client_last_name,
             d_user.first_name as doctor_first_name, d_user.last_name as doctor_last_name, d.specialty
      FROM appointments a
      JOIN users c ON a.client_id = c.id
      JOIN doctors d ON a.doctor_id = d.id
      JOIN users d_user ON d.user_id = d_user.id
      ORDER BY a.date DESC, a.time DESC
    `;
    const [rows] = await pool.execute(sql);
    return rows;
  },

  /**
   * Find all appointments for a specific client.
   * @param {number} clientId
   * @returns {Array} List of appointments with doctor names.
   */
  findByClient: async (clientId) => {
    const sql = `
      SELECT a.*, 
             d_user.first_name as doctor_first_name, d_user.last_name as doctor_last_name, d.specialty
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      JOIN users d_user ON d.user_id = d_user.id
      WHERE a.client_id = ?
      ORDER BY a.date DESC
    `;
    const [rows] = await pool.execute(sql, [clientId]);
    return rows;
  },

  /**
   * Find all appointments for a specific doctor.
   * @param {number} doctorId
   * @returns {Array} List of appointments with client names.
   */
  findByDoctor: async (doctorId) => {
    const sql = `
      SELECT a.*, 
             c.first_name as client_first_name, c.last_name as client_last_name, c.phone as client_phone
      FROM appointments a
      JOIN users c ON a.client_id = c.id
      WHERE a.doctor_id = ?
      ORDER BY a.date DESC
    `;
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
  update: async (id, fields) => {
    // Fetch current appointment to merge fields
    const sqlGet = "SELECT * FROM appointments WHERE id = ?";
    const [rows] = await pool.execute(sqlGet, [id]);
    const current = rows[0];
    if (!current) return false;

    const date = fields.date || current.date;
    const time = fields.time || current.time;
    const status = fields.status || current.status;

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
