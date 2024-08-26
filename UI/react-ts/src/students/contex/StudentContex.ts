import { createContext } from "react";
import { NewStudent, Student } from "../../types/types";

interface StudentContextType {
  error: string | null;
  students: Student[];
  student: Student | null;
  getStudents: (page?: number, size?: number) => void;
  getStudent: (id: number) => void;
  saveStudent: (student: NewStudent) => void;
  updateStudent: (student: Student) => void;
  removeStudent: (id: number) => void;
  cleanStudent: () => void;
}

export const StudentContext = createContext<StudentContextType>(
  {} as StudentContextType
);
