import { baseUrl } from "../../const";
import { type ErrorResponse, type DeleteStudent } from "../../types/types";

export const deleteService = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/students/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const res: ErrorResponse = await response.json();
      throw new Error(res.message);
    }

    const res: DeleteStudent = await response.json();

    return res;
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.message ?? "Ha ocurrido un error inesperado");
  }
};
