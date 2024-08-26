export enum Rol {
  Usuario = "usuario",
  Admin = "admin",
}

export interface Student {
  id: number;
  name: string;
  email: string;
  pin: string;
  rol: Rol;
}

export type NonSensitiveInfoStudent = Omit<Student, "pin">;

export type NewStudent = Omit<Student, "id">;
