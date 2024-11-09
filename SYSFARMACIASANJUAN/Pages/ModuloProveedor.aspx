<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ModuloProveedor.aspx.cs" Inherits="SYSFARMACIASANJUAN.Pages.ModuloProveedor" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="../Resources/css/StylesModuloInventario/estiloProveedor.css" rel="stylesheet" />
    <link href="~/Content/bootstrap.min.css" rel="stylesheet" />
    <%--<script src="~/Scripts/jquery-3.5.1.min.js"></script>
    <script src="~/Scripts/bootstrap.min.js"></script>--%>
    <title>Módulo Proveedor - Sys_FarmaciaSanJuan</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
</head>
<body>
    <main class="mainModuloProveedor">
        <div class="divModuloProveedor">
            <section class="opcionesModuloProveedor">
                <div class="opcionFila1ModuloProveedor">
                    <article class="articleOpcionModuloProveedor">
                        <button class="botonRegistrarProveedor">
                            <img src="../Resources/img/agregarpro.png" alt="Registrar Proveedor" />
                        </button>
                        <h2 class="h2-opcion">Nuevo Proveedor</h2>
                    </article>
                    <article class="articleOpcionModuloProveedor">
                        <button class="botonModificarProveedor" id="botonModificarProveedorID" runat="server">
                            <img src="../Resources/img/lisproveedor.png" alt="Registrar Proveedor" />
                        </button>
                        <h2 class="h2-opcion">Lista Proveedores</h2>
                    </article>
                    <article class="articleOpcionModuloProveedor">
                        <button class="botonListaProveedores" id="Button1" runat="server" onclick="window.location.href='ReporteProveedores.aspx'">
                            <img src="../Resources/img/lista_Empleados.png" alt="Registrar Proveedor" />
                        </button>
                        <%--<button class="botonListaProveedores">--%>
                        <%--<button class="botonListaProveedores" id="Button1" runat="server" onclick="ReporteProveedores.aspx">
                    <img src="../Resources/img/lista_Proveedores.png" alt="Registrar Proveedor" />
                    </button>--%>
                        <h2 class="h2-opcion">Reporte</h2>
                    </article>
                </div>
                <hr />

            </section>
        </div>
    </main>
    <form id="form1" runat="server">
        <%--modal agregar Proveedores--%>
        <div id="modalRegistrarProveedor" clientidmode="Static" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Agrear Proveedor</h2>

                <div class="form-row">
                    <div class="form-group col-md-6">

                        <asp:Label ID="lblNombreProveedor" runat="server" Text="Nombre Proveedor*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbNombreProveedor" runat="server" required="true" TextMode="SingleLine"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblTeleProveedor" runat="server" Text="Teléfono"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbTeleProveedor" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57"></asp:TextBox>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblCelProveedor" runat="server" Text="Numero de Celular*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbCelProveedor" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57" required="true"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblDireccionProveedor" runat="server" Text="Dirección Exacta*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbDireccionProveedor" runat="server" TextMode="SingleLine" required="true"></asp:TextBox>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblCorreoProveedor" runat="server" Text="Correo"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbCorreoProveedor" runat="server" TextMode="Email"></asp:TextBox>
                    </div>
                    <%-- <div class="form-group col-md-6">
                <asp:Label ID="lblMunicipioProveedor" runat="server" Text="Municipio"></asp:Label>
                <asp:TextBox class="form-control" ID="tbMunicipioProveedor" runat="server"></asp:TextBox>
            </div>--%>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblMunicipioProveedor" runat="server" Text="Municipio*"></asp:Label>
                        <asp:DropDownList class="form-control" ID="ddlMunicipioProveedor" runat="server" required="true">
                        </asp:DropDownList>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-12 text-right">
                        <asp:Button ID="btnGuardarProveedor" runat="server" Text="Guardar Registro" CssClass="btn btn-primary" OnClientClick="agregarProveedor(event);" />
                    </div>
                </div>
            </div>
        </div>

        <!--Modal listar y modificar Proveedor-->
        <div id="modalModificarProveedor" clientidmode="Static" class="modal" style="display: none;">
            <div class="modal-content-modificarProveedor">
                <span class="closeModificarProveedor">&times;</span>
                <h2 style="text-align: center;">Lista Modificación de Proveedores</h2>
                <div class="contenedorBuscarProveedorID" runat="server">
                    <asp:TextBox class="form-control me-2" placeholder="Buscar Proveedor por ID" aria-label="Search" ID="tbBuscarProveedorID" runat="server"></asp:TextBox>
                </div>
                <div id="contenedor-tabla"></div>
            </div>
        </div>

        <%--modal modificar Proveedor--%>
        <div id="modalModificarProveedorM" clientidmode="Static" class="modal" style="display: none;">
            <div class="modal-content-ModificarProveedorM">
                <span class="close-ModificarProveedorM">&times;</span>
                <h2 class="modaMod">Modificar Proveedor</h2>


                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="lblIdProveedorModificar" runat="server" Text="Id Proveedor"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbIdProveedorModificar" runat="server" required="true" ReadOnly="true"></asp:TextBox>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblNombreProveedorModificar" runat="server" Text="Nombre Proveedor*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbNombreProveedorModificar" runat="server" required="true"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblTeleProveedorModificar" runat="server" Text="Teléfono"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbTeleProveedorModificar" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57"></asp:TextBox>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblCelProveedorModificar" runat="server" Text="Celular*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbCelProveedorModificar" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57" required="true"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lbDireccionProveedorModificar" runat="server" Text="Dirreccion*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbDireccionProveedorModificar" runat="server" required="true"></asp:TextBox>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblCorreoProveedorModificar" runat="server" Text="Correo"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbCorreoProveedorModificar" runat="server"></asp:TextBox>
                    </div>


                    <div class="form-group col-md-6">
                        <asp:Label ID="lbllMunicipioProveedorModificar" runat="server" Text="Municipio*"></asp:Label>
                        <asp:DropDownList class="form-control" ID="ddlMunicipioProveedorModificar" runat="server" required="true">
                        </asp:DropDownList>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-12 text-right">
                        <asp:Button ID="btnGuardarProveedorModificar" runat="server" Text="Modificar Proveedor" CssClass="btn btn-primary" OnClientClick="modificarProveedorAccion()" />
                    </div>
                </div>
            </div>
        </div>
    </form>

    <script src="../Resources/js/CRUDEProveedor.js"></script>

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
