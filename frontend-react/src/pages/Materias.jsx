import { useState } from "react";
import FormM from "../components/FormM";
import ListM from "../components/ListM";

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
      <FormM
        key={editM?.codigo ?? "nuevo"}
        onCreateM={createM}
        editM={editM}
        onCancel={() => setEditM(null)}
      />
      <ListM update={update} onCreateM={createM} onEditM={SelectM} />
    </>
  );
}
