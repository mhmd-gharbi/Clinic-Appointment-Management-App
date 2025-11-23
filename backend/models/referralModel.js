const pool = require("../config/db");

/**
 * Referral model: manages doctor-to-doctor referral letters for patients.
 */
const Referral = {
  /**
   * Create a new referral letter from one doctor to another for a client.
   * @param {Object} data - Includes appointmentId, fromDoctorId, toDoctorId, clientId, reason, createdAt.
   * @returns {number} New referral ID.
   */
  create: async ({ appointmentId, fromDoctorId, toDoctorId, clientId, reason, createdAt }) => {
    const sql = "INSERT INTO referrals (appointment_id, from_doctor_id, to_doctor_id, client_id, reason, created_at) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await pool.execute(sql, [
      appointmentId,    // ID of the relevant appointment
      fromDoctorId,     // Doctor who creates the referral
      toDoctorId,       // Specialist (doctor) to refer to
      clientId,         // Patient's user ID
      reason,           // Reason for referral
      createdAt,        // Date of referral creation (YYYY-MM-DD)
    ]);
    return result.insertId;
  },

  /**
   * Find all referrals for a client.
   * @param {number} clientId
   * @returns {Array} List of referrals for the client.
   */
  findByClient: async (clientId) => {
    const sql = "SELECT * FROM referrals WHERE client_id = ?";
    const [rows] = await pool.execute(sql, [clientId]);
    return rows;
  },

  /**
   * Find all referrals made by a doctor.
   * @param {number} fromDoctorId
   * @returns {Array} List of referrals sent by this doctor.
   */
  findByFromDoctor: async (fromDoctorId) => {
    const sql = "SELECT * FROM referrals WHERE from_doctor_id = ?";
    const [rows] = await pool.execute(sql, [fromDoctorId]);
    return rows;
  },

  /**
   * Find all referrals received by a doctor (doctor to whom clients are referred).
   * @param {number} toDoctorId
   * @returns {Array} List of referrals received by this doctor.
   */
  findByToDoctor: async (toDoctorId) => {
    const sql = "SELECT * FROM referrals WHERE to_doctor_id = ?";
    const [rows] = await pool.execute(sql, [toDoctorId]);
    return rows;
  },

  /**
   * Find referral by ID.
   * @param {number} id
   * @returns {Object} Referral object.
   */
  findById: async (id) => {
    const sql = "SELECT * FROM referrals WHERE id = ?";
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
  },

  /**
   * Update referral reason.
   * @param {number} id - Referral ID.
   * @param {string} reason - New reason for referral.
   * @returns {boolean} Success state.
   */
  updateReason: async (id, reason) => {
    const sql = "UPDATE referrals SET reason = ? WHERE id = ?";
    const [result] = await pool.execute(sql, [reason, id]);
    return result.affectedRows > 0;
  },

  /**
   * Delete a referral record.
   * @param {number} id - Referral ID.
   * @returns {boolean} Success state.
   */
  delete: async (id) => {
    const sql = "DELETE FROM referrals WHERE id = ?";
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Referral;
