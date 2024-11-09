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
                        <asp:TextBox class="form-control me-2" placeholder="Buscar por ID" aria-label="Search" ID="tbBuscarPedidosPorID" runat="server"></asp:TextBox>
                    </div>
                    <div class="input-group">
                        <span class="input-group-text" id="inputGroup-sizing-buscarPedidoFechaCreacion"><i class="fa fa-search"></i>&nbsp;Fecha de Creación</span>
                        <asp:TextBox class="form-control me-2" placeholder="Buscar por Fecha de Creación" aria-label="Search" type="date" ID="tbBuscarPedidosFechaCreacion" runat="server"></asp:TextBox>
                    </div>
                    <div class="input-group">
                        <span class="input-group-text" id="inputGroup-sizing-buscarPedidoEstado"><i class="fa fa-search"></i>&nbsp;Estado</span>
                        <asp:DropDownList ID="ddlBuscarPedidoPorEstado" runat="server" CssClass="form-control">
                            <asp:ListItem Value="" Text="Todo"></asp:ListItem>
                            <asp:ListItem Value="Pendiente" Text="Pendiente" Selected="True"></asp:ListItem>
                            <asp:ListItem Value="Completo" Text="Completo"></asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="input-group">
                        <span class="input-group-text" id="inputGroup-sizing-buscarPedidoProveedor"><i class="fa fa-proveedor"></i>&nbsp;Proveedor</span>
                        <asp:DropDownList class="form-control me-2" ID="ddlBuscarPedidoProveedor" runat="server" CssClass="form-control"></asp:DropDownList>
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
                            <asp:Label class="form-control me-2" ID="lblPedidoFechaCreacion" runat="server"></asp:Label>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text" id="inputGroup-sizing-estadoPedido"><i class="fa fa-flag"></i>&nbsp;Estado</span>
                            <asp:Label class="form-control me-2" ID="lblPedidoEstado" runat="server" Text=""></asp:Label>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text" id="inputGroup-sizing-fechaEstimada"><i class="fa fa-calendar-days"></i>&nbsp;Fecha estimada (*)</span>
                            <asp:TextBox class="form-control me-2" ID="tbPedidoFechaEstimada" runat="server" TextMode="Date"></asp:TextBox>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text" id="inputGroup-sizing-pedidoProveedor"><i class="fa fa-proveedor"></i>&nbsp;Proveedor</span>
                            <asp:DropDownList class="form-control me-2" ID="ddlPedidoProveedor" runat="server" CssClass="form-control"></asp:DropDownList>
                        </div>
                    </div>
                    <div id="containerPedidoObservacion">
                        <span class="input-group-text" id="inputGroup-sizing-observacion"><i class="fa fa-calendar-days"></i>&nbsp;Observación</span>
                        <asp:TextBox class="form-control me-2" ID="tbPedidoObservacion" runat="server" TextMode="MultiLine" Style="resize: none;"></asp:TextBox>
                        <asp:Button ID="btnGenerarPedido" runat="server" Text="Generar Pedido" CssClass="btn btn-primary" OnClientClick="agregarPedido(event);" />
                    </div>
                    <div id="buscadorProductoPedido">
                        <div class="input-group" id="tbbuscadorProductoPedido">
                            <span class="input-group-text" id="inputGroup-sizing-pedidoId"><i class="fa-brands fa-dropbox"></i>&nbsp;Pedido Id</span>
                            <%--<asp:Label class="form-control me-2" ID="lblMostrarPedidoID" runat="server" Text=""></asp:Label>--%>
                            <asp:TextBox class="form-control me-2" ID="tbMostrarPedidoID" runat="server" TextMode="SingleLine"></asp:TextBox>

                            <span class="input-group-text"><i class="fa fa-search"></i>&nbsp;</span>
                            <asp:TextBox class="form-control" ID="inputBuscarProducto" runat="server" TextMode="SingleLine" placeholder="Escribe para buscar productos..."></asp:TextBox>
                        </div>
                        <div id="resultadoBusqueda" style="display: none; margin-top: 10px;"></div>
                    </div>
                    <div id="areaDetallePedido">
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12 text-right">
                            <asp:Button ID="btnGuardarPedido" runat="server" Text="Terminar Pedido" CssClass="btn btn-primary" OnClientClick="resetForm();" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <%--Modal agregar detalle al pedido--%>
        <div id="modalDetallePedido" clientidmode="Static" class="modal" style="display: none;">
            <div class="modal-content" id="modal-content-modalDetallePedido">
                <span class="close">&times;</span>
                <h2>Detalle del Producto</h2>
                <div class="form-row" id="detallePedidoIdsImg">
                    <div id="detallePedidoIdProductoId">
                        <div class="form-group col-md-12">
                            <asp:Label ID="lblDetallePedidoId" runat="server" Text="ID del Pedido"></asp:Label>
                            <asp:TextBox class="form-control" ID="tbDetallePedidoId" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-12">
                            <asp:Label ID="lblDetallePedidoProductoId" runat="server" Text="ID del Producto"></asp:Label>
                            <asp:TextBox class="form-control" ID="tbDetallePedidoProductoId" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>
                        </div>
                    </div>
                    <div id="fotoDetallePedidoProducto">
                        <asp:Image ID="ImgDetallePedidoProducto" src="../Resources/img/imgPorDefecto.png" runat="server" Style="width: 125px; height: auto;" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="lblDetallePedidoProductoNombre" runat="server" Text="Nombre del Producto"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbDetallePedidoProductoNombre" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="lblDetallePedidoProductoCantidad" runat="server" Text="Cantidad del Producto"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbDetallePedidoProductoCantidad" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12 text-right">
                        <asp:Button ID="btnGuardarPedidoDetalle" runat="server" Text="Agregar Producto" CssClass="btn btn-primary" OnClientClick="agregarDetallePedido(event);" />
                    </div>
                </div>
            </div>
        </div>

        <%--Modal modificar detalle pedido--%>
        <div id="modalModificarDetallePedido" clientidmode="Static" class="modal" style="display: none;">
            <div class="modal-content" id="modal-content-modalModificarDetallePedido">
                <span class="close">&times;</span>
                <h2>Modificar Producto de Pedido</h2>
                <div class="form-row" id="detalleModificarPedidoIdsImg">
                    <div id="detalleModificarPedidoIdProductoId">
                        <div class="form-group col-md-12">
                            <asp:Label ID="lblModificarDetallePedidoId" runat="server" Text="ID del Pedido"></asp:Label>
                            <asp:TextBox class="form-control" ID="tbModificarDetallePedidoId" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-12">
                            <asp:Label ID="lblModificarDetallePedidoProductoId" runat="server" Text="ID del Producto"></asp:Label>
                            <asp:TextBox class="form-control" ID="tbModificarDetallePedidoProductoId" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-12">
                            <asp:Label ID="lblModificarItemDetallePedido" runat="server" Text="No. Item"></asp:Label>
                            <asp:TextBox class="form-control" ID="tbModificarItemDetallePedido" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>
                        </div>
                    </div>
                    <div id="fotoModificarDetallePedidoProducto">
                        <asp:Image ID="ImgModificarDetallePedidoProducto" src="../Resources/img/imgPorDefecto.png" runat="server" Style="width: 125px; height: auto;" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="lblModificarDetallePedidoProductoNombre" runat="server" Text="Nombre del Producto"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbModificarDetallePedidoProductoNombre" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="lblModificarDetallePedidoProductoCantidad" runat="server" Text="Cantidad del Producto"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbModificarDetallePedidoProductoCantidad" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12 text-right">
                        <asp:Button ID="btnGuardarModificarPedidoDetalle" runat="server" Text="Agregar Producto" CssClass="btn btn-primary" OnClientClick="modificarDetallePedido(event);" />
                    </div>
                </div>
            </div>
        </div>

        <%--modal ver pedido completo--%>
        <div id="modalVerPedido" clientidmode="Static" class="modal" style="display: none;">
            <div class="modal-content" id="modal-content-modalVerPedido">
                <span class="close">&times;</span>
                <h2>Detalle Pedido</h2>
                <div id="containerVerPedido">
                    <div id="camposVerPedido">
                        <div class="input-group">
                            <span class="input-group-text" id="inputGroup-sizing-verFechaCreacion"><i class="fa fa-calendar-days"></i>&nbsp;Fecha de Creación</span>
                            <%--<asp:Label ID="lblPedidoFechaCreacionTitulo" runat="server" Text="Fecha de Creación"></asp:Label>--%>
                            <asp:Label class="form-control me-2" ID="lblVerPedidoFechaCreacion" runat="server"></asp:Label>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text" id="inputGroup-sizing-verEstadoPedido"><i class="fa fa-flag"></i>&nbsp;Estado</span>
                            <asp:Label class="form-control me-2" ID="lblVerPedidoEstado" runat="server" Text=""></asp:Label>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text" id="inputGroup-sizing-verFechaEstimada"><i class="fa fa-calendar-days"></i>&nbsp;Fecha estimada</span>
                            <asp:Label class="form-control me-2" ID="lblVerPedidoFechaEstimada" runat="server" Text=""></asp:Label>
                            <%--<asp:TextBox class="form-control me-2" ID="tbVerPedidoFechaEstimada" runat="server" TextMode="Date"></asp:TextBox>--%>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text" id="inputGroup-sizing-verPedidoProveedor"><i class="fa fa-proveedor"></i>&nbsp;Proveedor</span>
                            <asp:DropDownList class="form-control me-2" ID="ddlVerPedidoProveedor" runat="server" CssClass="form-control" onchange="actualizarProveedorVerDetallePedido()"></asp:DropDownList>
                        </div>
                    </div>
                    <div id="containerVerPedidoObservacion">
                        <%--<div class="input-group" >--%>
                        <span class="input-group-text" id="inputGroup-sizing-verObservacion"><i class="fa fa-calendar-days"></i>&nbsp;Observación</span>
                        <asp:Label class="form-control me-2" ID="lblVerPedidoObservacion" runat="server" Text=""></asp:Label>
                        <%--<asp:TextBox class="form-control me-2" ID="tbVerPedidoObservacion" runat="server" TextMode="MultiLine" Style="resize: none;"></asp:TextBox>--%>
                        <%--<asp:Button ID="btnVerModificarDetallePedido" runat="server" Text="Modificar Pedido" CssClass="btn btn-primary" OnClientClick="habiliarCamposModificarDetallePedido(event);" />--%>
                        <%--</div>--%>
                    </div>
                    <%--<hr />--%>
                    <div id="buscadorVerProductoPedido">
                        <div class="input-group" id="tbbuscadorVerProductoPedido">
                            <span class="input-group-text" id="inputGroup-sizing-verPedidoId"><i class="fa-brands fa-dropbox"></i>&nbsp;Pedido Id</span>
                            <asp:Label class="form-control me-2" ID="lblVerMostrarPedidoID" runat="server" Text=""></asp:Label>
                            <%--<asp:TextBox class="form-control me-2" ID="tbVerMostrarPedidoID" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>--%>

                            <span class="input-group-text"><i class="fa fa-search"></i>&nbsp;</span>
                            <asp:TextBox class="form-control" ID="inputVerBuscarProducto" runat="server" TextMode="SingleLine" placeholder="Escribe para buscar productos..."></asp:TextBox>
                            <%--<input type="text" id="inputBuscarProducto" class="form-control" placeholder="Escribe para buscar productos..." />--%>
                        </div>
                        <div id="verResultadoBusqueda" style="display: none; margin-top: 10px;">
                            <!-- Aquí se mostrarán los resultados o el mensaje de "No se encontraron resultados" -->
                        </div>
                    </div>
                    <div id="areaVerDetallePedido">
                    </div>
                    <div class="form-row">
                        <%--<div class="form-group col-md-4 text-right">
                            <asp:Button ID="btnVerGuardarCambios" runat="server" Text="Guardar Cambios" CssClass="btn btn-primary" OnClientClick="inhabiliarCamposModificarDetallePedido(event);" />
                        </div>--%>
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
        </div>

        <%--Modal modificar ver detalle pedido--%>
        <div id="modalModificarVerDetallePedido" clientidmode="Static" class="modal" style="display: none;">
            <div class="modal-content" id="modal-content-modalModificarVerDetallePedido">
                <span class="close">&times;</span>
                <h2>Modificar Producto de Pedido</h2>
                <div class="form-row" id="verDetalleModificarPedidoIdsImg">
                    <div id="verDetalleModificarPedidoIdProductoId">
                        <div class="form-group col-md-12">
                            <asp:Label ID="lblModificarVerDetallePedidoId" runat="server" Text="ID del Pedido"></asp:Label>
                            <asp:TextBox class="form-control" ID="tbModificarVerDetallePedidoId" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-12">
                            <asp:Label ID="lblModificarVerDetallePedidoProductoId" runat="server" Text="ID del Producto"></asp:Label>
                            <asp:TextBox class="form-control" ID="tbModificarVerDetallePedidoProductoId" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-12">
                            <asp:Label ID="lblModificarVerItemDetallePedido" runat="server" Text="No. Item"></asp:Label>
                            <asp:TextBox class="form-control" ID="tbModificarVerItemDetallePedido" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>
                        </div>
                    </div>
                    <div id="fotoModificarVerDetallePedidoProducto">
                        <asp:Image ID="ImgModificarVerDetallePedidoProducto" src="../Resources/img/imgPorDefecto.png" runat="server" Style="width: 125px; height: auto;" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="lblModificarVerDetallePedidoProductoNombre" runat="server" Text="Nombre del Producto"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbModificarVerDetallePedidoProductoNombre" runat="server" TextMode="SingleLine" ReadOnly="true"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="lblModificarVerDetallePedidoProductoCantidad" runat="server" Text="Cantidad del Producto"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbModificarVerDetallePedidoProductoCantidad" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="Label1" runat="server" Text="Precio (Quetzales)"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbModificarVerDetallePedidoProductoPrecio" runat="server" TextMode="SingleLine" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46" ReadOnly="true"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="Label2" runat="server" Text="Aumento %"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbModificarVerDetallePedidoProductoAumento" runat="server" TextMode="SingleLine" onkeypress="return event.charCode >= 48 && event.charCode <= 57"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12 text-right">
                        <asp:Button ID="btnGuardarModificarVerPedidoDetalle" runat="server" Text="Modificar Producto" CssClass="btn btn-primary" OnClientClick="modificarVerDetallePedido(event);" />
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
