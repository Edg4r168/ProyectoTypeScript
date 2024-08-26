import "./App.css";
import { useStudent } from "./students/hooks/useStudent";
import { FormEdit } from "./students/components/FormEdit";
import { FormSave } from "./students/components/FormSave";
import React, { useEffect, useState } from "react";
import { EditIcon, TrashIcon } from "./students/components/Icons";

function App() {
  const {
    students,
    student,
    getStudent,
    cleanStudent,
    removeStudent,
    getStudents,
  } = useStudent();
  const [showFormSave, setShowFormSave] = useState(false);
  const [pageState, setPage] = useState(0);
  const [sizeState, setSize] = useState(1);

  const handleEdit = (id: number) => {
    getStudent(id);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    setSize(newSize);
  };

  useEffect(() => {
    getStudents(pageState, sizeState);
  }, [pageState, sizeState]);

  return (
    <>
      <FormEdit student={student} onClose={cleanStudent} />
      <FormSave show={showFormSave} onClose={() => setShowFormSave(false)} />

      <section className="table-section">
        <button className="btn-create" onClick={() => setShowFormSave(true)}>
          Agregar
        </button>

        <select id="size-select" value={sizeState} onChange={handleSizeChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.rol}</td>
                  <td>
                    <button onClick={() => handleEdit(student.id)}>
                      <EditIcon />
                    </button>
                    <button onClick={() => removeStudent(student.id)}>
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <footer className="pagination">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={pageState === 0}
          >
            Anterior
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={pageState === 5}
          >
            Siguiente
          </button>
        </footer>
      </section>
    </>
  );
}

export default App;
