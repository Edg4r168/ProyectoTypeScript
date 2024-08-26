import { useContext } from "react";
import { StudentContext } from "../contex/StudentContex";

export function useStudent() {
  const contex = useContext(StudentContext);

  if (contex === undefined) {
    throw new Error("useStudent must bi used whithin a StudentProvider");
  }

  return contex;
}
