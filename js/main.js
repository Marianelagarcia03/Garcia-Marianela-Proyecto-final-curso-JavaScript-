// Variables para login 
const abrirLogin = document.getElementById("abrirLogin");
const modalLogin = document.getElementById("modalLogin");
const btncerrarModal = document.getElementById("cerrarModal");

//Variables Carrito 
let carrito = JSON.parse (localStorage.getItem ("carrito")) || [];
const contenedorProductos = document.getElementById("contenedorProductos");
const listaCarrito = document.getElementById ("listaCarrito");
const modalCarrito = document.getElementById ("modalCarrito");
const btnCarrito = document.getElementById ("btnCarrito");
const cerrarModalCarrito = document.getElementById ("cerrarModalCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const btnVaciarCarrito = document.getElementById("vaciarCarrito");
const btnRealizarCompra = document.getElementById("realizarCompra");

// Funciones del Login y registro

// modal
abrirLogin.addEventListener("click", () => {
    modalLogin.classList.add ("active");})

function cerrarModal() {
    modalLogin.classList.remove("active");}

btncerrarModal.addEventListener("click", cerrarModal);

// Registo
document.addEventListener("DOMContentLoaded", () => {
    const nombreInput = document.getElementById  ("registroNombre")
    const emailInput = document.getElementById ("registroEmail")
    const claveInput = document.getElementById ("resgistroClave")

    if (nombreInput) nombreInput.value = "Marianela"
    if (emailInput) emailInput.value = "marianela@ejemlo.com"
    if (claveInput) claveInput.value = "123456"})

document.getElementById("formRegister").addEventListener("submit", function(e) {
    e.preventDefault();
    let nombre = document.getElementById("registroNombre").value;
    let email = document.getElementById("registroEmail").value;
    let clave = document.getElementById("registroClave").value;

    if (!isNaN(nombre)) {
        Swal.fire({
            icon: "error",
            title: "Nombre inválido",
            text: "El nombre no puede ser solo números."
        });
        return;}

    if (!email.includes("@")) {
        Swal.fire({
            icon: "error",
            title: "Email inválido",
            text: "El email debe contener @."
        });
        return;
    }

    if (isNaN(clave) || clave.length < 6) {
        Swal.fire({
            icon: "error",
            title: "Clave inválida",
            text: "La clave debe ser numérica y tener al menos 6 dígitos."
        });
        return;
    }

    let usuario = { nombre, email, clave };
    localStorage.setItem("usuario", JSON.stringify(usuario));

    Swal.fire({
        icon: "success",
        title: "¡Usuario creado!",
        text: "Su cuenta fue registrada con éxito"
    });

    cerrarModal();
});

// Login
document.addEventListener("DOMContentLoaded", () => {
    const usuarioInput = document.getElementById("loginUsuario");
    const claveInput = document.getElementById("claveUsuario");

    if (usuarioInput) usuarioInput.value = "Marianela"
    if (claveInput) claveInput.value = "123456"})


document.getElementById("formLogin").addEventListener("submit", function(e) {
    e.preventDefault();
    let usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    let usuarioLogin = document.getElementById("loginUsuario").value;
    let claveLogin = document.getElementById("claveUsuario").value;

    if (usuarioGuardado && usuarioLogin === usuarioGuardado.nombre && claveLogin === usuarioGuardado.clave){
        Swal.fire({
            icon: "success",
            title: `Bienvenido/a ${usuarioGuardado.nombre}`
        })
        cerrarModal();
    } else {
        Swal.fire({
            icon: "error",
            title: "Usuario o clave incorrectos",
        })
    }
});

// Funciones del Carrito de compras

function guardarCarrito() {
localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito (producto) {
    const existe = carrito.find (p => p.id === producto.id);
    if (existe) {
        existe.cantidad ++;
    }
    else {
        carrito.push ({...producto, cantidad: 1});
    }
    guardarCarrito();
    actualizarCarrito();

    Swal.fire({
        icon: "success",
        title: "Agregado",
        text: `${producto.nombre} se agregó al carrito`,
        timer: 1500,
        showConfirmButton: false
    });

    modalCarrito.classList.add("active")
    actualizarCarrito()
}

function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(producto => {
        const li = document.createElement("li");
        li.classList.add("carrito-item");

        const info = document.createElement("span");
        info.textContent = `${producto.nombre} x ${producto.cantidad} - $${Number(producto.precio) * Number(producto.cantidad)}`;

        const botonEliminar = document.createElement("button");
        botonEliminar.classList.add("btn-eliminar");
        botonEliminar.innerHTML = "🗑";
        botonEliminar.addEventListener("click", () => eliminarDelCarrito(producto.id));

        li.appendChild(info);
        li.appendChild(botonEliminar);
        listaCarrito.appendChild(li);

        total += Number(producto.precio) * Number(producto.cantidad);
    });

    totalCarrito.textContent = `Total: $${total}`;
}

function eliminarDelCarrito (id){
    const existe = carrito.find (p=> p.id === id );
    let mensaje = ''
    if (existe){if (existe.cantidad > 1){
        existe.cantidad --;
        mensaje = `se eliminó una unidad de ${existe.nombre}`
    }
    else {
        carrito = carrito.filter (p => p.id !== id);
        mensaje = `${existe.nombre} eliminado del carrito`;}
    }
    guardarCarrito();
    actualizarCarrito();

    Swal.fire ({
        icon: "info",
        title: "Eliminado",
        text: mensaje,
        timer: 1500,
        showConfirmButton: false
    });
}

btnVaciarCarrito.addEventListener ("click", vaciarCarrito);

function vaciarCarrito (){
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
    Swal.fire({
        icon: "success",
        title: "Carrito Vaciado",
    });
}

btnCarrito.addEventListener("click", () => {
    modalCarrito.classList.add("active");
actualizarCarrito()
})

cerrarModalCarrito.addEventListener("click", () => {
    modalCarrito.classList.remove("active"); 
});

// Funcion para mostrar los productos
async function cargarProductos () {
    try {
        const response = await fetch (`../data/productos.json`)
        const data = await response.json()
        mostrarProductos (data.productos);
    }
    catch (error) {console.error ("error al cargar los productos", error)}
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById("contenedorProductos");
    
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <a href="pages/producto.html?id=${producto.id}" class="producto-link">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
            </a>
            <h3 class="producto-nombre">
                <a href="pages/producto.html?id=${producto.id}" class="producto-link">
                    ${producto.nombre}
                </a>
            </h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="btn-agregar">Agregar al carrito</button>`;

        const botonAgregar = div.querySelector(".btn-agregar");
        botonAgregar.addEventListener("click", () => agregarAlCarrito(producto));

        contenedor.appendChild(div);
    });
}

// Funcion de Compra 
document.getElementById("realizarCompra").addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire({
        icon:"error",
        title:"Tu carrito está vacío"});
    return;
}
const total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
    Swal.fire({
        title: "Datos de envío",
        html: `<input id="swal-nombre" class="swal2-input" placeholder="Nombre completo" value= "Marianela Garcia">
    <input id="swal-email" type="email" class="swal2-input" placeholder="Email" value= "Marianela@ejemplo.com">
    <input id="swal-telefono" type="tel" class="swal2-input" placeholder="Teléfono" value= "351 3456789">
    <input id="swal-direccion" class="swal2-input" placeholder="Dirección de envío" value= "Sol de mayo 1100">`,
        showCancelButton: true,
        confirmButtonText: "Confirmar compra",
})
    .then((result) => {
    if (result.isConfirmed) {
    const nombre = document.getElementById("swal-nombre").value;
    const email = document.getElementById("swal-email").value;
    const telefono = document.getElementById("swal-telefono").value;
    const direccion = document.getElementById("swal-direccion").value;

    if (!nombre || !email || !telefono || !direccion) {
        Swal.fire({
            icon: "error",
            title: "Por favor completa todos los campos"});
        return;
    }

    Swal.fire({
        icon: "success",
        title: "¡Compra realizada!",
        html: `Gracias <b>${nombre}</b>.<br>
        Te enviaremos un correo a: <b>${email}</b><br>
        Tu pedido será enviado a: <b>${direccion}</b><br>
        <hr>
        <b>Total: $${total}</b>`,
    });

    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
    modalCarrito.classList.remove("active");
    }
});
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById ("contenedorProductos")
cargarProductos()
})


