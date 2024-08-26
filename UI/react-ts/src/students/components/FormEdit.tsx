import React from "react";
import { Roles } from "../../const";
import { Modal } from "./Modal";
import { Rol, Student } from "../../types/types";
import { useStudent } from "../hooks/useStudent";
import "./FormEdit.css";

interface ModalProps {
  student: Student | null;
  onClose?: () => void;
}

export const FormEdit = ({ student, onClose }: ModalProps) => {
  const { updateStudent, cleanStudent } = useStudent();

  if (!student) return null;

  function handleSubnit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const fields = Object.fromEntries(new FormData(form));
    const student: Student = {
      id: Number(fields.id),
      name: fields.name as string,
      email: fields.email as string,
      rol: fields.rol as Rol,
    };

    updateStudent(student);

    cleanStudent();
  }

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubnit}>
        <input type="hidden" name="id" defaultValue={student.id} />

        <label>
          Nombre
          <input type="text" name="name" defaultValue={student.name} />
        </label>

        <label>
          Email
          <input type="email" name="email" defaultValue={student.email} />
        </label>

        <label>
          Rol
          <select name="rol" defaultValue={student.rol}>
            {Object.entries(Roles).map(([key, value]) => (
              <option value={key} key={key}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Guardar</button>
      </form>
    </Modal>
  );
};
