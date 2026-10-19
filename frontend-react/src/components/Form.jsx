import { useState } from "react"

function Form() {
    const [formulario, setFormulario] = useState({
        legajo: "",
        nombre: "",
        carrera: "",
        email: ""
    })

    const [guardar, setGuardar] = useState(false)
    const [error, setError] = useState("")

    function change(e) {
        const { name, value } = e.target

        setFormulario({
            ...formulario,
            [name]: value
        })
    }

   
    async function save(e) {
        e.preventDefault()
        setError("")
        setGuardar(true)
        
        try {
            const alumno = {
                ...formulario,
                legajo: Number(formulario.legajo)
            }
            
        const response = await fetch("https://localhost:3000/alumnos",
            {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(alumno)
            }
        )
        if (!response.ok) {
            throw new Error(`No se puede guardar datos! HTTPS ERRPR: ${response.status}`)
        }
        setFormulario({
            legajo: "",
            nombre: "",
            carrera: "",
            email: "",
        })
    
    } catch (error) {
        console.error("Error al guardar:", error)
        setError(error.message || "No se puede conectar ocn el servidor")
    } finally {
        setGuardar(false)
    }
}

    return(
        <>
        <form onSubmit={save}>
            <label htmlFor="legajo">Legajo</label>
            <input value={formulario.legajo}
            onChange={change}
            type="text" />
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre"
            name="nombre"
            value={formulario.nombre}
            onChange={change}
            type="text" />
            <label htmlFor="carrera">Carrera</label>
            <input value={formulario.carrera}
            onChange={change}
            type="text" />
            <label htmlFor="email">e-mail</label>
            <input value={formulario.email}
            onChange={change}
            type="text" />
            <button type="submit" disabled={guardar}>
                {guardar ? "Guardando..." : "Guardar"}
            </button>
            <br />
            {error && <p role="alert">{error}</p>}
        </form>
        </>
    )
}

export default Form