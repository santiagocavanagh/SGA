import { useState } from 'react';

function Mensaje() {
    const [msj, setMsj] = useState("Hola, alumno");

    return (
        <>
        <button onClick={() => setMsj("¡Bienvenido a Programación IV!")}>
            <h2>{msj}</h2>
        </button>
        </>
    );
}

export default Mensaje