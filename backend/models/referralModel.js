const pool = require("../config/db");

/**
 * Referral model: Manages referral letters between doctors
 * for patient cases that require a transfer or second opinion.
 */
const Referral = {

  /**
   * Create a new referral letter from one doctor to another for a patient.
   * @param {Object} data - Referral fields: appointmentId, fromDoctorId, toDoctorId, clientId, reason, createdAt.
   * @returns {number} Newly created referral ID.
   */
  create: async ({ appointmentId, fromDoctorId, toDoctorId, clientId, reason, createdAt }) => {
    try {
      const sql = `
        INSERT INTO referrals
        (appointment_id, from_doctor_id, to_doctor_id, client_id, reason, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const [result] = await pool.execute(sql, [
        appointmentId,
        fromDoctorId,
        toDoctorId,
        clientId,
        reason,
        createdAt,
      ]);
      return result.insertId;
    } catch (error) {
      // Log or rethrow for controller to handle
      throw new Error("Failed to create referral: " + error.message);
    }
  },

  /**
   * Retrieve all referrals for a specific client (patient).
   * @param {number} clientId
   * @returns {Array} List of referrals for this client.
   */
  findByClient: async (clientId) => {
    const sql = "SELECT * FROM referrals WHERE client_id = ?";
    const [rows] = await pool.execute(sql, [clientId]);
    return rows;
  },

  /**
   * Retrieve all referrals sent by a specific doctor.
   * @param {number} fromDoctorId
   * @returns {Array} List of referrals initiated by this doctor.
   */
  findByFromDoctor: async (fromDoctorId) => {
    const sql = "SELECT * FROM referrals WHERE from_doctor_id = ?";
    const [rows] = await pool.execute(sql, [fromDoctorId]);
    return rows;
  },

  /**
   * Retrieve all referrals received by a specific doctor.
   * @param {number} toDoctorId
   * @returns {Array} List of referrals addressed to this doctor.
   */
  findByToDoctor: async (toDoctorId) => {
    const sql = "SELECT * FROM referrals WHERE to_doctor_id = ?";
    const [rows] = await pool.execute(sql, [toDoctorId]);
    return rows;
  },

  /**
   * Find a referral record by its unique ID.
   * @param {number} id
   * @returns {Object} Referral object.
   */
  findById: async (id) => {
    const sql = "SELECT * FROM referrals WHERE id = ?";
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
  },

  /**
   * Update referral reason or linked doctors/appointment.
   * @param {number} id - Referral ID.
   * @param {Object} updateData - Fields to update.
   * @returns {boolean} Success state.
   */
  update: async (
    id,
    { appointmentId, fromDoctorId, toDoctorId, clientId, reason, createdAt }
  ) => {
    try {
      const sql = `
        UPDATE referrals
        SET appointment_id = ?, from_doctor_id = ?, to_doctor_id = ?,
            client_id = ?, reason = ?, created_at = ?
        WHERE id = ?
      `;
      const [result] = await pool.execute(sql, [
        appointmentId,
        fromDoctorId,
        toDoctorId,
        clientId,
        reason,
        createdAt,
        id,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      // Log or rethrow for controller to handle
      throw new Error("Failed to update referral: " + error.message);
    }
  },

  /**
   * Delete a referral record.
   * @param {number} id - Referral ID.
   * @returns {boolean} Success state.
   */
  delete: async (id) => {
    try {
      const sql = "DELETE FROM referrals WHERE id = ?";
      const [result] = await pool.execute(sql, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Failed to delete referral: " + error.message);
    }
  },
};

module.exports = Referral;