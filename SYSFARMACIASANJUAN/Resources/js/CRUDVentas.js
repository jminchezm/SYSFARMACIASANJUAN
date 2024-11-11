window.onload = function () {
    /*document.getElementById('btnConfirmarVenta').disabled = true;*/
    mostrarListaTablaDeVentas(null, null, null, null)
};

function abrirModal(modalId, closeClass) {
    var modal = document.getElementById(modalId);
    modal.style.display = 'flex';

    // Cerrar el modal cuando se hace clic en el botón de cerrar
    modal.querySelector(closeClass).addEventListener('click', function () {
        modal.style.display = 'none';
    });
}


// Mostrar el modal de crear venta
document.querySelector('#btnCrearVenta').addEventListener('click', function () {
    abrirModal('modalNuevaVenta', '.close');
    document.getElementById('btnGenerarVenta').disabled = false;
    document.getElementById('btnConfirmarVenta').disabled = true;
    document.getElementById("inputBuscarInventarioProducto").readOnly = true;
    llenarCamposFormulario();
    /*cargarSubCategorias($('#ddlProductoSubCategoria'));*/
});

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

    // Cerrar el modal cuando se haga clic en la X o el botón OK
    //closeButton.onclick = function () {
    //    modal.style.display = "none";
    //};

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
//function customAlert(message, imageUrl = null) {
//    var modal = document.getElementById("custom-alert");
//    var alertMessage = document.getElementById("alert-message");
//    /*    var closeButton = document.getElementsByClassName("close-button-alerta")[0];*/
//    var okButton = document.getElementById("alert-ok-button");
//    var alertImage = document.getElementById("alert-image");

//    // Establecer el mensaje
//    alertMessage.textContent = message;

//    // Mostrar la imagen si se proporciona una URL, de lo contrario, ocultarla
//    if (imageUrl) {
//        alertImage.src = imageUrl;
//        alertImage.style.display = "block";
//    } else {
//        alertImage.style.display = "none";
//    }

//    // Mostrar el modal
//    modal.style.display = "block";

//    // Cerrar el modal cuando se haga clic en la X o el botón OK
//    //closeButton.onclick = function () {
//    //    modal.style.display = "none";
//    //};

//    okButton.onclick = function () {
//        modal.style.display = "none";
//    };

//    // Cerrar el modal si el usuario hace clic fuera de la caja modal
//    window.onclick = function (event) {
//        if (event.target == modal) {
//            modal.style.display = "none";
//        }
//    };
//}

$("#inputBuscarInventarioProducto").on("input", function () {
    const query = $(this).val().trim();
    const $resultadoBusqueda = $("#resultadoBusqueda");

    if (query === "") {
        // Oculta el contenedor si no hay texto en el campo de búsqueda
        $resultadoBusqueda.hide().empty();
        return;
    }

    // Definir el filtro de nombre a enviar a la API
    const filtroNombre = query === "*" ? "" : query;

    // Llamada a la API para obtener los productos filtrados
    $.ajax({
        url: `/api/inventarioProductos`,
        method: "GET",
        data: { inventarioProductoNombre: filtroNombre },
        contentType: "application/json",
        success: function (data) {
            // Actualiza el contenido del contenedor de resultados
            if (data.length > 0) {
                const items = data.map(inventarioProducto => `
                    <div class="producto-item" 
                         data-id="${inventarioProducto.inventarioProductoProductoId}" 
                         data-precio="${inventarioProducto.inventarioProductoPrecioUnitario}" 
                         data-stock="${inventarioProducto.inventarioProductoStock}"
                         style="display: flex; align-items: center; padding: 10px; border-bottom: 1px solid #ddd;">
                         
                        <div style="flex: 0 0 60px;">
                            <img src="${inventarioProducto.inventarioProductoImgProducto}" alt="${inventarioProducto.inventarioProductoNombreProducto}" class="producto-imagen" width="50" height="50" style="border-radius: 5px;">
                        </div>
                        <div style="flex: 1; padding-left: 15px;">
                            <div><strong>ID:</strong> ${inventarioProducto.inventarioProductoProductoId}</div>
                            <div><strong>Nombre:</strong> ${inventarioProducto.inventarioProductoNombreProducto}</div>
                        </div>
                        <div style="flex: 1; padding-left: 15px;">
                            <div><strong>Cantidad en existencia:</strong> ${inventarioProducto.inventarioProductoStock}</div>
                            <div><strong>Precio Unidad:</strong> Q. ${inventarioProducto.inventarioProductoPrecioUnitario}</div>
                        </div>
                    </div>
                `).join("");

                // Mostrar los resultados y agregar los elementos
                $resultadoBusqueda.show().html(items);

                // Añadir el evento de clic a cada <div> recién creado
                $(".producto-item").on("click", function () {
                    const inventarioProductoId = $(this).data("id");
                    const precioUnitario = $(this).data("precio");
                    const stock = $(this).data("stock");

                    mostrarModalProducto(inventarioProductoId, precioUnitario, stock);
                                        
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


//$("#inputBuscarInventarioProducto").on("input", function () {
//    const query = $(this).val().trim();
//    const $resultadoBusqueda = $("#resultadoBusqueda");

//    if (query === "") {
//        // Oculta el contenedor si no hay texto en el campo de búsqueda
//        $resultadoBusqueda.hide().empty();
//        return;
//    }

//    // Definir el filtro de nombre a enviar a la API
//    const filtroNombre = query === "*" ? "" : query;

//    // Llamada a la API para obtener los productos filtrados
//    $.ajax({
//        url: `/api/inventarioProductos`,
//        method: "GET",
//        data: { inventarioProductoNombre: filtroNombre },  // Cambiar el nombre del parámetro
//        contentType: "application/json",
//        success: function (data) {
//            // Actualiza el contenido del contenedor de resultados
//            if (data.length > 0) {
//                const items = data.map(inventarioProducto => `
//                    <div class="producto-item" data-id="${inventarioProducto.inventarioProductoProductoId}" style="display: flex; align-items: center; padding: 10px; border-bottom: 1px solid #ddd;">
//                        <div style="flex: 0 0 60px;">
//                            <img src="${inventarioProducto.inventarioProductoImgProducto}" alt="${inventarioProducto.inventarioProductoNombreProducto}" class="producto-imagen" width="50" height="50" style="border-radius: 5px;">
//                        </div>
//                        <div style="flex: 1; padding-left: 15px;">
//                            <div><strong>ID:</strong> ${inventarioProducto.inventarioProductoProductoId}</div>
//                            <div><strong>Nombre:</strong> ${inventarioProducto.inventarioProductoNombreProducto}</div>
//                        </div>
//                        <div style="flex: 1; padding-left: 15px;">
//                            <div><strong>Cantidad en existencia:</strong> ${inventarioProducto.inventarioProductoStock}</div>
//                            <div><strong>Precio Unidad:</strong> Q. ${inventarioProducto.inventarioProductoPrecioUnitario}</div>
//                        </div>
//                    </div>
//                `).join("");

//                // Mostrar los resultados y agregar los elementos
//                $resultadoBusqueda.show().html(items);

//                // Añadir el evento de clic a cada <div> recién creado
//                $(".producto-item").on("click", function () {
//                    const inventarioProductoId = $(this).data("id");
//                    alert(inventarioProductoId);
//                    mostrarModalProducto(inventarioProductoId);
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

function obtenerCliente(clienteId = null, nombreCliente = null, clienteNit = null, clienteCui = null) {
    // Construir la URL base para la API
    var urlDefault = '/api/clientesFiltro';

    // Construir los parámetros de consulta
    var params = [];

    // Agregar el ID si se proporciona
    if (clienteId) {
        params.push('clienteId=' + encodeURIComponent(clienteId));
    }

    // Agregar el nombre si se proporciona
    if (nombreCliente) {
        params.push('nombreCliente=' + encodeURIComponent(nombreCliente));
    }

    // Agregar el NIT si se proporciona
    if (clienteNit) {
        params.push('clienteNit=' + encodeURIComponent(clienteNit));
    }

    // Agregar el CUI si se proporciona
    if (clienteCui) {
        params.push('clienteCui=' + encodeURIComponent(clienteCui));
    }

    // Si hay parámetros, añadirlos a la URL
    if (params.length > 0) {
        urlDefault += '?' + params.join('&');
    }

    // Verifica la URL que se enviará
    console.log(urlDefault);

    // Realizar la solicitud AJAX
    $.ajax({
        url: urlDefault,  // Ruta a la API
        type: 'GET',  // Método GET
        contentType: 'application/json',  // Define el tipo de contenido esperado
        success: function (data) {
            // Verifica que la respuesta tenga datos
            if (data && data.length > 0) {
                var clienteResult = data[0];
                console.log('Nombre Completo: ' + clienteResult.nombreCompleto);
                var nombreCompleto = clienteResult.nombreCompleto; // "Carlos Gómez"

                // Busca la opción cuyo texto sea igual al nombreCompleto
                $('#ddlVentaCliente option').filter(function () {
                    return $(this).text() === nombreCompleto;
                }).prop('selected', true); // Selecciona la opción que coincide con el texto

                //alert("Hola");
                //alert(document.getElementById('ddlVentaCliente').value);
                //alert(document.getElementById('ddlVentaResponsable').value);

                crearVenta(document.getElementById('ddlVentaCliente').value, document.getElementById('ddlVentaResponsable').value);

            } else {
                alert('No se encontraron clientes con los filtros proporcionados.');
                if (confirm("¿Quieres agregar al nuevo cliente?")) {
                    abrirModal('modalRegistrarCliente', '.close');
                    $('#tbNITCliente').val($('#tbVentaNit').val());

                }
            }
        },
        error: function (xhr, status, error) {
            // Manejar cualquier error
            console.error('Error al obtener los clientes:', error);
        }
    });
}

function crearCliente(event) {
    // Prevenir que el formulario cierre el modal
    event.preventDefault();

    // Obtener valores de los campos  
    var primerNombreCliente = $('#tbPrimerNombreCliente').val() === '' ? null : $('#tbPrimerNombreCliente').val();
    var segundoNombreCliente = $('#tbSegundoNombreCliente').val() === '' ? null : $('#tbSegundoNombreCliente').val();
    var tercerNombreCliente = $('#tbTercerNombreCliente').val() === '' ? null : $('#tbTercerNombreCliente').val();
    var primerApellidoCliente = $('#tbPrimerApellidoCliente').val() === '' ? null : $('#tbPrimerApellidoCliente').val();
    var segundoApellidoCliente = $('#tbSegundoApellidoCliente').val() === '' ? null : $('#tbSegundoApellidoCliente').val();
    var apellidoCasada = $('#tbApellidoCasadaCLiente').val() === '' ? null : $('#tbApellidoCasadaCliente').val();
    var cuiCliente = $('#tbCUICliente').val() === '' ? null : $('#tbCUICliente').val();
    var nitCliente = $('#tbNITCliente').val() === '' ? null : $('#tbNITCliente').val();
    var municipioidcliente = $('#ddlMunicipioCliente').val() === '' ? null : $('#ddlMunicipioCliente').val();
    var direccionCliente = $('#tbDireccionCliente').val() === '' ? null : $('#tbDireccionCliente').val();
    var telefonoCliente = $('#tbTelefonoCliente').val() === '' ? null : $('#tbTelefonoCliente').val();
    var movilCliente = $('#tbMovilCliente').val() === '' ? null : $('#tbMovilCliente').val();
    var correoCliente = $('#tbCorreoCliente').val() === '' ? null : $('#tbCorreoCliente').val();


    if (primerNombreCliente != null && primerApellidoCliente != null && cuiCliente != null &&
        direccionCliente != null && movilCliente != null && nitCliente != null) {
        // Si todas las validaciones pasan, crear el objeto cliente
        var cliente = {
            primerNombre: primerNombreCliente,
            segundoNombre: segundoNombreCliente,
            tercerNombre: tercerNombreCliente,
            primerApellido: primerApellidoCliente,
            segundoApellido: segundoApellidoCliente,
            apellidoCasada: apellidoCasada,
            cui: cuiCliente,
            nit: nitCliente,
            municipioid: municipioidcliente,
            direccion: direccionCliente,
            telefonoCasa: telefonoCliente,
            telefonoMovil: movilCliente,
            correo: correoCliente
        };

        // Enviar la información si pasa las validaciones
        $.ajax({
            url: '/api/clientes',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(cliente),
            success: function (response) {
                /*alert("Empleado agregado exitosamente");*/
                customAlert("Cliente agregado exitosamente", "../Resources/img/guardar_cliente.png");

                /*Limpiar los campos del formulario*/
                $('#tbPrimerNombreCliente').val('');
                $('#tbSegundoNombreCliente').val('');
                $('#tbTercerNombreCliente').val('');
                $('#tbPrimerApellidoCliente').val('');
                $('#tbSegundoApellidoCliente').val('');
                $('#tbApellidoCasadaCliente').val('');
                $('#tbCUICliente').val('');
                $('#tbNITCliente').val('');
                $('#ddlMunicipioCliente').val('');
                $('#tbDireccionCliente').val('');
                $('#tbTelefonoCliente').val('');
                $('#tbMovilCliente').val('');
                $('#tbCorreoCliente').val('');
                recargarDDLClientes();
                $('#modalRegistrarCliente').hide();
            },
            error: function (xhr, status, error) {
                console.log("Error al agregar el cliente: " + xhr.responseText);
            }
        });
    } else {
        /*alert("Los campos con * son obligatorios");*/
        customAlert("Los campos con (*) son obligatorios", "../Resources/img/advertenciaCamposObligatorios.gif");
    }
}

function agregarVenta(event) {
    event.preventDefault();
    var nitCliente = $('#tbVentaNit').val();

    if (nitCliente != "") {
        /*alert(nitCliente);*/
        obtenerCliente(null, null, nitCliente, null);

        //var nombreCompleto = $('#ddlVentaCliente').val();
        //alert(nombreCompleto);

        //if (nombreCompleto == 0) {
        //    crearVenta();
        //}

    } else {
        alert("Debes de agregar a un cliente o consumidor final");
    }
}

function resetForm() {
    /*alert('Hola');*/
    document.getElementById('form1').reset(); // Resetea todos los elementos del formulario
}

function crearVenta(clienteId, usuarioId) {
    /*event.preventDefault();*/

    var ventaFecha = $('#lblVentaFechaCreacion').text();
    /*var ventaEstado = $('#lblVentaEstado').text();*/
    var ventaTotal = $('#lblVentaTotal').text(); //.trim() === '' ? null : $('#lblVentaTotal').text()
    var venta_clienteId = clienteId;
    var venta_usuarioId = usuarioId; //$('#ddlVentaResponsable').val()
    //alert(document.getElementById('ddlVentaCliente').value());
    //alert(document.getElementById('ddlVentaResponsable').value());

    //if (pedidoProveedorId == "0") {
    //    pedidoProveedorId = null;
    //}

    var venta = {
        ventaFecha: ventaFecha,
        /*ventaEstado: ventaEstado,*/
        ventaTotal: ventaTotal,
        venta_clienteId: venta_clienteId,
        venta_usuarioId: venta_usuarioId
    };

    $.ajax({
        url: '/api/ventas/crear',
        type: 'POST',
        data: JSON.stringify(venta),
        contentType: 'application/json',
        headers: { "Accept": "application/json" },
        success: function (response) {
            if (response.success) {
                /* pedidoIdAsignado = response.pedidoId;*/
                customAlert(response.message + " ID Venta: " + response.ventaId, "../Resources/img/ImgProductos/productoAgregado.gif");

                //Agregar el ID al campo de ID
                $('#lblMostrarVentaId').text(response.ventaId);
                document.getElementById("btnConfirmarVenta").disabled = false;
                document.getElementById("btnGenerarVenta").disabled = true;
                document.getElementById("inputBuscarInventarioProducto").readOnly = false;
                /*document.getElementById("btnGenerarVenta").disabled = true;*/
                //Agrega a solo lectura a los campos del pedido anteriormente lleneados
                //document.getElementById("tbPedidoFechaEstimada").readOnly = true;
                //document.getElementById("ddlPedidoProveedor").disabled = true;
                //document.getElementById("tbPedidoObservacion").readOnly = true;
                //document.getElementById("btnGenerarPedido").disabled = true;

                //Habilita el textbox inputBuscarProducto y el boton btnGuardarPedido
                /*document.getElementById("inputBuscarProducto").readOnly = false;*/
                /*document.getElementById("btnGuardarPedido").disabled = false;*/
            } else {
                alert('Error: ' + response.message);
            }
        },
        error: function (xhr, status, error) {
            alert('Error al agregar el pedido: ' + (xhr.responseText || error) + ' Status: ' + xhr.status);
            /*customAlert("Los campos con (*) son obligatorios", "../Resources/img/advertenciaCamposObligatorios.gif");*/
        }
    });
}

function recargarDDLClientes() {
    // Realizar la solicitud AJAX para obtener los clientes
    $.ajax({
        type: "POST", // Método POST
        url: "ModuloVentasVenta.aspx/ObtenerClientes", // Ruta a tu método Web
        contentType: "application/json; charset=utf-8", // Tipo de contenido
        dataType: "json", // Tipo de respuesta
        success: function (response) {
            // Obtener el DropDownList
            var ddl = document.getElementById('ddlVentaCliente');

            // Agregar la opción "Seleccione" como primer elemento si no existe
            var optionExists = false;
            for (var i = 0; i < ddl.options.length; i++) {
                if (ddl.options[i].value === "0") {
                    optionExists = true;
                    break;
                }
            }

            if (!optionExists) {
                var option = document.createElement('option');
                option.text = 'Seleccione';
                option.value = '0';
                ddl.add(option);
            }

            // Agregar las opciones de cliente dinámicamente (sin borrar las anteriores)
            var clientes = response.d; // Datos recibidos como un array de objetos
            for (var i = 0; i < clientes.length; i++) {
                var cliente = clientes[i];
                var option = document.createElement('option');
                option.text = cliente.nombreCompleto;
                option.value = cliente.idCliente;
                ddl.add(option);
            }
        },
        error: function (xhr, status, error) {
            alert("Error: " + error); // Muestra el error
            alert(xhr.responseText);  // Muestra la respuesta del servidor
            alert("Hubo un error al cargar los clientes.");
        }
    });
}

function llenarCamposFormulario() {
    $.ajax({
        type: "POST",
        url: "ModuloVentasVenta.aspx/LlenarCamposFormVenta",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            // Asignar valores a los controles del formulario
            document.getElementById('lblVentaFechaCreacion').innerText = response.d.FechaCreacion;
            /*document.getElementById('lblVentaEstado').innerText = response.d.Estado;*/
            document.getElementById('tbVentaNit').value = response.d.TbVentaNit;

            // Buscar el nombre en el dropdown y seleccionarlo si existe
            var ddl = document.getElementById('ddlVentaResponsable');
            var optionToSelect = Array.from(ddl.options).find(option => option.text === response.d.UsuarioNombre);

            if (optionToSelect) {
                ddl.value = optionToSelect.value;
            } else {
                alert("El texto no se encontró en el dropdown");
            }
        },
        error: function (xhr, status, error) {
            alert("Hubo un error: " + error);
        }
    });
}

function mostrarModalProducto(productoID, precioUnitario, stock) {
    // Aquí puedes hacer una llamada adicional para obtener los detalles del producto si es necesario.
    /*alert(productoID);*/
    abrirModal('modalDetalleVenta', '.close');

    //var inputBuscarProducto = $('#inputBuscarProducto').val();
    //var inputVerBuscarProducto = $('#inputVerBuscarProducto').val();

    if ($('#inputBuscarInventarioProducto').val().length > 0) {
        $('#tbDetalleVentaId').val($('#lblMostrarVentaId').text());
    }

    //if ($('#inputVerBuscarProducto').val().length > 0) {
    //    $('#tbDetallePedidoId').val($('#lblVerMostrarPedidoID').text());
    //}
    $('#tbDetalleVentaProductoId').val(productoID);
    $('#tbVentaPrecioUnitario').val(precioUnitario);
    $('#tbVentaStock').val(stock);
    llenarCamposDetallePedidoProducto(productoID);



    /*$("#modalProducto").modal("show"); */// Asegúrate de que el modal tenga este id en tu HTML
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
            $('#tbDetalleVentaProductoNombre').val(producto.productoNombre);
            document.getElementById('ImgDetalleVentaProducto').src = producto.productoImg;
            /*datosOriginalesProducto();*/
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos del producto:', error);
        }
    });
}

/*-------------------- DETALLE VENTAS ----------------------*/

function agregarDetalleVenta(event) {
    event.preventDefault(); // Evita que se recargue la página

    var idVenta = $('#lblMostrarVentaId').text();
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
    /*var detalleVentaId = $('#tbDetallePedidoId').val();*/
    var ventaId = $('#tbDetalleVentaId').val();
    var productoId = $('#tbDetalleVentaProductoId').val();
    var detalleVentaCantidad = $('#tbDetalleVentaProductoCantidad').val();
    var detalleVentaPrecioUnitario = $('#tbVentaPrecioUnitario').val();

    //alert(detalleVentaCantidad);
    //alert(detalleVentaPrecioUnitario);
    /*var detalleVentaCantidad = 0;*/

    /*var detallePedidoSubTotal = 0;*/

    //console.log(detallePedido_PedidoId);
    //console.log(detallePedido_ProductoId);
    //console.log(detallePedidoCantidad);
    //console.log(detallePedidoPrecioUnitario);
    /*console.log(pedidoProveedorId);*/

    // Validación de campos obligatorios
    if (ventaId == "" || productoId == "" || detalleVentaCantidad == "" || detalleVentaPrecioUnitario == "") {
        customAlert("Los campos con (*) son obligatorios", "../Resources/img/advertenciaCamposObligatorios.gif");
        /*alert("Los campos con (*) son obligatorios");*/
        return;
    }

    // Añadir los datos del producto al FormData
    var detalleVenta = {
        ventaId: ventaId,
        productoId: productoId,
        detalleVentaCantidad: detalleVentaCantidad,
        detalleVentaPrecioUnitario: detalleVentaPrecioUnitario
        /*pedidoProveedorId: pedidoProveedorId*/
    };

    // Enviar los datos al servidor
    $.ajax({
        url: '/api/detalleVentas/crear',
        type: 'POST',
        data: JSON.stringify(detalleVenta),
        contentType: 'application/json',
        headers: {
            "Accept": "application/json"
        },
        success: function (response) {
            if (response.success) {
                customAlert(response.message, "../Resources/img/ImgProductos/productoAgregado.gif");
                mostrarListaTablaDeDetallePedido(null, idVenta, null);
                //var inputBuscarProducto = $('#inputBuscarProducto').val();
                //var inputVerBuscarProducto = $('#inputVerBuscarProducto').val();

                //if ($('#inputBuscarProducto').val().length > 0) {
                //    mostrarListaTablaDeDetallePedido(null, idPedido, null);
                //}

                //if ($('#inputVerBuscarProducto').val().length > 0) {
                //    mostrarListaTablaDeVerDetallePedido(null, idPedido, null);
                //}

                /*mostrarListaTablaDeDetallePedido(null, idPedido, null);*/ //pedidoId = null, productoId = null
                /*$('#inputBuscarProducto').val('');*/
                $('#tbDetalleVentaId').val('');
                $('#tbDetalleVentaProductoId').val('');
                $('#tbDetalleVentaProductoNombre').val('');
                $('#tbDetalleVentaProductoCantidad').val('');
                $('#tbVentaStock').val('');
                $('#tbVentaPrecioUnitario').val('');
                document.getElementById('ImgDetalleVentaProducto').src = "";
                $('#modalDetalleVenta').hide();
            } else {
                alert('Error: ' + response.message);
            }
        },
        error: function (xhr, status, error) {
            alert('Error al agregar el producto a la venta: ' + (xhr.responseText || error) + ' Status: ' + xhr.status);
        }
    });

}

//Método para listar el detalle de una venta

function mostrarListaTablaDeDetallePedido(detalleVentaId = null, ventaId = null, productoId = null) {
    // Construir la URL base para la API
    var urlDefault = '/api/detalleVentas';

    // Construir los parámetros de consulta
    var params = [];

    // Agregar el ID si se proporciona
    if (detalleVentaId) {
        params.push('detalleVentaId=' + encodeURIComponent(detalleVentaId));
    }

    // Agregar el ID de venta si se proporciona
    if (ventaId) {
        params.push('ventaId=' + encodeURIComponent(ventaId));
    }

    // Agregar el ID de producto si se proporciona
    if (productoId) {
        params.push('productoId=' + encodeURIComponent(productoId));
    }

    // Si hay parámetros, añadirlos a la URL
    if (params.length > 0) {
        urlDefault += '?' + params.join('&');
    }

    // Realizar la solicitud AJAX
    $.ajax({
        url: urlDefault,  // Ruta a la API de detalle de ventas
        type: 'GET',  // Método GET
        contentType: 'application/json',  // Define el tipo de contenido esperado
        success: function (data) {
            console.log("Datos recibidos:", data); // Para ver la estructura de data

            // Mostrar cada subtotal en la consola
            data.forEach(item => console.log("Subtotal:", item.detalleSubTotal));

            // Generar el HTML del detalle de venta
            var html = generarHtmlDeDetalleVenta(data);
            $('#areaDetalleVenta').html(html);

            // Calcular el total sumando todos los subtotales
            let total = data.reduce((acc, item) => {
                let subtotal = parseFloat(item.detalleSubTotal) || 0;
                return acc + subtotal;
            }, 0);

            // Mostrar el total en un alert y en el contenedor HTML
            /*alert(total);*/
            $('#lblVentaTotal').text(total.toFixed(2));
        },

        error: function (xhr, status, error) {
            // Manejar cualquier error
            alert('Error al obtener el detalle de la venta:', error);
        }
    });
}


//function mostrarListaTablaDeDetallePedido(detalleVentaId = null, ventaId = null, productoId = null) {
//    // Construir la URL base para la API
//    var urlDefault = '/api/detalleVentas';

//    // Construir los parámetros de consulta
//    var params = [];

//    // Agregar el ID si se proporciona
//    if (detalleVentaId) {
//        params.push('detalleVentaId=' + encodeURIComponent(detalleVentaId));
//    }

//    // Agregar el nombre si se proporciona
//    if (ventaId) {
//        params.push('ventaId=' + encodeURIComponent(ventaId));
//    }

//    // Agregar la fecha de creación si se proporciona
//    if (productoId) {
//        params.push('productoId=' + encodeURIComponent(productoId));
//    }

//    // Si hay parámetros, añadirlos a la URL
//    if (params.length > 0) {
//        urlDefault += '?' + params.join('&');
//    }

//    // Realizar la solicitud AJAX
//    $.ajax({
//        url: urlDefault,  // Ruta a la API de productos
//        type: 'GET',  // Método GET
//        contentType: 'application/json',  // Define el tipo de contenido esperado
//        success: function (data) {
//            // Generar el HTML de los productos
//            var html = generarHtmlDeDetalleVenta(data);
//            // Insertar el HTML generado en el contenedor
//            $('#areaDetalleVenta').html(html);
//            /*$('#areaVerDetallePedido').html(html);*/
//        },
//        error: function (xhr, status, error) {
//            // Manejar cualquier error
//            alert('Error al obtener el detalle de la venta:', error);
//        }
//    });
//}

function generarHtmlDeDetalleVenta(detalleVentas) {
    // Verificar si productos es null o un array vacío
    if (!detalleVentas || detalleVentas.length === 0) {
        return '<p>No se encontraron productos.</p>';
    }

    // Si hay productos, generar la tabla
    var html = `
        <table>
            <thead>
                <tr>
                    <th>Id Venta</th>
                    <th>Id Producto</th>
                    <th>Nombre Producto</th>
                    <th>Img</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>SubTotal</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                ${detalleVentas.map(detalleVenta => `
                    <tr>
                        <td>${detalleVenta.ventaId}</td>
                        <td>${detalleVenta.productoId}</td>
                        <td>${detalleVenta.productoNombre}</td>
                        <td>
                            <img src="${detalleVenta.productoImg || '../Resources/img/imgPorDefecto.png'}" alt="${detalleVenta.productoNombre}" style="width: 100px; height: auto;" />
                        </td>
                        <td>${detalleVenta.detalleVentaCantidad}</td>
                        <td>${detalleVenta.detalleVentaPrecioUnitario}</td>
                        <td>${detalleVenta.detalleSubTotal}</td>
                        <td id="areaAccionDetalleVenta">
                            <div id="btnModificarDetalleVenta">
                                <button class="modificarBtn" id="modificarDetalleVentaBtn" onclick="modalModificarDetalleVenta(event, '${detalleVenta.detalleVentaId}');">Modificar</button>
                            </div>
                            <div id="btnEliminarDetalleVenta">
                                <button class="eliminarBtn" id="eliminarDetalleVentaBtn" onclick="eliminarDetalleVenta(event, '${detalleVenta.detalleVentaId}', '${detalleVenta.ventaId}');"><i class="fa fa-trash"></i></button>
                            </div>
                        </td> 
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    return html;
}

//onclick="modalModificarDetallePedido(event, '${detallePedido.detallePedidoId}');"
//onclick="eliminarDetallePedido(event, '${detallePedido.detallePedidoId}', '${detallePedido.detallePedido_PedidoId}');"

function modalModificarDetalleVenta(event, detalleVentaId) {
    event.preventDefault(); // Evita el comportamiento de envío del formulario
    alert(detalleVentaId);
    abrirModal('modalModificarDetalleVentas', '.close');
    llenarCamposFormModificarProductoDetalleVenta(detalleVentaId);
    /*$('#tbModificarDetallePedidoProductoId').val();*/
}

function llenarCamposFormModificarProductoDetalleVenta(detalleVentaId) {
    /*alert(productoId);*/

    $.ajax({
        url: `/api/detalleVentas?detalleVentaId=${detalleVentaId}`, // Asegúrate de que esta URL coincide con la del controlador
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
            var detalleVenta = data[0];

            // Ahora puedes llenar los campos
            $('#tbModificarDetalleVentaId').val(detalleVenta.ventaId);
            $('#tbModificarDetalleVentaProductoId').val(detalleVenta.productoId);
            $('#tbModificarItemDetalleVenta').val(detalleVenta.detalleVentaId);
            document.getElementById('ImgModificarDetalleVentaProducto').src = detalleVenta.productoImg;
            //$('#ImgModificarDetallePedidoProducto').val(detallePedido.detallePedidoImg);
            $('#tbModificarDetalleVentaProductoNombre').val(detalleVenta.productoNombre);
            $('#tbModificarDetalleVentaProductoCantidad').val(detalleVenta.detalleVentaCantidad);
            $('#tbModificarDetalleVentaProductoPrecioUnitario').val(detalleVenta.detalleVentaPrecioUnitario);
            datosOriginalesDetalleVentaProducto();
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos del detalle del producto del pedido:', error);
        }
    });
}

var detalleVentaProductoOriginal;
function datosOriginalesDetalleVentaProducto() {

    detalleVentaProductoOriginal = {
        detalleVentaId: $('#tbModificarItemDetalleVenta').val(),
        ventaId: $('#tbModificarDetalleVentaId').val(),
        productoId: $('#tbModificarDetalleVentaProductoId').val(),
        detalleVentaCantidad: $('#tbModificarDetalleVentaProductoCantidad').val(),
        detalleVentaPrecioUnitario: $('#tbModificarDetalleVentaProductoPrecioUnitario').val()
    };
}

function modificarDetalleVenta(event) {
    event.preventDefault();

    var detalleVentaId = $("#tbModificarItemDetalleVenta").val();
    var ventaId = $("#tbModificarDetalleVentaId").val();
    var productoId = $("#tbModificarDetalleVentaProductoId").val();
    var detalleVentaCantidad = $("#tbModificarDetalleVentaProductoCantidad").val();
    var detalleVentaPrecioUnitario = $("#tbModificarDetalleVentaProductoPrecioUnitario").val();

    //console.log(detallePedidoId);
    //console.log(detallePedido_PedidoId);
    //console.log(detallePedido_ProductoId);
    //console.log(detallePedidoCantidad);

    var formData = new FormData();
    var detalleVenta = {
        detalleVentaId: detalleVentaId,
        ventaId: ventaId,
        productoId: productoId,
        detalleVentaCantidad: detalleVentaCantidad,
        detalleVentaPrecioUnitario: detalleVentaPrecioUnitario
    };

    formData.append('detalleVenta', JSON.stringify(detalleVenta));

    // Comparar si algún campo ha cambiado
    var haCambiado = false;
    for (var campo in detalleVenta) {
        if (detalleVenta[campo] !== detalleVentaProductoOriginal[campo]) {
            haCambiado = true;
            break;
        }
    }

    if (haCambiado) {
        // Realizar la solicitud PUT a la API
        fetch(`/api/detalleVentas/modificar/${detalleVentaId}`, {
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
                mostrarListaTablaDeDetallePedido(null, ventaId, null);
                $('#modalModificarDetalleVentas').hide();
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

function eliminarDetalleVenta(event, detalleVentaId, pedidId) {
    event.preventDefault(); // Evita que la página se recargue o cierre

    if (!detalleVentaId) {
        alert("El ID del detalle de pedido es requerido para eliminar.");
        return;
    }

    // Confirmar la eliminación
    if (confirm("¿Estás seguro de que deseas eliminar este detalle de venta?")) {
        $.ajax({
            url: `/api/detalleVentas/eliminar?detalleVentaId=${encodeURIComponent(detalleVentaId)}`,
            type: 'DELETE',
            success: function (data) {
                if (data.success) {
                    /*alert(data.message);*/
                    customAlert(data.message, "../Resources/img/eliminarPedido.gif");
                    mostrarListaTablaDeDetallePedido(null, pedidId, null);
                    // Opcional: Actualiza la vista, recarga la página o elimina la fila del DOM
                } else {
                    alert("No se pudo eliminar el detalle de venta.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error al eliminar el detalle de venta:", error);
                alert("Ocurrió un error al intentar eliminar el detalle de venta.");
            }
        });
    }
}

function modificarTotalVenta(ventaId, ventaTotal) {
    // Validar los datos de entrada
    if (!ventaId || !ventaTotal || isNaN(ventaTotal) || ventaTotal <= 0) {
        alert("Por favor, ingrese un ID de venta y un total válidos.");
        return;
    }

    // Crear objeto de la venta con los datos
    const venta = {
        ventaId: ventaId,
        ventaTotal: ventaTotal
    };

    // Realizar la solicitud PUT a la API
    fetch('/api/ventas/modificarTotalVenta', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(venta) // Enviar los datos como JSON
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                mostrarListaTablaDeVenta();
                /*alert(data.message);*/ // Mostrar el mensaje de éxito
            } else {
                alert("Hubo un error al modificar la venta. Intente nuevamente.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Hubo un error al modificar la venta. Intente nuevamente.");
        });
}

function descontarStock(event) {
    event.preventDefault();  // Evita que la página se recargue

    var ventaId = $('#lblMostrarVentaId').text();  // Obtener el ID de venta
    var total = parseFloat($('#lblVentaTotal').text());
    //alert(ventaId);
    //alert(total);

    /* Verificar que el ID de venta no sea nulo o vacío */
    if (!ventaId) {
        alert('El ID de venta es obligatorio.');
        return;
    }

    // Realizar la llamada AJAX al API con jQuery
    $.ajax({
        url: '/api/detalleVentas/descontarInventario',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(ventaId),  // Solo enviar el ID de venta como string
        success: function (data) {
            if (data.success) {
                // Resetea el formulario
                /*$('#form1')[0].reset();*/  // Resetear el formulario
                $('#tbVentaNit').val('');
                $('#ddlVentaCliente').val('0');
                $('#lblMostrarVentaId').text('');
                $('#areaDetalleVenta').empty();
                $('#modalNuevaVenta').hide();  // Ocultar el modal si es necesario
                customAlert("Venta realizada con éxito.", "../Resources/img/confirmacionVenta.gif");
                modificarTotalVenta(ventaId, total);
            } else {
                customAlert("Hubo un problema al realizar la venta.", "../Resources/img/eliminarPedido.gif");
            }
        },
        error: function (xhr, status, error) {
            console.error('Error al realizar la operación:', error);
            alert('Error al realizar la operación.');
        }
    });
}

function mostrarListaTablaDeVentas(ventaId = null, fechaInicio = null, fechaFin = null, clienteId = null) {
    // Construir la URL base para la API
    var urlDefault = '/api/ventas';

    // Construir los parámetros de consulta
    var params = [];

    // Agregar el ID de venta si se proporciona
    if (ventaId) {
        params.push('ventaId=' + encodeURIComponent(ventaId));
    }

    // Agregar la fecha de inicio si se proporciona
    if (fechaInicio) {
        params.push('fechaInicio=' + encodeURIComponent(fechaInicio));
    }

    // Agregar la fecha de fin si se proporciona
    if (fechaFin) {
        params.push('fechaFin=' + encodeURIComponent(fechaFin));
    }

    // Agregar el ID del cliente si se proporciona
    if (clienteId) {
        params.push('clienteId=' + encodeURIComponent(clienteId));
    }

    // Si hay parámetros, añadirlos a la URL
    if (params.length > 0) {
        urlDefault += '?' + params.join('&');
    }

    // Realizar la solicitud AJAX
    $.ajax({
        url: urlDefault,  // Ruta a la API de ventas
        type: 'GET',  // Método GET
        contentType: 'application/json',  // Define el tipo de contenido esperado
        success: function (data) {
            // Generar el HTML de las ventas
            var html = generarHtmlDeVentas(data);
            // Insertar el HTML generado en el contenedor
            $('#contenedor-tabla').html(html);
        },
        error: function (xhr, status, error) {
            // Manejar cualquier error
            alert('Error al obtener las ventas: ' + error);
        }
    });
}

function generarHtmlDeVentas(ventas) {
    // Verificar si ventas es null o un array vacío
    if (!ventas || ventas.length === 0) {
        return '<p>No se encontraron ventas.</p>';
    }

    // Si hay ventas, generar la tabla
    var html = `
        <table>
            <thead>
                <tr>
                    <th>Código Venta</th>
                    <th>Fecha de Venta</th>
                    <th>Nombre Cliente</th>
                    <th>Total</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                ${ventas.map(venta => `
                    <tr>
                        <td>${venta.ventaId}</td>
                        <td>${formatDate(venta.ventaFecha)}</td>
                        <td>${venta.venta_clienteNombre}</td>
                        <td>${venta.ventaTotal}</td>
                        <td id="areaAccionDetalleVenta">
                            <div id="btnModificarDetalleVenta">
                                <button class="modificarBtn" id="modificarDetalleVentaBtn" onclick="modalVerVenta(event, '${venta.ventaId}');">Ver Detalle</button>
                            </div>     
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    return html;
}

function formatDate(dateString) {
    if (!dateString) return 'Fecha no disponible';

    // Usar moment.js para convertir la cadena y formatearla a "dd-MM-yyyy"
    var formattedDate = moment(dateString).format('YYYY-MM-DD');

    // Si la fecha no es válida, moment devuelve "Invalid date"
    return formattedDate === 'Invalid date' ? 'Fecha no válida' : formattedDate;
}

function modalVerVenta(event, ventaId) {
    event.preventDefault();
    /*alert(pedidoId);*/
    /*alert(pedidoEstado);*/
    abrirModal('modalVerVenta', '.close');
    llenarCamposVerDetalleVenta(ventaId);
    /*alert(ventaId);*/
    //mostrarListaTablaDeVerDetallePedido(null, pedidoId, null)
    mostrarListaTablaDeVerDetalleVenta(null, ventaId, null);
    //llenarCamposVerDetallePedido(pedidoId);

    //if (pedidoEstado == "Completo") {
    //    document.getElementById("btnConfirmarPedido").disabled = true;
    //    document.getElementById("inputVerBuscarProducto").disabled = true;
    //    /* inhabilitarBotonesDetallePedido();*/
    //    //document.getElementById("modificarDetallePedidoBtn").disabled = true;
    //    //document.getElementById("eliminarDetallePedidoBtn").disabled = true;
    //} else {
    //    document.getElementById("btnConfirmarPedido").disabled = false;
    //    document.getElementById("inputVerBuscarProducto").disabled = false;
    //}
}

function llenarCamposVerDetalleVenta(ventaId) {
    $.ajax({
        url: `/api/ventas?ventaId=${ventaId}`, // Asegúrate de que esta URL coincide con la del controlador
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);

            // Verifica si recibiste una lista y que no está vacía
            if (data === null || data.length === 0) {
                alert('No se encontró la venta.');
                return;
            }

            // Obtiene el primer registro de la lista
            var venta = data[0];

            // Ahora puedes llenar los campos
            $('#lblVerVentaFechaCreacion').text(formatDate(venta.ventaFecha.split('T')[0]));
            $('#lblVerVentaTotal').text(venta.ventaTotal);
            $('#ddlVerVentaResponsable').val(venta.venta_usuarioId); // Suponiendo que tienes un ID para el responsable
            $('#ddlVerVentaCliente').val(venta.venta_clienteId); // Suponiendo que tienes un ID para el cliente
            $('#tbVerVentaNit').val(venta.venta_clienteNit); // Si es un campo de texto, lo puedes usar de esta manera
           /* $('#lblVerVentaId').text(venta.venta_clienteCui);*/ // Asignando el ID de la venta a la etiqueta correspondiente

            // Otros campos que puedas querer llenar
            // Por ejemplo, puedes hacer lo mismo con otros datos que provengan de la venta
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos de la venta:', error);
        }
    });
}

function mostrarListaTablaDeVerDetalleVenta(detalleVentaId = null, ventaId = null, productoId = null) {
    // Construir la URL base para la API
    var urlDefault = '/api/detalleVentas';

    // Construir los parámetros de consulta
    var params = [];

    // Agregar el ID del detalle de venta si se proporciona
    if (detalleVentaId) {
        params.push('detalleVentaId=' + encodeURIComponent(detalleVentaId));
    }

    // Agregar el ID de la venta si se proporciona
    if (ventaId) {
        params.push('ventaId=' + encodeURIComponent(ventaId));
    }

    // Agregar el ID del producto si se proporciona
    if (productoId) {
        params.push('productoId=' + encodeURIComponent(productoId));
    }

    // Si hay parámetros, añadirlos a la URL
    if (params.length > 0) {
        urlDefault += '?' + params.join('&');
    }

    // Realizar la solicitud AJAX
    $.ajax({
        url: urlDefault,  // Ruta a la API de detalle de ventas
        type: 'GET',  // Método GET
        contentType: 'application/json',  // Define el tipo de contenido esperado
        success: function (data) {
            // Generar el HTML de los detalles de la venta
            var html = generarHtmlDeVerDetalleVenta(data);
            // Insertar el HTML generado en el contenedor
            $('#areaVerDetalleVenta').html(html);
            $('#lblVerVentaId').text(ventaId);
        },
        error: function (xhr, status, error) {
            // Manejar cualquier error
            alert('Error al obtener el detalle de la venta:', error);
        }
    });
}

function generarHtmlDeVerDetalleVenta(detalleVentas) {
    // Verificar si detalleVentas es null o un array vacío
    if (!detalleVentas || detalleVentas.length === 0) {
        return '<p>No se encontraron detalles de venta.</p>';
    }

    // Si hay detalles de venta, generar la tabla
    var html = `
        <table>
            <thead>
                <tr>
                    <th>Id Venta</th>
                    <th>Id Producto</th>
                    <th>Nombre Producto</th>
                    <th>Img Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario (Q)</th>
                </tr>
            </thead>
            <tbody>
                ${detalleVentas.map(detalleVenta => `
                    <tr>
                        <td>${detalleVenta.ventaId}</td>
                        <td>${detalleVenta.productoId}</td>
                        <td>${detalleVenta.productoNombre}</td>
                        <td>
                            <img src="${detalleVenta.productoImg || '../Resources/img/imgPorDefecto.png'}" alt="${detalleVenta.detalleVentaProductoNombre}" style="width: 100px; height: auto;" />
                        </td>
                        <td>${detalleVenta.detalleVentaCantidad}</td> 
                        <td>${detalleVenta.detalleVentaPrecioUnitario.toFixed(2)}</td> 
                         
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    return html;
}


document.getElementById('tbBuscarVentaPorID').addEventListener('keyup', function () {

    var textoBuscador = this.value.trim(); // Elimina espacios en blanco al inicio y final
    mostrarListaTablaDeVentas(textoBuscador, null, null, null);

});

document.getElementById('tbBuscarVentaFechaCreacion').addEventListener('change', function () {

    var textoBuscador1 = this.value.trim(); // Elimina espacios en blanco al inicio y final
    document.getElementById('tbBuscarFechaMinima').addEventListener('change', function () {

        var textoBuscador2 = this.value.trim(); // Elimina espacios en blanco al inicio y final
        mostrarListaTablaDeVentas(null, textoBuscador1, textoBuscador2, null);

    });

});

document.getElementById('ddlBuscarVentaCliente').addEventListener('change', function () {
    var textoBuscador = this.value; // Captura el estado seleccionado

    // Si selecciona "Todo" (valor vacío), enviamos null para obtener el listado completo

    if (textoBuscador.length == 1) {
        textoBuscador = null;
    }

    // Llamamos a la función con el filtro de estado
    mostrarListaTablaDeVentas(null, null, null, textoBuscador);
});
