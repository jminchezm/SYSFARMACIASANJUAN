document.addEventListener('DOMContentLoaded', function () {

    mostrarListaTablaDeProductos();

    // Función genérica para abrir cualquier modal
    function abrirModal(modalId, closeClass) {
        var modal = document.getElementById(modalId);
        modal.style.display = 'flex';

        // Cerrar el modal cuando se hace clic en el botón de cerrar
        modal.querySelector(closeClass).addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    // Mostrar el modal de crear producto
    document.querySelector('#btnCrearProducto').addEventListener('click', function () {
        abrirModal('modalNuevoProducto', '.close');
        cargarSubCategorias($('#ddlProductoSubCategoria'));
    });

     /*Mostrar el modal de modificar producto*/
    document.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('modificarBtn')) {
            abrirModal('modalModificarProducto', '.close');
            cargarSubCategorias($('#ddlProductoSubCategoriaModificar'));
        }
    });

});

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

function formatDate(dateString) {
    if (!dateString) return 'Fecha no disponible';

    // Usar moment.js para convertir la cadena y formatearla a "dd-MM-yyyy"
    var formattedDate = moment(dateString).format('YYYY-MM-DD');

    // Si la fecha no es válida, moment devuelve "Invalid date"
    return formattedDate === 'Invalid date' ? 'Fecha no válida' : formattedDate;
}

// Función para generar el HTML de la tabla con todos los empleados
function generarHtmlDeProductos(productos) {
    // Verificar si productos es null o un array vacío
    if (!productos || productos.length === 0) {
        return '<p>No se encontraron productos.</p>';
    }

    // Si hay productos, generar la tabla
    var html = `
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Fecha de Creación</th>
                    <th>Forma Médica</th>
                    <th>Vía Administración</th>
                    <th>Casa Médica</th>
                    <th>SubCategoría</th>
                    <th>Estado</th>
                    <th>Imágen</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                ${productos.map(producto => `
                    <tr>
                        <td>${producto.productoID}</td>
                        <td>${producto.productoNombre}</td>
                        <td>${producto.productoDescripcion}</td>
                        <td>${formatDate(producto.productoFechaCreacion) }</td>
                        <td>${producto.productoFormaFarmaceutica}</td>
                        <td>${producto.productoViaAdministracion}</td>
                        <td>${producto.productoCasaMedica}</td>
                        <td>${producto.productoSubCategoria}</td>
                        <td>${producto.productoEstado}</td>
                        <td>
                            <img src="${producto.productoImg || '../Resources/img/imgPorDefecto.png'}" alt="${producto.productoNombre}" style="width: 175px; height: auto;" />
                        </td>
                        <td id="areaAccionProductos">
                            <div id="btnModificarProducto">
                                <button class="modificarBtn" id="modificarProductoBtn" onclick="llenarCamposFormModificarProducto('${producto.productoID}');">Modificar</button>
                            </div>
                            <div id="btnEliminarProducto">
                                <button class="eliminarBtn" id="eliminarProductoBtn" onclick="modificarEstadoProducto('${producto.productoID}', 'Inactivo');"><i class="fa fa-trash"></i></button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    return html;
}

/*<img src="${producto.productoImg || '../Resources/img/imgPorDefecto.png'}" alt="${producto.productoNombre}" style="width: 175px; height: auto;" />*/

function mostrarListaTablaDeProductos(id = null, nombre = null, fechaCreacion = null, estado = null) {
    // Construir la URL base para la API
    var urlDefault = '/api/productos';

    // Construir los parámetros de consulta
    var params = [];

    // Agregar el ID si se proporciona
    if (id) {
        params.push('id=' + encodeURIComponent(id));
    }

    // Agregar el nombre si se proporciona
    if (nombre) {
        params.push('nombre=' + encodeURIComponent(nombre));
    }

    // Agregar la fecha de creación si se proporciona
    if (fechaCreacion) {
        params.push('fechaCreacion=' + encodeURIComponent(fechaCreacion));
    }

    // Agregar el estado si se proporciona
    if (estado) {
        params.push('estado=' + encodeURIComponent(estado));
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
            var html = generarHtmlDeProductos(data);
            // Insertar el HTML generado en el contenedor
            $('#contenedor-tabla').html(html);
        },
        error: function (xhr, status, error) {
            // Manejar cualquier error
            alert('Error al obtener los productos:', error);
        }
    });
}

//function mostrarListaTablaDeProductos(id = null, nombre = null, fechaCreacion = null) {
//    //id = null, nombre = null, fechaCreacion = null

//    // Construir la URL base para la API
//    var urlDefault = '/api/productos';
//    /*alert(urlDefault);*/

//    // Construir los parámetros de consulta
//    var params = [];

//    // Agregar el ID si se proporciona
//    if (id) {
//        params.push('id=' + encodeURIComponent(id));
//        /*aler('Hay parametro id');*/
//    }

//    // Agregar el nombre si se proporciona
//    if (nombre) {
//        params.push('nombre=' + encodeURIComponent(nombre));
//        /*aler('Hay parametro nombre');*/
//    }

//    // Agregar la fecha de creación si se proporciona
//    if (fechaCreacion) {
//        params.push('fechaCreacion=' + encodeURIComponent(fechaCreacion));
//        /*aler('Hay parametro Fecha de creacion');*/
//    }

//    // Si hay parámetros, añadirlos a la URL
//    if (params.length > 0) {
//        urlDefault += '?' + params.join('&');
//    }

//    /*alert(urlDefault);*/

//    $.ajax({
//        url: urlDefault,  // Ruta a la API de productos
//        type: 'GET',  // Método GET
//        contentType: 'application/json',  // Define el tipo de contenido esperado
//        success: function (data) {
//            // Generar el HTML de los productos
//            /*alert('Esta es la data', url);*/
//            var html = generarHtmlDeProductos(data);
//            // Insertar el HTML generado en el contenedor
//            $('#contenedor-tabla').html(html);
//            /*alet('Mostrando productos');*/
//        },
//        error: function (xhr, status, error) {
//            // Manejar cualquier error
//            alert('Error al obtener los productos:', error);
//        }
//    });
//}

document.getElementById('tbBuscarProductoPorID').addEventListener('keyup', function () {

    var textoBuscador = this.value.trim(); // Elimina espacios en blanco al inicio y final
    var estado = $('#ddlBuscarPorEstado').val();

    /*alert(estado);*/

    if (estado == "") {
        mostrarListaTablaDeProductos(textoBuscador);
    } else if (estado == "Activo") {
        mostrarListaTablaDeProductos(textoBuscador, null, null, estado);
    } else if (estado == "Inactivo") {
        mostrarListaTablaDeProductos(textoBuscador, null, null, estado);
    }

    /*mostrarListaTablaDeProductos(textoBuscador);*/

});

document.getElementById('tbBuscarProductoPorNombre').addEventListener('keyup', function () {

    var textoBuscador = this.value.trim(); // Elimina espacios en blanco al inicio y final
    var estado = $('#ddlBuscarPorEstado').val();

    if (estado == "") {
        mostrarListaTablaDeProductos(null, textoBuscador);
    } else if (estado == "Activo") {
        mostrarListaTablaDeProductos(null, textoBuscador, null, estado);
    } else if (estado == "Inactivo") {
        mostrarListaTablaDeProductos(null, textoBuscador, null, estado);
    }

    /*mostrarListaTablaDeProductos(null,textoBuscador);*/

});

document.getElementById('tbBuscarProductoFechaCreacion').addEventListener('change', function () {

    var textoBuscador = this.value; // Elimina espacios en blanco al inicio y final
    var estado = $('#ddlBuscarPorEstado').val();
    /*alert(textoBuscador)*/

    if (estado == "") {
        mostrarListaTablaDeProductos(null, null, textoBuscador, estado);
    } else if (estado == "Activo") {
        mostrarListaTablaDeProductos(null, null, textoBuscador, estado);
    } else if (estado == "Inactivo") {
        mostrarListaTablaDeProductos(null, null, textoBuscador, estado);
    }

    /*mostrarListaTablaDeProductos(null, null, textoBuscador);*/

});

// Nuevo evento para buscar por estado
document.getElementById('ddlBuscarPorEstado').addEventListener('change', function () {
    var textoBuscador = this.value; // Captura el estado seleccionado

    // Si selecciona "Todo" (valor vacío), enviamos null para obtener el listado completo
    if (textoBuscador === "") {
        textoBuscador = null;
    }

    // Llamamos a la función con el filtro de estado
    mostrarListaTablaDeProductos(null, null, null, textoBuscador);
});


function cargarSubCategorias(ddlComponent) {
    $.ajax({
        type: "POST",
        url: "InventarioProductos.aspx/ListarSubCategoriaProducto",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response); // Inspecciona la respuesta
            var subcategorias = response.d || []; // Asegúrate de que sea un array
            ddlComponent.empty(); // Limpiar las opciones existentes
            ddlComponent.append($('<option>', {
                value: 0,
                text: 'Seleccione'
            }));

            // Usar forEach en lugar de $.each
            subcategorias.forEach(function (item) {
                if (item.Value && item.Text) { // Asegúrate de que ambos campos existan
                    ddlComponent.append($('<option>', {
                        value: item.Value,
                        text: item.Text
                    }));
                } else {
                    console.warn("Elemento sin Value o Text:", item); // Aviso en consola
                }
            });
        },
        error: function (response) {
            console.error("Error:", response); // Muestra más información sobre el error
            alert("Error al cargar las subcategorías");
        }
    });
}

function buscarSubCategoriaIdPorNombre(nombre) {
    var id = null; // Inicializar la variable de retorno

    $.ajax({
        type: "POST",
        url: "InventarioProductos.aspx/obtenerSubCategoriaPorNombre",
        data: JSON.stringify({ nombreSubCategoria: nombre }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false, // Esto es importante para asegurarte de que se espera la respuesta antes de continuar
        success: function (response) {
            if (response.d.length > 0) {
                id = response.d[0].Value; // Asignar el ID de la subcategoría
            }
        },
        error: function (response) {
            alert("Error al cargar la subcategoría");
        }
    });

    return id; // Retornar el ID o null si no se encontró
}

function agregarProducto(event) {
    event.preventDefault(); // Evita que se recargue la página

    // Obtén los valores de cada campo
    var productoNombre = $('#tbProductoNombre').val();
    var productoDescripcion = $('#tbProductoDescripcion').val();
    var productoFormaFarmaceutica = $('#tbFormaFarmaceuticaProducto').val();
    var productoViaAdministracion = $('#tbViaAdministracionProducto').val();
    var productoCasaMedica = $('#tbCasaMedicaProducto').val();
    var productoSubCategoria = $('#ddlProductoSubCategoria').val();
    var productoEstado = "Activo";

    // Validación de campos obligatorios
    if (!productoNombre || productoSubCategoria === "0") {
        customAlert("Los campos con (*) son obligatorios", "../Resources/img/advertenciaCamposObligatorios.gif");
        /*alert("Los campos con (*) son obligatorios");*/
        return;
    }

    // Cargar imagen
    var fileInput = $('#FileUpload1')[0];
    var formData = new FormData(); // Crear un objeto FormData

    // Añadir los datos del producto al FormData
    var producto = {
        productoNombre: productoNombre,
        productoDescripcion: productoDescripcion,
        productoFechaCreacion: new Date().toISOString(),
        productoFormaFarmaceutica: productoFormaFarmaceutica,
        productoViaAdministracion: productoViaAdministracion,
        productoCasaMedica: productoCasaMedica,
        productoSubCategoria: productoSubCategoria,
        productoEstado: productoEstado
    };

    // Añadir el producto como JSON
    formData.append('producto', JSON.stringify(producto));

    // Si se ha seleccionado un archivo, añadirlo al FormData
    if (fileInput.files.length > 0) {
        formData.append('productoImg', fileInput.files[0]); // Agrega el archivo al FormData
    }

    // Enviar los datos al servidor
    $.ajax({
        url: '/api/productos/crear', // Cambia esto a tu endpoint correspondiente
        type: 'POST',
        data: formData,
        processData: false, // Evitar que jQuery procese los datos
        contentType: false, // Evitar que jQuery establezca el contentType
        headers: {
            "Accept": "application/json"
        },
        success: function (response) {
            if (response.success) {
                customAlert(response.message, "../Resources/img/ImgProductos/productoAgregado.gif");
                /*alert(response.message);*/ // Mensaje de éxito desde el backend
                $('#tbProductoNombre').val('');
                $('#tbProductoDescripcion').val('');
                $('#tbFormaFarmaceuticaProducto').val('');
                $('#tbViaAdministracionProducto').val('');
                $('#tbCasaMedicaProducto').val('');
                $('#ddlProductoSubCategoria').val('0');
                $('#FileUpload1').val('');
                mostrarListaTablaDeProductos();
            } else {
                alert('Error: ' + response.message); // Muestra el mensaje de error específico
            }
        },
        error: function (xhr, status, error) {
            alert('Error al agregar el producto: ' + (xhr.responseText || error));
        }
    });
}

var productoOriginal;
function datosOriginalesProducto() {

    productoOriginal = {
        productoID: $('#tbProductoIdModificar').val(),
        productoNombre: $('#tbProductoNombreModificar').val(),
        productoDescripcion: $('#tbProductoDescripcionModificar').val(),
        productoFechaCreacion: $('#tbFechaDeCreacionModificar').val(),
        productoFormaFarmaceutica: $('#tbFormaFarmaceuticaProductoModificar').val(),
        productoViaAdministracion: $('#tbViaAdministracionProductoModificar').val(),
        productoCasaMedica: $('#tbCasaMedicaProductoModificar').val(),
        productoSubCategoria: $('#ddlProductoSubCategoriaModificar').val(),
        productoEstado: $('#ddlProductoEstado').val()
    };

    //alert(productoOriginal.productoID);
    //alert(productoOriginal.productoNombre);
    //alert(productoOriginal.productoDescripcion);
    //alert(productoOriginal.productoFechaCreacion);
    //alert(productoOriginal.productoFormaFarmaceutica);
    //alert(productoOriginal.productoViaAdministracion);
    //alert(productoOriginal.productoCasaMedica);
    //alert(productoOriginal.productoSubCategoria);

}

//Método que rellena los compos del formulario modificar producto
function llenarCamposFormModificarProducto(productoId) {
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
            $('#tbProductoIdModificar').val(producto.productoID);
            $('#tbProductoNombreModificar').val(producto.productoNombre);
            $('#tbProductoDescripcionModificar').val(producto.productoDescripcion);
            $('#tbFechaDeCreacionModificar').val(formatDate(producto.productoFechaCreacion.split('T')[0]));
            $('#tbFormaFarmaceuticaProductoModificar').val(producto.productoFormaFarmaceutica);
            $('#tbViaAdministracionProductoModificar').val(producto.productoViaAdministracion);
            $('#tbCasaMedicaProductoModificar').val(producto.productoCasaMedica);
            $('#ddlProductoEstado').val(producto.productoEstado);
            $('#ddlProductoSubCategoriaModificar').val(buscarSubCategoriaIdPorNombre(producto.productoSubCategoria.trim()));
            document.getElementById('ImgProductoModificara').src = producto.productoImg;
            datosOriginalesProducto();
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos del producto:', error);
        }
    });
}

function limpiarCamposModificarProducto() {
    $('#tbProductoIdModificar').val('');
    $('#tbProductoNombreModificar').val('');
    $('#tbProductoDescripcionModificar').val('');
    $('#tbFechaDeCreacionModificar').val('');
    $('#tbFormaFarmaceuticaProductoModificar').val('');
    $('#tbViaAdministracionProductoModificar').val('');
    $('#tbCasaMedicaProductoModificar').val('');
    $('#ddlProductoSubCategoriaModificar').val('0');
    $('#ddlProductoEstado').val('');
    $('#FileUpload1Modificar').val('');
}

function modificarProducto(event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto
    var estado = $('#ddlBuscarPorEstado').val();

    // Obtén los valores de los campos del formulario
    var productoId = $("#tbProductoIdModificar").val();
    var productoNombre = $("#tbProductoNombreModificar").val();
    var productoDescripcion = $("#tbProductoDescripcionModificar").val();
    var productoFechaCreacion = $("#tbFechaDeCreacionModificar").val();
    var productoFormaFarmaceutica = $("#tbFormaFarmaceuticaProductoModificar").val();
    var productoViaAdministracion = $("#tbViaAdministracionProductoModificar").val();
    var productoCasaMedica = $("#tbCasaMedicaProductoModificar").val();
    var productoSubCategoria = $("#ddlProductoSubCategoriaModificar").val();
    var productoEstado = $("#ddlProductoEstado").val();
    var fileInput = $("#FileUpload1Modificar")[0];

    // Crear un objeto FormData para manejar la subida del archivo e información del producto
    var formData = new FormData();

    // Agregar los campos de texto al FormData
    var producto = {
        productoID: productoId,
        productoNombre: productoNombre,
        productoDescripcion: productoDescripcion,
        productoFechaCreacion: productoFechaCreacion,
        productoFormaFarmaceutica: productoFormaFarmaceutica,
        productoViaAdministracion: productoViaAdministracion,
        productoCasaMedica: productoCasaMedica,
        productoSubCategoria: productoSubCategoria,
        productoEstado: productoEstado
    };

    //alert(producto.productoID);
    //alert(producto.productoNombre);
    //alert(producto.productoDescripcion);
    //alert(producto.productoFechaCreacion);
    //alert(producto.productoFormaFarmaceutica);
    //alert(producto.productoViaAdministracion);
    //alert(producto.productoCasaMedica);
    //alert(producto.productoSubCategoria);

    // Agregar el objeto producto en formato JSON
    formData.append('producto', JSON.stringify(producto));

    // Agregar la imagen al FormData (si hay una imagen seleccionada)
    if (fileInput.files.length > 0) {
        formData.append('productoImg', fileInput.files[0]);
    }

    // Comparar si algún campo ha cambiado
    var haCambiado = false;
    for (var campo in producto) {
        if (producto[campo] !== productoOriginal[campo]) {
            haCambiado = true;
            break;
        }
    }

    //alert(haCambiado);
    //alert(fileInput.files.length > 0);

    if (haCambiado || fileInput.files.length > 0) {
    // Realizar la solicitud PUT a la API
    $.ajax({
        url: '/api/producto/modificar/' + productoId,
        type: 'PUT',
        data: formData,
        contentType: false,  // Necesario para que jQuery no configure el Content-Type incorrectamente
        processData: false,  // No procesar los datos en cadena
        success: function (response) {
            if (response.mensaje) {
                customAlert(response.mensaje, "../Resources/img/ImgProductos/productoModificado.gif");           
                // Cerrar el modal
                $('#modalModificarProducto').css('display', 'none');
                limpiarCamposModificarProducto(); 
                if (estado == "") {
                    mostrarListaTablaDeProductos(null, null, null, estado);
                } else if (estado == "Activo") {
                    mostrarListaTablaDeProductos(null, null, null, estado);
                } else if (estado == "Inactivo") {
                    mostrarListaTablaDeProductos(null, null, null, estado);
                }

                /*mostrarListaTablaDeProductos();*/
                // Aquí puedes actualizar la interfaz si es necesario, como cerrar el modal
            } else {
                customAlert("Hubo un problema al modificar el producto.", "../Resources/img/alerta.gif");
            }
        },

        error: function (xhr, status, error) {
            console.error("Error completo:", xhr, status, error);  // Consola para más detalles
            alert("Ocurrió un error: " + error + "\nDetalles: " + xhr.responseText + "\nEstado: " + xhr.statusText);
        }
    });

    } else {
        // Si no ha cambiado nada, mostrar un mensaje
        customAlert("No se ha modificado ningún campo", "../Resources/img/advertenciaCamposObligatorios.gif");
    }
}

function modificarEstadoProducto(productoId, nuevoEstado) {
    var estado = $('#ddlBuscarPorEstado').val();
    // Verifica si los valores son válidos
    if (!productoId || !nuevoEstado) {
        alert("Producto ID o estado inválido.");
        return;
    }

    $.ajax({
        url: `/api/producto/modificar/estadoProducto/${productoId}`, // URL hacia tu API
        type: 'PUT', // Método HTTP PUT
        contentType: 'application/json; charset=utf-8', // Asegúrate de enviar JSON
        data: JSON.stringify({ productoEstado: nuevoEstado }), // Clave en minúscula
        success: function (response) {
            // Acción en caso de éxito
            customAlert(response.message, "../Resources/img/ImgProductos/productoModificado.gif");
            if (estado == "") {
                mostrarListaTablaDeProductos(null, null, null, estado);
            } else if (estado == "Activo") {
                mostrarListaTablaDeProductos(null, null, null, estado);
            } else if (estado == "Inactivo") {
                mostrarListaTablaDeProductos(null, null, null, estado);
            }
            /*mostrarListaTablaDeProductos();*/
        },
        error: function (xhr, status, error) {
            // Manejo de errores
            console.error("Error: " + xhr.responseText);
            alert("No se pudo actualizar el estado del producto. Inténtalo de nuevo.");
        }
    });
}