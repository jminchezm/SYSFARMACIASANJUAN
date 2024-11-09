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
} function customAlert(message, imageUrl = null) {
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
        data: { inventarioProductoNombre: filtroNombre },  // Cambiar el nombre del parámetro
        contentType: "application/json",
        success: function (data) {
            // Actualiza el contenido del contenedor de resultados
            if (data.length > 0) {
                const items = data.map(inventarioProducto => `
                    <div class="producto-item" data-id="${inventarioProducto.inventarioProductoProductoId}" style="display: flex; align-items: center; padding: 10px; border-bottom: 1px solid #ddd;">
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
                    alert(inventarioProductoId);
                    /*mostrarModalProducto(inventarioProductoId);*/
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

                //alert(document.getElementById('ddlVentaCliente').value);
                //alert(document.getElementById('ddlVentaResponsable').value);

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
        alert(nitCliente);
        obtenerCliente(null, null, nitCliente, null);

        var nombreCompleto = $('#ddlVentaCliente').val();
        alert(nombreCompleto);

        if (nombreCompleto == 0) {
            crearVenta();
        }

    } else {
        alert("Debes de agregar a un cliente o consumidor final");
    }
}

function resetForm() {
    alert('Hola');
    document.getElementById('form1').reset(); // Resetea todos los elementos del formulario
}

function crearVenta() {
    /*event.preventDefault();*/

    var ventaFecha = $('#lblVentaFechaCreacion').text();
    var ventaEstado = $('#lblVentaEstado').text();
    var ventaTotal = $('#lblVentaTotal').text(); //.trim() === '' ? null : $('#lblVentaTotal').text()
    var venta_clienteId = "CLT0000001";
    var venta_usuarioId = 'U0001'; //$('#ddlVentaResponsable').val()
    //alert(document.getElementById('ddlVentaCliente').value());
    //alert(document.getElementById('ddlVentaResponsable').value());

    //if (pedidoProveedorId == "0") {
    //    pedidoProveedorId = null;
    //}

    var venta = {
        ventaFecha: ventaFecha,
        ventaEstado: ventaEstado,
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