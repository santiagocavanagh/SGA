import { useState } from "react";
import FormD from "../components/FormD";
import ListD from "../components/ListaDocentes";

export default function Materias() {
  const [update, setUpdate] = useState(0);
  const [editM, setEditM] = useState(null);

  function createM() {
    setUpdate((valor) => valor + 1);
    setEditM(null);
  }

  function SelectM(materia) {
    setEditM(materia);
  }

  return (
    <>
      <FormD
        key={editM?.codigo ?? "nuevo"}
        onCreateM={createM}
        editM={editM}
        onCancel={() => setEditM(null)}
      />
      <ListD actualizar={update} onCreateM={createM} onEditD={SelectM} />
    </>
  );
}
