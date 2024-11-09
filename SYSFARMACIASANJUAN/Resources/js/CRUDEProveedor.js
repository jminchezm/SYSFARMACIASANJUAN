document.addEventListener('DOMContentLoaded', function () {
    // Función genérica para abrir cualquier modal
    function abrirModal(modalId, closeClass) {
        var modal = document.getElementById(modalId);
        modal.style.display = 'flex';

        // Cerrar el modal cuando se hace clic en el botón de cerrar
        modal.querySelector(closeClass).addEventListener('click', function () {
            modal.style.display = 'none';
        });

        // Cerrar el modal cuando se hace clic fuera del modal
        //window.addEventListener('click', function (event) {
        //    if (event.target == modal) {
        //        modal.style.display = 'none';
        //    }
        //});
    }

    // Mostrar el modal de agregar empleado
    document.querySelector('.botonRegistrarProveedor').addEventListener('click', function () {
        abrirModal('modalRegistrarProveedor', '.close');
    });

    // Mostrar el modal de listar y modificar empleado
    document.querySelector('.botonModificarProveedor').addEventListener('click', function () {
        abrirModal('modalModificarProveedor', '.closeModificarProveedor');
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

function agregarProveedor(event) {
    // Prevenir que el formulario cierre el modal
    event.preventDefault();



    // Obtener valores de los campos
    var nombreProveedor = $('#tbNombreProveedor').val() === '' ? null : $('#tbNombreProveedor').val();
    var teleProveedor = $('#tbTeleProveedor').val() === '' ? null : $('#tbTeleProveedor').val();
    var celProveedor = $('#tbCelProveedor').val() === '' ? null : $('#tbCelProveedor').val();
    var direccionProveedor = $('#tbDireccionProveedor').val() === '' ? null : $('#tbDireccionProveedor').val();
    var correoProveedor = $('#tbCorreoProveedor').val() === '' ? null : $('#tbCorreoProveedor').val();
    var municipioProveedor = $('#ddlMunicipioProveedor').val() === '' ? null : $('#ddlMunicipioProveedor').val();

    //var puestoProveedor = $('#ddlPuestoProveedor').val() === '' ? null : $('#ddlPuestoProveedor').val();

    if (nombreProveedor != null && celProveedor != null && direccionProveedor != null) {

        // Si todas las validaciones pasan, crear el objeto Proveedor
        var proveedor = {
            nombre: nombreProveedor,
            telefono: teleProveedor,
            celular: celProveedor,
            direccion: direccionProveedor,
            correo: correoProveedor,
            //municipio: municipioProveedor,
            municipio_id: municipioProveedor
        };

        // Enviar la información si pasa las validaciones
        $.ajax({
            url: '/api/proveedores',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(proveedor),
            success: function (response) {
                /*alert("Proveedor agregado exitosamente");*/
                customAlert("Proveedor agregado exitosamente", "../Resources/img/AgregarCliente.png");

                /*Limpiar los campos del formulario*/
                $('#tbNombreProveedor').val('');
                $('#tbTeleProveedor').val('');
                $('#tbCelProveedor').val('');
                $('#tbDireccionProveedor').val('');
                $('#tbCorreoProveedor').val('');
                $('#ddlMunicipioProveedor').val('');


            },
            error: function (xhr, status, error) {
                /*console.log("Error al agregar el Proveedor: " + xhr.responseText);*/
                customAlert("Los campos con (*) son obligatorios", "../Resources/img/advertenciaCamposObligatorios.gif");
            }
        });
    } else {
        /*alert("Los campos con * son obligatorios");*/
        customAlert("Los campos con (*) son obligatorios", "../Resources/img/advertenciaCamposObligatorios.gif");
    }
}


function generarHtmlDeProveedores(proveedores) {
    if (!proveedores || proveedores.length === 0) {
        return '<p>No se encontraron empleados.</p>';
    }

    // Si hay empleados, generar la tabla
    var html = `
                <table>
                    <thead>
                        <tr>
                            <th>idProveedor</th>
                            <th>Nombre Completo</th>
                            <th>Telefono</th>
                            <th>celular</th>
                            <th>dirrecion Nacimiento</th>
                            <th>correo Ingreso</th>
                            <th>municipio</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${proveedores.map(proveedor => `
                            <tr>
                                <td>${proveedor.idProveedor}</td>
                                <td>${proveedor.nombre}</td>
                                <td>${proveedor.telefono}</td>
                                <td>${proveedor.celular}</td>
                                <td>${proveedor.direccion}</td>
                                <td>${proveedor.correo}</td>
                                <td>${proveedor.municipio_id}</td>
                                <td><button class='modificarBtn' id='modificarBtnID' onclick="modificarProveedor('${proveedor.idProveedor}')">Modificar</button></td>
                            </tr>
                        `).join('')}
                </table>
                    </tbody>
                `;

    return html;
}

document.getElementById('botonModificarProveedorID').addEventListener('click', function () {

    // Verificar si el RadioButton rbFiltroEmpleados1 está seleccionado
    //if ($('#rbFiltroEmpleados1').is(':checked')) {
    mostrarListaTablaDeProveedor();  // Llamar a la función si está seleccionado
    // }
});


//function mostrarListaTablaDeProveedor() {
//    $.ajax({
//        url: '/api/proveedores',  // Ruta del método GET en el controlador
//        type: 'GET',  // Usando GET ya que está configurado para ello
//        contentType: 'application/json',  // Define el tipo de contenido esperado
//        success: function (data) {
//            var html = generarHtmlDeProveedores(data);  // Genera el HTML con los empleados
//            $('#contenedor-tabla').html(html);  // Inserta el HTML generado en el contenedor
//        },
//        error: function (xhr, status, error) {
//            console.error('Error al obtener la lista de empleados:', error);
//        }
//    });
//}

//buscar proveedor por ID
document.getElementById('tbBuscarProveedorID').addEventListener('keyup', function () {
    var proveedorId = this.value.trim(); // Elimina espacios en blanco al inicio y final

    if (proveedorId.length > 0) {

        $.ajax({
            url: `/api/proveedores/${proveedorId}`, // Usa la URL correspondiente para obtener el usuario por ID
            type: 'GET',
            contentType: 'application/json',
            success: function (data) {
                // data ya es un objeto JavaScript, no es necesario parsear
                var proveedor = data;

                // Generar HTML a partir de la información del usuario
                var html = generarHtmlDeProveedores(proveedor);

                // Actualizar el contenido del contenedor
                $('#contenedor-tabla').html(html);
            },
            error: function (xhr, status, error) {
                console.error('Error al obtener el Proveedor:', error);
            }
        });

    } else {
        mostrarListaTablaDeProveedor();
    }
});


function mostrarListaTablaDeProveedor() {

    $.ajax({
        url: '/api/proveedores', // Cambia la URL según tu estructura
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            // data ya es un objeto JavaScript, no es necesario parsear
            var proveedores = data;

            // Generar HTML a partir de la lista de usuarios
            var html = generarHtmlDeProveedores(proveedores);

            // Actualizar el contenido del contenedor
            $('#contenedor-tabla').html(html);
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener la lista de proveedores:', error);
        }
    });
}



document.getElementById('botonModificarProveedorID').addEventListener('click', function () {

    // Verificar si el RadioButton rbFiltroEmpleados1 está seleccionado
    //if ($('#rbFiltroEmpleados1').is(':checked')) {
    mostrarListaTablaDeProveedor();  // Llamar a la función si está seleccionado
    // }


});

var proveedorOriginal;
function datosOriginalesProveedor() {

    proveedorOriginal = {
        idProveedor: $('#tbIdProveedorModificar').val(),
        nombre: $('#tbNombreProveedorModificar').val(),
        telefono: $('#tbTeleProveedorModificar').val(),
        celular: $('#tbCelProveedorModificar').val(),
        direccion: $('#tbDireccionProveedorModificar').val(),
        correo: $('#tbCorreoProveedorModificar').val(),
        municipio_id: $('#ddlMunicipioProveedorModificar').val(),
    }
}
function modificarProveedor(id) {
    // Muestra los datos en los campos del modal correspondiente+
    //alert(id);
    var modal = document.getElementById('modalModificarProveedorM');
    modal.style.display = "block";
    // Llamar al servidor para obtener los datos del empleado

    $.ajax({
        // url: `/api/proveedors`, // Cambia la URL según tu estructura
        url: `/api/proveedores/un-proveedor/${id}`, // Cambia la URL según tu estructura
        type: 'GET',
        contentType: 'application/json',
        //success: function (data) {
        //    console.log(data);
        //    // Si los datos son nulos, no se hará nada
        //    if (data === null) {
        //        alert('No se encontró el proveedor.');
        //        return;
        //    }
        success: function (data) {

            // Parsear la respuesta y cargar los datos en el formulario
            var proveedor = data; // No es necesario parsear, ya que data ya es un objeto JavaScript

            // Llenar los campos del formulario con los datos del empleado
            /*alert(empleado.idEmpleado);*/
            $('#tbIdProveedorModificar').val(proveedor.idProveedor);
            $('#tbNombreProveedorModificar').val(proveedor.nombre);
            $('#tbTeleProveedorModificar').val(proveedor.telefono);
            $('#tbCelProveedorModificar').val(proveedor.celular);
            $('#tbDireccionProveedorModificar').val(proveedor.direccion);
            $('#tbCorreoProveedorModificar').val(proveedor.correo);
            $('#ddlMunicipioProveedorModificar').val(proveedor.municipio_id);

            // prueba
            datosOriginalesProveedor();
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos del empleado:', error);
        }
    });
}

//Método para modifiar al empleado
function modificarProveedorAccion() {

    var proveedor = {
        idProveedor: $('#tbIdProveedorModificar').val(),
        nombre: $('#tbNombreProveedorModificar').val(),// === '' ? null : $('#tbNombreProveedorModificar').val(),
        telefono: $('#tbTeleProveedorModificar').val(),
        celular: $('#tbCelProveedorModificar').val(),
        direccion: $('#tbDireccionProveedorModificar').val(),//.val() === '' ? null : $('#tbDireccionProveedorModificar').val(),
        correo: $('#tbCorreoProveedorModificar').val(),
        municipio_id: $('#ddlMunicipioProveedorModificar').val(),

    };

    // Comparar si algún campo ha cambiado
    var haCambiado = false;
    for (var campo in proveedor) {
        if (proveedor[campo] !== proveedorOriginal[campo]) {
            haCambiado = true;
            break;
        }
    }

    if (haCambiado) {
        // Si ha cambiado algo, realizar la modificación
        $.ajax({
            url: '/api/proveedores/' + proveedor.idProveedor,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(proveedor),
            success: function (response) {
                /*alert("Empleado modificado exitosamente");*/
                customAlert("Proveedor modificado exitosamente", "../Resources/img/actualizarproveedor.png");
                // Cerrar el modal con ID modalModificarEmpleadoM
                $('#modalModificarProveedorM').hide();
                mostrarListaTablaDeProveedor();

            },
            error: function (xhr, status, error) {
                /*alert("Error al modificar el empleado: " + xhr.responseText);*/
                /*alert("Los campos con * son obligatorios");*/
                customAlert("Los campos con (*) son obligatorios", "../Resources/img/advertenciaCamposObligatorios.gif");
            }
        });
    } else {
        // Si no ha cambiado nada, mostrar un mensaje
        /*alert("No se ha modificado ningún campo.");*/
        customAlert("No se ha modificado ningún campo", "../Resources/img/advertenciaCamposObligatorios.gif");
    }
}


var span = document.getElementsByClassName("close-ModificarProveedorM")[0];
span.onclick = function () {
    var modal = document.getElementById('modalModificarProveedorM');
    modal.style.display = "none";
    $('#tbIdProveedorModificar').val('');
    $('#tbNombreProveedorModificar').val('');
    $('#tbTeleProveedorModificar').val('');
    $('#tbCelProveedorModificar').val('');
    $('#tbDireccionProveedorModificar').val('');
    $('#tbCorreoProveedorModificar').val('');
    $('#ddlMunicipioProveedorModificar').val('');
}














//function datosOriginalesProveedor() {

//    ProveedorOriginal = {
//        idProveedor: $('#tbIdProveedorModificar').val(),
//        nombreProveedor: $('#tbNombreProveedorModificar').val(),
//        teleProveedor: $('#tbTeleProveedorModificar').val(),
//        celProveedor: $('#tbCelProveedorModificar').val(),
//        direccionProveedor: $('#tbDireccionProveedorModificar').val(),
//        correoProveedor: $('#tbCorreoProveedorModificar').val(),
//        municipioProveedor: $('#ddlMunicipioProveedorModificar').val(),
//    };

//}


//    function modificarDatosProveedorAccion() {

//        var proveedor = {
//            idProveedor: $('#tbIdProveedorModificar').val() === '' ? null : $('#tbIdProveedorModificar').val(),
//            nombreProveedor: $('#tbNombreProveedorModificar').val() === '' ? null : $('#tbNombreProveedorModificar').val(),
//            teleProveedor: $('#tbTeleProveedorModificar').val() === '' ? null : $('#tbTeleProveedorModificar').val(),
//            celProveedor: $('#tbCelProveedorModificar').val() === '' ? null : $('#tbCelProveedorModificar').val(),
//            direccionProveedor: $('#tbDireccionProveedorModificar').val() === '' ? null : $('#tbDireccionProveedorModificar').val(),
//            correoProveedor: $('#tbCorreoProveedorModificar').val() === '' ? null : $('#tbCorreoProveedorModificar').val(),
//            municipioProveedor: $('#ddlMunicipioProveedorModificar').val() === '' ? null : $('#ddlMunicipioProveedorModificar').val(),
//        };

//        // Comparar si algún campo ha cambiado
//        var haCambiado = false;
//        for (var campo in proveedor) {
//            if (proveedor[campo] !== ProveedorOriginal[campo]) {
//                haCambiado = true;
//                break;
//            }
//        }

//        /* alert(usuario.idUsuario);*/

//        if (haCambiado) {
//            /*alert(usuario.idUsuario);*/
//            // Si ha cambiado algo, realizar la modificación
//            $.ajax({
//                url: '/api/proveedores/' + proveedor.idProveedor, // Asegúrate de que usuario.idUsuario tiene un valor válido
//                method: 'PUT',
//                contentType: 'application/json',
//                data: JSON.stringify(proveedor),
//                success: function (response) {
//                    /*alert("Usuario modificado exitosamente");*/
//                    customAlert("proveedor  modificado exitosamente", "../Resources/img/usuarioModificadoAlerta.gif");
//                    $('#modalModificarProveedorM').hide();
//                    mostrarListaTablaDeProveedor();
//                },
//                error: function (xhr, status, error) {
//                    /*alert("Error al modificar el usuario: " + xhr.responseText);*/
//                    /*alert("Los campos con * son obligatorios");*/
//                    customAlert("Los campos con (*) son obligatorios", "../Resources/img/advertenciaCamposObligatorios.gif");
//                }
//            });
//        } else {
//            // Si no ha cambiado nada, mostrar un mensaje
//            /*alert("No se ha modificado ningún campo.");*/
//            customAlert("No se ha modificado ningún campo", "../Resources/img/advertenciaCamposObligatorios.gif");
//        }
//    }
////}