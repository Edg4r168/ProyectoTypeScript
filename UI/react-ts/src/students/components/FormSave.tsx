import React from "react";
import { Roles } from "../../const";
import { Modal } from "./Modal";
import { type NewStudent, type Rol } from "../../types/types";
import { useStudent } from "../hooks/useStudent";
import "./FormEdit.css";

interface ModalProps {
  show: boolean;
  onClose?: () => void;
}

export const FormSave = ({ show, onClose }: ModalProps) => {
  const { saveStudent } = useStudent();

  if (!show) return null;

  function handleSubnit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const fields = Object.fromEntries(new FormData(form));
    const student: NewStudent = {
      name: fields.name as string,
      email: fields.email as string,
      pin: fields.pin as string,
      rol: fields.rol as Rol,
    };

    saveStudent(student);
    onClose && onClose();
    form.reset();
  }

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubnit}>
        <label>
          Nombre
          <input type="text" name="name" />
        </label>

        <label>
          Email
          <input type="email" name="email" />
        </label>

        <label>
          Pin
          <input type="text" name="pin" />
        </label>

        <label>
          Rol
          <select name="rol">
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
