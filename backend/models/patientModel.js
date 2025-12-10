const pool = require("../config/db");

/**
 * Patient model: handles patient-specific operations,
 * including storing personal details and medical history.
 */
const Patient = {
    /**
     * Create a new patient.
     * @param {Object} patientData - Details including userId, dateOfBirth, gender, address, medicalHistory.
     * @returns {number} The new patient ID.
     */
    create: async ({ userId, dateOfBirth, gender, address, medicalHistory }) => {
        const sql = "INSERT INTO patients (user_id, date_of_birth, gender, address, medical_history) VALUES (?, ?, ?, ?, ?)";
        const [result] = await pool.execute(sql, [userId, dateOfBirth, gender, address, medicalHistory]);
        return result.insertId;
    },

    /**
     * Find patient by user ID.
     * @param {number} userId
     * @returns {Object} Patient details
     */
    findByUserId: async (userId) => {
        const sql = "SELECT * FROM patients WHERE user_id = ?";
        const [rows] = await pool.execute(sql, [userId]);
        return rows[0];
    },

    /**
     * Retrieve all patients.
     * @returns {Array} All patients.
     */
    findAll: async () => {
        const sql = `
            SELECT p.*, u.first_name, u.last_name, u.email, u.phone 
            FROM patients p 
            JOIN users u ON p.user_id = u.id
        `;
        const [rows] = await pool.execute(sql);
        return rows;
    },

    /**
     * Update patient details.
     * @param {number} id - Patient's ID.
     * @param {Object} patientData - Updated fields (dateOfBirth, gender, address, medicalHistory).
     * @returns {boolean} Whether update succeeded.
     */
    update: async (id, { dateOfBirth, gender, address, medicalHistory }) => {
        const sql = "UPDATE patients SET date_of_birth = ?, gender = ?, address = ?, medical_history = ? WHERE id = ?";
        const [result] = await pool.execute(sql, [dateOfBirth, gender, address, medicalHistory, id]);
        return result.affectedRows > 0;
    },

    /**
     * Delete patient.
     * @param {number} id - Patient's ID.
     * @returns {boolean} Whether deletion succeeded.
     */
    delete: async (id) => {
        const sql = "DELETE FROM patients WHERE id = ?";
        const [result] = await pool.execute(sql, [id]);
        return result.affectedRows > 0;
    },
};

module.exports = Patient;
