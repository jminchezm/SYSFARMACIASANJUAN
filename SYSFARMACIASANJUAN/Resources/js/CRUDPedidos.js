document.addEventListener('DOMContentLoaded', function () {
    mostrarListaTablaDePedidos(null, null, $('#ddlBuscarPedidoPorEstado').val(), null);
});

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

$("#inputVerBuscarProducto").on("input", function () {
    const query = $(this).val().trim();
    const $resultadoBusqueda = $("#verResultadoBusqueda");

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
    /*alert(productoID);*/
    abrirModal('modalDetallePedido', '.close');

    //var inputBuscarProducto = $('#inputBuscarProducto').val();
    //var inputVerBuscarProducto = $('#inputVerBuscarProducto').val();

    if ($('#inputBuscarProducto').val().length > 0) {
        $('#tbDetallePedidoId').val($('#tbMostrarPedidoID').val());
    }

    if ($('#inputVerBuscarProducto').val().length > 0) {
        $('#tbDetallePedidoId').val($('#lblVerMostrarPedidoID').text());
    }
    $('#tbDetallePedidoProductoId').val(productoID);
    llenarCamposDetallePedidoProducto(productoID);



    /*$("#modalProducto").modal("show"); */// Asegúrate de que el modal tenga este id en tu HTML
}

//function mostrarModalVerProducto(productoID) {
//    // Aquí puedes hacer una llamada adicional para obtener los detalles del producto si es necesario.
//    /*alert(productoID);*/
//    abrirModal('modalDetallePedido', '.close');
//    $('#tbDetallePedidoId').val($('#tbMostrarPedidoID').val());
//    $('#tbDetallePedidoProductoId').val(productoID);
//    llenarCamposDetallePedidoProducto(productoID);



//    /*$("#modalProducto").modal("show"); */// Asegúrate de que el modal tenga este id en tu HTML
//}

// Función para mostrar el modal personalizado
function customAlert(message, imageUrl = null) {
    var modal = document.getElementById("custom-alert");
    var alertMessage = document.getElementById("alert-message");
    /*    var closeButton = document.getElementsByClassName("close-button-alerta")[0];*/
    var okButton = document.getElementById("alert-ok-button");
    var alertImage = document.getElementById("alert-image");

    // Establecer el mensaje
    alertMessage.textContent = message;

    // Mostrar la imagen si se proporciona una URL, de lo contrario, ocultarla
    if (imageUrl) {
        alertImage.src = imageUrl;
        alertImage.style.display = "block";
    } else {
        alertImage.style.display = "none";
    }

    // Mostrar el modal
    modal.style.display = "block";

    okButton.onclick = function () {
        modal.style.display = "none";
    };

    // Cerrar el modal si el usuario hace clic fuera de la caja modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function agregarPedido(event) {
    event.preventDefault();

    var pedidoFechaCreacion = $('#lblPedidoFechaCreacion').text();
    var pedidoEstado = $('#lblPedidoEstado').text();
    var pedidoFechaEntregaEstimada = $('#tbPedidoFechaEstimada').val();
    var pedidoObservacion = $('#tbPedidoObservacion').val();
    var pedidoProveedorId = $('#ddlPedidoProveedor').val();
    if (pedidoProveedorId == "0") {
        pedidoProveedorId = null;
    }

    var pedido = {
        pedidoFechaCreacion: pedidoFechaCreacion,
        pedidoEstado: pedidoEstado,
        pedidoFechaEntregaEstimada: pedidoFechaEntregaEstimada,
        pedidoObservacion: pedidoObservacion,
        pedidoProveedorId: pedidoProveedorId
    };

    $.ajax({
        url: '/api/pedidos/crear',
        type: 'POST',
        data: JSON.stringify(pedido),
        contentType: 'application/json',
        headers: { "Accept": "application/json" },
        success: function (response) {
            if (response.success) {
               /* pedidoIdAsignado = response.pedidoId;*/
                customAlert(response.message + " ID Pedido: " + response.pedidoId, "../Resources/img/ImgProductos/productoAgregado.gif");

                //Agregar el ID al campo de ID
                $('#tbMostrarPedidoID').val(response.pedidoId);

                //Agrega a solo lectura a los campos del pedido anteriormente lleneados
                document.getElementById("tbPedidoFechaEstimada").readOnly = true;
                document.getElementById("ddlPedidoProveedor").disabled = true;
                document.getElementById("tbPedidoObservacion").readOnly = true;
                document.getElementById("btnGenerarPedido").disabled = true;

                //Habilita el textbox inputBuscarProducto y el boton btnGuardarPedido
                document.getElementById("inputBuscarProducto").readOnly = false;
                /*document.getElementById("btnGuardarPedido").disabled = false;*/
            } else {
                alert('Error: ' + response.message);
            }
        },
        error: function (xhr, status, error) {
            /*alert('Error al agregar el pedido: ' + (xhr.responseText || error) + ' Status: ' + xhr.status);*/
            customAlert("Los campos con (*) son obligatorios", "../Resources/img/advertenciaCamposObligatorios.gif");
        }
    });
}

function llenarCamposDetallePedidoProducto(productoId) {
    /*alert(productoId);*/

    $.ajax({
        url: `/api/productos?id=${productoId}`, // Asegúrate de que esta URL coincide con la del controlador
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);

            // Verifica si recibiste una lista y que no está vacía
            if (data === null || data.length === 0) {
                alert('No se encontró el producto.');
                return;
            }

            // Obtiene el primer producto de la lista
            var producto = data[0];

            // Ahora puedes llenar los campos
            $('#tbDetallePedidoProductoNombre').val(producto.productoNombre);
            document.getElementById('ImgDetallePedidoProducto').src = producto.productoImg;
            /*datosOriginalesProducto();*/
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos del producto:', error);
        }
    });
}

function formatDate(dateString) {
    if (!dateString) return 'Fecha no disponible';

    // Usar moment.js para convertir la cadena y formatearla a "dd-MM-yyyy"
    var formattedDate = moment(dateString).format('YYYY-MM-DD');

    // Si la fecha no es válida, moment devuelve "Invalid date"
    return formattedDate === 'Invalid date' ? 'Fecha no válida' : formattedDate;
}

function generarHtmlDePedidos(pedidos) {
    // Verificar si productos es null o un array vacío
    if (!pedidos || pedidos.length === 0) {
        return '<p>No se encontraron pedidos.</p>';
    }

    // Si hay productos, generar la tabla
    var html = `
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Fecha de Creación</th>
                    <th>Estado</th>
                    <th>Fecha Entrega</th>
                    <th>Código Proveedor</th>
                    <th>Nombre Proveedor</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                ${pedidos.map(pedido => `
                    <tr>
                        <td>${pedido.pedidoId}</td>
                        <td>${formatDate(pedido.pedidoFechaCreacion)}</td>
                        <td>${pedido.pedidoEstado}</td>
                        <td>${formatDate(pedido.pedidoFechaEntregaEstimada)}</td>
                        <td>${pedido.pedidoProveedorId}</td>
                        <td>${pedido.pedidoProveedorNombre}</td>
                        <td id="areaAccionDetallePedido">
                            <div id="btnModificarDetallePedido">
                                <button class="modificarBtn" id="modificarDetallePedidoBtn" onclick="modalVerPedido(event, '${pedido.pedidoId}', '${pedido.pedidoEstado}');" >Ver Detalle</button>
                            </div>
                            <div id="btnEliminarDetallePedido">
                                <button class="eliminarBtn" id="eliminarDetallePedidoBtn" onclick="eliminarPedido(event, '${pedido.pedidoId}');"><i class="fa fa-trash"></i></button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    return html;
}

//onclick="llenarCamposFormModificarProducto('${producto.productoID}');"
// onclick="modificarEstadoProducto('${producto.productoID}', 'Inactivo');"

function mostrarListaTablaDePedidos(pedidoId = null, fechaCreacionPedido = null, pedidoEstado = null, pedidoProveedorId = null) {
    // Construir la URL base para la API
    var urlDefault = '/api/pedidos';

    // Construir los parámetros de consulta
    var params = [];

    // Agregar el ID si se proporciona
    if (pedidoId) {
        params.push('pedidoId=' + encodeURIComponent(pedidoId));
    }

    // Agregar el nombre si se proporciona
    if (fechaCreacionPedido) {
        params.push('fechaCreacionPedido=' + encodeURIComponent(fechaCreacionPedido));
    }

    // Agregar la fecha de creación si se proporciona
    if (pedidoEstado) {
        params.push('pedidoEstado=' + encodeURIComponent(pedidoEstado));
    }

    // Agregar el estado si se proporciona
    if (pedidoProveedorId) {
        params.push('pedidoProveedorId=' + encodeURIComponent(pedidoProveedorId));
    }

    // Si hay parámetros, añadirlos a la URL
    if (params.length > 0) {
        urlDefault += '?' + params.join('&');
    }

    // Realizar la solicitud AJAX
    $.ajax({
        url: urlDefault,  // Ruta a la API de productos
        type: 'GET',  // Método GET
        contentType: 'application/json',  // Define el tipo de contenido esperado
        success: function (data) {
            // Generar el HTML de los productos
            /*console.log(data);*/
            var html = generarHtmlDePedidos(data);
            // Insertar el HTML generado en el contenedor
            $('#contenedor-tabla').html(html);
        },
        error: function (xhr, status, error) {
            // Manejar cualquier error
            alert('Error al obtener los pedidos:', error);
        }
    });
}

function modalVerPedido(event, pedidoId, pedidoEstado) {
    event.preventDefault();
    /*alert(pedidoId);*/
    /*alert(pedidoEstado);*/
    abrirModal('modalVerPedido', '.close');
    mostrarListaTablaDeVerDetallePedido(null, pedidoId, null)
    llenarCamposVerDetallePedido(pedidoId);

    if (pedidoEstado == "Completo") {
        document.getElementById("btnConfirmarPedido").disabled = true;
        document.getElementById("inputVerBuscarProducto").disabled = true;
        /* inhabilitarBotonesDetallePedido();*/
        //document.getElementById("modificarDetallePedidoBtn").disabled = true;
        //document.getElementById("eliminarDetallePedidoBtn").disabled = true;
    } else {
        document.getElementById("btnConfirmarPedido").disabled = false;
        document.getElementById("inputVerBuscarProducto").disabled = false;
    }
}

function llenarCamposVerDetallePedido(pedidoId) {
    /*alert(productoId);*/

    $.ajax({
        url: `/api/pedidos?pedidoId=${pedidoId}`, // Asegúrate de que esta URL coincide con la del controlador
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);

            // Verifica si recibiste una lista y que no está vacía
            if (data === null || data.length === 0) {
                alert('No se encontró el pedido.');
                return;
            }

            // Obtiene el primer producto de la lista
            var pedido = data[0];

            // Ahora puedes llenar los campos
            $('#lblVerPedidoFechaCreacion').text(formatDate(pedido.pedidoFechaCreacion.split('T')[0]));
            $('#lblVerPedidoEstado').text(pedido.pedidoEstado);
            $('#lblVerPedidoFechaEstimada').text(formatDate(pedido.pedidoFechaEntregaEstimada.split('T')[0]));
            $('#ddlVerPedidoProveedor').val(pedido.pedidoProveedorId);
            $('#lblVerPedidoObservacion').text(pedido.pedidoObservacion);
            $('#lblVerMostrarPedidoID').text(pedido.pedidoId);
            datosOriginalesPedidoProducto();
            /*datosOriginalesProducto();*/
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos del pedido:', error);
        }
    });
}


/* -------------------- DETALLE PEDIDO -------------------- */

// Función para generar el HTML de la tabla con todos los empleados
function generarHtmlDeDetallePedido(detallePedidos) {
    // Verificar si productos es null o un array vacío
    if (!detallePedidos || detallePedidos.length === 0) {
        return '<p>No se encontraron productos.</p>';
    }

    // Si hay productos, generar la tabla
    var html = `
        <table>
            <thead>
                <tr>
                    <th>Id Pedido</th>
                    <th>Id Producto</th>
                    <th>Nombre Producto</th>
                    <th>Img Producto</th>
                    <th>Cantidad</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                ${detallePedidos.map(detallePedido => `
                    <tr>
                        <td>${detallePedido.detallePedido_PedidoId}</td>
                        <td>${detallePedido.detallePedido_ProductoId}</td>
                        <td>${detallePedido.detallePedidoProductoNombre}</td>
                        <td>
                            <img src="${detallePedido.detallePedidoImg || '../Resources/img/imgPorDefecto.png'}" alt="${detallePedido.detallePedidoProductoNombre}" style="width: 100px; height: auto;" />
                        </td>
                        <td>${detallePedido.detallePedidoCantidad}</td>  
                        <td id="areaAccionDetallePedido">
                            <div id="btnModificarDetallePedido">
                                <button class="modificarBtn" id="modificarDetallePedidoBtn" onclick="modalModificarDetallePedido(event, '${detallePedido.detallePedidoId}');">Modificar</button>
                            </div>
                            <div id="btnEliminarDetallePedido">
                                <button class="eliminarBtn" id="eliminarDetallePedidoBtn" onclick="eliminarDetallePedido(event, '${detallePedido.detallePedidoId}', '${detallePedido.detallePedido_PedidoId}');"><i class="fa fa-trash"></i></button>
                            </div>
                        </td>  
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    return html;
}

function generarHtmlDeVerDetallePedido(detallePedidos) {
    // Verificar si productos es null o un array vacío
    if (!detallePedidos || detallePedidos.length === 0) {
        return '<p>No se encontraron productos.</p>';
    }

    // Si hay productos, generar la tabla
    var html = `
        <table>
            <thead>
                <tr>
                    <th>Id Pedido</th>
                    <th>Id Producto</th>
                    <th>Nombre Producto</th>
                    <th>Img Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario (Q)</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                ${detallePedidos.map(detallePedido => `
                    <tr>
                        <td>${detallePedido.detallePedido_PedidoId}</td>
                        <td>${detallePedido.detallePedido_ProductoId}</td>
                        <td>${detallePedido.detallePedidoProductoNombre}</td>
                        <td>
                            <img src="${detallePedido.detallePedidoImg || '../Resources/img/imgPorDefecto.png'}" alt="${detallePedido.detallePedidoProductoNombre}" style="width: 100px; height: auto;" />
                        </td>
                        <td>${detallePedido.detallePedidoCantidad}</td> 
                        <td>${detallePedido.detallePedidoPrecioUnitario.toFixed(2)}</td> 
                        <td id="areaAccionDetallePedido">
                            <div id="btnModificarDetallePedido">
                                <button class="modificarBtn" id="modificarDetallePedidoBtn" onclick="modalModificarVerDetallePedido(event, '${detallePedido.detallePedidoId}');">Modificar</button>
                            </div>
                            <div id="btnEliminarDetallePedido">
                                <button class="eliminarBtn" id="eliminarDetallePedidoBtn" onclick="eliminarVerDetallePedido(event, '${detallePedido.detallePedidoId}', '${detallePedido.detallePedido_PedidoId}');"><i class="fa fa-trash"></i></button>
                            </div>
                        </td>  
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    return html;
}

function mostrarListaTablaDeDetallePedido(detallePedidoId = null, pedidoId = null, productoId = null) {
    // Construir la URL base para la API
    var urlDefault = '/api/detallePedidos';

    // Construir los parámetros de consulta
    var params = [];

    // Agregar el ID si se proporciona
    if (detallePedidoId) {
        params.push('detallePedidoId=' + encodeURIComponent(detallePedidoId));
    }

    // Agregar el nombre si se proporciona
    if (pedidoId) {
        params.push('pedidoId=' + encodeURIComponent(pedidoId));
    }

    // Agregar la fecha de creación si se proporciona
    if (productoId) {
        params.push('productoId=' + encodeURIComponent(productoId));
    }

    // Si hay parámetros, añadirlos a la URL
    if (params.length > 0) {
        urlDefault += '?' + params.join('&');
    }

    // Realizar la solicitud AJAX
    $.ajax({
        url: urlDefault,  // Ruta a la API de productos
        type: 'GET',  // Método GET
        contentType: 'application/json',  // Define el tipo de contenido esperado
        success: function (data) {
            // Generar el HTML de los productos
            var html = generarHtmlDeDetallePedido(data);
            // Insertar el HTML generado en el contenedor
            $('#areaDetallePedido').html(html);
            /*$('#areaVerDetallePedido').html(html);*/
        },
        error: function (xhr, status, error) {
            // Manejar cualquier error
            alert('Error al obtener el detalle del pedido:', error);
        }
    });
}

function mostrarListaTablaDeVerDetallePedido(detallePedidoId = null, pedidoId = null, productoId = null) {
    // Construir la URL base para la API
    var urlDefault = '/api/detallePedidos';

    // Construir los parámetros de consulta
    var params = [];

    // Agregar el ID si se proporciona
    if (detallePedidoId) {
        params.push('detallePedidoId=' + encodeURIComponent(detallePedidoId));
    }

    // Agregar el nombre si se proporciona
    if (pedidoId) {
        params.push('pedidoId=' + encodeURIComponent(pedidoId));
    }

    // Agregar la fecha de creación si se proporciona
    if (productoId) {
        params.push('productoId=' + encodeURIComponent(productoId));
    }

    // Si hay parámetros, añadirlos a la URL
    if (params.length > 0) {
        urlDefault += '?' + params.join('&');
    }

    // Realizar la solicitud AJAX
    $.ajax({
        url: urlDefault,  // Ruta a la API de productos
        type: 'GET',  // Método GET
        contentType: 'application/json',  // Define el tipo de contenido esperado
        success: function (data) {
            // Generar el HTML de los productos
            var html = generarHtmlDeVerDetallePedido(data);
            // Insertar el HTML generado en el contenedor
            $('#areaVerDetallePedido').html(html);
        },
        error: function (xhr, status, error) {
            // Manejar cualquier error
            alert('Error al obtener el detalle del pedido:', error);
        }
    });
}

function agregarDetallePedido(event) {
    event.preventDefault(); // Evita que se recargue la página

    var idPedido = $('#tbDetallePedidoId').val();
    /*var idVerPedido = $('#lblVerMostrarPedidoID').text();*/
    /*alert(idVerPedido);*/

    //if (inputBuscarProducto.length > 0) {
    //    var idPedido = $('#tbMostrarPedidoID').val();
    //    alert(idPedido);
    //} else if (inputVerBuscarProducto.length > 0) {
    //    var idPedido = $('#lblVerMostrarPedidoID').text();
    //    alert(idPedido);
    //}

    /*alert(idPedido);*/

    // Obtén los valores de cada campo
    var detallePedido_PedidoId = $('#tbDetallePedidoId').val();
    var detallePedido_ProductoId = $('#tbDetallePedidoProductoId').val();
    var detallePedidoCantidad = $('#tbDetallePedidoProductoCantidad').val();
    var detallePedidoPrecioUnitario = 0;
    /*var detallePedidoSubTotal = 0;*/

    console.log(detallePedido_PedidoId);
    console.log(detallePedido_ProductoId);
    console.log(detallePedidoCantidad);
    console.log(detallePedidoPrecioUnitario);
    /*console.log(pedidoProveedorId);*/

    // Validación de campos obligatorios
    if (detallePedido_PedidoId == "" || detallePedido_ProductoId == "" || detallePedidoCantidad == "") {
        customAlert("Los campos con (*) son obligatorios", "../Resources/img/advertenciaCamposObligatorios.gif");
        /*alert("Los campos con (*) son obligatorios");*/
        return;
    }

    // Añadir los datos del producto al FormData
    var detallePedido = {
        detallePedido_PedidoId: detallePedido_PedidoId,
        detallePedido_ProductoId: detallePedido_ProductoId,
        detallePedidoCantidad: detallePedidoCantidad,
        detallePedidoPrecioUnitario: detallePedidoPrecioUnitario
        /*pedidoProveedorId: pedidoProveedorId*/
    };

    // Enviar los datos al servidor
    $.ajax({
        url: '/api/detallePedidos/crear',
        type: 'POST',
        data: JSON.stringify(detallePedido),
        contentType: 'application/json',
        headers: {
            "Accept": "application/json"
        },
        success: function (response) {
            if (response.success) {
                customAlert(response.message, "../Resources/img/ImgProductos/productoAgregado.gif");

                //var inputBuscarProducto = $('#inputBuscarProducto').val();
                //var inputVerBuscarProducto = $('#inputVerBuscarProducto').val();

                if ($('#inputBuscarProducto').val().length > 0) {
                    mostrarListaTablaDeDetallePedido(null, idPedido, null);
                }

                if ($('#inputVerBuscarProducto').val().length > 0) {
                    mostrarListaTablaDeVerDetallePedido(null, idPedido, null);
                }

                /*mostrarListaTablaDeDetallePedido(null, idPedido, null);*/ //pedidoId = null, productoId = null
                /*$('#inputBuscarProducto').val('');*/
                $('#tbDetallePedidoId').val('');
                $('#tbDetallePedidoProductoId').val('');
                $('#tbDetallePedidoProductoCantidad').val('');
                document.getElementById('ImgDetallePedidoProducto').src = "";
                $('#tbDetallePedidoProductoNombre').val('');
                $('#modalDetallePedido').hide();
            } else {
                alert('Error: ' + response.message);
            }
        },
        error: function (xhr, status, error) {
            alert('Error al agregar el producto al pedido: ' + (xhr.responseText || error) + ' Status: ' + xhr.status);
        }
    });

}

function resetForm() {
    document.getElementById('form1').reset(); // Resetea todos los elementos del formulario
}

function modalModificarDetallePedido(event, detallePedidoId) {
    event.preventDefault(); // Evita el comportamiento de envío del formulario
    /*alert(detallePedidoId);*/
    abrirModal('modalModificarDetallePedido', '.close');
    llenarCamposFormModificarProductoDetallePedido(detallePedidoId);
    /*$('#tbModificarDetallePedidoProductoId').val();*/
}

function modalModificarVerDetallePedido(event, detallePedidoId) {
    event.preventDefault(); // Evita el comportamiento de envío del formulario
    /*alert(detallePedidoId);*/
    /*alert($('#lblVerMostrarPedidoID').text());*/
    /*alert('Hola');*/
    if ($('#lblVerPedidoEstado').text() == "Completo") {
        /*alert("Un pedido en estado COMPLETO no se puede modificar");*/
        customAlert("Un producto en un pedido en estado \"COMPLETO\" no se puede modificar", "../Resources/img/advertenciaCamposObligatorios.gif");
    } else {
        abrirModal('modalModificarVerDetallePedido', '.close');
        llenarCamposFormModificarProductoVerDetallePedido(detallePedidoId);
    }
    
    /*document.getElementById("tbModificarVerDetallePedidoProductoPrecio").disabled = true;*/
    /*$('#tbModificarDetallePedidoProductoId').val();*/
}

var detallePedidoProductoOriginal;
function datosOriginalesDetallePedidoProducto() {

    detallePedidoProductoOriginal = {
        detallePedidoId: $('#tbModificarItemDetallePedido').val(),
        detallePedido_PedidoId: $('#tbModificarDetallePedidoId').val(),
        detallePedido_ProductoId: $('#tbModificarDetallePedidoProductoId').val(),
        detallePedidoCantidad: $('#tbModificarDetallePedidoProductoCantidad').val()
    };
}

var verDetallePedidoProductoOriginal;
function datosOriginalesVerDetallePedidoProducto() {

    verDetallePedidoProductoOriginal = {
        detallePedidoId: $('#tbModificarVerItemDetallePedido').val(),
        detallePedido_PedidoId: $('#tbModificarVerDetallePedidoId').val(),
        detallePedido_ProductoId: $('#tbModificarVerDetallePedidoProductoId').val(),
        detallePedidoCantidad: $('#tbModificarVerDetallePedidoProductoCantidad').val(),
        detallePedidoPrecioUnitario: parseFloat($('#tbModificarVerDetallePedidoProductoPrecio').val())
    };

    //console.log($('#tbModificarVerItemDetallePedido').val());
    //console.log($('#tbModificarVerDetallePedidoId').val());
    //console.log($('#tbModificarVerDetallePedidoProductoId').val());
    //console.log($('#tbModificarVerDetallePedidoProductoCantidad').val());
    //console.log($('#tbModificarVerDetallePedidoProductoPrecio').val());
}

function llenarCamposFormModificarProductoDetallePedido(detallePedidoId) {
    /*alert(productoId);*/

    $.ajax({
        url: `/api/detallePedidos?detallePedidoId=${detallePedidoId}`, // Asegúrate de que esta URL coincide con la del controlador
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);

            // Verifica si recibiste una lista y que no está vacía
            if (data === null || data.length === 0) {
                alert('No se encontró el producto.');
                return;
            }

            // Obtiene el primer producto de la lista
            var detallePedido = data[0];

            // Ahora puedes llenar los campos
            $('#tbModificarItemDetallePedido').val(detallePedido.detallePedidoId);
            $('#tbModificarDetallePedidoId').val(detallePedido.detallePedido_PedidoId);
            $('#tbModificarDetallePedidoProductoId').val(detallePedido.detallePedido_ProductoId);
            document.getElementById('ImgModificarDetallePedidoProducto').src = detallePedido.detallePedidoImg;
            //$('#ImgModificarDetallePedidoProducto').val(detallePedido.detallePedidoImg);
            $('#tbModificarDetallePedidoProductoNombre').val(detallePedido.detallePedidoProductoNombre);
            $('#tbModificarDetallePedidoProductoCantidad').val(detallePedido.detallePedidoCantidad);
            datosOriginalesDetallePedidoProducto();
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos del detalle del producto del pedido:', error);
        }
    });
}

function llenarCamposFormModificarProductoVerDetallePedido(detallePedidoId) {
    /*alert(productoId);*/

    $.ajax({
        url: `/api/detallePedidos?detallePedidoId=${detallePedidoId}`, // Asegúrate de que esta URL coincide con la del controlador
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);

            // Verifica si recibiste una lista y que no está vacía
            if (data === null || data.length === 0) {
                alert('No se encontró el producto.');
                return;
            }

            // Obtiene el primer producto de la lista
            var detallePedido = data[0];

            // Ahora puedes llenar los campos
            $('#tbModificarVerItemDetallePedido').val(detallePedido.detallePedidoId);
            $('#tbModificarVerDetallePedidoId').val(detallePedido.detallePedido_PedidoId);
            $('#tbModificarVerDetallePedidoProductoId').val(detallePedido.detallePedido_ProductoId);
            document.getElementById('ImgModificarVerDetallePedidoProducto').src = detallePedido.detallePedidoImg;
            //$('#ImgModificarDetallePedidoProducto').val(detallePedido.detallePedidoImg);
            $('#tbModificarVerDetallePedidoProductoNombre').val(detallePedido.detallePedidoProductoNombre);
            $('#tbModificarVerDetallePedidoProductoCantidad').val(detallePedido.detallePedidoCantidad);
            $('#tbModificarVerDetallePedidoProductoPrecio').val(detallePedido.detallePedidoPrecioUnitario);
            datosOriginalesVerDetallePedidoProducto();
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos del detalle del producto del pedido:', error);
        }
    });
}

function modificarDetallePedido(event) {
    event.preventDefault();

    var detallePedidoId = $("#tbModificarItemDetallePedido").val();
    var detallePedido_PedidoId = $("#tbModificarDetallePedidoId").val();
    var detallePedido_ProductoId = $("#tbModificarDetallePedidoProductoId").val();
    var detallePedidoCantidad = $("#tbModificarDetallePedidoProductoCantidad").val();

    //console.log(detallePedidoId);
    //console.log(detallePedido_PedidoId);
    //console.log(detallePedido_ProductoId);
    //console.log(detallePedidoCantidad);

    var formData = new FormData();
    var detallePedido = {
        detallePedidoId: detallePedidoId,
        detallePedido_PedidoId: detallePedido_PedidoId,
        detallePedido_ProductoId: detallePedido_ProductoId,
        detallePedidoCantidad: detallePedidoCantidad
    };

    formData.append('detallePedido', JSON.stringify(detallePedido));

    // Comparar si algún campo ha cambiado
    var haCambiado = false;
    for (var campo in detallePedido) {
        if (detallePedido[campo] !== detallePedidoProductoOriginal[campo]) {
            haCambiado = true;
            break;
        }
    }

    if (haCambiado) {
        // Realizar la solicitud PUT a la API
        fetch(`/api/detallePedidos/modificar/${detallePedidoId}`, {
            method: 'PUT',
            body: formData,
            headers: {
                // 'Content-Type': 'application/json', // No agregar al usar FormData
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                customAlert(data.mensaje, "../Resources/img/ImgProductos/productoModificado.gif");
                mostrarListaTablaDeDetallePedido(null, detallePedido_PedidoId, null);
                $('#modalModificarDetallePedido').hide();
                /*alert(data.mensaje || "Operación completada.");*/
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Hubo un error al modificar el detalle del producto.");
            });
    } else {
        // Si no ha cambiado nada, mostrar un mensaje
        customAlert("No se ha modificado ningún campo", "../Resources/img/advertenciaCamposObligatorios.gif");
    }
}

function modificarVerDetallePedido(event) {
    event.preventDefault();

    /*if ($("#tbModificarVerDetallePedidoProductoAumento").val() != "") {*/
    var detallePedidoId = $("#tbModificarVerItemDetallePedido").val();
    var detallePedido_PedidoId = $("#tbModificarVerDetallePedidoId").val();
    var detallePedido_ProductoId = $("#tbModificarVerDetallePedidoProductoId").val();
    var detallePedidoCantidad = $("#tbModificarVerDetallePedidoProductoCantidad").val();
    var detallePedidoPrecioUnitario = parseFloat($("#tbModificarVerDetallePedidoProductoPrecio").val());
    var detallePedidoAumento = parseInt($("#tbModificarVerDetallePedidoProductoAumento").val());
    var detallePedidoPrecioFinal = detallePedidoPrecioUnitario + (detallePedidoPrecioUnitario * (detallePedidoAumento / 100));

    if (isNaN(detallePedidoPrecioFinal)) {
        detallePedidoPrecioFinal = detallePedidoPrecioUnitario;
    }  

    var formData = new FormData();
    var detallePedido = {
        detallePedidoId: detallePedidoId,
        detallePedido_PedidoId: detallePedido_PedidoId,
        detallePedido_ProductoId: detallePedido_ProductoId,
        detallePedidoCantidad: detallePedidoCantidad,
        detallePedidoPrecioUnitario: detallePedidoPrecioFinal
    };

    formData.append('detallePedido', JSON.stringify(detallePedido));

    // Comparar si algún campo ha cambiado
    var haCambiado = false;
    for (var campo in detallePedido) {
        if (detallePedido[campo] !== verDetallePedidoProductoOriginal[campo]) {
            haCambiado = true;
            break;
        }
    }

    //alert(!isNaN(detallePedidoAumento));
    //alert(haCambiado);


    if (haCambiado || !isNaN(detallePedidoAumento)) {
        // Realizar la solicitud PUT a la API
        fetch(`/api/detallePedidos/modificar/${detallePedidoId}`, {
            method: 'PUT',
            body: formData,
            headers: {
                // 'Content-Type': 'application/json', // No agregar al usar FormData
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                customAlert(data.mensaje, "../Resources/img/ImgProductos/productoModificado.gif");
                mostrarListaTablaDeVerDetallePedido(null, detallePedido_PedidoId, null);
                $('#modalModificarVerDetallePedido').hide();
                $("#tbModificarVerDetallePedidoProductoAumento").val('');
                //document.getElementById("btnVerModificarDetallePedido").disabled = false;
                //document.getElementById("inputVerBuscarProducto").disabled = true;
                /*document.getElementById("tbModificarVerDetallePedidoProductoPrecio").disabled = true;*/
                /*habilitarBotonesDetallePedido();*/
                /*alert(data.mensaje || "Operación completada.");*/
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Hubo un error al modificar el detalle del producto.");
            });
    } else {
        // Si no ha cambiado nada, mostrar un mensaje
        customAlert("No se ha modificado ningún campo", "../Resources/img/advertenciaCamposObligatorios.gif");
        
    }
    //} else {
    //    customAlert("No se ha modificado ningún campo", "../Resources/img/advertenciaCamposObligatorios.gif");
    //}
}

function eliminarDetallePedido(event, detallePedidoId, detallePedido_PedidoId) {
    event.preventDefault(); // Evita que la página se recargue o cierre

    if (!detallePedidoId) {
        alert("El ID del detalle de pedido es requerido para eliminar.");
        return;
    }

    // Confirmar la eliminación
    if (confirm("¿Estás seguro de que deseas eliminar este detalle de pedido?")) {
        $.ajax({
            url: `/api/detallePedidos/eliminar?detallePedidoId=${encodeURIComponent(detallePedidoId)}`,
            type: 'DELETE',
            success: function (data) {
                if (data.success) {
                    /*alert(data.message);*/
                    customAlert(data.message, "../Resources/img/eliminarPedido.gif");
                    mostrarListaTablaDeDetallePedido(null, detallePedido_PedidoId, null);
                    // Opcional: Actualiza la vista, recarga la página o elimina la fila del DOM
                } else {
                    alert("No se pudo eliminar el detalle de pedido.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error al eliminar el detalle de pedido:", error);
                alert("Ocurrió un error al intentar eliminar el detalle de pedido.");
            }
        });
    }
}

function eliminarVerDetallePedido(event, detallePedidoId, detallePedido_PedidoId) {
    event.preventDefault(); // Evita que la página se recargue o cierre

    if ($('#lblVerPedidoEstado').text() == "Completo") {
        /*alert("Un producto en estado COMPLETO no se puede eliminar");*/
        customAlert("Un producto en un pedido en estado \"COMPLETO\" no se puede eliminar", "../Resources/img/advertenciaCamposObligatorios.gif");
    } else {
        if (!detallePedidoId) {
            alert("El ID del detalle de pedido es requerido para eliminar.");
            return;
        }

        // Confirmar la eliminación
        if (confirm("¿Estás seguro de que deseas eliminar este detalle de pedido?")) {
            $.ajax({
                url: `/api/detallePedidos/eliminar?detallePedidoId=${encodeURIComponent(detallePedidoId)}`,
                type: 'DELETE',
                success: function (data) {
                    if (data.success) {
                        /*alert(data.message);*/
                        customAlert(data.message, "../Resources/img/eliminarPedido.gif");
                        mostrarListaTablaDeVerDetallePedido(null, detallePedido_PedidoId, null);
                        // Opcional: Actualiza la vista, recarga la página o elimina la fila del DOM
                    } else {
                        alert("No se pudo eliminar el detalle de pedido.");
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error al eliminar el detalle de pedido:", error);
                    alert("Ocurrió un error al intentar eliminar el detalle de pedido.");
                }
            });
        }
    }

    //if (!detallePedidoId) {
    //    alert("El ID del detalle de pedido es requerido para eliminar.");
    //    return;
    //}

    //// Confirmar la eliminación
    //if (confirm("¿Estás seguro de que deseas eliminar este detalle de pedido?")) {
    //    $.ajax({
    //        url: `/api/detallePedidos/eliminar?detallePedidoId=${encodeURIComponent(detallePedidoId)}`,
    //        type: 'DELETE',
    //        success: function (data) {
    //            if (data.success) {
    //                /*alert(data.message);*/
    //                customAlert(data.message, "../Resources/img/eliminarPedido.gif");
    //                mostrarListaTablaDeVerDetallePedido(null, detallePedido_PedidoId, null);
    //                // Opcional: Actualiza la vista, recarga la página o elimina la fila del DOM
    //            } else {
    //                alert("No se pudo eliminar el detalle de pedido.");
    //            }
    //        },
    //        error: function (xhr, status, error) {
    //            console.error("Error al eliminar el detalle de pedido:", error);
    //            alert("Ocurrió un error al intentar eliminar el detalle de pedido.");
    //        }
    //    });
    //}
}

function eliminarPedidoDetallePedido(event, pedidoID) {
    //event.preventDefault(); // Evita que la página se recargue o cierre

    //if (!detallePedido_PedidoId) {
    //    alert("El ID del detalle de pedido es requerido para eliminar.");
    //    return;
    //}

    // Confirmar la eliminación
    /*if (confirm("¿Estás seguro de que deseas eliminar este detalle de pedido?")) {*/
        $.ajax({
            url: `/api/detallePedidos/eliminar2?pedidoId=${encodeURIComponent(pedidoID)}`,
            type: 'DELETE',
            success: function (data) {
                if (data.success) {
                    /*alert(data.message);*/
                    /*customAlert(data.message, "../Resources/img/eliminarPedido.gif");*/
                    /*mostrarListaTablaDeDetallePedido(null, detallePedido_PedidoId, null);*/
                    // Opcional: Actualiza la vista, recarga la página o elimina la fila del DOM
                } else {
                    alert("No se pudo eliminar el detalle de pedido.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error al eliminar el detalle de pedido:", error);
                alert("Ocurrió un error al intentar eliminar el detalle de pedido.");
            }
        });
    /*}*/
}
function eliminarPedido(event, pedidoId) {
    event.preventDefault(); // Evita que la página se recargue o cierre

    alert(pedidoId); // Muestra el ID para ver si se está pasando correctamente

    if (!pedidoId) {
        alert("El ID del número de pedido es requerido para eliminar.");
        return;
    }

    // Confirmar la eliminación
    if (confirm("¿Estás seguro de que deseas eliminar este Pedido?")) {
        eliminarPedidoDetallePedido('event', pedidoId);
        $.ajax({
            url: `/api/pedidos/eliminar?pedidoId=${encodeURIComponent(pedidoId)}`, // URL con el pedidoId como parámetro
            type: 'DELETE',
            success: function (data) {
                if (data.success) {
                    customAlert(data.message, "../Resources/img/eliminarPedido.gif");
                    mostrarListaTablaDePedidos(null, null, $('#ddlBuscarPedidoPorEstado').val(), null); // Actualiza la vista después de la eliminación
                } else {
                    alert("No se pudo eliminar el pedido.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error al eliminar el pedido:", error);
                alert("Ocurrió un error al intentar eliminar el pedido.");
            }
        });
    }
}


//function eliminarPedido(event, pedidoId) {
//    event.preventDefault(); // Evita que la página se recargue o cierre

//    alert(pedidoId);

//    if (!pedidoId) {
//        alert("El ID del número de pedido es requerido para eliminar.");
//        return;
//    }

//    // Confirmar la eliminación
//    if (confirm("¿Estás seguro de que deseas eliminar este Pedido?")) {
//        $.ajax({
//            url: `/api/pedidos/eliminar?pedidoId=${encodeURIComponent(pedidoId)}`,
//            type: 'DELETE',
//            success: function (data) {
//                if (data.success) {
//                    /*alert(data.message);*/
//                    customAlert(data.message, "../Resources/img/eliminarPedido.gif");
//                    mostrarListaTablaDePedidos(pedidoId, null, null, null);
//                    // Opcional: Actualiza la vista, recarga la página o elimina la fila del DOM
//                } else {
//                    alert("No se pudo eliminar el pedido.");
//                }
//            },
//            error: function (xhr, status, error) {
//                console.error("Error al eliminar el pedido:", error);
//                alert("Ocurrió un error al intentar eliminar el pedido.");
//            }
//        });
//    }
//}

document.addEventListener("DOMContentLoaded", function () {
    // Obtén los elementos por su id
    var campoAumento = document.getElementById("tbModificarVerDetallePedidoProductoAumento");
    var campoPrecio = document.getElementById("tbModificarVerDetallePedidoProductoPrecio");

    // Escucha el evento 'input' en el campo de aumento
    campoAumento.addEventListener("input", function () {
        // Si el campo de aumento tiene texto, habilita el campo de precio
        if (campoAumento.value !== "") {
            campoPrecio.readOnly = false;
        } else {
            // Si está vacío, deshabilita el campo de precio
            campoPrecio.readOnly = true;
        }
    });
});

//function habiliarCamposModificarDetallePedido(event){
//    event.preventDefault();

//    document.getElementById("btnVerModificarDetallePedido").disabled = true;
//    document.getElementById("inputVerBuscarProducto").disabled = false;
//    //document.getElementById("btnVerGuardarCambios").disabled = false;
//    habilitarBotonesDetallePedido();
//}

//function habilitarBotonesDetallePedido() {
//    // Selecciona todos los botones de modificación
//    document.querySelectorAll('.modificarBtn').forEach(button => {
//        button.disabled = false; // Habilita el botón
//    });

//    // Selecciona todos los botones de eliminación
//    document.querySelectorAll('.eliminarBtn').forEach(button => {
//        button.disabled = false; // Habilita el botón
//    });
//}

//function inhabiliarCamposModificarDetallePedido(event) {
//    event.preventDefault();

//    document.getElementById("btnVerModificarDetallePedido").disabled = false;
//    document.getElementById("inputVerBuscarProducto").disabled = true;
//    document.getElementById("btnVerGuardarCambios").disabled = true;
//    inhabilitarBotonesDetallePedido();
//}

function inhabilitarBotonesDetallePedido() {
    // Selecciona todos los botones de modificación
    document.querySelectorAll('.modificarBtn').forEach(button => {
        button.disabled = true; // Habilita el botón
    });

    // Selecciona todos los botones de eliminación
    document.querySelectorAll('.eliminarBtn').forEach(button => {
        button.disabled = true; // Habilita el botón
    });
}

//Captura la selección del drop down list de proveedores en ver detalle de proveedores
//Para que de esa manera pueda ser modificado el proveedor.
function actualizarProveedorVerDetallePedido() {
    // Obtiene el elemento DropDownList por su ClientID generado
    var dropdownProveedores = document.getElementById("ddlVerPedidoProveedor");

    // Captura el valor seleccionado
    var valorSeleccionado = dropdownProveedores.value;

    // Muestra el valor en una alerta
    alert("Valor seleccionado: " + valorSeleccionado);

    modificarProveedorPedido(valorSeleccionado);

}

var pedidoProductoOriginal;
function datosOriginalesPedidoProducto() {

    pedidoProductoOriginal = {
        pedidoId: $('#lblVerMostrarPedidoID').text(),
        pedidoFechaCreacion: $('#lblVerPedidoFechaCreacion').text(),
        pedidoEstado: $('#lblVerPedidoEstado').text(),
        pedidoFechaEntregaEstimada: $('#lblVerPedidoFechaEstimada').text(),
        pedidoObservacion: $('#lblVerPedidoObservacion').text(),
        pedidoProveedorId: $('#ddlVerPedidoProveedor').val()
    };
}

function modificarProveedorPedido(proveedorId) {
    /*event.preventDefault();*/

    var pedidoId = $("#lblVerMostrarPedidoID").text();
    var pedidoFechaCreacion = $("#lblVerPedidoFechaCreacion").text();
    var pedidoEstado = $("#lblVerPedidoEstado").text();
    var pedidoFechaEntregaEstimada = $("#lblVerPedidoFechaEstimada").text();
    var pedidoObservacion = $("#lblVerPedidoObservacion").text();
    var pedidoProveedorId = proveedorId;

    //console.log(detallePedidoId);
    //console.log(detallePedido_PedidoId);
    //console.log(detallePedido_ProductoId);
    //console.log(detallePedidoCantidad);

    var formData = new FormData();
    var pedido = {
        pedidoId: pedidoId,
        pedidoFechaCreacion: pedidoFechaCreacion,
        pedidoEstado: pedidoEstado,
        pedidoFechaEntregaEstimada: pedidoFechaEntregaEstimada,
        pedidoObservacion: pedidoObservacion,
        pedidoProveedorId: pedidoProveedorId
    };

    formData.append('pedido', JSON.stringify(pedido));

    // Comparar si algún campo ha cambiado
    var haCambiado = false;
    for (var campo in pedido) {
        if (pedido[campo] !== pedidoProductoOriginal[campo]) {
            haCambiado = true;
            break;
        }
    }

    if (haCambiado) {
        // Realizar la solicitud PUT a la API
        fetch(`/api/pedidos/modificar/${pedidoId}`, {
            method: 'PUT',
            body: formData,
            headers: {
                // 'Content-Type': 'application/json', // No agregar al usar FormData
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                customAlert(data.mensaje, "../Resources/img/ImgProductos/productoModificado.gif");
                mostrarListaTablaDePedidos(null, null, $('#ddlBuscarPedidoPorEstado').val(), null);
                /*$('#modalModificarDetallePedido').hide();*/
                /*alert(data.mensaje || "Operación completada.");*/
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Hubo un error al modificar el detalle del producto.");
            });
    } else {
        // Si no ha cambiado nada, mostrar un mensaje
        customAlert("No se ha modificado ningún campo", "../Resources/img/advertenciaCamposObligatorios.gif");
    }
} 

//Buscadores para pedidos
document.getElementById('tbBuscarPedidosPorID').addEventListener('keyup', function () {

    var textoBuscador = this.value.trim(); // Elimina espacios en blanco al inicio y final
    var estado = $('#ddlBuscarPedidoPorEstado').val();

    /*alert(estado);*/

    if (estado == "") {
        mostrarListaTablaDePedidos(textoBuscador, null, null, null);
    } else if (estado == "Pendiente") {
        mostrarListaTablaDePedidos(textoBuscador, null, estado, null);
    } else if (estado == "Completo") {
        mostrarListaTablaDePedidos(textoBuscador, null, estado, null);
    }

    /*mostrarListaTablaDeProductos(textoBuscador);*/

});

document.getElementById('tbBuscarPedidosFechaCreacion').addEventListener('change', function () {

    var textoBuscador = this.value; // Elimina espacios en blanco al inicio y final
    var estado = $('#ddlBuscarPedidoPorEstado').val();
    /*alert(textoBuscador)*/

    if (estado == "") {
        mostrarListaTablaDePedidos(null, textoBuscador, null, null);
    } else if (estado == "Pendiente") {
        mostrarListaTablaDePedidos(null, textoBuscador, estado, null);
    } else if (estado == "Completo") {
        mostrarListaTablaDePedidos(null, textoBuscador, estado, null);
    }

    /*mostrarListaTablaDeProductos(null, null, textoBuscador);*/

});

document.getElementById('ddlBuscarPedidoPorEstado').addEventListener('change', function () {
    var textoBuscador = this.value; // Captura el estado seleccionado

    // Si selecciona "Todo" (valor vacío), enviamos null para obtener el listado completo

    if (textoBuscador === "") {
        textoBuscador = null;
    }

    // Llamamos a la función con el filtro de estado
    mostrarListaTablaDePedidos(null, null, textoBuscador, null);
});

document.getElementById('ddlBuscarPedidoProveedor').addEventListener('change', function () {
    var textoBuscador = this.value; // Captura el estado seleccionado

    alert(textoBuscador);
    // Si selecciona "Todo" (valor vacío), enviamos null para obtener el listado completo
    if (textoBuscador === "0") {
        textoBuscador = null;
    }

    // Llamamos a la función con el filtro de estado
    mostrarListaTablaDePedidos(null, null, null, textoBuscador);
});

//function agregarInventarioProducto(inventarioProductoProductoId, inventarioProductoStock, inventarioProductoPrecioUnitario) {
//    /*event.preventDefault();*/ // Evita que se recargue la página

//    /*var idPedido = $('#tbDetallePedidoId').val();*/
//    /*var idVerPedido = $('#lblVerMostrarPedidoID').text();*/
//    /*alert(idVerPedido);*/

//    //if (inputBuscarProducto.length > 0) {
//    //    var idPedido = $('#tbMostrarPedidoID').val();
//    //    alert(idPedido);
//    //} else if (inputVerBuscarProducto.length > 0) {
//    //    var idPedido = $('#lblVerMostrarPedidoID').text();
//    //    alert(idPedido);
//    //}

//    /*alert(idPedido);*/

//    // Obtén los valores de cada campo
//    /*var inventarioProductoId = inventarioProductoId;*/
//    var inventarioProductoProductoId = inventarioProductoProductoId;
//    var inventarioProductoStock = inventarioProductoStock;
//    var inventarioProductoPrecioUnitario = inventarioProductoPrecioUnitario;
//    /*var detallePedidoSubTotal = 0;*/

//    /*console.log(inventarioProductoId);*/
//    console.log(inventarioProductoProductoId);
//    console.log(inventarioProductoStock);
//    console.log(inventarioProductoPrecioUnitario);
//    /*console.log(pedidoProveedorId);*/

//    //// Validación de campos obligatorios
//    //if (detallePedido_PedidoId == "" || detallePedido_ProductoId == "" || detallePedidoCantidad == "") {
//    //    customAlert("Los campos con (*) son obligatorios", "../Resources/img/advertenciaCamposObligatorios.gif");
//    //    /*alert("Los campos con (*) son obligatorios");*/
//    //    return;
//    //}

//    // Añadir los datos del producto al FormData
//    var inventarioProducto = {
//        inventarioProductoProductoId: inventarioProductoProductoId,
//        inventarioProductoStock: inventarioProductoStock,
//        inventarioProductoPrecioUnitario: inventarioProductoPrecioUnitario,
//        /*pedidoProveedorId: pedidoProveedorId*/
//    };

//    // Enviar los datos al servidor
//    $.ajax({
//        url: '/api/inventarioProductos/crear',
//        type: 'POST',
//        data: JSON.stringify(inventarioProducto),
//        contentType: 'application/json',
//        headers: {
//            "Accept": "application/json"
//        },
//        success: function (response) {
//            if (response.success) {

//                console.log('Productos agregados al inventario');
//                /*customAlert(response.message, "../Resources/img/ImgProductos/productoAgregado.gif");*/

//                //var inputBuscarProducto = $('#inputBuscarProducto').val();
//                //var inputVerBuscarProducto = $('#inputVerBuscarProducto').val();

//                //if ($('#inputBuscarProducto').val().length > 0) {
//                //    mostrarListaTablaDeDetallePedido(null, idPedido, null);
//                //}

//                //if ($('#inputVerBuscarProducto').val().length > 0) {
//                //    mostrarListaTablaDeVerDetallePedido(null, idPedido, null);
//                //}

//                /*mostrarListaTablaDeDetallePedido(null, idPedido, null);*/ //pedidoId = null, productoId = null
//                /*$('#inputBuscarProducto').val('');*/
//                //$('#tbDetallePedidoId').val('');
//                //$('#tbDetallePedidoProductoId').val('');
//                //$('#tbDetallePedidoProductoCantidad').val('');
//                //document.getElementById('ImgDetallePedidoProducto').src = "";
//                //$('#tbDetallePedidoProductoNombre').val('');
//                //$('#modalDetallePedido').hide();
//            } else {
//                alert('Error: ' + response.message);
//            }
//        },
//        error: function (xhr, status, error) {
//            alert('Error al agregar el producto al inventario: ' + (xhr.responseText || error) + ' Status: ' + xhr.status);
//        }
//    });
//}

function modificarPedido(pedidoId, pedidoFechaCreacion, pedidoEstado, pedidoFechaEntregaEstimada, pedidoObservacion, pedidoProveedorId) {
    /*event.preventDefault();*/

    //var pedidoId = $("#lblVerMostrarPedidoID").text();
    //var pedidoFechaCreacion = $("#lblVerPedidoFechaCreacion").text();
    //var pedidoEstado = $("#lblVerPedidoEstado").text();
    //var pedidoFechaEntregaEstimada = $("#lblVerPedidoFechaEstimada").text();
    //var pedidoObservacion = $("#lblVerPedidoObservacion").text();
    //var pedidoProveedorId = $("#ddlVerPedidoProveedor").val();

    //console.log(detallePedidoId);
    //console.log(detallePedido_PedidoId);
    //console.log(detallePedido_ProductoId);
    //console.log(detallePedidoCantidad);

    var formData = new FormData();
    var pedido = {
        pedidoId: pedidoId,
        pedidoFechaCreacion: pedidoFechaCreacion,
        pedidoEstado: pedidoEstado,
        pedidoFechaEntregaEstimada: pedidoFechaEntregaEstimada,
        pedidoObservacion: pedidoObservacion,
        pedidoProveedorId: pedidoProveedorId
    };

    formData.append('pedido', JSON.stringify(pedido));

    // Comparar si algún campo ha cambiado
    //var haCambiado = false;
    //for (var campo in pedido) {
    //    if (pedido[campo] !== pedidoProductoOriginal[campo]) {
    //        haCambiado = true;
    //        break;
    //    }
    //}

    /*if (haCambiado) {*/
        // Realizar la solicitud PUT a la API
        fetch(`/api/pedidos/modificar/${pedidoId}`, {
            method: 'PUT',
            body: formData,
            headers: {
                // 'Content-Type': 'application/json', // No agregar al usar FormData
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                /*customAlert("Pedido modificado exitosamente", "../Resources/img/ImgProductos/productoModificado.gif");*/
                mostrarListaTablaDePedidos(null, null, $('#ddlBuscarPedidoPorEstado').val(), null);
                /*$('#modalModificarDetallePedido').hide();*/
                /*alert(data.mensaje || "Operación completada.");*/
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Hubo un error al modificar el detalle del producto.");
            });
    //} else {
    //    // Si no ha cambiado nada, mostrar un mensaje
    //    customAlert("No se ha modificado ningún campo", "../Resources/img/advertenciaCamposObligatorios.gif");
    //}
}

function modificarInventarioProducto(inventarioProductoProductoId, inventarioProductoStock, inventarioProductoPrecioUnitario) {
    /*event.preventDefault();*/

    /*if ($("#tbModificarVerDetallePedidoProductoAumento").val() != "") {*/
    /*var inventarioProductoId = inventarioProductoId;*/
    var inventarioProductoProductoId = inventarioProductoProductoId;
    var inventarioProductoStock = inventarioProductoStock;
    var inventarioProductoPrecioUnitario = inventarioProductoPrecioUnitario;

    console.log(inventarioProductoProductoId);
    console.log(inventarioProductoStock);
    console.log(inventarioProductoPrecioUnitario);
    

    //if (isNaN(detallePedidoPrecioFinal)) {
    //    detallePedidoPrecioFinal = detallePedidoPrecioUnitario;
    //}

    var formData = new FormData();
    var inventarioProducto = {
        /*inventarioProductoId: inventarioProductoId,*/
        inventarioProductoProductoId: inventarioProductoProductoId,
        inventarioProductoStock: inventarioProductoStock,
        inventarioProductoPrecioUnitario: inventarioProductoPrecioUnitario
    };

    formData.append('inventarioPedido', JSON.stringify(inventarioProducto));

    // Comparar si algún campo ha cambiado
    //var haCambiado = false;
    //for (var campo in detallePedido) {
    //    if (detallePedido[campo] !== verDetallePedidoProductoOriginal[campo]) {
    //        haCambiado = true;
    //        break;
    //    }
    //}

    //alert(!isNaN(detallePedidoAumento));
    //alert(haCambiado);


    /*if (haCambiado || !isNaN(detallePedidoAumento)) {*/
        // Realizar la solicitud PUT a la API
    fetch(`/api/inventarioProductos/modificar/${inventarioProductoProductoId}`, {
            method: 'PUT',
            body: formData,
            headers: {
                // 'Content-Type': 'application/json', // No agregar al usar FormData
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                /*customAlert(data.mensaje, "../Resources/img/ImgProductos/productoModificado.gif");*/
                //mostrarListaTablaDeVerDetallePedido(null, detallePedido_PedidoId, null);
                //$('#modalModificarVerDetallePedido').hide();
                //$("#tbModificarVerDetallePedidoProductoAumento").val('');
                //document.getElementById("btnVerModificarDetallePedido").disabled = false;
                //document.getElementById("inputVerBuscarProducto").disabled = true;
                /*document.getElementById("tbModificarVerDetallePedidoProductoPrecio").disabled = true;*/
                /*habilitarBotonesDetallePedido();*/
                /*alert(data.mensaje || "Operación completada.");*/
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Hubo un error al modificar el producto del inventario.");
            });
    //} else {
    //    // Si no ha cambiado nada, mostrar un mensaje
    //    customAlert("No se ha modificado ningún campo", "../Resources/img/advertenciaCamposObligatorios.gif");

    //}
    //} else {
    //    customAlert("No se ha modificado ningún campo", "../Resources/img/advertenciaCamposObligatorios.gif");
    //}
}

async function verificarPrecioUnitarioDetallePedido(pedidoId) {
    try {
        // Realizamos la solicitud al servidor para obtener los detalles del pedido
        const response = await $.ajax({
            url: `/api/detallePedidos?pedidoId=${pedidoId}`,
            type: 'GET',
            contentType: 'application/json'
        });

        // Muestra la respuesta completa (detalles del pedido) en la consola
        console.log("Detalles del pedido:", response);

        // Verifica si se recibió una lista y que no está vacía
        if (response === null || response.length === 0) {
            console.warn('No se encontraron productos en el detalle del pedido.');
            return false; // Retorna false si no hay productos
        }

        // Verifica que todos los precios unitarios sean mayores a 0
        const todosPreciosValidos = response.every(detallePedido => detallePedido.detallePedidoPrecioUnitario > 0);

        // Si todos los precios son válidos, muestra los detalles
        if (todosPreciosValidos) {
            response.forEach((detallePedido, index) => {
                console.log(`Producto #${index + 1}:`);
                console.log(`- ID del Producto: ${detallePedido.detallePedido_ProductoId}`);
                console.log(`- Cantidad: ${detallePedido.detallePedidoCantidad}`);
                console.log(`- Precio Unitario: ${detallePedido.detallePedidoPrecioUnitario}`);
                console.log(`- Subtotal: ${detallePedido.detallePedidoSubtotal}`);

                // Llama a la función para modificar el inventario si todos los precios son válidos
                modificarInventarioProducto(detallePedido.detallePedido_ProductoId, detallePedido.detallePedidoCantidad, detallePedido.detallePedidoPrecioUnitario);
                modificarPedido($("#lblVerMostrarPedidoID").text(), $("#lblVerPedidoFechaCreacion").text(), "Completo", $("#lblVerPedidoFechaEstimada").text(), $("#lblVerPedidoObservacion").text(), $("#ddlVerPedidoProveedor").val());
            });
            return true; // Retorna true si los precios son válidos y se muestran los detalles
        } else {
            console.warn('Algunos precios unitarios son inválidos (<= 0).');
            return false; // Retorna false si algún precio es inválido
        }

    } catch (error) {
        console.error('Error al obtener los datos del detalle del producto del pedido:', error);
        return false; // Retorna false en caso de error
    }
}


//async function verificarPrecioUnitarioDetallePedido(pedidoId) {
//    try {
//        // Realizamos la solicitud al servidor para obtener los detalles del pedido
//        const response = await $.ajax({
//            url: `/api/detallePedidos?pedidoId=${pedidoId}`,
//            type: 'GET',
//            contentType: 'application/json'
//        });

//        // Muestra la respuesta completa (detalles del pedido) en la consola
//        console.log("Detalles del pedido:", response);

//        // Verifica si se recibió una lista y que no está vacía
//        if (response === null || response.length === 0) {
//            console.warn('No se encontraron productos en el detalle del pedido.');
//            return false; // Retorna false si no hay productos
//        }

//        // Muestra los detalles de cada producto en el pedido
//        response.forEach((detallePedido, index) => {
//            console.log(`Producto #${index + 1}:`);
//            console.log(`- ID del Producto: ${detallePedido.detallePedido_ProductoId}`);
//            console.log(`- Cantidad: ${detallePedido.detallePedidoCantidad}`);
//            console.log(`- Precio Unitario: ${detallePedido.detallePedidoPrecioUnitario}`);
//            console.log(`- Subtotal: ${detallePedido.detallePedidoSubtotal}`);
//            modificarInventarioProducto(detallePedido.detallePedido_ProductoId, detallePedido.detallePedidoCantidad, detallePedido.detallePedidoPrecioUnitario);
//        });

//        // Verifica que todos los precios unitarios sean mayores a 0
//        const todosPreciosValidos = response.every(detallePedido => detallePedido.detallePedidoPrecioUnitario > 0);

//        // Retorna si todos los precios son válidos o no
//        return todosPreciosValidos; // true si todos los precios son válidos, false en caso contrario

//    } catch (error) {
//        console.error('Error al obtener los datos del detalle del producto del pedido:', error);
//        return false; // Retorna false en caso de error
//    }
//}



//async function verificarPrecioUnitarioDetallePedido(pedidoId) {
//    try {
//        const response = await $.ajax({
//            url: `/api/detallePedidos?pedidoId=${pedidoId}`,
//            type: 'GET',
//            contentType: 'application/json'
//        });

//        console.log(response);

//        // Verifica si se recibió una lista y que no está vacía
//        if (response === null || response.length === 0) {
//            console.warn('No se encontraron productos en el detalle del pedido.');
//            return false; // Retorna false si no hay productos
//        }

//        // Verifica que todos los precios unitarios sean mayores a 0
//        const todosPreciosValidos = response.every(detallePedido => detallePedido.detallePedidoPrecioUnitario > 0);
//        /*alert(detallePedidoPrecioUnitario);*/
//        //if (todosPreciosValidos == true) {
//        //    alert(detallePedido.detallePedido_ProductoId);
//        //    alert(detallePedido.detallePedidoCantidad);
//        //    alert(detallePedido.detallePedidoPrecioUnitario);
//        //    //agregarInventarioProducto(detallePedido.detallePedido_ProductoId, detallePedido.detallePedidoCantidad, detallePedido.detallePedidoPrecioUnitario);       
//        //}

//        return todosPreciosValidos; // true si todos los precios son válidos, false en caso contrario
//    } catch (error) {
//        console.error('Error al obtener los datos del detalle del producto del pedido:', error);
//        return false; // Retorna false en caso de error
//    }
//}

//Funcion de confirmación del pedido
function confirmacionPedido(event) {
    event.preventDefault();

    var proveedor = $('#ddlVerPedidoProveedor').val();

    if (proveedor == null) {
        customAlert("Debes de asignar a un proveedor", "../Resources/img/advertenciaCamposObligatorios.gif");
    } else {
        alert(proveedor);
        (async () => {
            const resultado = await verificarPrecioUnitarioDetallePedido($('#lblVerMostrarPedidoID').text());
            if (resultado) {
                /*alert("Todos los precios unitarios son válidos.");*/
                customAlert("Confirmación de pedido exitosamenta.", "../Resources/img/confirmarPedido.png");
                $('#modalVerPedido').hide();
                // Ejecuta la acción que necesites
            } else {
                /*alert("Algunos productos tienen un precio unitario de 0 o menor.");*/
                customAlert("Para confirmar el pedido debes de agregar un precio a todos los productos.", "../Resources/img/advertenciaCamposObligatorios.gif");
            }
        })();

    }
    

}

//document.getElementById('tbBuscarProductoPorNombre').addEventListener('keyup', function () {

//    var textoBuscador = this.value.trim(); // Elimina espacios en blanco al inicio y final
//    var estado = $('#ddlBuscarPorEstado').val();

//    if (estado == "") {
//        mostrarListaTablaDeProductos(null, textoBuscador);
//    } else if (estado == "Activo") {
//        mostrarListaTablaDeProductos(null, textoBuscador, null, estado);
//    } else if (estado == "Inactivo") {
//        mostrarListaTablaDeProductos(null, textoBuscador, null, estado);
//    }

//    /*mostrarListaTablaDeProductos(null,textoBuscador);*/

//});

//document.getElementById('tbBuscarProductoFechaCreacion').addEventListener('change', function () {

//    var textoBuscador = this.value; // Elimina espacios en blanco al inicio y final
//    var estado = $('#ddlBuscarPorEstado').val();
//    /*alert(textoBuscador)*/

//    if (estado == "") {
//        mostrarListaTablaDeProductos(null, null, textoBuscador, estado);
//    } else if (estado == "Activo") {
//        mostrarListaTablaDeProductos(null, null, textoBuscador, estado);
//    } else if (estado == "Inactivo") {
//        mostrarListaTablaDeProductos(null, null, textoBuscador, estado);
//    }

//    /*mostrarListaTablaDeProductos(null, null, textoBuscador);*/

//});

//// Nuevo evento para buscar por estado
//document.getElementById('ddlBuscarPorEstado').addEventListener('change', function () {
//    var textoBuscador = this.value; // Captura el estado seleccionado

//    // Si selecciona "Todo" (valor vacío), enviamos null para obtener el listado completo
//    if (textoBuscador === "") {
//        textoBuscador = null;
//    }

//    // Llamamos a la función con el filtro de estado
//    mostrarListaTablaDeProductos(null, null, null, textoBuscador);
//});

//function modificarDetallePedido(event) {
//    event.preventDefault();

//    var detallePedidoId = $("#tbModificarItemDetallePedido").val();
//    var detallePedido_PedidoId = $("#tbModificarDetallePedidoId").val();
//    var detallePedido_ProductoId = $("#tbModificarDetallePedidoProductoId").val();
//    var detallePedidoCantidad = $("#tbModificarDetallePedidoProductoCantidad").val();

//    //console.log(detallePedidoId);
//    //console.log(detallePedido_PedidoId);
//    //console.log(detallePedido_ProductoId);
//    //console.log(detallePedidoCantidad);

//    var formData = new FormData();
//    var detallePedido = {
//        detallePedidoId: detallePedidoId,
//        detallePedido_PedidoId: detallePedido_PedidoId,
//        detallePedido_ProductoId: detallePedido_ProductoId,
//        detallePedidoCantidad: detallePedidoCantidad
//    };

//    formData.append('detallePedido', JSON.stringify(detallePedido));

//    // Comparar si algún campo ha cambiado
//    var haCambiado = false;
//    for (var campo in detallePedido) {
//        if (detallePedido[campo] !== detallePedidoProductoOriginal[campo]) {
//            haCambiado = true;
//            break;
//        }
//    }

//    if (haCambiado) {
//        // Realizar la solicitud PUT a la API
//        fetch(`/api/detallePedidos/modificar/${detallePedidoId}`, {
//            method: 'PUT',
//            body: formData,
//            headers: {
//                // 'Content-Type': 'application/json', // No agregar al usar FormData
//                'Accept': 'application/json'
//            }
//        })
//            .then(response => response.json())
//            .then(data => {
//                customAlert(data.mensaje, "../Resources/img/ImgProductos/productoModificado.gif");
//                mostrarListaTablaDeDetallePedido(null, detallePedido_PedidoId, null);
//                $('#modalModificarDetallePedido').hide();
//                /*alert(data.mensaje || "Operación completada.");*/
//            })
//            .catch(error => {
//                console.error('Error:', error);
//                alert("Hubo un error al modificar el detalle del producto.");
//            });
//    } else {
//        // Si no ha cambiado nada, mostrar un mensaje
//        customAlert("No se ha modificado ningún campo", "../Resources/img/advertenciaCamposObligatorios.gif");
//    }
//}