async function cargarProducto() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;

    try {
        const response = await fetch("../data/productos.json");
        const data = await response.json();
        const producto = data.productos.find(p => p.id == id);

        if (!producto) {
            document.getElementById("productoDetalle").innerHTML = "<p>Producto no encontrado</p>";
            return;
        }

        const contenedor = document.getElementById("productoDetalle");
        contenedor.innerHTML = '';

        const div = document.createElement("div");
        div.classList.add("producto-detalle");

        div.innerHTML = `<div class="producto-imagen">
                <img src="${producto.imagen}" alt="${producto.nombre}"></div>
            <div class="producto-info">
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
                <h3>$${producto.precio}</h3>
                <label for="cantidad">Cantidad:</label>
                <input type="number" id="cantidad" value="1" min="1" max="1">
                <button id="agregarCarrito">Agregar al carrito</button>
            </div>`;
        contenedor.appendChild(div);

        document.getElementById("agregarCarrito").addEventListener("click", () => {
            const cantidad = parseInt(document.getElementById("cantidad").value);
            agregarAlCarrito({...producto, cantidad});
        });

    } catch (error) {
        document.getElementById("productoDetalle").innerHTML = "<p>Error al cargar producto</p>";}
}

document.addEventListener("DOMContentLoaded", () => {
    cargarProducto();
});