import { useState } from "react";
import List from "../components/List";
import Form from "../components/Form";

export default function Alumnos() {
  const [update, setUpdate] = useState(0);
  const [edit, setEdit] = useState(null);

  function create() {
    setUpdate((valor) => valor + 1);
    setEdit(null);
  }

  function select(alumno) {
    setEdit(alumno);
  }

  return (
    <>
      <Form
        key={edit?.legajo ?? "nuevo"}
        onCreate={create}
        Edit={edit}
        onCancel={() => setEdit(null)}
      />
      <List update={update} onCreate={create} onEdit={select} />
    </>
  );
}
