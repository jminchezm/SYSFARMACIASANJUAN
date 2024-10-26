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
    document.querySelector('.botonCrearUsuario').addEventListener('click', function () {
        abrirModal('modalCrearUsuario', '.close');
        actualizarElementoEligaEmpleadoUsuario();
    });

    // Mostrar el modal de listar y modificar empleado
    document.querySelector('.botonModificarUsuario').addEventListener('click', function () {
        abrirModal('modalModificarUsuario', '.closeModificarUsuario');
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

//FUNCION QUE PERMITE CREAR USUARIOS SEGUN LOS EMPLEADOS QUE NO TIENEN ASIGNADO UN USUARIO
function crearUsuario(event) {
    // Prevenir que el formulario cierre el modal
    event.preventDefault();

    // Obtener valores de los campos
    var idEmpleadoUsuario = $('#ddlIdEmpleadoUsuario').val() === '' ? null : $('#ddlIdEmpleadoUsuario').val();
    var nombreUsuario = $('#tbNombreUsuario').val() === '' ? null : $('#tbNombreUsuario').val();
    var constraseñaUsuario = $('#tbPasswordUsuario').val() === '' ? null : $('#tbPasswordUsuario').val();
    var constraseñaUsuarioConfirmacion = $('#tbConfirmarContraseñaUsuario').val() === '' ? null : $('#tbConfirmarContraseñaUsuario').val();
    var correoElectronicoUsuario = $('#tbCorreoUsuario').val() === '' ? null : $('#tbCorreoUsuario').val();
    var idRolUsuario = $('#ddlRolUsuario').val() === '' ? null : $('#ddlRolUsuario').val();

    if (idEmpleadoUsuario != "0" && nombreUsuario != null && constraseñaUsuario != null
        && constraseñaUsuarioConfirmacion != null && idRolUsuario != "0") {

        if (constraseñaUsuario == constraseñaUsuarioConfirmacion) {
            // Si todas las validaciones pasan, crear el objeto usuario
            var usuario = {
                idEmpleado: idEmpleadoUsuario,
                nombreUsuario: nombreUsuario,
                passwordUsuario: constraseñaUsuario,
                correoUsuario: correoElectronicoUsuario,
                idRol: idRolUsuario
            };

            // Enviar la información si pasa las validaciones
            $.ajax({
                url: '/api/usuarios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(usuario),
                success: function (response) {
                    /*Limpiar los campos del formulario*/
                    $('#ddlIdEmpleadoUsuario').val('0');
                    $('#tbNombreUsuario').val('');
                    $('#tbPasswordUsuario').val('');
                    $('#tbConfirmarContraseñaUsuario').val('');
                    $('#tbCorreoUsuario').val('');
                    $('#ddlRolUsuario').val('0');
                    /*alert("Usuario creado exitosamente");*/
                    customAlert("Usuario creado exitosamente", "../Resources/img/usuarioAgregadoAlerta.gif");

                    // Llamar a la función para cargar empleados
                    actualizarElementoEligaEmpleadoUsuario();
                },
                error: function (xhr, status, error) {
                    alert("Error al crear el usuario: " + xhr.responseText);
                }
            });
        } else {
            /*alert("Las contraseñas no coinciden, intenta de nuevo.");*/
            customAlert("Las contraseñas no coinciden, intenta de nuevo.", "../Resources/img/contrasenaIncorrecta.png");
        }      
        
    } else {
        /*alert("Los campos con * son obligatorios");*/
        customAlert("Los campos con (*) son obligatorios", "../Resources/img/advertenciaCamposObligatorios.gif");
    }
}

//FUNCION QUE PERMITE ACTUALIZAR EL ELEMENTO HTML DDL ELEGIR EMPLEADO USUARIO
function actualizarElementoEligaEmpleadoUsuario() {
    // Llamar a la función para cargar empleados
    $.ajax({
        type: "POST",
        url: "ModuloUsuarios.aspx/ListarEmpleado",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var ddl = $('#ddlIdEmpleadoUsuario');
            ddl.empty(); // Limpiar el dropdown

            // Insertar opción por defecto
            ddl.append('<option value="0">Seleccione</option>');

            // Añadir empleados recibidos del servidor
            $.each(response.d, function (index, item) {
                ddl.append('<option value="' + item.Value + '">' + item.Text + '</option>');
            });
        },
        error: function (xhr, status, error) {
            console.log("Error al cargar los empleados: " + xhr.responseText);
        }
    });
}
function actualizarElementoEligaRolUsuario() {
    // Llamar a la función para cargar empleados
    $.ajax({
        type: "POST",
        url: "ModuloUsuarios.aspx/ListaRol",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var ddl = $('#ddlRolUsuarioModificar');
            ddl.empty(); // Limpiar el dropdown

            // Insertar opción por defecto
            ddl.append('<option value="0">Seleccione</option>');

            // Añadir empleados recibidos del servidor
            $.each(response.d, function (index, item) {
                ddl.append('<option value="' + item.Value + '">' + item.Text + '</option>');
            });
        },
        error: function (xhr, status, error) {
            console.log("Error al cargar los roles: " + xhr.responseText);
        }
    });
}

/*MUESTRA TABLA CON EMPLEADOS DESPUES DE HACER CLICK EN EL BOTÓN MODIFICAR */
document.getElementById('botonModificarUsuarioID').addEventListener('click', function () {
    mostrarListaTablaDeUsuarios();
});

// Función para generar el HTML de la tabla con todos los empleados
function generarHtmlDeUsuarios(usuarios) {
    if (usuarios.length === 0) {
        return '<p>No se encontraron usuarios.</p>';
    }
    var html = `
                <table>
                    <thead>
                        <tr>
                            <th>Código Usuario</th>
                            <th>Usuario</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Código Empleado</th>
                            <th>Nombre Completo</th>
                            <th>Modificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${usuarios.map(usuario => `
                            <tr>
                                <td>${usuario.idUsuario}</td>
                                <td>${usuario.nombreUsuario}</td>
                                <td>${usuario.correoUsuario}</td>
                                <td>${usuario.nombreRol}</td>
                                <td>${usuario.idEmpleado}</td>
                                <td>${usuario.nombreCompletoEmpleado}</td>
                                <td><button class='modificarBtnUsuario' id='modificarBtnUsuarioID' onclick="modificarDatosUsuario('${usuario.idUsuario}')">Datos Usuario</button>
                                <button class='modificarPasswordBtnUsuario' id='modificarPasswotdBtnUsuarioID' onclick="modalCambiarContraseña('${usuario.idUsuario}')">Contraseña</button></td> 
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                `;
    return html;
}

var usuarioOriginal;
function datosOriginalesUsuario() {

    usuarioOriginal = {
        idUsuario: $('#tbIdUsuarioModificar').val(),
        nombreUsuario: $('#tbNombreUsuarioModificar').val(),
        correoUsuario: $('#tbCorreoUsuarioModificar').val(),
        idRol: $('#ddlRolUsuarioModificar').val()
    };

}


document.getElementById('tbBuscarUsuarioID').addEventListener('keyup', function () {
    var usuarioId = this.value.trim(); // Elimina espacios en blanco al inicio y final

    if (usuarioId.length > 0) {

        $.ajax({
            url: `/api/usuarios/${usuarioId}`, // Usa la URL correspondiente para obtener el usuario por ID
            type: 'GET',
            contentType: 'application/json',
            success: function (data) {
                // data ya es un objeto JavaScript, no es necesario parsear
                var usuario = data;

                // Generar HTML a partir de la información del usuario
                var html = generarHtmlDeUsuarios(usuario);

                // Actualizar el contenido del contenedor
                $('#contenedor-tabla').html(html);
            },
            error: function (xhr, status, error) {
                console.error('Error al obtener el usuario:', error);
            }
        });

    } else {
        mostrarListaTablaDeUsuarios();
    }
});

function modificarDatosUsuario(id) {
    // Muestra los datos en los campos del modal correspondiente
    var modal = document.getElementById('modalModificarUsuarioM');
    modal.style.display = "block";
    // Llamar al servidor para obtener a un unico empleado en el modal
    $.ajax({
        url: `/api/usuarios/un-usuario/${id}`, // Usa la URL correspondiente para obtener el usuario por ID
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            // data ya es un objeto JavaScript, no es necesario parsear
            var usuario = data;

            // Llenar los campos del formulario con los datos del usuario
            document.getElementById('tbIdUsuarioModificar').value = usuario.idUsuario;
            document.getElementById('tbNombreUsuarioModificar').value = usuario.nombreUsuario;
            document.getElementById('tbCorreoUsuarioModificar').value = usuario.correoUsuario;
            document.getElementById('ddlRolUsuarioModificar').value = usuario.idRol;
            datosOriginalesUsuario();
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos del usuario:', error);
        }
    });
    //fetch('ModuloUsuarios.aspx/ObtenerUnUsuarioPorId', {
    //    method: 'POST',
    //    headers: {
    //        'Content-Type': 'application/json'
    //    },
    //    body: JSON.stringify({ usuarioId: id })
    //})
    //    .then(response => response.json())
    //    .then(data => {
    //        // Parsear la respuesta y cargar los datos en el formulario
    //        var usuario = JSON.parse(data.d)
    //        // Llenar los campos del formulario con los datos del empleado
    //        /*alert(usuario.idRol);*/
    //        document.getElementById('tbIdUsuarioModificar').value = usuario.idUsuario;
    //        document.getElementById('tbNombreUsuarioModificar').value = usuario.nombreUsuario;
    //        document.getElementById('tbCorreoUsuarioModificar').value = usuario.correoUsuario;
    //        document.getElementById('ddlRolUsuarioModificar').value = usuario.idRol;
    //        datosOriginalesUsuario();

    //    })
    //    .catch(error => {
    //        console.error('Error al obtener los datos del empleado:', error);
    //    });
}

//Método para modifiar al empleado
function modificarDatosUsuarioAccion() {

    var usuario = {
        idUsuario: $('#tbIdUsuarioModificar').val() === '' ? null : $('#tbIdUsuarioModificar').val(),
        nombreUsuario: $('#tbNombreUsuarioModificar').val() === '' ? null : $('#tbNombreUsuarioModificar').val(),
        correoUsuario: $('#tbCorreoUsuarioModificar').val() === '' ? null : $('#tbCorreoUsuarioModificar').val(),
        idRol: $('#ddlRolUsuarioModificar').val() === '' ? null : $('#ddlRolUsuarioModificar').val(),
    };

    // Comparar si algún campo ha cambiado
    var haCambiado = false;
    for (var campo in usuario) {
        if (usuario[campo] !== usuarioOriginal[campo]) {
            haCambiado = true;
            break;
        }
    }

   /* alert(usuario.idUsuario);*/

    if (haCambiado) {
        /*alert(usuario.idUsuario);*/
       // Si ha cambiado algo, realizar la modificación
        $.ajax({
            url: '/api/usuarios/' + usuario.idUsuario, // Asegúrate de que usuario.idUsuario tiene un valor válido
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(usuario),
            success: function (response) {
                /*alert("Usuario modificado exitosamente");*/
                customAlert("Usuario modificado exitosamente", "../Resources/img/usuarioModificadoAlerta.gif");
                $('#modalModificarUsuarioM').hide();
                mostrarListaTablaDeUsuarios();
            },
            error: function (xhr, status, error) {
                /*alert("Error al modificar el usuario: " + xhr.responseText);*/
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

function mostrarListaTablaDeUsuarios() {

    $.ajax({
        url: '/api/usuarios', // Cambia la URL según tu estructura
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            // data ya es un objeto JavaScript, no es necesario parsear
            var usuarios = data;

            // Generar HTML a partir de la lista de usuarios
            var html = generarHtmlDeUsuarios(usuarios);

            // Actualizar el contenido del contenedor
            $('#contenedor-tabla').html(html);
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener la lista de usuarios:', error);
        }
    });

    // Llamar al WebMethod para obtener la tabla de empleados
    //fetch('ModuloUsuarios.aspx/ListarUsuarios', {
    //    method: 'POST',
    //    headers: {
    //        'Content-Type': 'application/json'
    //    }
    //})
    //    .then(response => response.json())
    //    .then(data => {
    //        var usuarios = JSON.parse(data.d);
    //        var html = generarHtmlDeUsuarios(usuarios);
    //        document.getElementById('contenedor-tabla').innerHTML = html;
    //    })
    //    .catch(error => {
    //        console.error('Error al obtener la lista de usuarios:', error);
    //    });

}

// Cerrar el modal al hacer clic en la "X"
var spanModalModificarContraseñaUsuario = document.getElementsByClassName("close-ModificarPasswordUsuarioM")[0];
spanModalModificarContraseñaUsuario.onclick = function () {
    var modal = document.getElementById('modalModificarPasswordUsuarioM');
    modal.style.display = "none";
}

// Cerrar el modal al hacer clic en la "X"
var span = document.getElementsByClassName("close-ModificarUsuarioM")[0];
span.onclick = function () {
    var modal = document.getElementById('modalModificarUsuarioM');
    modal.style.display = "none";
}

function modalCambiarContraseña(idUsuario) {
    /*alert("Cambiar contraseña del id: " + id);*/
    // Muestra los datos en los campos del modal correspondiente
    var modal = document.getElementById('modalModificarPasswordUsuarioM');
    modal.style.display = "block";

    document.getElementById('tbIdUsuarioModificarContraseña').value = idUsuario;
}
function cambiarContraseñaUsuario() {
    /*alert(idUsuario)*/
    var idUsuarioContraseña = document.getElementById('tbIdUsuarioModificarContraseña').value.trim();
    var contraseñaAnterior = document.getElementById('tbConstraseñaAnteriorUsuario').value.trim();
    var nuevaContraseña = document.getElementById('tbContraseñaNuevaModificarUsuario').value.trim();
    var confirmarContraseña = document.getElementById('tbConfirmarContraseñaModificarUsuario').value.trim();

    // Validación en JavaScript
    if (!contraseñaAnterior || !nuevaContraseña || !confirmarContraseña) {
        /*alert("Por favor, complete todos los campos.");*/
        customAlert("Por favor, complete todos los campos.", "../Resources/img/advertenciaCamposObligatorios.gif");
        return;
    }

    if (nuevaContraseña !== confirmarContraseña) {
        /*alert("La nueva contraseña y la confirmación no coinciden.");*/
        customAlert("La nueva contraseña y la confirmación no coinciden.", "../Resources/img/contrasenaIncorrecta.png");
        return;
    }

    // Enviar la solicitud al servidor
    fetch('ModuloUsuarios.aspx/CambiarContraseñaUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuarioId: idUsuarioContraseña,
            contraseñaAnterior: contraseñaAnterior,
            nuevaContraseña: nuevaContraseña
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.d === "OK") {
                /*alert("Contraseña cambiada exitosamente.");*/
                customAlert("Contraseña cambiada exitosamente.", "../Resources/img/cambioContraseñaUsuario.gif");
                // Cerrar el modal
                document.getElementById('modalModificarPasswordUsuarioM').style.display = 'none';
                document.getElementById('tbIdUsuarioModificarContraseña').value = "";
                document.getElementById('tbConstraseñaAnteriorUsuario').value = "";
                document.getElementById('tbContraseñaNuevaModificarUsuario').value = "";
                document.getElementById('tbConfirmarContraseñaModificarUsuario').value = "";
            } else {
                alert(data.d); // Mostrar el mensaje de error devuelto por el servidor
            }
        })
        .catch(error => {
            console.error('Error al cambiar la contraseña:', error);
        });
}



// Cerrar el modal al hacer clic en la "X"
//var span = document.getElementsByClassName("close")[0];
//span.onclick = function () {
//    var modal = document.getElementById('modalModificarEmpleadoM');
//    modal.style.display = "none";
//    $('#tbIdEmpleadoModificar').val('');
//    $('#tbPrimerNombreEmpleadoModificar').val('');
//    $('#tbSegundoNombreEmpleadoModificar').val('');
//    $('#tbTercerNombreEmpleadoModificar').val('');
//    $('#tbPrimerApellidoEmpleadoModificar').val('');
//    $('#tbSegundoApellidoEmpleadoModificar').val('');
//    $('#tbApellidoCasadaEmpleadoModificar').val('');
//    $('#tbCUIEmpleadoModificar').val('');
//    $('#tbNITEmpleadoModificar').val('');
//    $('#tbFechaNacimientoEmpleadoModificar').val('');
//    $('#tbFechaIngresoEmpleadoModificar').val('');
//    $('#tbDireccionEmpleadoModificar').val('');
//    $('#tbTelefonoEmpleadoModificar').val('');
//    $('#tbMovilEmpleadoModificar').val('');
//    $('#ddlGeneroEmpleadoModificar').val('');
//    $('#ddlEstadoEmpleadoModificar').val('');
//    $('#ddlPuestoEmpleadoModificar').val('');
//}