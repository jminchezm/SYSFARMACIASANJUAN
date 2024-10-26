<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ModuloUsuarios.aspx.cs" Inherits="SYSFARMACIASANJUAN.Pages.ModuloUsuarios" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link href="../Resources/css/estilo.css" rel="stylesheet" />
    <link href="~/Content/bootstrap.min.css" rel="stylesheet" />
    <script src="~/Scripts/jquery-3.5.1.min.js"></script>
    <script src="~/Scripts/bootstrap.min.js"></script>
    <title>Módulo de Empleados - Sys_FarmaciaSanJuan</title>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>


</head>
<body>
    <main class="mainModuloEmpleado">
        <div class="divModuloEmpleado">
            <section class="opcionesModuloEmpleado">
                <div class="opcionFila2ModuloEmpleado">
                    <article class="articleOpcionModuloEmpleado">
                        <button class="botonCrearUsuario">
                        <img src="../Resources/img/nuevo_usuario.png" alt="Registrar Usuario" />
                        </button>
                        <h2 class="h2-opcion">Crear Usuario</h2>
                    </article>
                    <article class="articleOpcionModuloEmpleado">
                        <button class="botonModificarUsuario" id="botonModificarUsuarioID">
                        <img src="../Resources/img/modificar_usuario.png" alt="Registrar Usuario" />
                        </button>
                        <h2 class="h2-opcion">Listar Usuario</h2>
                    </article>
                    <article class="articleOpcionModuloEmpleado">
                        <button class="botonListaUsuarios" id="Button1" runat="server" onclick="window.location.href='ReporteUsuarios.aspx'">
                            <img src="../Resources/img/lista_usuarios.png" alt="Registrar Empleado" />
                        </button>
                        <%--<button class="botonListaUsuarios">
                        <img src="../Resources/img/lista_usuarios.png" alt="Registrar Empleado" />
                        </button>--%>
                        <h2 class="h2-opcion">Reporte Usuarios</h2>
                    </article>
                </div>
            </section>
        </div>
    </main>

    <form id="form1" runat="server">

        <%--modal agregar empleados--%>
        <div id="modalCrearUsuario" clientidmode="Static" class="modal" style="display:none;">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Crear Usuario</h2>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="Label2" runat="server" Text="Elige al Empleado*"></asp:Label>
                        <asp:DropDownList ID="ddlIdEmpleadoUsuario" runat="server" CssClass="form-control" onchange="actualizarTextBoxNombreCompleto()" required="true">
                        </asp:DropDownList>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblNombreUsuario" runat="server" Text="Usuario*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbNombreUsuario" runat="server" placeholder="Usuario" required="true"></asp:TextBox>
                    </div>
                </div>
            
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblPasswordUsuario" runat="server" Text="Contraseña*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbPasswordUsuario" placeholder="Contraseña" runat="server" TextMode="Password"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="Label3" runat="server" Text="Confirmar Contraseña*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbConfirmarContraseñaUsuario" placeholder="Confirmar Contraseña" runat="server" TextMode="Password"></asp:TextBox>
                    </div>                     
                </div>
            
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblCorreoUsuario" runat="server" Text="Correo Electrónico"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbCorreoUsuario" placeholder="Correo Electrónico" runat="server" TextMode="Email"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="Label1" runat="server" Text="Rol*"></asp:Label>
                        <asp:DropDownList ID="ddlRolUsuario" runat="server" CssClass="form-control" required="true">
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12 text-right">
                        <asp:Button ID="btnGuardarUsuario" runat="server" Text="Guardar Usuario" CssClass="btn btn-primary" OnClientClick="crearUsuario(event);"/>
                    </div>
                </div>
            </div>
        </div>

        <!--Modal listar y modificar empleado-->
        <div id="modalModificarUsuario" clientidmode="Static" class="modal" style="display:none;">
            <div class="modal-content-modificarUsuario">
                <span class="closeModificarUsuario">&times;</span>
                <h2 style="text-align:center;">Lista Modificación de Usuarios</h2>
                <div class="contenedorBuscarUsuarioID" runat="server">
                    <asp:TextBox class="form-control me-2" placeholder="Buscar Usuario por ID" aria-label="Search" id="tbBuscarUsuarioID" runat="server"></asp:TextBox>
                </div>
                <div id="contenedor-tabla"></div>
            </div>
        </div>

        <%--modal modificar DATOS usuario--%>
        <div id="modalModificarUsuarioM" clientidmode="Static" class="modal" style="display:none;">
            <div class="modal-content-ModificarUsuarioM">
                <span class="close-ModificarUsuarioM">&times;</span>
                <h2>Modificar Usuario</h2>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="Label2Modificar" runat="server" Text="ID del Usuario"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbIdUsuarioModificar" placeholder="ID del Usuario" runat="server" required="true" ReadOnly="true"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblNombreUsuarioModificar" runat="server" Text="Usuario*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbNombreUsuarioModificar" runat="server" placeholder="Usuario" required="true"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblCorreoUsuarioModificar" runat="server" Text="Correo Electrónico"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbCorreoUsuarioModificar" placeholder="Correo Electrónico" runat="server" TextMode="Email"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="Label1Modificar" runat="server" Text="Rol*"></asp:Label>
                        <asp:DropDownList ID="ddlRolUsuarioModificar" runat="server" CssClass="form-control" required="true">
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12 text-right">
                        <asp:Button ID="btnGuardarModificarUsuario" runat="server" Text="Modificar Usuario" CssClass="btn btn-primary" OnClientClick="modificarDatosUsuarioAccion()"/>
                    </div>
                </div>
            </div>
        </div>

        <%--Modal modificar contraseña del usuario--%>
        <div id="modalModificarPasswordUsuarioM" clientidmode="Static" class="modal" style="display:none;">
            <div class="modal-content-ModificarPasswordUsuarioM">
                <span class="close-ModificarPasswordUsuarioM">&times;</span>
                <h2>Cambiar Constraseña</h2>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="Label5" runat="server" Text="Id Usuario"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbIdUsuarioModificarContraseña" runat="server" placeholder="Contraseña Anterior" TextMode="SingleLine" required="true" ReadOnly="true"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="Label4" runat="server" Text="Contraseña Anterior*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbConstraseñaAnteriorUsuario" runat="server" placeholder="Contraseña Anterior" TextMode="Password" required="true"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblContraseñaNuevaModificarUsuario" runat="server" Text="Nueva Contraseña*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbContraseñaNuevaModificarUsuario" runat="server" placeholder="Nueva Contraseña" TextMode="Password" required="true"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblConfirmarContraseñaModificarUsuario" runat="server" Text="Confirmar Contraseña"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbConfirmarContraseñaModificarUsuario" placeholder="Confirmar Contraseña" runat="server" TextMode="Password"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12 text-right">
                        <asp:Button ID="btnGuardarContraseñaModificarUsuario" runat="server" Text="Cambiar Contraseña" CssClass="btn btn-primary" OnClientClick="cambiarContraseñaUsuario()"/>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <%--<script>
        function actualizarTextBoxNombreCompleto() {
            // Obtener el elemento DropDownList
            var ddl = document.getElementById('<%= ddlIdEmpleadoUsuario.ClientID %>');

            // Verificar si el DropDownList tiene opciones
            console.log(ddl.options);

            // Obtener el valor seleccionado
            var selectedText = ddl.options[ddl.selectedIndex]?.text;

            // Verificar si el valor seleccionado es null
            console.log("Selected text:", selectedText);

            // Asignar el texto seleccionado al TextBox
            if (selectedText) {
                document.getElementById('<%= tbNombreEmpleadoUsuario.ClientID %>').value = selectedText;
            } else {
                        document.getElementById('<%= tbNombreEmpleadoUsuario.ClientID %>').value = "";
            }
        }
    </script>--%>
    <script src="../Resources/js/CRUDUsuarios.js"></script>

    <%--El modal agregar empleados--%>
    <%--<div id="modalRegistrarEmpleado" class="modal" style="display:none;">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Registrar Nuevo Empleado</h2>
            <form id="form1" runat="server">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblPrimerNombreEmpleado" runat="server" Text="Primer Nombre*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbPrimerNombreEmpleado" runat="server" required="true"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblSegundoNombreEmpleado" runat="server" Text="Segundo Nombre"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbSegundoNombreEmpleado" runat="server"></asp:TextBox>
                    </div>
                </div>
            
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblTercerNombreEmpleado" runat="server" Text="Tercer Nombre"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbTercerNombreEmpleado" runat="server"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblPrimerApellidoEmpleado" runat="server" Text="Primer Apellido*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbPrimerApellidoEmpleado" runat="server" required="true"></asp:TextBox>
                    </div>
                </div>
            
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblSegundoApellidoEmpleado" runat="server" Text="Segundo Apellido"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbSegundoApellidoEmpleado" runat="server"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblApellidoCasadaEmpleado" runat="server" Text="Apellido de Casada"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbApellidoCasadaEmpleado" runat="server"></asp:TextBox>
                    </div>
                </div>
            
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblCUIEmpleado" runat="server" Text="CUI*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbCUIEmpleado" runat="server" TextMode="Number" required="true"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblNITEmpleado" runat="server" Text="NIT"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbNITEmpleado" runat="server" TextMode="Number" required="true"></asp:TextBox>
                    </div>
                </div>
            
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblFechaNacimientoEmpleado" runat="server" Text="Fecha de Nacimiento*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbFechaNacimientoEmpleado" runat="server" TextMode="Date" required="true"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblFechaIngresoEmpleado" runat="server" Text="Fecha de Ingreso*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbFechaIngresoEmpleado" runat="server" TextMode="Date" required="true"></asp:TextBox>
                    </div>
                </div>
            
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblDireccionEmpleado" runat="server" Text="Dirección"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbDireccionEmpleado" runat="server" TextMode="SingleLine" required="true"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-3">
                        <asp:Label ID="lblTelefonoEmpleado" runat="server" Text="Teléfono"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbTelefonoEmpleado" runat="server" TextMode="Phone"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-3">
                        <asp:Label ID="lblMovilEmpleado" runat="server" Text="Móvil"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbMovilEmpleado" runat="server" TextMode="Phone" required="true"></asp:TextBox>
                    </div>
                </div>
            
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <asp:Label ID="lblGeneroEmpleado" runat="server" Text="Género*"></asp:Label>
                        <asp:DropDownList ID="ddlGeneroEmpleado" runat="server" CssClass="form-control" required="true">
                            <asp:ListItem Text="Seleccione" Value="" />
                            <asp:ListItem Text="Masculino" Value="M" />
                            <asp:ListItem Text="Femenino" Value="F" />
                            <asp:ListItem Text="Otro" Value="O" />
                        </asp:DropDownList>
                    </div>
                    <div class="form-group col-md-4">
                        <asp:Label ID="lblEstadoEmpleado" runat="server" Text="Estado*"></asp:Label>
                        <asp:DropDownList ID="ddlEstadoEmpleado" runat="server" CssClass="form-control" required="true">
                            <asp:ListItem Text="Seleccione" Value="" />
                            <asp:ListItem Text="Activo" Value="1" />
                            <asp:ListItem Text="Inactivo" Value="2" />
                        </asp:DropDownList>
                    </div>
                    <div class="form-group col-md-4">
                        <asp:Label ID="lblPuestoEmpleado" runat="server" Text="Puesto*"></asp:Label>
                        <asp:DropDownList class="form-control" ID="ddlPuestoEmpleado" runat="server" required="true">

                        </asp:DropDownList>
                    </div>
                </div>
            
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="lblFotoEmpleado" runat="server" Text="Foto"></asp:Label>
                        <asp:FileUpload ID="fuFotoEmpleado" runat="server" CssClass="form-control-file"/>
                    </div>
                </div>
            
                <div class="form-row">
                    <div class="form-group col-md-12 text-right">
                        <asp:Button ID="btnGuardarEmpleado" runat="server" Text="Guardar Registro" CssClass="btn btn-primary"  OnClick="btnSubir_Click" />
                    </div>
                </div>
            </form>
        </div>
    </div>--%>
<%--<script>

    function agregarEmpleado() {

        // Obtener valores de los campos
        var primerNombreEmpleado = $('#tbPrimerNombreEmpleado').val();
        var segundoNombreEmpleado = $('#tbSegundoNombreEmpleado').val();
        var tercerNombreEmpleado = $('#tbTercerNombreEmpleado').val();
        var primerApellidoEmpleado = $('#tbPrimerApellidoEmpleado').val();
        var segundoApellidoEmpleado = $('#tbSegundoApellidoEmpleado').val();
        var apellidoCasadaEmpleado = $('#tbApellidoCasadaEmpleado').val();
        var cuiEmpleado = $('#tbCUIEmpleado').val();
        var nitEmpleado = $('#tbNITEmpleado').val();
        var fechaNacimientoEmpleado = $('#tbFechaNacimientoEmpleado').val();
        var fechaIngresoEmpleado = $('#tbFechaIngresoEmpleado').val();
        var direccionEmpleado = $('#tbDireccionEmpleado').val();
        var telefonoEmpleado = $('#tbTelefonoEmpleado').val();
        var movilEmpleado = $('#tbMovilEmpleado').val();
        var generoEmpleado = $('#ddlGeneroEmpleado').val();
        var estadoEmpleado = $('#ddlEstadoEmpleado').val();
        var puestoEmpleado = $('#tbPuestoEmpleado').val();
        var fotoEmpleado = Encoding.UTF8.GetBytes(document.getElementById('#fuFotoEmpleado').val());
        /*var fotoEmpleado = Encoding.UTF8.GetBytes($('#fuFotoEmpleado').val());*/

        //console.log(primerNombreEmpleado);
        //console.log(segundoNombreEmpleado);
        //console.log(tercerNombreEmpleado);
        //console.log(primerApellidoEmpleado);
        //console.log(segundoApellidoEmpleado);
        //console.log(apellidoCasadaEmpleado);
        //console.log(cuiEmpleado);
        //console.log(nitEmpleado);
        //console.log(fechaNacimientoEmpleado);
        //console.log(fechaIngresoEmpleado);
        //console.log(direccionEmpleado);
        //console.log(telefonoEmpleado);
        //console.log(movilEmpleado);
        //console.log(generoEmpleado);
        //console.log(estadoEmpleado);
        //console.log(puestoEmpleado);
        /*console.log(fotoEmpleado);*/

       /* console.log(fotoEmpledo);*/

        // Validaciones
        if (primerNombreEmpleado == "" || primerApellidoEmpleado == "" || cuiEmpleado == "" ||
            fechaNacimientoEmpleado == "" || fechaIngresoEmpleado == "" || direccionEmpleado == "" ||
            movilEmpleado == "" || generoEmpleado == "" || estadoEmpleado == "" || puestoEmpleado == "") {
            /*alert("Por favor, complete todos los campos obligatorios.");*/
            return; // Suspende el envío de la información
        }

        if (cuiEmpleado.length > 13) {
            alert("El CUI debe tener un máximo de 13 números.");
            return false; // Suspende el envío de la información
        }

        if (nitEmpleado.length > 10) {
            alert("El NIT debe tener un máximo de 9 números.");
            return false; // Suspende el envío de la información
        }

        //// Si todas las validaciones pasan, crear el objeto empleado
        var empleado = {
            primerNombre: primerNombreEmpleado,
            segundoNombre: $('#tbSegundoNombreEmpleado').val(),
            tercerNombre: $('#tbTercerNombreEmpleado').val(),
            primerApellido: primerApellidoEmpleado,
            segundoApellido: $('#tbSegundoApellidoEmpleado').val(),
            apellidoCasada: $('#tbApellidoCasadaEmpleado').val(),
            cui: cuiEmpleado,
            nit: $('#tbNITEmpleado').val(),
            fechaNacimiento: fechaNacimientoEmpleado,
            fechaIngreso: fechaIngresoEmpleado,
            direccion: direccionEmpleado,
            telefonoCasa: $('#tbTelefonoEmpleado').val(),
            telefonoMovil: movilEmpleado,
            genero: generoEmpleado,
            estado: estadoEmpleado,
            puesto: puestoEmpleado,
            foto: fotoEmpleado,
        };

        // Enviar la información si pasa las validaciones
        $.ajax({
            url: '/api/empleados',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(empleado),
            success: function (response) {
                /*mostrarModalConfirmacion();*/
                alert("Empleado agregado exitosamente");
                return true;

                //// Limpiar los campos del formulario
                //$('#tbPrimerNombreEmpleado').val('');
                //$('#tbSegundoNombreEmpleado').val('');
                //$('#tbTercerNombreEmpleado').val('');
                //$('#tbPrimerApellidoEmpleado').val('');
                //$('#tbSegundoApellidoEmpleado').val('');
                //$('#tbApellidoCasadaEmpleado').val('');
                //$('#tbCUIEmpleado').val('');
                //$('#tbNITEmpleado').val('');
                //$('#tbFechaNacimientoEmpleado').val('');
                //$('#tbFechaIngresoEmpleado').val('');
                //$('#tbDireccionEmpleado').val('');
                //$('#tbTelefonoEmpleado').val('');
                //$('#tbMovilEmpleado').val('');
                //$('#ddlGeneroEmpleado').val('');
                //$('#lblEstadoEmpleado').val('');
                //$('#lblPuestoEmpleado').val('');
                //$('#lblFotoEmpleado').val('');
            },
            error: function (xhr, status, error) {
                alert("Error al agregar el empleado: " + xhr.responseText);
                return false;
                //var errorMessage = xhr.status + ': ' + xhr.statusText;
                //alert("Error al agregar el empleado: " + errorMessage);
            }
        });

        /*return true;*/ // Permite que el formulario se envíe
    }
</script>--%>
<%--<script src="../Resources/js/registroEmpleado.js"></script>--%>
    <%--Modal de alerta--%>
<div id="custom-alert" class="modalAlerta">
  <div class="modal-content-alerta">
    <%--<span class="close-button-alerta">&times;</span>--%>
    <img id="alert-image" src="" alt="Alerta" style="display:none; width: 100px; height: 100px; margin-bottom: 15px;" />
    <p id="alert-message">This is a custom alert!</p>
    <button id="alert-ok-button">OK</button>
  </div>
</div>
</body>
</html>
