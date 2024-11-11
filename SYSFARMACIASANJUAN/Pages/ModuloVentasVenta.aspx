<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ModuloVentasVenta.aspx.cs" Inherits="SYSFARMACIASANJUAN.Pages.Ventas" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
    <link rel="stylesheet" href="../Resources/css/StylesModuloVentas/stylesModuloVentasVenta.css" />
    <link rel="stylesheet" href="../Resources/css/normalize.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <section class="contenedorModuloVentasVenta">
            <div class="menuModuloVentasVenta d-grid gap-2 d-md-flex justify-content-md-end">
                <%--<form id="form1" runat="server">--%>
                <div id="buscadorVentas">
                    <div class="input-group">
                        <span class="input-group-text" id="inputGroup-sizing-buscarVentaID"><i class="fa fa-search"></i>&nbsp;ID</span>
                        <asp:TextBox class="form-control me-2" placeholder="Buscar por ID" aria-label="Search" ID="tbBuscarVentaPorID" runat="server"></asp:TextBox>
                    </div>
                    <div class="input-group">
                        <span class="input-group-text" id="inputGroup-sizing-buscarVentaFechaMáxima"><i class="fa fa-search"></i>&nbsp;Fecha máxima</span>
                        <asp:TextBox class="form-control me-2" placeholder="Buscar por Fecha de Creación" aria-label="Search" type="date" ID="tbBuscarVentaFechaCreacion" runat="server"></asp:TextBox>
                    </div>
                    <div class="input-group">
                        <span class="input-group-text" id="inputGroup-sizing-buscarVentaFechaMinima"><i class="fa fa-search"></i>&nbsp;Fecha minima</span>
                        <asp:TextBox class="form-control me-2" placeholder="Buscar por Fecha de Creación" aria-label="Search" type="date" ID="tbBuscarFechaMinima" runat="server"></asp:TextBox>
                    </div>
                    <%--<div class="input-group">
                        <span class="input-group-text" id="inputGroup-sizing-buscarVentaEstado"><i class="fa fa-search"></i>&nbsp;Estado</span>
                        <asp:DropDownList ID="ddlBuscarVentaPorEstado" runat="server" CssClass="form-control">
                            <asp:ListItem Value="" Text="Todo"></asp:ListItem>
                            <asp:ListItem Value="Pendiente" Text="Pendiente" Selected="True"></asp:ListItem>
                            <asp:ListItem Value="Finalizado" Text="Finalizado"></asp:ListItem>
                        </asp:DropDownList>
                    </div>--%>
                    <div class="input-group">
                        <span class="input-group-text" id="inputGroup-sizing-buscarVentaCliente"><i class="fa fa-proveedor"></i>&nbsp;Cliente</span>
                        <asp:DropDownList class="form-control me-2" ID="ddlBuscarVentaCliente" runat="server" CssClass="form-control"></asp:DropDownList>
                    </div>
                </div>
                <nav id="navPedido">
                    <button id="btnCrearVenta" class="btn btn-outline-light" type="button">Nueva Venta</button>
                    <%--<button id="btnImprimirProductos" class="btn btn-outline-light" type="button"><i class="fa fa-print"></i></button>--%>
                    <button type="button" class="btn btn-outline-light" onclick="">
                        <%--location.href='ReporteProductos.aspx--%>
                        <i class="fa fa-print"></i>
                    </button>
                </nav>
                <%--</form>--%>
            </div>
            <div class="listaModuloVentasVenta" id="contenedor-tabla">
                <!-- Aquí se muestran los productos en el inventario -->
            </div>
        </section>

        <%--modal nuevo productos--%>
        <div id="modalNuevaVenta" clientidmode="Static" class="modal" style="display: none;">
            <div class="modal-content" id="modal-content-id">
                <span class="close">&times;</span>
                <h2>Nueva Venta</h2>
                <div id="containerVenta">
                    <div id="camposVenta">
                        <div class="input-group-nuevaVenta">
                            <span class="input-group-text" id="inputGroup-sizing-ventaFechaCreacion"><i class="fa fa-calendar-days"></i>&nbsp;Fecha de Creación</span>
                            <asp:Label class="form-control me-2" ID="lblVentaFechaCreacion" runat="server"></asp:Label>
                        </div>
                        <%--<div class="input-group">
                            <span class="input-group-text" id="inputGroup-sizing-estadoVenta"><i class="fa fa-flag"></i>&nbsp;Estado</span>
                            <asp:Label class="form-control me-2" ID="lblVentaEstado" runat="server" Text=""></asp:Label>
                        </div>--%>
                        <div class="input-group-nuevaVenta">
                            <span class="input-group-text" id="inputGroup-sizing-ventaTotal"><i class="fa-solid fa-coins"></i>&nbsp;Total Venta Q.</span>
                            <%--<asp:TextBox class="form-control me-2" ID="tbPedidoFechaEstimada" runat="server"></asp:TextBox>--%>
                            <asp:Label class="form-control me-2" ID="lblVentaTotal" runat="server" Text=""></asp:Label>
                        </div>
                        <div class="input-group-nuevaVenta">
                            <span class="input-group-text" id="inputGroup-sizing-ventaResponsable"><i class="fa-solid fa-person"></i>&nbsp;Responsable</span>
                            <asp:DropDownList class="form-control me-2" ID="ddlVentaResponsable" disabled="true" runat="server" CssClass="form-control"></asp:DropDownList>
                            <%--<asp:Label class="form-control me-2" ID="lblVentaResponsable" runat="server" Text=""></asp:Label>--%>
                        </div>
                        <%--<div class="input-group">
                            <span class="input-group-text" id="inputGroup-sizing-pedidoProveedor"><i class="fa-solid fa-person"></i>&nbsp;Cliente</span>
                            <asp:DropDownList class="form-control me-2" ID="ddlPedidoProveedor" runat="server" CssClass="form-control"></asp:DropDownList>
                        </div>--%>
                    </div>
                    <div id="camposVenta2">
                        <div class="input-group-nuevaVenta">
                            <span class="input-group-text" id="inputGroup-sizing-ventaCliente"><i class="fa-solid fa-person"></i>&nbsp;Cliente</span>
                            <asp:DropDownList class="form-control me-2" ID="ddlVentaCliente" disabled="true" runat="server" CssClass="form-control"></asp:DropDownList>
                            <%--<asp:Label class="form-control me-2" ID="lblVentaCliente" runat="server" Text=""></asp:Label>--%>
                        </div>
                        <div class="input-group-nuevaVenta">
                            <span class="input-group-text" id="inputGroup-sizing-nit"><i class="fa-solid fa-hashtag"></i>&nbsp;Nit</span>
                            <asp:TextBox class="form-control me-2" ID="tbVentaNit" runat="server" TextMode="SingleLine" Style="resize: none;"></asp:TextBox>
                        </div>
                        <div class="input-group-nuevaVenta">
                            <asp:Button ID="btnGenerarVenta" runat="server" Text="Generar Venta" CssClass="btn btn-primary" OnClientClick="agregarVenta(event);" />
                        </div>
                    </div>
                    <div id="buscadorVenta">
                        <div class="input-group" id="tbbuscadorProductoPedido">
                            <span class="input-group-text" id="inputGroup-sizing-ventaId"><i class="fa-brands fa-dropbox"></i>&nbsp;Venta Id</span>
                            <%--<asp:Label class="form-control me-2" ID="lblMostrarPedidoID" runat="server" Text=""></asp:Label>--%>
                            <asp:Label class="form-control me-2" ID="lblMostrarVentaId" runat="server" Text=""></asp:Label>
                            <%--<asp:TextBox class="form-control me-2" ID="tbMostrarVentaId" runat="server" TextMode="SingleLine"></asp:TextBox>--%>

                            <span class="input-group-text"><i class="fa fa-search"></i>&nbsp;</span>
                            <asp:TextBox class="form-control" ID="inputBuscarInventarioProducto" runat="server" TextMode="SingleLine" placeholder="Escribe para buscar productos..."></asp:TextBox>
                        </div>
                        <div id="resultadoBusqueda" style="display: none; margin-top: 10px;"></div>
                    </div>
                    <div id="areaDetalleVenta">
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12 text-right">
                            <asp:Button ID="btnConfirmarVenta" runat="server" Text="Confirmar Venta" CssClass="btn btn-primary" OnClientClick="descontarStock(event);" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <%--modal agregar clientes--%>
        <div id="modalRegistrarCliente" clientidmode="Static" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Crear Nuevo Cliente</h2>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblPrimerNombreCliente" runat="server" Text="Primer Nombre*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbPrimerNombreCliente" runat="server"></asp:TextBox>
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
                        <asp:TextBox class="form-control" ID="tbPrimerApellidoCliente" runat="server"></asp:TextBox>
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
                        <asp:TextBox class="form-control" ID="tbNITCliente" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57" ReadOnly="true"></asp:TextBox>
                    </div>

                    <div class="form-group col-md-6">
                        <asp:Label ID="lblCUIEmpleado" runat="server" Text="CUI*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbCUICliente" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57"></asp:TextBox>
                    </div>


                </div>

                <div class="form-row">

                    <div class="form-group col-md-6">
                        <asp:Label ID="lblMunicipioCliente" runat="server" Text="Municipio*"></asp:Label>
                        <asp:DropDownList class="form-control" ID="ddlMunicipioCliente" runat="server">
                        </asp:DropDownList>
                    </div>

                    <div class="form-group col-md-6">
                        <asp:Label ID="lblDireccionCliente" runat="server" Text="Dirección*"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbDireccionCliente" runat="server" TextMode="SingleLine"></asp:TextBox>
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
                        <asp:TextBox class="form-control" ID="tbMovilCliente" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57"></asp:TextBox>
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

        <%--Modal agregar cantidad de cada producto en venta--%>
        <div id="modalDetalleVenta" clientidmode="Static" class="modal" style="display: none;">
            <div class="modal-content" id="modal-content-modalDetalleVenta">
                <span class="close">&times;</span>
                <h2>Cantidad del Producto</h2>
                <div class="form-row" id="detalleVentasIdsImg">
                    <div id="detallePedidoIdVentaId">
                        <div class="form-group col-md-12">
                            <asp:Label ID="lblDetalleVentaId" runat="server" Text="ID de la Venta"></asp:Label>
                            <asp:TextBox class="form-control" ID="tbDetalleVentaId" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-12">
                            <asp:Label ID="lblDetalleVentaProductoId" runat="server" Text="ID del Producto"></asp:Label>
                            <asp:TextBox class="form-control" ID="tbDetalleVentaProductoId" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>
                        </div>
                    </div>
                    <div id="fotoDetalleVentaProducto">
                        <asp:Image ID="ImgDetalleVentaProducto" src="../Resources/img/imgPorDefecto.png" runat="server" Style="width: 125px; height: auto;" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="lblDetallePedidoProductoNombre" runat="server" Text="Nombre del Producto"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbDetalleVentaProductoNombre" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="Label2" runat="server" Text="Cantidad del Producto en existencia"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbVentaStock" ReadOnly="true" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="Label1" runat="server" Text="Precio Unitario (Q)"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbVentaPrecioUnitario" ReadOnly="true" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="lblDetalleVentaProductoCantidad" runat="server" Text="Cantidad del Producto (*)"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbDetalleVentaProductoCantidad" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12 text-right">
                        <asp:Button ID="btnGuardarProductoVenta" runat="server" Text="Agregar Producto" CssClass="btn btn-primary" OnClientClick="agregarDetalleVenta(event);" />
                    </div>
                </div>
            </div>
        </div>

        <%--Modal modificar detalle pedido--%>
        <div id="modalModificarDetalleVentas" clientidmode="Static" class="modal" style="display: none;">
            <div class="modal-content" id="modal-content-modalModificarDetalleVentas">
                <span class="close">&times;</span>
                <h2>Modificar producto venta</h2>
                <div class="form-row" id="detalleModificarVentaIdsImg">
                    <div id="detalleModificarVentaIdProductoId">
                        <div class="form-group col-md-12">
                            <asp:Label ID="lblModificarDetallePedidoId" runat="server" Text="ID de la venta"></asp:Label>
                            <asp:TextBox class="form-control" ID="tbModificarDetalleVentaId" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-12">
                            <asp:Label ID="lblModificarDetallePedidoProductoId" runat="server" Text="ID del Producto"></asp:Label>
                            <asp:TextBox class="form-control" ID="tbModificarDetalleVentaProductoId" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-12">
                            <asp:Label ID="lblModificarItemDetallePedido" runat="server" Text="No. Item"></asp:Label>
                            <asp:TextBox class="form-control" ID="tbModificarItemDetalleVenta" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>
                        </div>
                    </div>
                    <div id="fotoModificarDetallePedidoProducto">
                        <asp:Image ID="ImgModificarDetalleVentaProducto" src="../Resources/img/imgPorDefecto.png" runat="server" Style="width: 125px; height: auto;" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="lblModificarDetallePedidoProductoNombre" runat="server" Text="Nombre del Producto"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbModificarDetalleVentaProductoNombre" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="Label3" runat="server" Text="Precio Unitario"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbModificarDetalleVentaProductoPrecioUnitario" ReadOnly="true" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="lblModificarDetallePedidoProductoCantidad" runat="server" Text="Cantidad del Producto"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbModificarDetalleVentaProductoCantidad" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12 text-right">
                        <asp:Button ID="btnGuardarModificarVentaDetalle" runat="server" Text="Modificar Producto" CssClass="btn btn-primary" OnClientClick="modificarDetalleVenta(event);" />
                    </div>
                </div>
            </div>
        </div>

        <div id="modalVerVenta" clientidmode="Static" class="modal" style="display: none;">
            <div class="modal-content" id="modal-content-modalVerVenta">
                <span class="close">&times;</span>
                <h2>Detalle Venta</h2>
                <div id="containerVerVenta">
                    <div id="camposVerVenta">
                        <div class="input-group-nuevaVenta">
                            <span class="input-group-text" id="inputGroup-sizing-ventaVerFechaCreacion"><i class="fa fa-calendar-days"></i>&nbsp;Fecha de Creación</span>
                            <asp:Label class="form-control me-2" ID="lblVerVentaFechaCreacion" runat="server"></asp:Label>
                        </div>
                        <%--<div class="input-group">
                    <span class="input-group-text" id="inputGroup-sizing-estadoVenta"><i class="fa fa-flag"></i>&nbsp;Estado</span>
                    <asp:Label class="form-control me-2" ID="lblVentaEstado" runat="server" Text=""></asp:Label>
                </div>--%>
                        <div class="input-group-nuevaVenta">
                            <span class="input-group-text" id="inputGroup-sizing-verVentaTotal"><i class="fa-solid fa-coins"></i>&nbsp;Total Venta Q.</span>
                            <%--<asp:TextBox class="form-control me-2" ID="tbPedidoFechaEstimada" runat="server"></asp:TextBox>--%>
                            <asp:Label class="form-control me-2" ID="lblVerVentaTotal" runat="server" Text=""></asp:Label>
                        </div>
                        <div class="input-group-nuevaVenta">
                            <span class="input-group-text" id="inputGroup-sizing-verVentaResponsable"><i class="fa-solid fa-person"></i>&nbsp;Responsable</span>
                            <asp:DropDownList class="form-control me-2" ID="ddlVerVentaResponsable" disabled="true" runat="server" CssClass="form-control"></asp:DropDownList>
                            <%--<asp:Label class="form-control me-2" ID="lblVentaResponsable" runat="server" Text=""></asp:Label>--%>
                        </div>
                        <%--<div class="input-group">
                    <span class="input-group-text" id="inputGroup-sizing-pedidoProveedor"><i class="fa-solid fa-person"></i>&nbsp;Cliente</span>
                    <asp:DropDownList class="form-control me-2" ID="ddlPedidoProveedor" runat="server" CssClass="form-control"></asp:DropDownList>
                </div>--%>
                    </div>
                    <div id="camposVerVenta2">
                        <div class="input-group-nuevaVenta">
                            <span class="input-group-text" id="inputGroup-sizing-verVentaCliente"><i class="fa-solid fa-person"></i>&nbsp;Cliente</span>
                            <asp:DropDownList class="form-control me-2" ID="ddlVerVentaCliente" disabled="true" runat="server" CssClass="form-control"></asp:DropDownList>
                            <%--<asp:Label class="form-control me-2" ID="lblVentaCliente" runat="server" Text=""></asp:Label>--%>
                        </div>
                        <div class="input-group-nuevaVenta">
                            <span class="input-group-text" id="inputGroup-sizing-verVentaNit"><i class="fa-solid fa-hashtag"></i>&nbsp;Nit</span>
                            <asp:TextBox class="form-control me-2" ID="tbVerVentaNit" runat="server" TextMode="SingleLine" Style="resize: none;" ReadOnly="true"></asp:TextBox>
                        </div>
                        <div class="input-group-nuevaVenta">
                            <span class="input-group-text" id="inputGroup-sizing-verVentaId"><i class="fa-brands fa-dropbox"></i>&nbsp;Venta Id</span>
                            <%--<asp:Label class="form-control me-2" ID="lblMostrarPedidoID" runat="server" Text=""></asp:Label>--%>
                            <asp:Label class="form-control me-2" ID="lblVerVentaId" runat="server" Text=""></asp:Label>
                            <%--<asp:Button ID="Button1" runat="server" Text="Generar Venta" CssClass="btn btn-primary" OnClientClick="agregarVenta(event);" />--%>
                        </div>
                    </div>

                    <div id="areaVerDetalleVenta">
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6 text-right">
                            <asp:LinkButton ID="btnImprimirPedido" runat="server" CssClass="btn btn-info" OnClientClick="resetForm();">
            <i class="fa fa-print"></i> Imprimir
                            </asp:LinkButton>
                        </div>
                    </div>
                    <%-- <div class="form-row">
                <div class="form-group col-md-12 text-right">
                    <asp:Button ID="Button2" runat="server" Text="Confirmar Venta" CssClass="btn btn-primary" OnClientClick="descontarStock(event);" />
                </div>
            </div>--%>
                </div>
            </div>
        </div>

        <%--<div id="modalVerPedido" clientidmode="Static" class="modal" style="display: none;">
            <div class="modal-content" id="modal-content-modalVerPedido">
                <span class="close">&times;</span>
                <h2>Detalle Pedido</h2>
                <div id="containerVerPedido">
                    <div id="camposVerPedido">
                        <div class="input-group-nuevaVenta">
                            <span class="input-group-text" id="inputGroup-sizing-verFechaCreacion"><i class="fa fa-calendar-days"></i>&nbsp;Fecha de Creación</span>
                            <asp:Label class="form-control me-2" ID="lblVerPedidoFechaCreacion" runat="server"></asp:Label>
                        </div>

                        <div class="input-group-nuevaVenta">
                            <span class="input-group-text" id="inputGroup-sizing-verFechaEstimada"><i class="fa fa-calendar-days"></i>&nbsp;Fecha estimada</span>
                            <asp:Label class="form-control me-2" ID="lblVerPedidoFechaEstimada" runat="server" Text=""></asp:Label>
                        </div>
                        <div class="input-group-nuevaVenta">
                            <span class="input-group-text" id="inputGroup-sizing-verPedidoProveedor"><i class="fa fa-proveedor"></i>&nbsp;Proveedor</span>
                            <asp:DropDownList class="form-control me-2" ID="ddlVerPedidoProveedor" runat="server" CssClass="form-control" onchange="actualizarProveedorVerDetallePedido()"></asp:DropDownList>
                        </div>
                    </div>
                    <div id="containerVerVentaObservacion">
                        <span class="input-group-text" id="inputGroup-sizing-verObservacion"><i class="fa fa-calendar-days"></i>&nbsp;Observación</span>
                        <asp:Label class="form-control me-2" ID="lblVerPedidoObservacion" runat="server" Text=""></asp:Label>

                    </div>
                    <div id="buscadorVerProductoVenta">
                        <div class="input-group" id="tbbuscadorVerProductoVenta">
                            <span class="input-group-text" id="inputGroup-sizing-verPedidoId"><i class="fa-brands fa-dropbox"></i>&nbsp;Pedido Id</span>
                            <asp:Label class="form-control me-2" ID="lblVerMostrarVentaID" runat="server" Text=""></asp:Label>
                        </div>
                       
                    </div>
                    <div id="areaVerDetalleVenta">
                    </div>
                    <div class="form-row">

                        <div class="form-group col-md-2 text-right">
                            <asp:Button ID="btnConfirmarPedido" runat="server" Text="Confirmar Pedido" CssClass="btn btn-success" OnClientClick="confirmacionPedido(event);" />
                        </div>
                        <div class="form-group col-md-6 text-right">
                            <asp:LinkButton ID="btnImprimirPedido" runat="server" CssClass="btn btn-info" OnClientClick="resetForm();">
                        <i class="fa fa-print"></i> Imprimir
                            </asp:LinkButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>--%>
    </form>
    <script src="../Resources/js/CRUDVentas.js"></script>

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
