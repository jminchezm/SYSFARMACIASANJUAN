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

    // Mostrar el modal de agregar cliente
    document.querySelector('.botonRegistrarCliente').addEventListener('click', function () {
        abrirModal('modalRegistrarCliente', '.close');
    });

    // Mostrar el modal de listar y modificar empleado
    document.querySelector('.botonModificarCliente').addEventListener('click', function () {
        abrirModal('modalModificarCliente', '.closeModificarCliente');
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



//Valida que solamente se ingresen 13 caracteres en el campo CUI
document.getElementById('tbCUICliente').addEventListener('input', function () {
    if (this.value.length > 13) {
        alert('El CUI no puede tener más de 13 caracteres.');
        this.value = this.value.slice(0, 13); // Limita el tamaño del valor
    }
});

//Valida que solamente se ingresen 10 caracteres en el campo NIT
document.getElementById('tbNITCliente').addEventListener('input', function () {
    if (this.value.length > 10) {
        alert('El NIT no puede tener más de 10 caracteres.');
        this.value = this.value.slice(0, 10); // Limita el tamaño del valor
    }
});

//Valida que solamente se ingresen 8 caracteres en el campo #telefono
document.getElementById('tbTelefonoCliente').addEventListener('input', function () {
    if (this.value.length > 8) {
        alert('El TELEFONO no puede tener más de 8 caracteres.');
        this.value = this.value.slice(0, 8); // Limita el tamaño del valor
    }
});

//Valida que solamente se ingresen 8 caracteres en el campo #móvil
document.getElementById('tbMovilCliente').addEventListener('input', function () {
    if (this.value.length > 8) {
        alert('El MÓVIL no puede tener más de 8 caracteres.');
        this.value = this.value.slice(0, 8); // Limita el tamaño del valor
    }
});

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


// Función para generar el HTML de la tabla con todos los empleados
function generarHtmlDeClientes(clientes) {
    // Verificar si empleados es null o un array vacío
    if (!clientes || clientes.length === 0) {
        return '<p>No se encontraron clientes.</p>';
    }

    // Si hay empleados, generar la tabla
    var html = `
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre Completo</th>
                            <th>CUI</th>
                            <th>NIT</th>            
                            <th>Direccion</th>
                            <th>Municipio</th>
                            <th>TelefonoCasa</th>
                            <th>TelefonoMovil</th>
                            <th>Correo</th>
                            <th>Modificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${clientes.map(cliente => `
                            <tr>
                                <td>${cliente.idCliente}</td>
                                <td>${cliente.primerNombre} ${cliente.segundoNombre} ${cliente.tercerNombre} ${cliente.primerApellido} ${cliente.segundoApellido} ${cliente.apellidoCasada}</td>
                                <td>${cliente.cui}</td>
                                <td>${cliente.nit}</td>
                                <td>${cliente.direccion}</td>
                                <td>${cliente.municipioid}</td>
                                <td>${cliente.telefonoCasa}</td>
                                <td>${cliente.telefonoMovil}</td>
                                <td>${cliente.correo}</td>
                                <td><button class='modificarBtn' id='modificarBtnID' onclick="modificarCliente('${cliente.idCliente}')">Modificar</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                `;

    return html;
}

/*MUESTRA TABLA CON EMPLEADOS DESPUES DE HACER CLICK EN EL BOTÓN MODIFICAR */
document.getElementById('botonModificarClienteID').addEventListener('click', function () {

    // Verificar si el RadioButton rbFiltroEmpleados1 está seleccionado

    /*if ($('#rbFiltroCliente1').is(':checked')) {*/
        mostrarListaTablaDeClientes('');  // Llamar a la función si está seleccionado
    //}

});


// Función para mostrar la lista de empleados

function mostrarListaTablaDeClientes() {

    $.ajax({
        url: '/api/clientes',  // Ruta del método GET en el controlador
        type: 'GET',  // Usando GET ya que está configurado para ello
        contentType: 'application/json',  // Define el tipo de contenido esperado
        success: function (data) {
            // Aquí recibes la lista de empleados en `data`
            var html = generarHtmlDeClientes(data);  // Genera el HTML con los empleados
            $('#contenedor-tabla').html(html);  // Inserta el HTML generado en el contenedor
        },
        error: function (error) {
            console.error('Error al obtener la lista de empleados:', error);
        }
    });
}







    document.getElementById('tbBuscarClienteID').addEventListener('keyup', function () {
        var clienteId = this.value.trim(); // Elimina espacios en blanco al inicio y final

        if (clienteId.length > 0) {

            $.ajax({
                url: `/api/clientes/${clienteId}`, // Usa la URL correspondiente para obtener el usuario por ID
                type: 'GET',
                contentType: 'application/json',
                success: function (data) {
                    // data ya es un objeto JavaScript, no es necesario parsear
                    var cliente = data;

                    // Generar HTML a partir de la información del usuario
                    var html = generarHtmlDeClientes(cliente);

                    // Actualizar el contenido del contenedor
                    $('#contenedor-tabla').html(html);
                },
                error: function (xhr, status, error) {
                    console.error('Error al obtener el Proveedor:', error);
                }
            });

        } else {
            mostrarListaTablaDeClientes();
        }
    });


var clienteOriginal;
function datosOriginalesCliente() {

    clienteOriginal = {
        idCliente: $('#tbIdClienteModificar').val(),
        primerNombre: $('#tbPrimerNombreClienteModificar').val(),
        segundoNombre: $('#tbSegundoNombreClienteModificar').val(),
        tercerNombre: $('#tbTercerNombreClienteModificar').val(),
        primerApellido: $('#tbPrimerApellidoClienteModificar').val(),
        segundoApellido: $('#tbSegundoApellidoClienteModificar').val(),
        apellidoCasada: $('#tbApellidoCasadaClienteModificar').val(),
        cui: $('#tbCUIClienteModificar').val(),
        nit: $('#tbNITClienteModificar').val(),
        municipioid: $('#ddlMunicipioClienteModificar').val(),
        direccion: $('#tbDireccionClienteModificar').val(),
        telefonoCasa: $('#tbTelefonoModificar').val(),
        telefonoMovil: $('#tbMovilClienteModificar').val(),
        correo: $('#tbCorreoClienteModificar').val()
    };

}



function modificarCliente(id) {
    alert(id);
    // Muestra los datos en los campos del modal correspondiente+
    //alert(id);
    var modal = document.getElementById('modalModificarClienteM');
    modal.style.display = "block";
    // Llamar al servidor para obtener los datos del empleado

    $.ajax({
        // url: `/api/proveedors`, // Cambia la URL según tu estructura
        url: `/api/clientes/un-cliente/${id}`, // Cambia la URL según tu estructura
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
            var cliente = data; // No es necesario parsear, ya que data ya es un objeto JavaScript

            // Llenar los campos del formulario con los datos del empleado
            /*alert(empleado.idEmpleado);*/
            $('#tbIdClienteModificar').val(cliente.idCliente);
            $('#tbPrimerNombreClienteModificar').val(cliente.primerNombre);
            $('#tbSegundoNombreClienteModificar').val(cliente.segundoNombre);
            $('#tbTercerNombreClienteModificar').val(cliente.tercerNombre);
            $('#tbPrimerApellidoClienteModificar').val(cliente.primerApellido);
            $('#tbSegundoApellidoClienteModificar').val(cliente.segundoApellido);
            $('#tbApellidoCasadaClienteModificar').val(cliente.apellidoCasada);
            $('#tbCUIClienteModificar').val(cliente.cui);
            $('#tbNITClienteModificar').val(cliente.nit);
            $('#ddlMunicipioClienteModificar').val(cliente.municipioid);
            $('#tbDireccionClienteModificar').val(cliente.direccion);
            $('#tbTelefonoModificar').val(cliente.telefonoCasa);
            $('#tbMovilClienteModificar').val(cliente.telefonoMovil);
            $('#tbCorreoClienteModificar').val(cliente.correo);

            //console.log(cliente.idCliente);
            //console.log(cliente.primerNombre);
            //console.log(cliente.segundoNombre);
            //console.log(cliente.tercerNombre);
            //console.log(cliente.primerApellido);
            //console.log(cliente.segundoApellido);
            //console.log(cliente.apellidoCasada);
            //console.log(cliente.cui);
            //console.log(cliente.municipioid);
            //console.log(cliente.direccion);
            //console.log(cliente.telefonoCasa);
            //console.log(cliente.telefonoMovil);
            //console.log(clientecorreo);


            // prueba
            datosOriginalesCliente();
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos del empleado:', error);
        }
    });
}

//Método para modifiar al empleado
function modificarClienteAccion() {

    var cliente = {
        idCliente: $('#tbIdClienteModificar').val(),
        primerNombre: $('#tbPrimerNombreClienteModificar').val(),// === '' ? null : $('#tbNombreProveedorModificar').val(),
        segundoNombre: $('#tbSegundoNombreClienteModificar').val(),
        tercerNombre: $('#tbTercerNombreClienteModificar').val(),
        primerApellido: $('#tbPrimerApellidoClienteModificar').val(),//.val() === '' ? null : $('#tbDireccionProveedorModificar').val(),
        segundoApellido: $('#tbSegundoApellidoClienteModificar').val(),
        apellidoCasada: $('#tbApellidoCasadaClienteModificar').val(),
        cui: $('#tbCUIClienteModificar').val(),
        nit: $('#tbNITClienteModificar').val(),
        municipioid: $('#ddlMunicipioClienteModificar').val(),
        direccion: $('#tbDireccionClienteModificar').val(),
        telefonoCasa: $('#tbTelefonoModificar').val(),
        telefonoMovil: $('#tbMovilClienteModificar').val(), // error
        correo: $('#tbCorreoClienteModificar').val(),

    };

    // Comparar si algún campo ha cambiado
    var haCambiado = false;
    for (var campo in cliente) {
        if (cliente[campo] !== datosOriginalesCliente[campo]) {
            haCambiado = true;
            break;
        }
    }

    if (haCambiado) {
        // Si ha cambiado algo, realizar la modificación
        $.ajax({
            url: '/api/clientes/' + cliente.idCliente,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(cliente),
            success: function (response) {
                /*alert("Empleado modificado exitosamente");*/
                customAlert("Cliente modificado exitosamente", "../Resources/img/cliente_modificado.png");
                // Cerrar el modal con ID modalModificarEmpleadoM
                $('#modalModificarClienteM').hide();
                mostrarListaTablaDeClientes();

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


var span = document.getElementsByClassName("close-ModificarClienteM")[0];
span.onclick = function () {
    var modal = document.getElementById('modalModificarClienteM');
    modal.style.display = "none";
    $('#tbIdClienteModificar').val('');
    $('#tbPrimerNombreClienteModificar').val('');
    $('#tbSegundoNombreClienteModificar').val('');
    $('#tbTercerNombreClienteModificar').val('');
    $('#tbPrimerApellidoClienteModificar').val('');
    $('#tbSegundoApellidoClienteModificar').val('');
    $('#tbApellidoCasadaClienteModificar').val('');
    $('#tbCUIClienteModificar').val('');
    $('#tbNITClienteModificar').val('');
    $('#ddlMunicipioClienteModificar').val('');
    $('#tbDireccionClienteModificar').val('');
    $('#tbTelefonoModificar').val('');
    $('#tbMovilClienteModificar').val('');
    $('#tbCorreoClienteModificar').val('');
}