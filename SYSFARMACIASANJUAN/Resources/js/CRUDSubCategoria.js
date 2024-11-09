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
    document.querySelector('.botonRegistrarSubCategoria').addEventListener('click', function () {
        abrirModal('modalRegistrarSubCategoria', '.close');
    });

       /* Mostrar el modal de listar y modificar empleado*/
    document.querySelector('.botonModificarSubCategoria').addEventListener('click', function () {
        abrirModal('modalModificarSubCategoria', '.closeModificarSubCategoria');
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

function agregarSubCategoria(event) {
    // Prevenir que el formulario cierre el modal
    event.preventDefault();



    // Obtener valores de los campos
    var nombreSubCategoria = $('#tbNombreCategoria').val() === '' ? null : $('#tbNombreCategoria').val();
    var descriCategoria = $('#tbDescripcionSubCategoria').val() === '' ? null : $('#tbDescripcionSubCategoria').val();


    //var puestoProveedor = $('#ddlPuestoProveedor').val() === '' ? null : $('#ddlPuestoProveedor').val();

    if (nombreSubCategoria != null && descriCategoria != null) {

        // Si todas las validaciones pasan, crear el objeto Proveedor
        var subcategoria = {
            nombreCategoria: nombreSubCategoria,
            descripCategoria: descriCategoria,
           
        };

        // Enviar la información si pasa las validaciones
        $.ajax({
            url: '/api/subcategorias',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(subcategoria),
            success: function (response) {
                /*alert("Proveedor agregado exitosamente");*/
                customAlert("Categoria agregado exitosamente", "../Resources/img/guardar-el-archivo.png");

                /*Limpiar los campos del formulario*/
                $('#tbNombreCategoria').val('');
                $('#tbDescripcionSubCategoria').val('');
                
            },
            error: function (xhr, status, error) {
                console.log("Error al agregar el Categoria: " + xhr.responseText);
            }
        });
    } else {
        /*alert("Los campos con * son obligatorios");*/
        customAlert("Los campos con (*) son obligatorios", "../Resources/img/advertenciaCamposObligatorios.gif");
    }
}

function generarHtmlDeSubCategoria(subcategorias) {
    if (!subcategorias || subcategorias.length === 0) {
        return '<p>No se encontraron Categoria.</p>';
    }

    // Si hay empleados, generar la tabla
    var html = `
                <table>
                    <thead>
                        <tr>
                            <th>id Categoria</th>
                            <th>Categoria</th>
                            <th>Descripcion</th>             
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${subcategorias.map(subcategoria => `
                            <tr>
                                <td>${subcategoria.idCategoria}</td>
                                <td>${subcategoria.nombreCategoria}</td>
                                <td>${subcategoria.descripCategoria}</td>
                                <td><button class='modificarBtn' id='modificarBtnID' onclick="modificarSubCategoria('${subcategoria.idCategoria}')">Modificar</button></td>
                            </tr>
                        `).join('')}
                </table>
                    </tbody>
                `;

    return html;
}
document.getElementById('botonModificarSubCategoriaID').addEventListener('click', function () {

    // verificar si el radiobutton rbfiltroempleados1 está seleccionado
    //if ($('#rbfiltroempleados1').is(':checked')) {
    mostrarListaTablaDeSubCategoria();  // llamar a la función si está seleccionado
    // }
});


function mostrarListaTablaDeSubCategoria() {

    $.ajax({
        url: '/api/subcategorias', // Cambia la URL según tu estructura
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            // data ya es un objeto JavaScript, no es necesario parsear
            var subcategorias = data;

            // Generar HTML a partir de la lista de usuarios
            var html = generarHtmlDeSubCategoria(subcategorias);

            // Actualizar el contenido del contenedor
            $('#contenedor-tablaSUB').html(html);
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener la lista de categorias:', error);
        }
    });
}


/*buscar categoria*/
document.getElementById('tbBuscarSubCategoriaID').addEventListener('keyup', function () {
    var subcategoriaId = this.value.trim(); // Elimina espacios en blanco al inicio y final

    if (subcategoriaId.length > 0) {

        $.ajax({
            url: `/api/subcategorias/${subcategoriaId}`, // Usa la URL correspondiente para obtener el usuario por ID
            type: 'GET',
            contentType: 'application/json',
            success: function (data) {
                // data ya es un objeto JavaScript, no es necesario parsear
                var subcategoria = data;

                // Generar HTML a partir de la información del usuario
                var html = generarHtmlDeSubCategoria(subcategoria);

                // Actualizar el contenido del contenedor
                $('#contenedor-tablaSUB').html(html);
            },
            error: function (xhr, status, error) {
                console.error('Error al obtener el Proveedor:', error);
            }
        });

    } else {
        mostrarListaTablaDeSubCategoria();
    }
});


var subCategoriaOriginal;
function datosOriginalesSubCategoria() {

    subCategoriaOriginal = {
        idCategoria: $('#tbIdSubSubCategoriaModificar').val(),
        nombreCategoria: $('#tbNombreCategoriaModificar').val(),
        descriCategoria: $('#tbDescripcioCategoriaModificar').val(),
       

    }
}

// PARA MODICAR UNA CATEGORIA 
function modificarSubCategoria(id) {
    // Muestra los datos en los campos del modal correspondiente+
    //alert(id);
    var modal = document.getElementById('modalModificarSubCategoriaM');
    modal.style.display = "block";
    // Llamar al servidor para obtener los datos del empleado

    $.ajax({
        // url: `/api/proveedors`, // Cambia la URL según tu estructura
        url: `/api/subcategorias/un-subcategoria/${id}`, // Cambia la URL según tu estructura
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
            var subcategoria = data; // No es necesario parsear, ya que data ya es un objeto JavaScript

            // Llenar los campos del formulario con los datos del empleado
            /*alert(empleado.idEmpleado);*/
            $('#tbIdSubSubCategoriaModificar').val(subcategoria.idCategoria);
            $('#tbNombreCategoriaModificar').val(subcategoria.nombreCategoria);
            $('#tbDescripcioCategoriaModificar').val(subcategoria.descripCategoria);
           


            // prueba
            datosOriginalesSubCategoria();
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos del Categoria:', error);
        }
    });
}

// METODO PAR AMODICAR UNA CATEGORIA DEL BORTON ACCION

function modificarSubCategoriaAccion() {

    var subcategoria = {
        idCategoria: $('#tbIdSubSubCategoriaModificar').val(),
        nombreCategoria: $('#tbNombreCategoriaModificar').val(),// === '' ? null : $('#tbNombreProveedorModificar').val(),
        descripCategoria: $('#tbDescripcioCategoriaModificar').val(),
       

    };

    // Comparar si algún campo ha cambiado
    var haCambiado = false;
    for (var campo in subcategoria) {
        if (subcategoria[campo] !== subCategoriaOriginal[campo]) {
            haCambiado = true;
            break;
        }
    }

    if (haCambiado) {
        // Si ha cambiado algo, realizar la modificación
        $.ajax({
            url: '/api/subcategorias/' + subcategoria.idCategoria,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(subcategoria),
            success: function (response) {
                /*alert("Empleado modificado exitosamente");*/
                customAlert("Categoria  modificado exitosamente", "../Resources/img/editar.png");
                // Cerrar el modal con ID modalModificarEmpleadoM
                $('#modalModificarSubCategoriaM').hide();
                mostrarListaTablaDeSubCategoria();

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


var span = document.getElementsByClassName("close-ModificarSubCategoriaM")[0];
span.onclick = function () {
    var modal = document.getElementById('modalModificaSubCategoriaM');
    modal.style.display = "none";
    $('#tbIdSubSubCategoriaModificar').val('');
    $('#tbNombreCategoriaModificar').val('');
    $('#tbDescripcioCategoriaModificar').val('');
   

}
