import { baseUrl } from "../../const";
import {
  type Student,
  type ErrorResponse,
  type UpdateStudent,
} from "../../types/types";

export const updateService = async (student: Student) => {
  try {
    const response = await fetch(`${baseUrl}/students/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      const res: ErrorResponse = await response.json();
      throw new Error(res.message);
    }

    const res: UpdateStudent = await response.json();

    return res;
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.message ?? "Ha ocurrido un error inesperado");
  }
};
