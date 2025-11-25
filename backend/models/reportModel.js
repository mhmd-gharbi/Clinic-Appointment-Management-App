const pool = require("../config/db");

/**
 * Report model: manages medical reports and examinations.
 */
const Report = {
  /**
   * Create a new medical report.
   * @param {Object} reportData - Includes clientId, doctorId, type, results, issuedAt.
   * @returns {number} Newly created report ID.
   */
  create: async ({ clientId, doctorId, type, results, issuedAt }) => {
    const sql = "INSERT INTO reports (client_id, doctor_id, type, results, issued_at) VALUES (?, ?, ?, ?, ?)";
    const [result] = await pool.execute(sql, [
      clientId,    // User ID of the client
      doctorId,    // User ID of the doctor
      type,        // Type of the report (blood test, imaging...)
      results,     // Report result/details as text
      issuedAt,    // Date of issue (YYYY-MM-DD)
    ]);
    return result.insertId;
  },

  /**
   * Find all reports for a client.
   * @param {number} clientId
   * @returns {Array} List of reports.
   */
  findByClient: async (clientId) => {
    const sql = "SELECT * FROM reports WHERE client_id = ?";
    const [rows] = await pool.execute(sql, [clientId]);
    return rows;
  },

  /**
   * Find all reports created by a doctor.
   * @param {number} doctorId
   * @returns {Array} List of reports.
   */
  findByDoctor: async (doctorId) => {
    const sql = "SELECT * FROM reports WHERE doctor_id = ?";
    const [rows] = await pool.execute(sql, [doctorId]);
    return rows;
  },

  /**
   * Find report by ID.
   * @param {number} id
   * @returns {Object} Report object.
   */
  findById: async (id) => {
    const sql = "SELECT * FROM reports WHERE id = ?";
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
  },

  /**
   * Update report results or type.
   * @param {number} id - Report ID.
   * @param {Object} data - Updated fields.
   * @returns {boolean} Success state.
   */
  update: async (id, { type, results }) => {
    const sql = "UPDATE reports SET type = ?, results = ? WHERE id = ?";
    const [result] = await pool.execute(sql, [type, results, id]);
    return result.affectedRows > 0;
  },

  /**
   * Delete a report.
   * @param {number} id - Report ID.
   * @returns {boolean} Success state.
   */
  delete: async (id) => {
    const sql = "DELETE FROM reports WHERE id = ?";
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Report;