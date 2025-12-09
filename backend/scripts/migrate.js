const pool = require("../config/db")

async function migrate() {
  const connection = await pool.getConnection()

  try {
    console.log("Running migrations...")

    await connection.query("SET foreign_key_checks = 0;")

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL UNIQUE,
        role ENUM('admin','doctor','client') DEFAULT 'client',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `)

    await connection.query(`
      CREATE TABLE IF NOT EXISTS doctors (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id INT UNSIGNED NOT NULL UNIQUE,
        specialty VARCHAR(255) NOT NULL,
        bio TEXT,
        experience_years INT DEFAULT 0,
        CONSTRAINT fk_doctor_user
          FOREIGN KEY (user_id) REFERENCES users(id)
          ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `)

    await connection.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        client_id INT UNSIGNED NOT NULL,
        doctor_id INT UNSIGNED NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        type ENUM('normal','urgent') DEFAULT 'normal',
        status ENUM('scheduled','completed','cancelled') DEFAULT 'scheduled',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_appointment_client
          FOREIGN KEY (client_id) REFERENCES users(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_appointment_doctor
          FOREIGN KEY (doctor_id) REFERENCES doctors(id)
          ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `)

    await connection.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        client_id INT UNSIGNED NOT NULL,
        doctor_id INT UNSIGNED NOT NULL,
        type VARCHAR(255) NOT NULL,
        results TEXT,
        issued_at DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_reports_client
          FOREIGN KEY (client_id) REFERENCES users(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_reports_doctor
          FOREIGN KEY (doctor_id) REFERENCES doctors(id)
          ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `)

    await connection.query(`
      CREATE TABLE IF NOT EXISTS referrals (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        appointment_id INT UNSIGNED NOT NULL,
        from_doctor_id INT UNSIGNED NOT NULL,
        to_doctor_id INT UNSIGNED NOT NULL,
        client_id INT UNSIGNED NOT NULL,
        reason TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_referrals_appointment
          FOREIGN KEY (appointment_id) REFERENCES appointments(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_referrals_from_doctor
          FOREIGN KEY (from_doctor_id) REFERENCES doctors(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_referrals_to_doctor
          FOREIGN KEY (to_doctor_id) REFERENCES doctors(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_referrals_client
          FOREIGN KEY (client_id) REFERENCES users(id)
          ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `)

    await connection.query(`
      CREATE TABLE IF NOT EXISTS prescriptions (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        appointment_id INT UNSIGNED NOT NULL,
        doctor_id INT UNSIGNED NOT NULL,
        client_id INT UNSIGNED NOT NULL,
        medicines TEXT NOT NULL,
        instructions TEXT NOT NULL,
        issued_at DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_prescriptions_appointment
          FOREIGN KEY (appointment_id) REFERENCES appointments(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_prescriptions_doctor
          FOREIGN KEY (doctor_id) REFERENCES doctors(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_prescriptions_client
          FOREIGN KEY (client_id) REFERENCES users(id)
          ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `)

    await connection.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        sender_id INT UNSIGNED NOT NULL,
        receiver_id INT UNSIGNED NOT NULL,
        content TEXT NOT NULL,
        type ENUM('client-to-doctor','doctor-to-client') NOT NULL,
        sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_sender
          FOREIGN KEY (sender_id) REFERENCES users(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_receiver
          FOREIGN KEY (receiver_id) REFERENCES users(id)
          ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `)

    await connection.query("SET foreign_key_checks = 1;")

    console.log("Migration completed successfully.")
  } catch (err) {
    console.error("Migration error:", err)
  } finally {
    connection.release()
  }
}

migrate()
