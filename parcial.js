'use strict';

const productos = [
    {
        id: 1,
        nombre: "Zalo Mcqueen",
        descripcion: "Rojo furioso de cuero 1000% vacuno, con unos detalles que traspasan los años.",
        precio: 150000,
        imagen: "img/autos-rojo.webp",
        categoria: "como nuevo"
    },
    {
        id: 2,
        nombre: "miumiu Dots",
        descripcion: "Botas de lluvia con toda la personalidad de la marca, con un diseño que te hará destacar.",
        precio: 120000,
        imagen: "img/botas-daphne.webp",
        categoria: "usado"
    },
    {
        id: 3,
        nombre: "Zuequitos Pepas",
        descripcion: "Zuequitos con un diseño moderno y elegante, ideales para cualquier ocasión.",
        precio: 130000,
        imagen: "img/zuecos-celeste.webp",
        categoria: "vegano"
    },
    {
        id: 4,
        nombre: "Gatitos Negros",
        descripcion: "Zapatos negros con un diseño clásico y elegante, ideales para ocasiones formales.",
        precio: 110000,
        imagen: "img/gatitos-negro.webp",
        categoria: "como nuevo"
    },
    {
        id: 5,
        nombre: "Funky Caritas",
        descripcion: "Zapatos con un diseño único y creativo, de la colección más innovadora.",
        precio: 140000,
        imagen: "img/caras-rosa.webp",
        categoria: "usado"
    },
    {
        id: 6,
        nombre: "Vaquitas Heels",
        descripcion: "Zapatos con una silueta muy 90s y un diseño que remonta a una abducción alienígena.",
        precio: 125000,
        imagen: "img/vaquitas.webp",
        categoria: "vegano"
    }
];

const d = document;

const divProductos = d.querySelector('#productos');
const contadorHTML = d.querySelector('#contador-unidades');
const acumuladorHTML = d.querySelector('#acumulador-monto');
const botonVerCarrito = d.querySelector('#boton-carrito');

let carrito = [];

const actualizarIndicadores = () => {
    let precioTotal = 0;
    let cantidadTotal = 0;

    carrito.forEach(item => {
        cantidadTotal += item.cantidad;
        precioTotal += item.producto.precio * item.cantidad;
    });

    if (contadorHTML) contadorHTML.textContent = cantidadTotal;

    if (acumuladorHTML) acumuladorHTML.textContent = precioTotal;
};

const agregarAlCarrito = (producto) => {

    let index = carrito.findIndex(item => item.producto.id === producto.id);

    if (index !== -1) {
        carrito[index].cantidad++;
    } else {
        carrito.push({
            producto: producto,
            cantidad: 1
        });
    }

    actualizarIndicadores();
};

const renderizarCatalogo = (listaProductos) => {
    if (!divProductos) return;

    divProductos.replaceChildren();

    listaProductos.forEach(prod => {

        const card = d.createElement("div");
        card.setAttribute("class", "card-producto");

        const imagen = d.createElement("img");
        imagen.src = prod.imagen;
        imagen.alt = prod.nombre;

        const titulo = d.createElement("h3");
        titulo.textContent = prod.nombre;
        titulo.style.color = "#12005e";

        const linkDetalle = d.createElement("a");
        linkDetalle.textContent = "Detalle del producto";
        linkDetalle.href = "#";
        linkDetalle.addEventListener("click", (e) => {
            e.preventDefault();
            abrirModalDetalle(prod);
        });

        const precio = d.createElement("p");
        precio.textContent = `$${prod.precio.toLocaleString('es-AR')}`;

        const botonAgregar = d.createElement("button");
        botonAgregar.textContent = "Agregar al carrito";
        botonAgregar.setAttribute("class", "añadir");
        botonAgregar.addEventListener("click", () => {
            agregarAlCarrito(prod);
        });

        card.appendChild(imagen);
        card.appendChild(titulo);
        card.appendChild(linkDetalle);
        card.appendChild(precio);
        card.appendChild(botonAgregar);

        divProductos.appendChild(card);
    });
};

const abrirModalDetalle = (producto) => {

    const modalOverlay = d.createElement("div");
    modalOverlay.setAttribute("class", "modal-container");

    const modalBox = d.createElement("div");
    modalBox.setAttribute("class", "modal-box");
    modalBox.id = "modalProducto";

    const botonCerrar = d.createElement("a");
    botonCerrar.textContent = "X";
    botonCerrar.setAttribute("class", "cerrar");
    botonCerrar.addEventListener("click", () => {
        modalOverlay.remove();
    });

    const imagen = d.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;

    const titulo = d.createElement("h3");
    titulo.textContent = producto.nombre;

    const divContent = d.createElement("div");
    divContent.setAttribute("class", "divContent");

    const descripcion = d.createElement("p");
    descripcion.textContent = producto.descripcion;
    descripcion.style.color = "#12005e";

    const precio = d.createElement("p");
    precio.textContent = "Precio: ";
    const spanPrecio = d.createElement("span");
    spanPrecio.textContent = `$${producto.precio.toLocaleString('es-AR')}`;
    precio.appendChild(spanPrecio);

    const categoria = d.createElement("p");
    categoria.setAttribute("class", "categoria");
    categoria.textContent = `Categoría: ${producto.categoria}`;

    const botonAgregar = d.createElement("button");
    botonAgregar.textContent = "Agregar";
    botonAgregar.setAttribute("class", "agregar-boton")
    botonAgregar.addEventListener("click", () => {
        agregarAlCarrito(producto);
    });

    divContent.appendChild(descripcion);
    divContent.appendChild(precio);

    modalBox.appendChild(botonCerrar);
    modalBox.appendChild(imagen);
    modalBox.appendChild(titulo);
    modalBox.appendChild(categoria);
    modalBox.appendChild(divContent);
    modalBox.appendChild(botonAgregar);

    modalOverlay.appendChild(modalBox);

    d.body.appendChild(modalOverlay);
};

const abrirModalCarrito = () => {
    const modalOverlay = d.createElement("div");
    modalOverlay.setAttribute("class", "modal-container");

    const modalBox = d.createElement("div");
    modalBox.setAttribute("class", "modal-box");
    modalBox.id = "modalCarrito";

    const botonCerrar = d.createElement("a");
    botonCerrar.textContent = "X";
    botonCerrar.setAttribute("class", "cerrar");
    botonCerrar.addEventListener("click", () => {
        modalOverlay.remove();
    });

    let totalItems = 0;
    let montoTotal = 0;
    carrito.forEach(item => {
        totalItems += item.cantidad;
        montoTotal += item.producto.precio * item.cantidad;
    });

    const parrafoInfo = d.createElement("p");
    parrafoInfo.textContent = "Items: ";
    const spanItems = d.createElement("span");
    spanItems.textContent = totalItems;
    parrafoInfo.appendChild(spanItems);

    parrafoInfo.append(" - Total: ");
    const spanTotal = d.createElement("span");
    spanTotal.textContent = `$${montoTotal}`;
    parrafoInfo.appendChild(spanTotal);

    const hr = d.createElement("hr");
    const listaUl = d.createElement("ul");

    if (carrito.length === 0) {
        const itemLi = d.createElement("li");
        itemLi.textContent = "No hay productos en el carrito.";
        listaUl.appendChild(itemLi);
    } else {
        carrito.forEach((item, index) => {
            const subtotal = item.producto.precio * item.cantidad;

            const itemLi = d.createElement("li");
            itemLi.textContent = `${item.producto.nombre} `;

            const PrecioLi = d.createElement("span");
            PrecioLi.textContent = `$${subtotal} `;
            itemLi.appendChild(PrecioLi);

            const CantLi = d.createElement("span");
            CantLi.textContent = `(${item.cantidad} items) `;
            itemLi.appendChild(CantLi);

            const linkEliminar = d.createElement("a");
            linkEliminar.textContent = "Eliminar";
            linkEliminar.href = "#";
            linkEliminar.addEventListener("click", (e) => {
                e.preventDefault();
                item.cantidad--;

                if (item.cantidad === 0) {
                    carrito.splice(index, 1);
                }

                actualizarIndicadores();
                modalOverlay.remove();
                abrirModalCarrito();
            });

            itemLi.appendChild(linkEliminar);
            listaUl.appendChild(itemLi);
        });
    }

    const botonVaciar = d.createElement("button");
    botonVaciar.textContent = "Vaciar";
    botonVaciar.style.color = "#12005e";
    botonVaciar.setAttribute("class", "vaciar-boton")
    botonVaciar.addEventListener("click", () => {
        carrito = [];
        actualizarIndicadores();
        modalOverlay.remove();
        abrirModalCarrito();
    });


    modalBox.appendChild(botonCerrar);
    modalBox.appendChild(parrafoInfo);
    modalBox.appendChild(hr);
    modalBox.appendChild(listaUl);
    modalBox.appendChild(botonVaciar);

    modalOverlay.appendChild(modalBox);
    d.body.appendChild(modalOverlay);
};

if (botonVerCarrito) {
    botonVerCarrito.addEventListener("click", abrirModalCarrito);
}

const filtrosEnlaces = d.querySelectorAll('#filtros a');

filtrosEnlaces.forEach(enlace => {
    enlace.addEventListener("click", (e) => {
        e.preventDefault();

        const categoriaSeleccionada = e.currentTarget.getAttribute("data-categoria");

        if (categoriaSeleccionada === "todos") {
            renderizarCatalogo(productos);
        } else {
            const productosFiltrados = productos.filter(prod => prod.categoria === categoriaSeleccionada);
            renderizarCatalogo(productosFiltrados);
        }
    });
});

renderizarCatalogo(productos);