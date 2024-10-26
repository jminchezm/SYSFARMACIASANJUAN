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
    document.querySelector('.botonRegistrarEmpleado').addEventListener('click', function () {
        abrirModal('modalRegistrarEmpleado', '.close');
    });

    // Mostrar el modal de listar y modificar empleado
    document.querySelector('.botonModificarEmpleado').addEventListener('click', function () {
        abrirModal('modalModificarEmpleado', '.closeModificarEmpleado');
    });
});

//Valida que solamente se ingresen 13 caracteres en el campo CUI
document.getElementById('tbCUIEmpleado').addEventListener('input', function () {
    if (this.value.length > 13) {
        alert('El CUI no puede tener más de 13 caracteres.');
        this.value = this.value.slice(0, 13); // Limita el tamaño del valor
    }
});

//Valida que solamente se ingresen 10 caracteres en el campo NIT
document.getElementById('tbNITEmpleado').addEventListener('input', function () {
    if (this.value.length > 10) {
        alert('El NIT no puede tener más de 10 caracteres.');
        this.value = this.value.slice(0, 10); // Limita el tamaño del valor
    }
});

//Valida que solamente se ingresen 8 caracteres en el campo #telefono
document.getElementById('tbTelefonoEmpleado').addEventListener('input', function () {
    if (this.value.length > 8) {
        alert('El TELEFONO no puede tener más de 8 caracteres.');
        this.value = this.value.slice(0, 8); // Limita el tamaño del valor
    }
});

//Valida que solamente se ingresen 8 caracteres en el campo #móvil
document.getElementById('tbMovilEmpleado').addEventListener('input', function () {
    if (this.value.length > 8) {
        alert('El MÓVIL no puede tener más de 8 caracteres.');
        this.value = this.value.slice(0, 8); // Limita el tamaño del valor
    }
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

function agregarEmpleado(event) {
    // Prevenir que el formulario cierre el modal
    event.preventDefault();

    // Obtener valores de los campos
    var primerNombreEmpleado = $('#tbPrimerNombreEmpleado').val() === '' ? null : $('#tbPrimerNombreEmpleado').val();
    var segundoNombreEmpleado = $('#tbSegundoNombreEmpleado').val() === '' ? null : $('#tbSegundoNombreEmpleado').val();
    var tercerNombreEmpleado = $('#tbTercerNombreEmpleado').val() === '' ? null : $('#tbTercerNombreEmpleado').val();
    var primerApellidoEmpleado = $('#tbPrimerApellidoEmpleado').val() === '' ? null : $('#tbPrimerApellidoEmpleado').val();
    var segundoApellidoEmpleado = $('#tbSegundoApellidoEmpleado').val() === '' ? null : $('#tbSegundoApellidoEmpleado').val();
    var apellidoCasada = $('#tbApellidoCasadaEmpleado').val() === '' ? null : $('#tbApellidoCasadaEmpleado').val();
    var cuiEmpleado = $('#tbCUIEmpleado').val() === '' ? null : $('#tbCUIEmpleado').val();
    var nitEmpleado = $('#tbNITEmpleado').val() === '' ? null : $('#tbNITEmpleado').val();
    var fechaNacimientoEmpleado = $('#tbFechaNacimientoEmpleado').val() === '' ? null : $('#tbFechaNacimientoEmpleado').val();
    var fechaIngresoEmpleado = $('#tbFechaIngresoEmpleado').val() === '' ? null : $('#tbFechaIngresoEmpleado').val();
    var direccionEmpleado = $('#tbDireccionEmpleado').val() === '' ? null : $('#tbDireccionEmpleado').val();
    var telefonoEmpleado = $('#tbTelefonoEmpleado').val() === '' ? null : $('#tbTelefonoEmpleado').val();
    var movilEmpleado = $('#tbMovilEmpleado').val() === '' ? null : $('#tbMovilEmpleado').val();
    var generoEmpleado = $('#ddlGeneroEmpleado').val() === '' ? null : $('#ddlGeneroEmpleado').val();
    var estadoEmpleado = $('#ddlEstadoEmpleado').val() === '' ? null : $('#ddlEstadoEmpleado').val();
    var puestoEmpleado = $('#ddlPuestoEmpleado').val() === '' ? null : $('#ddlPuestoEmpleado').val();

    if (primerNombreEmpleado != null && primerApellidoEmpleado != null && cuiEmpleado != null &&
        fechaNacimientoEmpleado != null && fechaIngresoEmpleado != null && direccionEmpleado != null &&
        movilEmpleado != null && generoEmpleado != "0" && estadoEmpleado != "0" && puestoEmpleado != "0") {
        // Si todas las validaciones pasan, crear el objeto empleado
        var empleado = {
            primerNombre: primerNombreEmpleado,
            segundoNombre: segundoNombreEmpleado,
            tercerNombre: tercerNombreEmpleado,
            primerApellido: primerApellidoEmpleado,
            segundoApellido: segundoApellidoEmpleado,
            apellidoCasada: apellidoCasada,
            cui: cuiEmpleado,
            nit: nitEmpleado,
            fechaNacimiento: fechaNacimientoEmpleado,
            fechaIngreso: fechaIngresoEmpleado,
            direccion: direccionEmpleado,
            telefonoCasa: telefonoEmpleado,
            telefonoMovil: movilEmpleado,
            genero: generoEmpleado,
            estado: estadoEmpleado,
            puesto: puestoEmpleado
        };

        // Enviar la información si pasa las validaciones
        $.ajax({
            url: '/api/empleados',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(empleado),
            success: function (response) {
                /*alert("Empleado agregado exitosamente");*/
                customAlert("Empleado agregado exitosamente", "../Resources/img/empleadoAgregadoAlerta.gif");

                /*Limpiar los campos del formulario*/
                $('#tbPrimerNombreEmpleado').val('');
                $('#tbSegundoNombreEmpleado').val('');
                $('#tbTercerNombreEmpleado').val('');
                $('#tbPrimerApellidoEmpleado').val('');
                $('#tbSegundoApellidoEmpleado').val('');
                $('#tbApellidoCasadaEmpleado').val('');
                $('#tbCUIEmpleado').val('');
                $('#tbNITEmpleado').val('');
                $('#tbFechaNacimientoEmpleado').val('');
                $('#tbFechaIngresoEmpleado').val('');
                $('#tbDireccionEmpleado').val('');
                $('#tbTelefonoEmpleado').val('');
                $('#tbMovilEmpleado').val('');
                $('#ddlGeneroEmpleado').val('');
                $('#ddlEstadoEmpleado').val('');
                $('#ddlPuestoEmpleado').val('');

            },
            error: function (xhr, status, error) {
                console.log("Error al agregar el empleado: " + xhr.responseText);
            }
        });
    } else {
        /*alert("Los campos con * son obligatorios");*/
        customAlert("Los campos con (*) son obligatorios", "../Resources/img/advertenciaCamposObligatorios.gif");
    }
}

// Cuando la página esté lista
//$(document).ready(function () {
//    // Verificar si el RadioButton rbFiltroEmpleados1 está seleccionado al cargar la página
//    if ($('#<%= rbFiltroEmpleados1.ClientID %>').is(':checked')) {
//        mostrarListaTablaDeEmpleados();  // Llamar a la función al cargar la página
//    }

//    // Escuchar el cambio del RadioButton rbFiltroEmpleados1
//    $('#<%= rbFiltroEmpleados1.ClientID %>').change(function () {
//        if ($(this).is(':checked')) {
//            mostrarListaTablaDeEmpleados();  // Llamar a la función cuando cambie el estado
//        }
//    });
//});

/*MUESTRA TABLA CON EMPLEADOS DESPUES DE HACER CLICK EN EL BOTÓN MODIFICAR */
document.getElementById('botonModificarEmpleadoID').addEventListener('click', function () {

    // Verificar si el RadioButton rbFiltroEmpleados1 está seleccionado
    if ($('#rbFiltroEmpleados1').is(':checked')) {
        mostrarListaTablaDeEmpleados('');  // Llamar a la función si está seleccionado
    }

    // Escuchar el cambio del RadioButton rbFiltroEmpleados1
    //$('#rbFiltroEmpleados1').change(function () {
    //    if ($(this).is(':checked')) {
    //        mostrarListaTablaDeEmpleados();  // Llamar a la función cuando cambie el estado
    //    }
    //});

    //// Llamar al AP para obtener la tabla de empleados
    /*mostrarListaTablaDeEmpleados();*/
});

document.getElementById('tbBuscarEmpleadoID').addEventListener('keyup', function () {

    var empleadoId = this.value.trim(); // Elimina espacios en blanco al inicio y final
    // Escuchar el cambio del RadioButton rbFiltroEmpleados1
    /*$('#rbFiltroEmpleados1').change(function () {*/
    if ($('#rbFiltroEmpleados1').is(':checked')) {
        if (empleadoId.length > 0) {
            mostrarListaTablaDeEmpleadosId(empleadoId, '')
        } else {
            mostrarListaTablaDeEmpleados('');
        }
    }

    if ($('#rbFiltroEmpleados2').is(':checked')) {
        if (empleadoId.length > 0) {
            mostrarListaTablaDeEmpleadosId(empleadoId, '1')
        } else {
            mostrarListaTablaDeEmpleados('1');
        }
    }

    if ($('#rbFiltroEmpleados3').is(':checked')) {
        if (empleadoId.length > 0) {
            mostrarListaTablaDeEmpleadosId(empleadoId, '2')
        } else {
            mostrarListaTablaDeEmpleados('2');
        }
    }

});

//Permite filtrar los datos segun el radiobuttom seleccionado.
$('#rbFiltroEmpleados1').change(function () {
    if ($(this).is(':checked')) {
        mostrarListaTablaDeEmpleados('');
    }
});
$('#rbFiltroEmpleados2').change(function () {
    if ($(this).is(':checked')) {
        mostrarListaTablaDeEmpleados('1');
    }
});

$('#rbFiltroEmpleados3').change(function () {
    if ($(this).is(':checked')) {
        mostrarListaTablaDeEmpleados('2');
    }
});

// Función para generar el HTML de la tabla con todos los empleados
function generarHtmlDeEmpleados(empleados) {
    // Verificar si empleados es null o un array vacío
    if (!empleados || empleados.length === 0) {
        return '<p>No se encontraron empleados.</p>';
    }

    // Si hay empleados, generar la tabla
    var html = `
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre Completo</th>
                            <th>CUI</th>
                            <th>NIT</th>
                            <th>Fecha Nacimiento</th>
                            <th>Fecha Ingreso</th>
                            <th>Dirección</th>
                            <th>Tel. Casa</th>
                            <th>Num. Celular</th>
                            <th>Género</th>
                            <th>Estado</th>
                            <th>Puesto</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${empleados.map(empleado => `
                            <tr>
                                <td>${empleado.idEmpleado}</td>
                                <td>${empleado.primerNombre} ${empleado.segundoNombre} ${empleado.tercerNombre} ${empleado.primerApellido} ${empleado.segundoApellido} ${empleado.apellidoCasada}</td>
                                <td>${empleado.cui}</td>
                                <td>${empleado.nit}</td>
                                <td>${formatDate(empleado.fechaNacimiento)}</td>
                                <td>${formatDate(empleado.fechaIngreso)}</td>
                                <td>${empleado.direccion}</td>
                                <td>${empleado.telefonoCasa}</td>
                                <td>${empleado.telefonoMovil}</td>
                                <td>${empleado.genero}</td>
                                <td>${empleado.estado === '1' ? 'Activo' : 'Inactivo'}</td>
                                <td>${empleado.puestoNombre}</td>
                                <td><button class='modificarBtn' id='modificarBtnID' onclick="modificarEmpleado('${empleado.idEmpleado}');">Modificar</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                `;

    return html;
}

var empleadoOriginal;
function datosOriginalesEmpleado() {

    empleadoOriginal = {
        idEmpleado: $('#tbIdEmpleadoModificar').val(),
        primerNombre: $('#tbPrimerNombreEmpleadoModificar').val(),
        segundoNombre: $('#tbSegundoNombreEmpleadoModificar').val(),
        tercerNombre: $('#tbTercerNombreEmpleadoModificar').val(),
        primerApellido: $('#tbPrimerApellidoEmpleadoModificar').val(),
        segundoApellido: $('#tbSegundoApellidoEmpleadoModificar').val(),
        apellidoCasada: $('#tbApellidoCasadaEmpleadoModificar').val(),
        cui: $('#tbCUIEmpleadoModificar').val(),
        nit: $('#tbNITEmpleadoModificar').val(),
        fechaNacimiento: $('#tbFechaNacimientoEmpleadoModificar').val(),
        fechaIngreso: $('#tbFechaIngresoEmpleadoModificar').val(),
        direccion: $('#tbDireccionEmpleadoModificar').val(),
        telefonoCasa: $('#tbTelefonoEmpleadoModificar').val(),
        telefonoMovil: $('#tbMovilEmpleadoModificar').val(),
        genero: $('#ddlGeneroEmpleadoModificar').val(),
        estado: $('#ddlEstadoEmpleadoModificar').val(),
        puesto: $('#ddlPuestoEmpleadoModificar').val()
    };

}

function modificarEmpleado(id) {
    // Muestra los datos en los campos del modal correspondiente
    var modal = document.getElementById('modalModificarEmpleadoM');
    modal.style.display = "block";
    // Llamar al servidor para obtener los datos del empleado

    $.ajax({
        url: `/api/empleados/un-empleado/${id}`, // Cambia la URL según tu estructura
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            // Si los datos son nulos, no se hará nada
            if (data === null) {
                alert('No se encontró el empleado.');
                return;
            }

            // Parsear la respuesta y cargar los datos en el formulario
            var empleado = data; // No es necesario parsear, ya que data ya es un objeto JavaScript

            // Llenar los campos del formulario con los datos del empleado
            /*alert(empleado.idEmpleado);*/
            $('#tbIdEmpleadoModificar').val(empleado.idEmpleado);
            $('#tbPrimerNombreEmpleadoModificar').val(empleado.primerNombre);
            $('#tbSegundoNombreEmpleadoModificar').val(empleado.segundoNombre);
            $('#tbTercerNombreEmpleadoModificar').val(empleado.tercerNombre);
            $('#tbPrimerApellidoEmpleadoModificar').val(empleado.primerApellido);
            $('#tbSegundoApellidoEmpleadoModificar').val(empleado.segundoApellido);
            $('#tbApellidoCasadaEmpleadoModificar').val(empleado.apellidoCasada); //formatDate(empleado.fechaNacimiento)
            $('#tbCUIEmpleadoModificar').val(empleado.cui);
            $('#tbNITEmpleadoModificar').val(empleado.nit);
            $('#tbFechaNacimientoEmpleadoModificar').val(formatDate(empleado.fechaNacimiento.split('T')[0]));
            $('#tbFechaIngresoEmpleadoModificar').val(formatDate(empleado.fechaIngreso.split('T')[0]));
            $('#tbDireccionEmpleadoModificar').val(empleado.direccion);
            $('#tbTelefonoEmpleadoModificar').val(empleado.telefonoCasa);
            $('#tbMovilEmpleadoModificar').val(empleado.telefonoMovil);
            /*alert(empleado.genero);*/
            $('#ddlGeneroEmpleadoModificar').val(empleado.genero);
            $('#ddlEstadoEmpleadoModificar').val(empleado.estado);
            $('#ddlPuestoEmpleadoModificar').val(empleado.puesto);

            datosOriginalesEmpleado();
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos del empleado:', error);
        }
    });
}

// Cerrar el modal al hacer clic en la "X"
var span = document.getElementsByClassName("close-ModificarEmpleadoM")[0];
span.onclick = function () {
    var modal = document.getElementById('modalModificarEmpleadoM');
    modal.style.display = "none";
    $('#tbIdEmpleadoModificar').val('');
    $('#tbPrimerNombreEmpleadoModificar').val('');
    $('#tbSegundoNombreEmpleadoModificar').val('');
    $('#tbTercerNombreEmpleadoModificar').val('');
    $('#tbPrimerApellidoEmpleadoModificar').val('');
    $('#tbSegundoApellidoEmpleadoModificar').val('');
    $('#tbApellidoCasadaEmpleadoModificar').val('');
    $('#tbCUIEmpleadoModificar').val('');
    $('#tbNITEmpleadoModificar').val('');
    $('#tbFechaNacimientoEmpleadoModificar').val('');
    $('#tbFechaIngresoEmpleadoModificar').val('');
    $('#tbDireccionEmpleadoModificar').val('');
    $('#tbTelefonoEmpleadoModificar').val('');
    $('#tbMovilEmpleadoModificar').val('');
    $('#ddlGeneroEmpleadoModificar').val('');
    $('#ddlEstadoEmpleadoModificar').val('');
    $('#ddlPuestoEmpleadoModificar').val('');
}

// Cerrar el modal si se hace clic fuera de él
//window.onclick = function (event) {
//    var modal = document.getElementById('modalModificarEmpleadoM');
//    if (event.target == modal) {
//        modal.style.display = "none";
//    }
//}

function formatDate(dateString) {
    if (!dateString) return 'Fecha no disponible';

    // Usar moment.js para convertir la cadena y formatearla a "dd-MM-yyyy"
    var formattedDate = moment(dateString).format('YYYY-MM-DD');

    // Si la fecha no es válida, moment devuelve "Invalid date"
    return formattedDate === 'Invalid date' ? 'Fecha no válida' : formattedDate;
}

//Valida que solamente se ingresen 13 caracteres en el campo CUI
document.getElementById('tbCUIEmpleadoModificar').addEventListener('input', function () {
    if (this.value.length > 13) {
        alert('El CUI no puede tener más de 13 caracteres.');
        this.value = this.value.slice(0, 13); // Limita el tamaño del valor
    }
});

//Valida que solamente se ingresen 10 caracteres en el campo NIT
document.getElementById('tbNITEmpleadoModificar').addEventListener('input', function () {
    if (this.value.length > 10) {
        alert('El NIT no puede tener más de 10 caracteres.');
        this.value = this.value.slice(0, 10); // Limita el tamaño del valor
    }
});

//Valida que solamente se ingresen 8 caracteres en el campo #telefono
document.getElementById('tbTelefonoEmpleadoModificar').addEventListener('input', function () {
    if (this.value.length > 8) {
        alert('El TELEFONO no puede tener más de 8 caracteres.');
        this.value = this.value.slice(0, 8); // Limita el tamaño del valor
    }
});

//Valida que solamente se ingresen 8 caracteres en el campo #móvil
document.getElementById('tbMovilEmpleadoModificar').addEventListener('input', function () {
    if (this.value.length > 8) {
        alert('El MÓVIL no puede tener más de 8 caracteres.');
        this.value = this.value.slice(0, 8); // Limita el tamaño del valor
    }
});

//Método para modifiar al empleado
function modificarEmpleadoAccion() {

    var empleado = {
        idEmpleado: $('#tbIdEmpleadoModificar').val(),
        primerNombre: $('#tbPrimerNombreEmpleadoModificar').val() === '' ? null : $('#tbPrimerNombreEmpleadoModificar').val(),
        segundoNombre: $('#tbSegundoNombreEmpleadoModificar').val(),
        tercerNombre: $('#tbTercerNombreEmpleadoModificar').val(),
        primerApellido: $('#tbPrimerApellidoEmpleadoModificar').val() === '' ? null : $('#tbPrimerApellidoEmpleadoModificar').val(),
        segundoApellido: $('#tbSegundoApellidoEmpleadoModificar').val(),
        apellidoCasada: $('#tbApellidoCasadaEmpleadoModificar').val(),
        cui: $('#tbCUIEmpleadoModificar').val() === '' ? null : $('#tbCUIEmpleadoModificar').val(),
        nit: $('#tbNITEmpleadoModificar').val(),
        fechaNacimiento: $('#tbFechaNacimientoEmpleadoModificar').val() === '' ? null : $('#tbFechaNacimientoEmpleadoModificar').val(),
        fechaIngreso: $('#tbFechaIngresoEmpleadoModificar').val() === '' ? null : $('#tbFechaIngresoEmpleadoModificar').val(),
        direccion: $('#tbDireccionEmpleadoModificar').val() === '' ? null : $('#tbDireccionEmpleadoModificar').val(),
        telefonoCasa: $('#tbTelefonoEmpleadoModificar').val(),
        telefonoMovil: $('#tbMovilEmpleadoModificar').val() === '' ? null : $('#tbMovilEmpleadoModificar').val(),
        genero: $('#ddlGeneroEmpleadoModificar').val() === '' ? null : $('#ddlGeneroEmpleadoModificar').val(),
        estado: $('#ddlEstadoEmpleadoModificar').val() === '' ? null : $('#ddlEstadoEmpleadoModificar').val(),
        puesto: $('#ddlPuestoEmpleadoModificar').val() === '' ? null : $('#ddlPuestoEmpleadoModificar').val()
    };

    // Comparar si algún campo ha cambiado
    var haCambiado = false;
    for (var campo in empleado) {
        if (empleado[campo] !== empleadoOriginal[campo]) {
            haCambiado = true;
            break;
        }
    }

    if (haCambiado) {
        // Si ha cambiado algo, realizar la modificación
        $.ajax({
            url: '/api/empleados/' + empleado.idEmpleado,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(empleado),
            success: function (response) {
                /*alert("Empleado modificado exitosamente");*/
                customAlert("Empleado modificado exitosamente", "../Resources/img/empleadoModificadoAlerta.gif");
                // Cerrar el modal con ID modalModificarEmpleadoM
                $('#modalModificarEmpleadoM').hide();
                /*mostrarListaTablaDeEmpleados();*/
                //Permite filtrar los datos segun el radiobuttom seleccionado.
                /*$('#rbFiltroEmpleados1').change(function () {*/
                if ($('#rbFiltroEmpleados1').is(':checked')) {
                        mostrarListaTablaDeEmpleados('');
                    }
                /*});*/
                /*$('#rbFiltroEmpleados2').change(function () {*/
                if ($('#rbFiltroEmpleados2').is(':checked')) {
                        mostrarListaTablaDeEmpleados('1');
                    }
                /*});*/

                /*$('#rbFiltroEmpleados3').change(function () {*/
                if ($('#rbFiltroEmpleados3').is(':checked')) {
                        mostrarListaTablaDeEmpleados('2');
                    }
                /*});*/
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

// Función para mostrar la lista de empleados
function mostrarListaTablaDeEmpleados(estado) {
    $.ajax({
        url: '/api/empleados?estado=' + estado,  // Ruta del método GET en el controlador
        type: 'GET',  // Usando GET ya que está configurado para ello
        contentType: 'application/json',  // Define el tipo de contenido esperado
        success: function (data) {
            var html = generarHtmlDeEmpleados(data);  // Genera el HTML con los empleados
            $('#contenedor-tabla').html(html);  // Inserta el HTML generado en el contenedor
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener la lista de empleados:', error);
        }
    });
}
function mostrarListaTablaDeEmpleadosId(empleadoId, estado) {
    $.ajax({
        url: '/api/empleados/' + empleadoId + '?estado=' + estado,  // Ruta con el ID del empleado
        type: 'GET',  // Método GET
        contentType: 'application/json',  // Define el tipo de contenido esperado
        success: function (data) {
            // Generar el HTML del empleado
            var html = generarHtmlDeEmpleados(data);
            // Insertar el HTML generado en el contenedor
            $('#contenedor-tabla').html(html);
        },
        error: function (xhr, status, error) {
            // Manejar cualquier error
            console.error('Error al obtener el empleado:', error);
        }
    });
}

//// Escuchar el cambio del RadioButton rbFiltroEmpleados1
//$('#rbFiltroEmpleados1').change(function () {
//    if ($(this).is(':checked')) {
//        mostrarListaTablaDeEmpleados();  // Llamar a la función cuando cambie el estado
//    }
//});

//$('#rbFiltroEmpleados2').change(function () {
//    if ($(this).is(':checked')) {
//        alert("Se a checheado filtroEmpleados2")
//    }
//});

//$('#rbFiltroEmpleados3').change(function () {
//    if ($(this).is(':checked')) {
//        alert("Se a checheado filtroEmpleados3")
//    }
//});

//function mostrarListaTablaDeEmpleados() {

//    $.ajax({
//        url: '/api/empleados',  // Ruta del método GET en el controlador
//        type: 'GET',  // Usando GET ya que está configurado para ello
//        contentType: 'application/json',  // Define el tipo de contenido esperado
//        success: function (data) {
//            // Aquí recibes la lista de empleados en `data`
//            var html = generarHtmlDeEmpleados(data);  // Genera el HTML con los empleados
//            $('#contenedor-tabla').html(html);  // Inserta el HTML generado en el contenedor
//        },
//        error: function (xhr, status, error) {
//            console.error('Error al obtener la lista de empleados:', error);
//        }
//    });
//}