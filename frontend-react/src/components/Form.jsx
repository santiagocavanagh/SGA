import { useState } from "react"

function Form() {
    const [legajo, setLegajo] = useState("")
    const [nombre, setNombre] = useState("")
    const [carrera, setCarrera] = useState("")
    const [email, setEmail] = useState("")

    function Guardar(e){
        e.preventDefault()
        alert("Bienvenido")
    }

    return(
        <form onSubmit={Guardar}>
            <input value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text" />
            <input value={carrera}
            onChange={(e) => setCarrera(e.target.value)}
            type="text" />
            <input value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text" />
            <button type="submit">Guardar</button>
        </form>
    )
}

export default Form