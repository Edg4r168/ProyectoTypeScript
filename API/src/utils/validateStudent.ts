import {
  NewStudent,
  NonSensitiveInfoStudent,
  Rol,
} from "../interfaces/student.interface";

const isString = (string: any): boolean => {
  return typeof string === "string";
};

const isNumber = (number: any): boolean => {
  return typeof number === "number";
};

const parseName = (name: any): string => {
  if (!isString(name)) {
    throw new Error("Falta el campo name o el formato no es valido");
  }

  return name;
};

const parseEamil = (email: any): string => {
  if (!isString(email)) {
    throw new Error("Falta el campo eamil o el formato no es valido");
  }

  return email;
};

const parsePin = (pin: any): string => {
  if (!isString(pin)) {
    throw new Error("Falta el campo pin o el formato no es valido");
  }

  return pin;
};

const isRol = (rol: any): boolean => {
  return Object.values(Rol).includes(rol);
};

const parseRol = (rol: any): Rol => {
  if (!isString(rol) || !isRol(rol)) {
    throw new Error("Falta el campo rol o el formato no es valido");
  }

  return rol;
};

const parseId = (id: any): number => {
  if (!isNumber(id)) {
    throw new Error("Falta el campo id o el formato no es valido");
  }

  return id;
};

export const toNewStudent = (student: any): NewStudent => {
  const newStudent = {
    name: parseName(student.name),
    email: parseEamil(student.email),
    pin: parsePin(student.pin),
    rol: parseRol(student.rol),
  };

  return newStudent;
};

export const toUpdateStudent = (student: any): NonSensitiveInfoStudent => {
  const updateStudent = {
    id: parseId(student.id),
    name: parseName(student.name),
    email: parseEamil(student.email),
    rol: parseRol(student.rol),
  };

  return updateStudent;
};
