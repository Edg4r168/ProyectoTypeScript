import { baseUrl } from "../../const";
import { type ErrorResponse, type GetStudent } from "../../types/types";

export const getByIdService = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/students/get/${id}`);

    if (!response.ok) {
      const res: ErrorResponse = await response.json();
      throw new Error(res.message);
    }

    const res: GetStudent = await response.json();

    return res.result;
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.message ?? "Ha ocurrido un error inesperado");
  }
};
