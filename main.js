const abrirLogin = document.getElementById('abrirLogin');
const modalLogin = document.getElementById('modalLogin');
const btncerrarModal = document.getElementById('cerrarModal');
const loginSeccion = document.getElementById('loginSeccion');
const registroSeccion = document.getElementById('registroSeccion');

let carrito = []
const carritoGuardado = localStorage.getItem ('carrito')
const contenedorProductos = document.getElementById("contenedorProductos");
const listaCarrito = document.getElementById ('listaCarrito');
const modalCarrito = document.getElementById ('modalCarrito');
const btnCarrito = document.getElementById ('btnCarrito');
const cerrarModalCarrito = document.getElementById ('cerrarModalCarrito');
const totalCarrito = document.getElementById("totalCarrito");
const btnVaciarCarrito = document.getElementById('vaciarCarrito');


abrirLogin.addEventListener('click', () => {
    modalLogin.style.display = 'flex';})

function cerrarModal() {
modalLogin.style.display = 'none';
}
btncerrarModal.addEventListener('click', cerrarModal);


document.getElementById ("formRegister").onsubmit = function () {
    let nombre = document.getElementById ("registroNombre").value;
    let email = document.getElementById ("registroEmail").value;
    let clave = document.getElementById ("registroClave").value;

    let usuario = {
        nombre: nombre,
        email: email,
        clave: clave,
    }

    localStorage.setItem("usuario", JSON.stringify(usuario));
    alert ("Cuenta creada con éxito.");
    cerrarModal ();
    return false;
}

document.getElementById("formLogin").onsubmit = function() {
    let usuarioGuardado = JSON.parse (localStorage.getItem("usuario"));
    let usuarioLogin = document.getElementById ("loginUsuario").value;
    let claveLogin = document.getElementById ("claveUsuario").value;

    if (usuarioGuardado && usuarioLogin === usuarioGuardado.email && claveLogin === usuarioGuardado.clave){
        alert("Bienvenido " + usuarioGuardado.nombre + "!");
    cerrarModal();
    return false;
} else {
    alert("Usuario o clave incorrectos.");
    return false;
}
};

const producto = [
{"id": 1,
"imagen": "https://res.cloudinary.com/duonotjwi/image/upload/v1754769504/eletroporador_iaxgju.jpg",
"nombre": "Electroporador Facial",
"descripcion": "Mesoterapia Fototerapia Radiofrecuencia",
"precio": 75000
},

{"id": 2,
"imagen": "https://res.cloudinary.com/duonotjwi/image/upload/v1754769505/varitaradielle_xmlvap.jpg",
"nombre": "Varita Radielle",
"descripcion": "accesorio de skincare con microcorriente ESM",
"precio": 50000
},

{"id": 3,
"imagen": "https://res.cloudinary.com/duonotjwi/image/upload/v1754769504/kitliderma_iy83vq.jpg",
"nombre": "Kit Lidherma",
"descripcion": "Crema, contorno de ojos y espuma de limpieza Hydrapore",
"precio": 45000
},
{"id": 4,
"imagen": "https://res.cloudinary.com/duonotjwi/image/upload/v1754769504/mascara_kwnjsu.jpg",
"nombre": "Marcara Led",
"descripcion": "Marcara para fototerapia led con 5 luces",
"precio": 58000},

{"id": 5,
"imagen": "https://res.cloudinary.com/duonotjwi/image/upload/v1754769505/serumliderma_cw9ot5.jpg",
"nombre": "Serum Tense Complex",
"descripcion": "Serum Lidherma antioxidante y antiage Tense Complex",
"precio":20000},

{"id": 6,
"imagen": "https://res.cloudinary.com/duonotjwi/image/upload/v1754769504/kitloreal_mkfuwj.jpg",
"nombre": "Set completo Loreal",
"descripcion": "Gel de limpieza, serum con ac.Hialuronico, serum color, máscara y óleo",
"precio":60000},

{"id": 7,
"imagen": "https://res.cloudinary.com/duonotjwi/image/upload/v1754769504/cher_gbcwny.jpg",
"nombre": "Kit Cher",
"descripcion": "Kit completo cher para skincare",
"precio": 38000},

{"id": 8,
"imagen": "https://res.cloudinary.com/duonotjwi/image/upload/v1754769504/kitdepi_g4gopl.webp",
"nombre": "Kit Depilacion",
"descripcion": "Depiladora de rostro mas depiladora de cuepo",
"precio": 27000},

{"id": 9,
"imagen": "https://res.cloudinary.com/duonotjwi/image/upload/v1754769505/protectorsolar_brn0c1.jpg",
"nombre": "Protector solar Isdin",
"descripcion": "Fotoprotector solar isdin Age Repair",
"precio": 15000},

{"id": 10,
"imagen": "https://res.cloudinary.com/duonotjwi/image/upload/v1754769504/espejomaquillaje_rrvi2f.webp",
"nombre": "Espejo Led",
"descripcion": "Espejo para escritorio con luz led",
"precio": 35000},
]

const totalcarrito = () => {
    let total = carrito.reduce ((acc, p)  =>{ 
    return acc += p.precio} ,0)
    return total
}

if (carritoGuardado) { carrito = JSON.parse (carritoGuardado);
    mostrarCarrito ()
}


const renderizadoDeProductos = () => {
    producto.forEach((producto) => {
        contenedorProductos.innerHTML += `<div class="producto" id=${producto.id}>
                <img src= "${producto.imagen}"
                alt=${producto.nombre}/>
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>$${producto.precio}</p>
                <button class='botonAgregar'>Agregar al carrito</button>
            </div>`
    });
} 
renderizadoDeProductos ()


btnCarrito.addEventListener('click', () => {
    modalCarrito.classList.add('active');})
    mostrarCarrito()

cerrarModalCarrito.addEventListener('click', () => {
    modalCarrito.classList.remove('active'); 
});

document.querySelectorAll('.botonAgregar').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        carrito.push(producto[index]);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
        modalCarrito.style.display = 'flex';
    });
});

function mostrarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        listaCarrito.appendChild(li);
        total += producto.precio;
    });
    totalCarrito.textContent = `Total: $${total}`;
}

btnVaciarCarrito.addEventListener ('click', () => {
    vaciarCarrito ();
})

function vaciarCarrito (){
    carrito = [];
    localStorage.removeItem('carrito');
    mostrarCarrito();
}

document.getElementById('formContacto').addEventListener('submit', function(e) {
    e.preventDefault();

document.getElementById('mensajeEnvio').style.display = 'block';
    this.reset();
});