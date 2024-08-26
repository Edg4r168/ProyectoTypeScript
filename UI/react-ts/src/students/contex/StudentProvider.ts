import { ReactNode, useContext, useEffect, useState } from "react";
import { deleteService } from "../services/delete";
import { updateService } from "../services/update";
import { saveService } from "../services/save";
import { getByIdService } from "../services/getById";
import { getAllService } from "../services/getAll";
import { NewStudent, Student } from "../../types/types";
import { StudentContext } from "./studentContex";

interface Props {
  children: ReactNode;
}

export function StudentProvider({ children }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [student, setStudent] = useState<Student | null>(null);

  const getStudents = (page?: number, size?: number) => {
    getAllService(page, size)
      .then((res) => setStudents(res))
      .catch((error: Error) => setError(error.message));
  };

  const getStudent = (id: number) => {
    getByIdService(id)
      .then((res) => setStudent(res))
      .catch((error: Error) => setError(error.message));
  };

  const saveStudent = (student: NewStudent) => {
    saveService(student)
      .then(({ result: savedStudent }) => {
        setStudents((prevStudents) => [...prevStudents, savedStudent]);
      })
      .catch((error: Error) => setError(error.message));
  };

  const updateStudent = (student: Student) => {
    updateService(student)
      .then(({ result: updatedStudent }) => {
        const studentIndex = students.findIndex((s) => s.id === student.id);

        const newStudents = [
          ...students.slice(0, studentIndex),
          updatedStudent,
          ...students.slice(studentIndex + 1),
        ];

        setStudents(newStudents);
      })
      .catch((error: Error) => setError(error.message));
  };

  const removeStudent = (id: number) => {
    deleteService(id)
      .then((_res) => {
        const newStudents = students.filter((student) => student.id !== id);

        setStudents(newStudents);
      })
      .catch((error: Error) => setError(error.message));
  };

  const cleanStudent = () => {
    setStudent(null);
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <StudentContext.Provider
      value={{
        error,
        students,
        student,
        getStudents,
        getStudent,
        saveStudent,
        updateStudent,
        removeStudent,
        cleanStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
