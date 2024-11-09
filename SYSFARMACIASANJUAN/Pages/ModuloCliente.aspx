<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ModuloCliente.aspx.cs" Inherits="SYSFARMACIASANJUAN.Pages.ModuloCliente" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="../Resources/css/StylesModuloVentas/estiloCliente.css" rel="stylesheet" />
    <link href="~/Content/bootstrap.min.css" rel="stylesheet" />
    <script src="~/Scripts/jquery-3.5.1.min.js"></script>
    <script src="~/Scripts/bootstrap.min.js"></script>
    <title>Módulo de Clientes - Sys_FarmaciaSanJuan</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
</head>
<body>
    <main class="mainModuloCliente">
        <div class="divModuloCliente">
            <section class="opcionesModuloCliente">
                <div class="opcionFila1ModuloCliente">
                    <article class="articleOpcionModuloCliente">
                        <button class="botonRegistrarCliente" onclick="abrirModalCrearCliente()">
                            <img src="../Resources/img/crear_cliente.png" alt="Registrar Cliente" />
                        </button>
                        <h2>Crear Cliente</h2>
                    </article>
                    <article class="articleOpcionModuloCliente">
                        <button class="botonModificarCliente" id="botonModificarClienteID" runat="server">
                            <img src="../Resources/img/listar_cliente.png" alt="Registrar Cliente" />
                        </button>
                        <h2>Listar Clientes</h2>
                    </article>
                    <article class="articleOpcionModuloCliente">
                        <button class="botonListaCliente">
                            <img src="../Resources/img/reporte_cliente.png" alt="Registrar Cliente" />
                        </button>
                        <h2>Reporte</h2>
                    </article>
                </div>
                <hr />
            </section>
        </div>
    </main>

    <form id="form1" runat="server">

        <%--modal agregar clientes--%>
        <div id="modalRegistrarCliente" clientidmode="Static" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Crear Nuevo Cliente</h2>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblPrimerNombreCliente" runat="server" Text="Primer Nombre*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbPrimerNombreCliente" runat="server" required="true"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblSegundoNombreCliente" runat="server" Text="Segundo Nombre"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbSegundoNombreCliente" runat="server"></asp:TextBox>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblTercerNombreCliente" runat="server" Text="Tercer Nombre"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbTercerNombreCliente" runat="server"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblPrimerApellidoCliente" runat="server" Text="Primer Apellido*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbPrimerApellidoCliente" runat="server" required="true"></asp:TextBox>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblSegundoApellidoCliente" runat="server" Text="Segundo Apellido"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbSegundoApellidoCliente" runat="server"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblApellidoCasadaCliente" runat="server" Text="Apellido de Casada"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbApellidoCasadaCliente" runat="server"></asp:TextBox>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblNITEmpleado" runat="server" Text="NIT"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbNITCliente" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57" required="true"></asp:TextBox>
                    </div>

                    <div class="form-group col-md-6">
                        <asp:Label ID="lblCUIEmpleado" runat="server" Text="CUI*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbCUICliente" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57" required="true"></asp:TextBox>
                    </div>


                </div>

                <div class="form-row">
                    <%--<div 
                        class="form-group col-md-6">
                        <asp:Label ID="lblMunicipioCliente" runat="server" Text="Municipio*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbMunicipioCliente" runat="server"></asp:TextBox>
                    </div>--%>

                    <div class="form-group col-md-6">
                        <asp:Label ID="lblMunicipioCliente" runat="server" Text="Municipio*"></asp:Label>
                        <asp:DropDownList class="form-control" ID="ddlMunicipioCliente" runat="server" required="true">
                        </asp:DropDownList>
                    </div>

                    <div class="form-group col-md-6">
                        <asp:Label ID="lblDireccionCliente" runat="server" Text="Dirección*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbDireccionCliente" runat="server" TextMode="SingleLine" required="true"></asp:TextBox>
                    </div>

                </div>

                <div class="form-row">
                    <div
                        class="form-group col-md-6">
                        <asp:Label ID="lblCorreoCliente" runat="server" Text="Correo"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbCorreoCliente" runat="server"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-3">
                        <asp:Label ID="lblMovilCliente" runat="server" Text="Móvil*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbMovilCliente" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57" required="true"></asp:TextBox>
                    </div>

                    <div class="form-group col-md-3">
                        <asp:Label ID="lblTelefonoCliente" runat="server" Text="Teléfono"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbTelefonoCliente" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57"></asp:TextBox>
                    </div>


                </div>

                <div class="form-row">
                    <div class="form-group col-md-12 text-right">
                        <asp:Button ID="btnGuardarCliente" runat="server" Text="Guardar Cliente" CssClass="btn btn-primary" OnClientClick="crearCliente(event);" />
                    </div>
                </div>
            </div>
        </div>

        <!--Modal listar y modificar empleado-->
        <div id="modalModificarCliente" clientidmode="Static" class="modal" style="display: none;">
            <div class="modal-content-modificarCliente">
                <span class="closeModificarCliente">&times;</span>
                <h2 style="text-align: center;">Lista de Clientes</h2>
                <%-- <div class="contenedorRadioButtonCliente">
                    <asp:RadioButton ID="rbFiltroEmpleados1" runat="server" GroupName="filtroEmpleados" Text="Mostrar todo" Checked="true"/>

                </div>--%>
                <div class="contenedorBuscarClienteID" runat="server">
                    <asp:TextBox class="form-control me-2" placeholder="Buscar Cliente por ID" aria-label="Search" ID="tbBuscarClienteID" runat="server"></asp:TextBox>
                    <%--<button type="button" class="btn btn-outline-secondary"><i class="fa fa-print"></i></button>--%>
                    <button type="button" class="btn btn-outline-secondary" onclick="location.href='ReporteCliente.aspx';">
                        <i class="fa fa-print"></i>
                    </button>
                </div>
                <div id="contenedor-tabla"></div>
            </div>
        </div>

        <%--modal modificar empleado-----------------------------------------------------------------%>
        <div id="modalModificarClienteM" clientidmode="Static" class="modal" style="display: none;">
            <div class="modal-content-ModificarClienteM">
                <span class="close-ModificarClienteM">&times;</span>
                <h2>Modificar Cliente</h2>

                <div class="form-row">
                    <div class="form-group col-md-4">
                        <asp:Label ID="lblIdClienteModificar" runat="server" Text="Id Cliente"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbIdClienteModificar" runat="server" required="true" ReadOnly="true"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-4">
                        <asp:Label ID="lblPrimerNombreClienteModificar" runat="server" Text="Primer Nombre*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbPrimerNombreClienteModificar" runat="server" required="true"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-4">
                        <asp:Label ID="lblSegundoNombreClienteModificar" runat="server" Text="Segundo Nombre"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbSegundoNombreClienteModificar" runat="server"></asp:TextBox>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-4">
                        <asp:Label ID="lblTercerNombreClienteModificar" runat="server" Text="Tercer Nombre"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbTercerNombreClienteModificar" runat="server"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-4">
                        <asp:Label ID="lblPrimerApellidoClienteModificar" runat="server" Text="Primer Apellido*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbPrimerApellidoClienteModificar" runat="server" required="true"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-4">
                        <asp:Label ID="lblSegundoApellidoClienteModificar" runat="server" Text="Segundo Apellido"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbSegundoApellidoClienteModificar" runat="server"></asp:TextBox>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-4">
                        <asp:Label ID="lblApellidoCasadaClienteModificar" runat="server" Text="Apellido de Casada"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbApellidoCasadaClienteModificar" runat="server"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-4">
                        <asp:Label ID="lblCUIClienteModificar" runat="server" Text="CUI*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbCUIClienteModificar" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57" required="true"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-4">
                        <asp:Label ID="lblNITClienteModificar" runat="server" Text="NIT"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbNITClienteModificar" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57"></asp:TextBox>
                    </div>
                </div>


                <div class="form-row">

                    <div class="form-group col-md-4">
                        <asp:Label ID="lblMunicipioClienteModificar" runat="server" Text="Municipio*"></asp:Label>
                        <asp:DropDownList class="form-control" ID="ddlMunicipioClienteModificar" runat="server" required="true">
                        </asp:DropDownList>
                    </div>

                    <div class="form-group col-md-4">
                        <asp:Label ID="lblDireccionClienteModificar" runat="server" Text="Direccion"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbDireccionClienteModificar" runat="server"></asp:TextBox>
                    </div>

                    <div
                        class="form-group col-md-4">
                        <asp:Label ID="lblCorreoClienteModificar" runat="server" Text="Correo"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbCorreoClienteModificar" runat="server"></asp:TextBox>
                    </div>
                </div>

                <div class="form-row">

                    <div class="form-group col-md-6">
                        <asp:Label ID="lblMovilClienteModificar" runat="server" Text="Móvil*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbMovilClienteModificar" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57" required="true"></asp:TextBox>
                    </div>

                    <div class="form-group col-md-6">
                        <asp:Label ID="lblTelefonoModificar" runat="server" Text="Teléfono"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbTelefonoModificar" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57"></asp:TextBox>
                    </div>

                </div>



                <div class="form-row">
                    <div class="form-group col-md-12 text-right">
                        <asp:Button ID="btnGuardarClienteModificar" runat="server" Text="Modificar Cliente" CssClass="btn btn-primary" OnClientClick="modificarClienteAccion()" />
                    </div>
                </div>
            </div>
        </div>
    </form>

    <script src="../Resources/js/CRUDClientes.js"></script>

    <%--Modal de alerta--%>
    <div id="custom-alert" class="modalAlerta">
        <div class="modal-content-alerta">

            <%--<span class="close-button-alerta">&times;</span>--%>
            <img id="alert-image" src="" alt="Alerta" style="display: none; width: 100px; height: 100px; margin-bottom: 15px;" />
            <p id="alert-message">This is a custom alert!</p>
            <button id="alert-ok-button">OK</button>
        </div>
    </div>

</body>
</html>
