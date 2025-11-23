const pool = require("../config/db");

/**
 * Prescription model: manages medical prescriptions given by the doctor to the client.
 */
const Prescription = {
  /**
   * Create a new prescription for a client after a consultation.
   * @param {Object} data - Includes appointmentId, doctorId, clientId, medicines, instructions, issuedAt.
   * @returns {number} New prescription ID.
   */
  create: async ({ appointmentId, doctorId, clientId, medicines, instructions, issuedAt }) => {
    const sql = "INSERT INTO prescriptions (appointment_id, doctor_id, client_id, medicines, instructions, issued_at) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await pool.execute(sql, [
      appointmentId,  // ID of the relevant appointment
      doctorId,       // Doctor who created the prescription
      clientId,       // Client who receives the prescription
      medicines,      // Medicines prescribed (string or JSON text)
      instructions,   // Instructions for usage
      issuedAt,       // Date of issue (YYYY-MM-DD)
    ]);
    return result.insertId;
  },

  /**
   * Find all prescriptions for a client.
   * @param {number} clientId
   * @returns {Array} List of prescriptions.
   */
  findByClient: async (clientId) => {
    const sql = "SELECT * FROM prescriptions WHERE client_id = ?";
    const [rows] = await pool.execute(sql, [clientId]);
    return rows;
  },

  /**
   * Find all prescriptions by a doctor.
   * @param {number} doctorId
   * @returns {Array} List of prescriptions.
   */
  findByDoctor: async (doctorId) => {
    const sql = "SELECT * FROM prescriptions WHERE doctor_id = ?";
    const [rows] = await pool.execute(sql, [doctorId]);
    return rows;
  },

  /**
   * Find prescription by appointment ID.
   * @param {number} appointmentId
   * @returns {Object} Prescription for the appointment.
   */
  findByAppointment: async (appointmentId) => {
    const sql = "SELECT * FROM prescriptions WHERE appointment_id = ?";
    const [rows] = await pool.execute(sql, [appointmentId]);
    return rows[0];
  },

  /**
   * Update prescription details (medicines, instructions).
   * @param {number} id - Prescription ID.
   * @param {Object} data - Updated fields.
   * @returns {boolean} Success state.
   */
  update: async (id, { medicines, instructions }) => {
    const sql = "UPDATE prescriptions SET medicines = ?, instructions = ? WHERE id = ?";
    const [result] = await pool.execute(sql, [medicines, instructions, id]);
    return result.affectedRows > 0;
  },

  /**
   * Delete a prescription.
   * @param {number} id - Prescription ID.
   * @returns {boolean} Success state.
   */
  delete: async (id) => {
    const sql = "DELETE FROM prescriptions WHERE id = ?";
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Prescription;
