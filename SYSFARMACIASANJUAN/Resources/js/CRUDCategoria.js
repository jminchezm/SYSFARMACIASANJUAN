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
    document.querySelector('.botonRegistrarCategoria').addEventListener('click', function () {
        abrirModal('modalRegistrarCategoria', '.close');
    });

 /*    Mostrar el modal de listar y modificar empleado*/
    document.querySelector('.botonModificarCategoria').addEventListener('click', function () {
        abrirModal('modalModificarCategoria', '.closeModificarCategoria');
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

function agregarCategoria(event) {
    // Prevenir que el formulario cierre el modal
    event.preventDefault();



    // Obtener valores de los campos
    var nombreCategoria = $('#ddlNombreCategoria').val() === '' ? null : $('#ddlNombreCategoria').val();
    var nombresubCa = $('#tbNombreSubCategoria').val() === '' ? null : $('#tbNombreSubCategoria').val();
    var DescripcionsubCa = $('#tbDescripcionCategoria').val() === '' ? null : $('#tbDescripcionCategoria').val();
   
    //var puestoProveedor = $('#ddlPuestoProveedor').val() === '' ? null : $('#ddlPuestoProveedor').val();

    if (nombreCategoria != null && nombresubCa != null) {

        // Si todas las validaciones pasan, crear el objeto Proveedor
        var categoria = {
            idCategoria: nombreCategoria,
            nombresubCategoria: nombresubCa,
            descsubCategoria: DescripcionsubCa,
           
        };

        // Enviar la información si pasa las validaciones
        $.ajax({
            url: '/api/categorias',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(categoria),
            success: function (response) {
                /*alert("Proveedor agregado exitosamente");*/
                customAlert("Categoria agregado exitosamente", "../Resources/img/guardar-el-archivo.png");

                /*Limpiar los campos del formulario*/
                $('#ddlNombreCategoria').val('');
                $('#tbNombreSubCategoria').val('');
                $('#tbDescripcionCategoria').val('');
           


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

function generarHtmlDeCategoria(categorias) {
    if (!categorias || categorias.length === 0) {
        return '<p>No se encontraron Categoria.</p>';
    }

    // Si hay empleados, generar la tabla
    var html = `
                <table>
                    <thead>
                        <tr>
                            <th>id sub Categoria</th>
                            <th>Categoria</th>
                            <th>SubCategoria</th>
                            <th>Descripcion</th>             
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${categorias.map(categoria => `
                            <tr>
                                <td>${categoria.idsubCategoria}</td>
                                <td>${categoria.idCategoria}</td>
                                <td>${categoria.nombresubcategoria}</td>
                                <td>${categoria.descsubCategoria}</td>
                                <td><button class='modificarBtn' id='modificarBtnID' onclick="modificarCategoria('${categoria.idsubCategoria}')">Modificar</button></td>
                            </tr>
                        `).join('')}
                </table>
                    </tbody>
                `;

    return html;
}
document.getElementById('botonModificarCategoriaID').addEventListener('click', function () {

    // Verificar si el RadioButton rbFiltroEmpleados1 está seleccionado
    //if ($('#rbFiltroEmpleados1').is(':checked')) {
    mostrarListaTablaDeCategoria();  // Llamar a la función si está seleccionado
    // }
});


function mostrarListaTablaDeCategoria() {

    $.ajax({
        url: '/api/categorias', // Cambia la URL según tu estructura
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            // data ya es un objeto JavaScript, no es necesario parsear
            var categorias = data;

            // Generar HTML a partir de la lista de usuarios
            var html = generarHtmlDeCategoria(categorias);

            // Actualizar el contenido del contenedor
            $('#contenedor-tabla').html(html);
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener la lista de categorias:', error);
        }
    });
}


/*buscar categoria*/
document.getElementById('tbBuscarCategoriaID').addEventListener('keyup', function () {
    var categoriaId = this.value.trim(); // Elimina espacios en blanco al inicio y final

    if (categoriaId.length > 0) {

        $.ajax({
            url: `/api/categorias/${categoriaId}`, // Usa la URL correspondiente para obtener el usuario por ID
            type: 'GET',
            contentType: 'application/json',
            success: function (data) {
                // data ya es un objeto JavaScript, no es necesario parsear
                var categoria = data;

                // Generar HTML a partir de la información del usuario
                var html = generarHtmlDeCategoria(categoria);

                // Actualizar el contenido del contenedor
                $('#contenedor-tabla').html(html);
            },
            error: function (xhr, status, error) {
                console.error('Error al obtener el Proveedor:', error);
            }
        });

    } else {
        mostrarListaTablaDeCategoria();
    }
});


var categoriaOriginal;
function datosOriginalesCategoria() {

    categoriaOriginal = {
        idsubCategoria: $('#tbIdSubCategoriaModificar').val(),
        idCategoria: $('#ddlNombreCategoriaModificar').val(),
        nombresubcategoria: $('#tbNombreSubCategoriaModificar').val(),
        descsubCategoria: $('#tbDescripcioSubCategoriaModificarr').val(),
       
    }
}

// PARA MODICAR UNA CATEGORIA 
function modificarCategoria(id) {
    // Muestra los datos en los campos del modal correspondiente+
    //alert(id);
    var modal = document.getElementById('modalModificarCategoriaM');
    modal.style.display = "block";
    // Llamar al servidor para obtener los datos del empleado

    $.ajax({
        // url: `/api/proveedors`, // Cambia la URL según tu estructura
        url: `/api/categorias/un-categoria/${id}`, // Cambia la URL según tu estructura
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
            var categoria = data; // No es necesario parsear, ya que data ya es un objeto JavaScript

            // Llenar los campos del formulario con los datos del empleado
            /*alert(empleado.idEmpleado);*/
            $('#tbIdSubCategoriaModificar').val(categoria.idsubCategoria);
            $('#ddlNombreCategoriaModificar').val(categoria.idCategoria);
            $('#tbNombreSubCategoriaModificar').val(categoria.nombresubcategoria);
            $('#tbDescripcioSubCategoriaModificarr').val(categoria.descsubCategoria);
         

            // prueba
            datosOriginalesCategoria();
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos del Categoria:', error);
        }
    });
}

// METODO PAR AMODICAR UNA CATEGORIA DEL BORTON ACCION

function modificarCategoriaAccion() {

    var categoria = {
        idsubCategoria: $('#tbIdSubCategoriaModificar').val(),
        idCategoria: $('#ddlNombreCategoriaModificar').val(),// === '' ? null : $('#tbNombreProveedorModificar').val(),
        nombresubcategoria: $('#tbNombreSubCategoriaModificar').val(),
        descsubCategoria: $('#tbDescripcioSubCategoriaModificarr').val(),

    };

    // Comparar si algún campo ha cambiado
    var haCambiado = false;
    for (var campo in categoria) {
        if (categoria[campo] !== categoriaOriginal[campo]) {
            haCambiado = true;
            break;
        }
    }

    if (haCambiado) {
        // Si ha cambiado algo, realizar la modificación
        $.ajax({
            url: '/api/categorias/' + categoria.idsubCategoria,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(categoria),
            success: function (response) {
                /*alert("Empleado modificado exitosamente");*/
                customAlert("Categoria  modificado exitosamente", "../Resources/img/editar.png");
                // Cerrar el modal con ID modalModificarEmpleadoM
                $('#modalModificarCategoriaM').hide();
                mostrarListaTablaDeCategoria();

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


var span = document.getElementsByClassName("close-ModificarCategoriaM")[0];
span.onclick = function () {
    var modal = document.getElementById('modalModificarCategoriaM');
    modal.style.display = "none";
    $('#tbIdSubCategoriaModificar').val('');
    $('#ddlNombreCategoriaModificar').val('');
    $('#tbNombreSubCategoriaModificar').val('');
    $('#tbDescripcioSubCategoriaModificarr').val('');
   
}
