document.addEventListener('DOMContentLoaded', function () {
    // Función genérica para abrir cualquier modal
    function abrirModal(modalId, closeClass) {
        var modal = document.getElementById(modalId);
        modal.style.display = 'flex';

        // Cerrar el modal cuando se hace clic en el botón de cerrar
        modal.querySelector(closeClass).addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    // Mostrar el modal de agregar empleado
    document.querySelector('.botonRegistrarPais').addEventListener('click', function () {
        abrirModal('modalRegistrarPais', '.close');
    });

    /*    Mostrar el modal de listar y modificar empleado*/
    document.querySelector('.botonModificarPais').addEventListener('click', function () {
        abrirModal('modalModificarPais', '.closeModificarPais');
    });
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


function agregarPais(event) {
    // Prevenir que el formulario cierre el modal
    event.preventDefault();

    // Obtener valores de los campos
    var descripcionPais = $('#tbNombrePais').val() === '' ? null : $('#tbNombrePais').val();

    if (descripcionPais != null) {

        // Si todas las validaciones pasan, crear el objeto Proveedor
        var pais = {
            nombrePais: descripcionPais
        };

        // Enviar la información si pasa las validaciones
        $.ajax({
            url: '/api/pais',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(pais),
            success: function (response) {
                /*alert("Proveedor agregado exitosamente");*/
                customAlert("Pais agregado exitosamente", "../Resources/img/Pais/mundial.png");

                /*Limpiar los campos del formulario*/
                $('#tbNombrePais').val('');
            },
            error: function (xhr, status, error) {
                console.log("Error al agregar el Pais: " + xhr.responseText);
            }
        });
    } else {
        /*alert("Los campos con * son obligatorios");*/
        customAlert("Los campos con (*) son obligatorios", "../Resources/img/advertenciaCamposObligatorios.gif");
    }

}


  function generarHtmlDePais(paises) {
        if (!paises || paises.length === 0) {
            return '<p>No se encontro ningun Pais.</p>';
        }

        // Si hay empleados, generar la tabla
        var html = `
                <table>
                    <thead>
                        <tr>
                            <th>id Pais</th>
                            <th>Nombre del Pais</th>          
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${paises.map(pais => `
                            <tr>
                                <td>${pais.idPais}</td>
                                <td>${pais.nombrePais}</td>
                                <td><button class='modificarBtn' id='modificarBtnID' onclick="modificarPais('${pais.idPais}')">Modificar</button></td>
                            </tr>
                        `).join('')}
                </table>
                    </tbody>
                `;

        return html;
}


 document.getElementById('botonModificarPaisID').addEventListener('click', function () {

        mostrarListaTablaPais();
 });

function mostrarListaTablaPais() {

        $.ajax({
            url: '/api/pais', // Cambia la URL según tu estructura
            type: 'GET',
            contentType: 'application/json',
            success: function (data) {
                // data ya es un objeto JavaScript, no es necesario parsear
                var paises = data;

                // Generar HTML a partir de la lista de usuarios
                var html = generarHtmlDePais(paises);

                // Actualizar el contenido del contenedor
                $('#contenedor-tabla').html(html);
            },
            error: function (xhr, status, error) {
                console.error('Error al obtener la lista de categorias:', error);
            }
        });

}


        document.getElementById('tbBuscarPaisID').addEventListener('keyup', function () {
            var paisId = this.value.trim(); // Elimina espacios en blanco al inicio y final

            if (paisId.length > 0) {

                $.ajax({
                    url: `/api/pais/${paisId}`, // Usa la URL correspondiente para obtener el usuario por ID
                    type: 'GET',
                    contentType: 'application/json',
                    success: function (data) {
                        // data ya es un objeto JavaScript, no es necesario parsear
                        var pais = data;

                        // Generar HTML a partir de la información del usuario
                        var html = generarHtmlDePais(pais);

                        // Actualizar el contenido del contenedor
                        $('#contenedor-tabla').html(html);
                    },
                    error: function (xhr, status, error) {
                        console.error('Error al obtener el Proveedor:', error);
                    }
                });

            } else {
                mostrarListaTablaPais();
            }
        });

        var paisOriginal;
        function datosOriginalesPais() {

            paisOriginal = {
                idPais: $('#tbIdPaisModificar').val(),
                nombrePais: $('#tbNombrePaisModificar').val(),

            }
        }

        function modificarPais(id) {
            // Muestra los datos en los campos del modal correspondiente+
            //alert(id);
            var modal = document.getElementById('modalModificarPaisM');
            modal.style.display = "block";
            // Llamar al servidor para obtener los datos del empleado

            $.ajax({
   
                url: `/api/pais/un-paises/${id}`, // Cambia la URL según tu estructura
                type: 'GET',
                contentType: 'application/json',

                success: function (data) {
                    if (data === null) {
                        alert('No se encontró Pais.');
                        return;
                    }

                    // Parsear la respuesta y cargar los datos en el formulario
                    var pais = data; // No es necesario parsear, ya que data ya es un objeto JavaScript

                    // Llenar los campos del formulario con los datos del empleado
                    /*alert(empleado.idEmpleado);*/
                    $('#tbIdPaisModificar').val(pais.idPais);
                    $('#tbNombrePaisModificar').val(pais.nombrePais);
                    // prueba
                    datosOriginalesPais();
                },
                error: function (xhr, status, error) {
                    console.error('Error al obtener los datos del Categoria:', error);
                }
            });
        }


        function modificarPaisAccion() {

            var pais = {
                idPais: $('#tbIdPaisModificar').val(),
                nombrePais: $('#tbNombrePaisModificar').val() === '' ? null : $('#tbNombrePaisModificar').val()
   

            };

            var haCambiado = false;
            for (var campo in pais) {
                if (pais[campo] !== paisOriginal[campo]) {
                    haCambiado = true;
                    break;
                }
            }

            if (haCambiado) {
                // Si ha cambiado algo, realizar la modificación
                $.ajax({
                    url: '/api/pais/' + pais.idPais,
                    method: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(pais),
                    success: function (response) {
                        /*alert("Empleado modificado exitosamente");*/
                        customAlert("Pais modificado exitosamente", "../Resources/img/Municipio/exitoMuni.png");
                        // Cerrar el modal con ID modalModificarEmpleadoM
                        $('#modalModificarPaisM').hide();
                        mostrarListaTablaPais();

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

        var span = document.getElementsByClassName("close-ModificarPaisM")[0];
        span.onclick = function () {
            var modal = document.getElementById('modalModificarPaisM');
            modal.style.display = "none";
            $('#tbIdPaisModificar').val('');
            $('#tbNombrePaisModificar').val('');

        }

    

