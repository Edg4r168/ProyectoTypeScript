import { ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../config/database";
import {
  NewStudent,
  NonSensitiveInfoStudent,
  Student,
} from "../interfaces/student.interface";

class StudentService {
  async getAll(page: number, size: number) {
    try {
      const offset = page * size;
      const [results] = await connection.query(
        "SELECT * FROM estudiantes LIMIT ? OFFSET ?",
        [size, offset]
      );

      return results as Student[];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getById(id: number) {
    try {
      const [results] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM estudiantes WHERE id = ?",
        [id]
      );

      const student = results[0] as Student;

      return student;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async save(student: NewStudent): Promise<NonSensitiveInfoStudent | null> {
    try {
      const [results] = await connection.query<ResultSetHeader>(
        "INSERT INTO estudiantes(name, email, pin, rol) VALUES (?, ?, ?, ?)",
        [student.name, student.email, student.pin, student.rol]
      );

      const { affectedRows, insertId } = results;

      if (affectedRows < 1) return null;

      const newStudent = await this.getById(insertId);

      if (!newStudent) return null;

      const { pin, ...nonSensitiveInfoStudent } = newStudent;

      return nonSensitiveInfoStudent;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(student: NonSensitiveInfoStudent) {
    try {
      const [results] = await connection.query<ResultSetHeader>(
        `UPDATE estudiantes
            SET name = ?,
                       email = ?,
                       rol = ?
          WHERE id = ?`,
        [student.name, student.email, student.rol, student.id]
      );

      if (results.affectedRows < 1) return null;

      return student;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id: number) {
    try {
      const [results] = await connection.query<ResultSetHeader>(
        `DELETE FROM estudiantes
           WHERE id = ?`,
        [id]
      );

      return { ok: results.affectedRows > 0 };
    } catch (error) {
      console.log(error);
      return { ok: false };
    }
  }
}

export default new StudentService();
