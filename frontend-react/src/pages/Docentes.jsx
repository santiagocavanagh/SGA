import { useState } from "react";
import FormD from "../components/FormD";
import ListD from "../components/ListaDocentes";

export default function Docentes() {
  const [update, setUpdate] = useState(0);
  const [editD, setEditD] = useState(null);

  function createD() {
    setUpdate((valor) => valor + 1);
    setEditD(null);
  }

  function SelectD(docente) {
    setEditD(docente);
  }

  return (
    <>
      <FormD
        key={editD?.dni ?? "nuevo"}
        onDocenteCreado={createD}
        docenteEditar={editD}
        onCancelar={() => setEditD(null)}
      />
      <ListD actualizar={update} onCreateD={createD} onEditD={SelectD} />
    </>
  );
}
