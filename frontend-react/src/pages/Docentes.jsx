import { useState } from "react";
import FormD from "../components/FormD";
import ListD from "../components/ListD";

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
        onCreateD={createD}
        editD={editD}
        onCancel={() => setEditD(null)}
      />
      <ListD update={update} onCreateD={createD} onEditD={SelectD} />
    </>
  );
}
