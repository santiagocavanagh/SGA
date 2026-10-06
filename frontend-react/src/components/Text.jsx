import { useState } from "react";

function Text() {
  const [txt, setTxt] = useState("14px");
  const [msj, setMsj] = useState("Bienvenido!");

  return (
    <>
      <h2
        style={{ fontSize: txt, cursor: "pointer" }}
        onClick={() => setMsj("¡Bienvenido a Programación IV!")}
      >
        {msj}
      </h2>
      <div>
        <button style={{ fontSize: "16px" }} onClick={() => setTxt("10px")}>
          Pequeño
        </button>
        <button style={{ fontSize: "16px" }} onClick={() => setTxt("16px")}>
          Mediano
        </button>
        <button style={{ fontSize: "16px" }} onClick={() => setTxt("24px")}>
          Grande
        </button>
      </div>
    </>
  );
}

export default Text;
