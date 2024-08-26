import studentService from "../services/student";
import { Response, Request } from "express";
import { handleHttp } from "../utils/error.handle";
import { toNewStudent, toUpdateStudent } from "../utils/validateStudent";

class StudentController {
  async getAll(req: Request, res: Response) {
    try {
      const { page = 0, size = 10 } = req.query;
      console.log({ page, size });
      const students = await studentService.getAll(+page, +size);

      res.json({ result: students });
    } catch (error) {
      handleHttp(res, "Error al obtener usuarios", error);
    }
  }

  async getById(req: Request, res: Response) {
    const id = req.params?.id;

    if (!id)
      return res.status(400).json({ message: "El campo id es requerido" });

    try {
      const estudent = await studentService.getById(+id);

      console.log({ id, estudent });

      if (!estudent)
        return res.status(404).json({ message: "El estudiante no existe" });

      res.status(200).json({ result: estudent });
    } catch (error) {
      handleHttp(res, "Error al obtener usuario", error);
    }
  }

  async save(req: Request, res: Response) {
    const { name, email, pin, rol } = req.body;

    let newStudent;

    try {
      newStudent = toNewStudent({ name, email, pin, rol });
    } catch (error: Error | any) {
      return res.status(400).json({ message: error.message });
    }

    try {
      const student = await studentService.save(newStudent);

      if (student)
        return res
          .status(200)
          .json({ message: "Usuario guardado", result: student });

      handleHttp(res, "Error al guardar usuario");
    } catch (error) {
      handleHttp(res, "Error al guardar usuario", error);
    }
  }

  async update(req: Request, res: Response) {
    const { name, email, id, rol } = req.body;
    let updateStudent;

    try {
      updateStudent = toUpdateStudent({ name, email, id, rol });
    } catch (error: Error | any) {
      return res.status(400).json({ message: error.message });
    }

    try {
      const student = await studentService.update(updateStudent);

      if (student)
        return res
          .status(200)
          .json({ message: "Usuario actualizado", result: student });

      handleHttp(res, "El usuario no existe");
    } catch (error) {
      handleHttp(res, "Error al actualizar usuario", error);
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params?.id;

    if (!id)
      return res.status(400).json({ message: "El campo id es requerido" });

    try {
      const result = await studentService.delete(+id);

      if (result.ok)
        return res.status(200).json({ message: "Usuario borrado" });

      handleHttp(res, "El usuario no existe");
    } catch (error) {
      handleHttp(res, "Error al borrar usuario", error);
    }
  }
}

export default new StudentController();
