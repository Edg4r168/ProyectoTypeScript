import { baseUrl } from "../../const";
import {
  type NewStudent,
  type ErrorResponse,
  type SaveStudent,
} from "../../types/types";

export const saveService = async (student: NewStudent) => {
  try {
    const response = await fetch(`${baseUrl}/students/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      const res: ErrorResponse = await response.json();
      throw new Error(res.message);
    }

    const res: SaveStudent = await response.json();

    return res;
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.message ?? "Ha ocurrido un error inesperado");
  }
};
