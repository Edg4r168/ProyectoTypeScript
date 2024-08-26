import { baseUrl } from "../../const";
import { type ErrorResponse, type GetAllStudents } from "../../types/types";

export const getAllService = async (page = 0, size = 10) => {
  try {
    const response = await fetch(
      `${baseUrl}/students/getAll?page=${page}&size=${size}`
    );

    if (!response.ok) {
      const res: ErrorResponse = await response.json();
      throw new Error(res.message);
    }

    const res: GetAllStudents = await response.json();

    return res.result;
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.message ?? "Ha ocurrido un error inesperado");
  }
};
