function abrirModal(modalId, closeClass) {
    var modal = document.getElementById(modalId);
    modal.style.display = 'flex';

    // Cerrar el modal cuando se hace clic en el botón de cerrar
    modal.querySelector(closeClass).addEventListener('click', function () {
        modal.style.display = 'none';
    });
}

// Mostrar el modal de crear producto
document.querySelector('#btnCrearPedido').addEventListener('click', function () {
    abrirModal('modalNuevoPedido', '.close');
    /*cargarSubCategorias($('#ddlProductoSubCategoria'));*/
});

$("#inputBuscarProducto").on("input", function () {
    const query = $(this).val().trim();
    const $resultadoBusqueda = $("#resultadoBusqueda");

    if (query === "") {
        // Oculta el contenedor si no hay texto en el campo de búsqueda
        $resultadoBusqueda.hide().empty();
        return;
    }

    // Definir el filtro a enviar a la API
    const filtroNombre = query === "*" ? "" : query;

    // Llamada a la API para obtener los productos filtrados
    $.ajax({
        url: `/api/productos`,
        method: "GET",
        data: { nombre: filtroNombre },
        contentType: "application/json",
        success: function (data) {
            // Actualiza el contenido del contenedor de resultados
            if (data.length > 0) {
                // Crear cada <li> con imagen y nombre, y agregar el evento de clic
                const items = data.map(producto =>
                    `<p class="producto-item" data-id="${producto.productoID}">
                        <img src="${producto.productoImg}" alt="${producto.productoNombre}" class="producto-imagen" width="50" height="50">
                        <span>${producto.productoID} ${producto.productoNombre}</span>
                    </p>`
                ).join("");

                // Mostrar los resultados y agregar los elementos
                $resultadoBusqueda.show().html(`<p>${items}</p>`);

                // Añadir el evento de clic a cada <li> recién creado
                $(".producto-item").on("click", function () {
                    const productoID = $(this).data("id");
                    mostrarModalProducto(productoID);
                });
            } else {
                // Muestra el mensaje de "No se encontraron resultados" si no hay coincidencias
                $resultadoBusqueda.show().html("<p>No se encontraron resultados</p>");
            }
        },
        error: function (error) {
            console.error("Error al obtener productos:", error);
            $resultadoBusqueda.show().html("<p>Error al cargar resultados</p>");
        }
    });
});

function mostrarModalProducto(productoID) {
    // Aquí puedes hacer una llamada adicional para obtener los detalles del producto si es necesario.
    alert(productoID);
    abrirModal('modalCantidadPorProductoDetallePedido', '.close');


    /*$("#modalProducto").modal("show"); */// Asegúrate de que el modal tenga este id en tu HTML
}

// Función para mostrar el modal con los detalles del producto
//function mostrarModalProducto(productoID) {
//    // Aquí puedes hacer una llamada adicional para obtener los detalles del producto si es necesario.
//    $("#modalProducto").modal("show"); // Asegúrate de que el modal tenga este id en tu HTML
//}


//$("#inputBuscarProducto").on("input", function () {
//    const query = $(this).val().trim();
//    const $resultadoBusqueda = $("#resultadoBusqueda");

//    if (query === "") {
//        // Oculta el contenedor si no hay texto en el campo de búsqueda
//        $resultadoBusqueda.hide().empty();
//        return;
//    }

//    // Definir el filtro a enviar a la API
//    const filtroNombre = query === "*" ? "" : query;

//    // Llamada a la API para obtener los productos filtrados
//    $.ajax({
//        url: `/api/productos`,
//        method: "GET",
//        data: { nombre: filtroNombre },
//        contentType: "application/json",
//        success: function (data) {
//            // Actualiza el contenido del contenedor de resultados
//            if (data.length > 0) {
//                // Crear cada <li> y agregar el evento de clic
//                const items = data.map(producto =>
//                    `<p class="producto-item" data-id="${producto.productoID}">
//                        ${producto.productoID} ${producto.productoNombre}
//                    </p>`
//                ).join("");

//                // Mostrar los resultados y agregar los elementos
//                $resultadoBusqueda.show().html(`<ul>${items}</ul>`);

//                // Añadir el evento de clic a cada <li> recién creado
//                $(".producto-item").on("click", function () {
//                    const productoID = $(this).data("id");
//                    mostrarModalProducto(productoID);
//                });
//            } else {
//                // Muestra el mensaje de "No se encontraron resultados" si no hay coincidencias
//                $resultadoBusqueda.show().html("<p>No se encontraron resultados</p>");
//            }
//        },
//        error: function (error) {
//            console.error("Error al obtener productos:", error);
//            $resultadoBusqueda.show().html("<p>Error al cargar resultados</p>");
//        }
//    });
//});

// Función para mostrar el modal con los detalles del producto



//$("#inputBuscarProducto").on("input", function () {
//    const query = $(this).val().trim();
//    const $resultadoBusqueda = $("#resultadoBusqueda");

//    if (query === "") {
//        // Oculta el contenedor si no hay texto en el campo de búsqueda
//        $resultadoBusqueda.hide().empty();
//        return;
//    }

//    // Definir el filtro a enviar a la API
//    const filtroNombre = query === "*" ? "" : query;

//    // Llamada a la API para obtener los productos filtrados
//    $.ajax({
//        url: `/api/productos`,
//        method: "GET",
//        data: { nombre: filtroNombre },
//        contentType: "application/json",
//        success: function (data) {
//            // Actualiza el contenido del contenedor de resultados
//            if (data.length > 0) {
//                const items = data.map(producto =>
//                    `<li onclick="mostrarModalProducto(${producto.productoID})">
//                        ${producto.productoID} ${producto.productoNombre}
//                    </li>`
//                ).join("");
//                $resultadoBusqueda.show().html(`<ul>${items}</ul>`);
//            } else {
//                // Muestra el mensaje de "No se encontraron resultados" si no hay coincidencias
//                $resultadoBusqueda.show().html("<p>No se encontraron resultados</p>");
//            }
//        },
//        error: function (error) {
//            console.error("Error al obtener productos:", error);
//            $resultadoBusqueda.show().html("<p>Error al cargar resultados</p>");
//        }
//    });
//});

//// Función para mostrar el modal con los detalles del producto
//function mostrarModalProducto(productoID) {
//    alert(productoID);
//    // Aquí puedes hacer una llamada adicional para obtener los detalles del producto si es necesario.
//    // Por ejemplo:
//    // $.ajax({
//    //     url: `/api/productos/${productoID}`,
//    //     method: "GET",
//    //     success: function (data) {
//    //         // Actualiza el contenido del modal con la información del producto
//    //         $("#modalProducto .modal-body").html(`<p>Nombre: ${data.productoNombre}</p>`);
//    //         // Muestra el modal
//    //         $("#modalProducto").modal("show");
//    //     },
//    //     error: function (error) {
//    //         console.error("Error al obtener detalles del producto:", error);
//    //     }
//    // });

//    // Alternativamente, puedes solo abrir el modal sin cargar detalles extra
//    $("#modalProducto").modal("show"); // Asegúrate de que el modal tenga este id en tu HTML
//}


//$("#inputBuscarProducto").on("input", function () {
//    const query = $(this).val().trim();
//    const $resultadoBusqueda = $("#resultadoBusqueda");

//    if (query === "") {
//        // Oculta el contenedor si no hay texto en el campo de búsqueda
//        $resultadoBusqueda.hide().empty();
//        return;
//    }

//    // Definir el filtro a enviar a la API
//    const filtroNombre = query === "*" ? "" : query;

//    // Llamada a la API para obtener los productos filtrados
//    $.ajax({
//        url: `/api/productos`,
//        method: "GET",
//        data: { nombre: filtroNombre },
//        contentType: "application/json",
//        success: function (data) {
//            // Actualiza el contenido del contenedor de resultados
//            if (data.length > 0) {
//                const items = data.map(producto => `<li>${producto.productoID} ${producto.productoNombre}</li>`).join("");
//                $resultadoBusqueda.show().html(`<ul>${items}</ul>`);
//            } else {
//                // Muestra el mensaje de "No se encontraron resultados" si no hay coincidencias
//                $resultadoBusqueda.show().html("<p>No se encontraron resultados</p>");
//            }
//        },
//        error: function (error) {
//            console.error("Error al obtener productos:", error);
//            $resultadoBusqueda.show().html("<p>Error al cargar resultados</p>");
//        }
//    });
//});


//$("#inputBuscarProducto").on("input", function () {
//    const query = $(this).val().trim();
//    const $resultadoBusqueda = $("#resultadoBusqueda");

//    if (query === "") {
//        // Oculta el contenedor si no hay texto en el campo de búsqueda
//        $resultadoBusqueda.hide().empty();
//        return;
//    }

//    // Llamada a la API para obtener los productos filtrados
//    $.ajax({
//        url: `/api/productos`,
//        method: "GET",
//        data: { nombre: query },
//        contentType: "application/json",
//        success: function (data) {
//            // Actualiza el contenido del contenedor de resultados
//            if (data.length > 0) {
//                const items = data.map(producto => `<li>${producto.productoNombre}</li>`).join("");
//                $resultadoBusqueda.show().html(`<ul>${items}</ul>`);
//            } else {
//                // Muestra el mensaje de "No se encontraron resultados" si no hay coincidencias
//                $resultadoBusqueda.show().html("<p>No se encontraron resultados</p>");
//            }
//        },
//        error: function (error) {
//            console.error("Error al obtener productos:", error);
//            $resultadoBusqueda.show().html("<p>Error al cargar resultados</p>");
//        }
//    });
//});


//document.getElementById("inputBuscarProducto").addEventListener("input", function () {
//    const query = this.value.trim();
//    const resultadoBusqueda = document.getElementById("resultadoBusqueda");

//    if (query === "") {
//        // Oculta el contenedor si no hay texto en el campo de búsqueda
//        resultadoBusqueda.style.display = "none";
//        resultadoBusqueda.innerHTML = "";
//        return;
//    }

//    // Llamada a la API para obtener los productos filtrados
//    fetch(`/api/productos?nombre=${encodeURIComponent(query)}`, {
//        method: "GET",
//        headers: {
//            "Content-Type": "application/json"
//        }
//    })
//        .then(response => response.json())
//        .then(data => {
//            // Actualiza el contenido del contenedor de resultados
//            if (data.length > 0) {
//                resultadoBusqueda.style.display = "block";
//                resultadoBusqueda.innerHTML = "<ul>" +
//                    data.map(producto => `<li>${producto.nombre}</li>`).join("") +
//                    "</ul>";
//            } else {
//                // Muestra el mensaje de "No se encontraron resultados" si no hay coincidencias
//                resultadoBusqueda.style.display = "block";
//                resultadoBusqueda.innerHTML = "<p>No se encontraron resultados</p>";
//            }
//        })
//        .catch(error => {
//            console.error("Error al obtener productos:", error);
//            resultadoBusqueda.style.display = "block";
//            resultadoBusqueda.innerHTML = "<p>Error al cargar resultados</p>";
//        });
//});


//document.getElementById("inputBuscarProducto").addEventListener("input", function () {
//    const query = this.value.toLowerCase().trim();
//    const resultadoBusqueda = document.getElementById("resultadoBusqueda");

//    // Ejemplo de datos simulados; puedes reemplazarlo con una llamada a la base de datos si es necesario.
//    const productos = [
//        { id: 1, nombre: "Producto A" },
//        { id: 2, nombre: "Producto B" },
//        { id: 3, nombre: "Producto C" }
//    ];

//    // Filtra los productos según el texto ingresado
//    const resultadosFiltrados = productos.filter(producto =>
//        producto.nombre.toLowerCase().includes(query)
//    );

//    // Actualiza el contenido del contenedor de resultados
//    if (query === "") {
//        // Oculta el contenedor si no hay texto en el campo de búsqueda
//        resultadoBusqueda.style.display = "none";
//        resultadoBusqueda.innerHTML = "";
//    } else if (resultadosFiltrados.length > 0) {
//        // Muestra los productos encontrados
//        resultadoBusqueda.style.display = "block";
//        resultadoBusqueda.innerHTML = "<ul>" +
//            resultadosFiltrados.map(producto => `<li>${producto.nombre}</li>`).join("") +
//            "</ul>";
//    } else {
//        // Muestra el mensaje de "No se encontraron resultados" si no hay coincidencias
//        resultadoBusqueda.style.display = "block";
//        resultadoBusqueda.innerHTML = "<p>No se encontraron resultados</p>";
//    }
//});