import { Roles } from "../const";

export type Rol = keyof typeof Roles;

export interface NewStudent {
  name: string;
  email: string;
  pin: string;
  rol: Rol;
}

export interface Student extends Omit<NewStudent, "pin"> {
  id: number;
}

export interface ApiResponse<T> {
  message: string;
  result: T;
}

export interface ErrorResponse {
  message: string;
}

export type GetAllStudents = Omit<ApiResponse<Student[]>, "message">;
export type GetStudent = Omit<ApiResponse<Student>, "message">;
export type SaveStudent = ApiResponse<Student>;
export type UpdateStudent = ApiResponse<Student>;
export type UpdateStudent = ApiResponse<Student>;
export type DeleteStudent = Omit<ApiResponse<Student>, "result">;
