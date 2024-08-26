import { useState } from "react";

import { getAllService } from "../services/getAll";
import { NewStudent, Student } from "../../types/types";
import { getByIdService } from "../services/getById";
import { saveService } from "../services/save";
import { updateService } from "../services/update";
import { deleteService } from "../services/delete";

export function useStudent() {
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

  return {
    error,
    getStudents,
    students,
    getStudent,
    student,
    saveStudent,
    updateStudent,
    removeStudent,
    cleanStudent,
  };
}
