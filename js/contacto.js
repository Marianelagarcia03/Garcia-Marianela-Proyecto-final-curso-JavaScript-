document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formContacto");
    const inputNombre = document.getElementById("nombre");
    const inputEmail = document.getElementById("correo");
    const inputMensaje = document.getElementById("mensaje");

    if (inputNombre) inputNombre.value = "Marianela";
    if (inputEmail) inputEmail.value = "marianela@ejemplo.com";
    if (inputMensaje) inputMensaje.value = "Hola, quería consultar sobre un producto";

    if (form && inputNombre && inputEmail && inputMensaje) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            const nombre = inputNombre.value
            const email = inputEmail.value;
            const mensaje = inputMensaje.value;

            enviarConsulta(nombre, email, mensaje)
            .then(respuesta => {
                Swal.fire({
                    icon: "success",
                    title: "Consulta enviada",
                    html: `Gracias <b>${nombre}</b>, recibimos tu consulta.<br> Te responderemos a <b>${email}</b> a la brevedad.`,
                    timer: 4000,
                    showConfirmButton: false
                });
                form.reset();
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Error al enviar consulta",
                    timer: 3000,
                    showConfirmButton: false
                });
            });
        });
    }
});

function enviarConsulta(nombre, email, mensaje){ 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(nombre && email && mensaje){
                resolve(`Consulta de ${nombre} enviada correctamente.`);
            } else {
                reject(`Faltan datos en la consulta`);
            }
        }, 2000);
    });
}