const pool = require("../config/db");

/**
 * Message model: manages communication between client and doctor.
 */
const Message = {
  /**
   * Send a message from client to doctor or vice versa.
   * @param {Object} messageData - Includes senderId, receiverId, content, type.
   * @returns {number} Newly created message ID.
   */
  create: async ({ senderId, receiverId, content, type }) => {
    const sql = "INSERT INTO messages (sender_id, receiver_id, content, type, sent_at) VALUES (?, ?, ?, ?, NOW())";
    const [result] = await pool.execute(sql, [
      senderId,    // User ID of sender (client or doctor)
      receiverId,  // User ID of receiver (doctor or client)
      content,     // Message text content
      type,        // 'client-to-doctor', 'doctor-to-client'
    ]);
    return result.insertId;
  },

  /**
   * Find all messages sent to a specific user.
   * @param {number} userId
   * @returns {Array} List of messages received by the user.
   */
  findByReceiver: async (userId) => {
    const sql = "SELECT * FROM messages WHERE receiver_id = ?";
    const [rows] = await pool.execute(sql, [userId]);
    return rows;
  },

  /**
   * Find all messages sent by a specific user.
   * @param {number} userId
   * @returns {Array} List of messages sent by the user.
   */
  findBySender: async (userId) => {
    const sql = "SELECT * FROM messages WHERE sender_id = ?";
    const [rows] = await pool.execute(sql, [userId]);
    return rows;
  },

  /**
   * Find message by its ID.
   * @param {number} id
   * @returns {Object} Message object.
   */
  findById: async (id) => {
    const sql = "SELECT * FROM messages WHERE id = ?";
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
  },

  /**
   * Delete a message.
   * @param {number} id - Message ID.
   * @returns {boolean} Success state.
   */
  delete: async (id) => {
    const sql = "DELETE FROM messages WHERE id = ?";
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Message;
