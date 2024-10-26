<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="InventarioPedidos.aspx.cs" Inherits="SYSFARMACIASANJUAN.Pages.InventarioPedidos" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
    <link rel="stylesheet" href="../Resources/css/StylesModuloInventario/stylesInventarioPedidos.css" />
    <link rel="stylesheet" href="../Resources/css/normalize.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <section class="contenedorInventarioPedidos">
            <div class="menuInventarioPedidos d-grid gap-2 d-md-flex justify-content-md-end">
                <%--<form id="form1" runat="server">--%>
                <div id="buscadorPedidos">
                    <div class="input-group">
                        <span class="input-group-text" id="inputGroup-sizing-buscarPedidoID"><i class="fa fa-search"></i>&nbsp;ID</span>
                        <asp:TextBox class="form-control me-2" placeholder="Buscar por ID" aria-label="Search" ID="tbBuscarProductoPorID" runat="server"></asp:TextBox>
                    </div>
                    <div class="input-group">
                        <span class="input-group-text" id="inputGroup-sizing-buscarPedidoNombre"><i class="fa fa-search"></i>&nbsp;Nombre</span>
                        <asp:TextBox class="form-control me-2" placeholder="Buscar por nombre" aria-label="Search" ID="tbBuscarProductoPorNombre" runat="server"></asp:TextBox>
                    </div>
                    <div class="input-group">
                        <span class="input-group-text" id="inputGroup-sizing-buscarPedidoFechaCreacion"><i class="fa fa-search"></i>&nbsp;Fecha de Creación</span>
                        <asp:TextBox class="form-control me-2" placeholder="Buscar por Fecha de Creación" aria-label="Search" type="date" ID="tbBuscarProductoFechaCreacion" runat="server"></asp:TextBox>
                    </div>
                    <div class="input-group">
                        <span class="input-group-text" id="inputGroup-sizing-buscarPedidoEstado"><i class="fa fa-search"></i>&nbsp;Estado</span>
                        <asp:DropDownList ID="ddlBuscarPorEstado" runat="server" CssClass="form-control">
                            <asp:ListItem Value="" Text="Todo" Selected="True"></asp:ListItem>
                            <asp:ListItem Value="Activo" Text="Activo"></asp:ListItem>
                            <asp:ListItem Value="Inactivo" Text="Inactivo"></asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <nav id="navPedido">
                    <button id="btnCrearPedido" class="btn btn-outline-light" type="button">Nuevo Pedido</button>
                    <%--<button id="btnImprimirProductos" class="btn btn-outline-light" type="button"><i class="fa fa-print"></i></button>--%>
                    <button type="button" class="btn btn-outline-light" onclick="">
                        <%--location.href='ReporteProductos.aspx--%>
                        <i class="fa fa-print"></i>
                    </button>
                </nav>
                <%--</form>--%>
            </div>
            <div class="listaInventarioPedidos" id="contenedor-tabla">
                <!-- Aquí se muestran los productos en el inventario -->
            </div>
        </section>

        <%--modal nuevo productos--%>
        <div id="modalNuevoPedido" clientidmode="Static" class="modal" style="display: none;">
            <div class="modal-content" id="modal-content-id">
                <span class="close">&times;</span>
                <h2>Nuevo Pedido</h2>
                <div id="containerPedido">
                    <div id="camposPedido">
                        <div class="input-group">
                            <span class="input-group-text" id="inputGroup-sizing-fechaCreacion"><i class="fa fa-calendar-days"></i>&nbsp;Fecha de Creación</span>
                            <%--<asp:Label ID="lblPedidoFechaCreacionTitulo" runat="server" Text="Fecha de Creación"></asp:Label>--%>
                            <asp:Label class="form-control me-2" ID="lblPedidoFechaCreacion" runat="server"></asp:Label>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text" id="inputGroup-sizing-estadoPedido"><i class="fa fa-flag"></i>&nbsp;Estado</span>
                            <asp:Label class="form-control me-2" ID="lblPedidoEstado" runat="server" Text=""></asp:Label>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text" id="inputGroup-sizing-fechaEstimada"><i class="fa fa-calendar-days"></i>&nbsp;Fecha estimada</span>
                            <asp:TextBox class="form-control me-2" ID="tbPedidoFechaEstimada" runat="server" TextMode="Date"></asp:TextBox>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text" id="inputGroup-sizing-pedidoProveedor"><i class="fa fa-proveedor"></i>&nbsp;Proveedor</span>
                            <asp:DropDownList class="form-control me-2" ID="ddlPedidoProveedor" runat="server" CssClass="form-control"></asp:DropDownList>
                        </div>
                    </div>
                    <div id="buscadorProductoPedido">
                        <div class="input-group" id="tbbuscadorProductoPedido">
                            <span class="input-group-text"><i class="fa fa-search"></i>&nbsp;</span>
                            <input type="text" id="inputBuscarProducto" class="form-control" placeholder="Escribe para buscar productos..." />
                        </div>
                        <div id="resultadoBusqueda" style="display: none; margin-top: 10px;">
                            <!-- Aquí se mostrarán los resultados o el mensaje de "No se encontraron resultados" -->
                        </div>
                    </div>
                    <div id="areaDetallePedido">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12 text-right">
                        <asp:Button ID="btnGuardarPedido" runat="server" Text="Crear Pedido" CssClass="btn btn-primary" OnClientClick="agregarPedido(event);" />
                    </div>
                </div>
            </div>
        </div>

        <%--Modal agregar detalle al pedido--%>
        <div id="modalCantidadPorProductoDetallePedido" clientidmode="Static" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Ingresa la cantidad del producto seleccionado</h2>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblPedidoDetalleFechaCreacion" runat="server" Text="Fecha de Creación"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbPedidoDetalleFechaActual" runat="server" TextMode="Date"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblPedidoDetalleEstado" runat="server" Text="Estado Actual"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbPedidoDetalleEstado" runat="server" TextMode="SingleLine"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblPedidoDetalleFechaEstimada" runat="server" Text="Fecha estimada en que se necesita"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbPedidoDetalleFechaEstimada" runat="server" TextMode="Date"></asp:TextBox>
                    </div>

                    <div class="form-group col-md-6">
                        <asp:Label ID="lblPedidoDetalleProveedor" runat="server" Text="Proveedor"></asp:Label>
                        <asp:DropDownList ID="ddlPedidoDetalleProveedor" runat="server" CssClass="form-control">
                        </asp:DropDownList>

                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="lblPedidoDetalleObservacion" runat="server" Text="Observación"></asp:Label>
                        <asp:TextBox class="form-control" ID="ddlPedidoDetalleObservacion" runat="server" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12 text-right">
                        <asp:Button ID="btnGuardarPedidoDetalle" runat="server" Text="Crear Pedido" CssClass="btn btn-primary" OnClientClick="agregarProducto(event);" />
                    </div>
                </div>
            </div>
        </div>
    </form>

    <div id="custom-alert" class="modalAlerta">
        <div class="modal-content-alerta">
            <img id="alert-image" src="" alt="Alerta" style="display: none; width: 100px; height: 100px; margin-bottom: 15px;" />
            <p id="alert-message">This is a custom alert!</p>
            <button id="alert-ok-button">OK</button>
        </div>
    </div>
    <script src="../Resources/js/CRUDPedidos.js"></script>
</body>
</html>
