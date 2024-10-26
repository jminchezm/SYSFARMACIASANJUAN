<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="InventarioProductos.aspx.cs" Inherits="SYSFARMACIASANJUAN.Pages.Inventario_Productos"%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="../Resources/css/StylesModuloInventario/stylesInventarioProductos.css"/>
    <link rel="stylesheet" href="../Resources/css/normalize.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
    <title>Productos (Inventario) - Farmacia San Juan</title>
</head>
<body>
    <form id="form1" runat="server">
        <section class="contenedorInventarioProductos">
            <div class="menuInventarioProductos d-grid gap-2 d-md-flex justify-content-md-end">
                <%--<form id="form1" runat="server">--%>
                    <div id="buscadorProducto">
                        <div class="input-group">
                          <span class="input-group-text" id="inputGroup-sizing-buscarProductoID"><i class="fa fa-search"></i>&nbsp;ID</span>
                          <asp:TextBox class="form-control me-2" placeholder="Buscar por ID" aria-label="Search" id="tbBuscarProductoPorID" runat="server"></asp:TextBox>
                        </div>
                        <div class="input-group">
                          <span class="input-group-text" id="inputGroup-sizing-buscarProductoNombre"><i class="fa fa-search"></i>&nbsp;Nombre</span>
                          <asp:TextBox class="form-control me-2" placeholder="Buscar por nombre" aria-label="Search" id="tbBuscarProductoPorNombre" runat="server"></asp:TextBox>
                        </div>
                        <div class="input-group">
                          <span class="input-group-text" id="inputGroup-sizing-buscarProductoFechaCreacion"><i class="fa fa-search"></i>&nbsp;Fecha de Creación</span>
                          <asp:TextBox class="form-control me-2" placeholder="Buscar por Fecha de Creación" aria-label="Search" type="date" id="tbBuscarProductoFechaCreacion" runat="server"></asp:TextBox>
                        </div>
                        <div class="input-group">
                          <span class="input-group-text" id="inputGroup-sizing-buscarProductoEstado"><i class="fa fa-search"></i>&nbsp;Estado</span>
                            <asp:DropDownList ID="ddlBuscarPorEstado" runat="server" CssClass="form-control">
                                <asp:ListItem Value="" Text="Todo" Selected="True"></asp:ListItem>
                                <asp:ListItem Value="Activo" Text="Activo"></asp:ListItem>
                                <asp:ListItem Value="Inactivo" Text="Inactivo"></asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </div>
                    <nav id="navProducto">
                        <button id="btnCrearProducto" class="btn btn-outline-light" type="button">Nuevo Producto</button>
                        <%--<button id="btnImprimirProductos" class="btn btn-outline-light" type="button"><i class="fa fa-print"></i></button>--%>
                        <button type="button" class="btn btn-outline-light" onclick="location.href='ReporteProductos.aspx';">
                            <i class="fa fa-print"></i>
                        </button>
                    </nav>
                <%--</form>--%>
            </div>
            <div class="listaInventarioProductos" id="contenedor-tabla">
                <!-- Aquí se muestran los productos en el inventario -->
            </div>
        </section>

        <%--modal nuevo productos--%>
        <div id="modalNuevoProducto" clientidmode="Static" class="modal" style="display:none;">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Nuevo Producto</h2>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="lblProductoNombre" runat="server" Text="Nombre(*)"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbProductoNombre" runat="server" required="true"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="lblProductoDescripcion" runat="server" Text="Descripción del Producto"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbProductoDescripcion" runat="server" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblFormaFarmaceuticaProducto" runat="server" Text="Forma Farmaceutica"></asp:Label>                   
                        <asp:TextBox class="form-control" ID="tbFormaFarmaceuticaProducto" runat="server" TextMode="SingleLine"></asp:TextBox>
                    </div>

                    <div class="form-group col-md-6">
                        <asp:Label ID="lblViaAdministracionProducto" runat="server" Text="Vía de Administración"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbViaAdministracionProducto" runat="server" TextMode="SingleLine"></asp:TextBox>

                    </div>                    
                </div>    
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblCasaMedicaProducto" runat="server" Text="Casa Médica"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbCasaMedicaProducto" runat="server"></asp:TextBox>
                    </div>
                    <%--<asp:ScriptManager runat="server" />--%>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblProductoSubCategoria" runat="server" Text="SubCategoría(*)"></asp:Label>
                        <asp:DropDownList ID="ddlProductoSubCategoria" runat="server" CssClass="form-control" required="true">
                            <%--<asp:ListItem Text="Seleccione" Value="0"></asp:ListItem>--%>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="Label2" runat="server" Text="Subir Imagen"></asp:Label>
                        <asp:FileUpload ID="FileUpload1" runat="server" CssClass="form-control-file"/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-12 text-right">
                        <asp:Button ID="btnGuardarProducto" runat="server" Text="Guardar Producto" CssClass="btn btn-primary" OnClientClick="agregarProducto(event);"/>
                    </div>
                </div>
            </div>
        </div>

        <%--modal modificar productos--%>
        <div id="modalModificarProducto" clientidmode="Static" class="modal" style="display:none;">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Modificar Producto</h2>
                <div id="fotoProductoModificar">
                    <asp:Image ID="ImgProductoModificara" src="../Resources/img/imgPorDefecto.png" runat="server" style="width: 200px; height: auto;" />
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblProductoIdModificar" runat="server" Text="Código del Producto"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbProductoIdModificar" runat="server" readonly="true"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblFechaDeCreacionModificar" runat="server" Text="Fecha de Creación"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbFechaDeCreacionModificar" runat="server" TextMode="Date" required="true" ReadOnly="true"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="lblProductoNombreModificar" runat="server" Text="Nombre(*)"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbProductoNombreModificar" runat="server" required="true"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <asp:Label ID="lblProductoDescripcionModificar" runat="server" Text="Descripción del Producto"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbProductoDescripcionModificar" runat="server" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblFormaFarmaceuticaProductoModificar" runat="server" Text="Forma Farmaceutica(*)"></asp:Label>                   
                        <asp:TextBox class="form-control" ID="tbFormaFarmaceuticaProductoModificar" runat="server" TextMode="SingleLine"></asp:TextBox>
                    </div>

                    <div class="form-group col-md-6">
                        <asp:Label ID="lblViaAdministracionProductoModificar" runat="server" Text="Vía de Administración(*)"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbViaAdministracionProductoModificar" runat="server" TextMode="SingleLine"></asp:TextBox>

                    </div>                    
                </div>    
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblCasaMedicaProductoModificar" runat="server" Text="Casa Médica"></asp:Label>
                        <asp:TextBox class="form-control" ID="tbCasaMedicaProductoModificar" runat="server"></asp:TextBox>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblProductoSubCategoriaModificar" runat="server" Text="SubCategoría(*)"></asp:Label>
                        <asp:DropDownList ID="ddlProductoSubCategoriaModificar" runat="server" CssClass="form-control" required="true">
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="form-row">
                    <%--<div class="form-group col-md-6">
                        <asp:TextBox class="form-control" ID="tbPathImagenProductoModificar" runat="server" readonly="true"></asp:TextBox>
                    </div>--%>
                    <div class="form-group col-md-6">
                        <asp:Label ID="lblProductoEstado" runat="server" Text="Estado(*)"></asp:Label>
                        <asp:DropDownList ID="ddlProductoEstado" runat="server" CssClass="form-control" required="true">
                            <asp:ListItem Value="Activo" Text="Activo"></asp:ListItem>
                            <asp:ListItem Value="Inactivo" Text="Inactivo"></asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="form-group col-md-6">
                        <asp:Label ID="Label2Modificar" runat="server" Text="Subir Imagen"></asp:Label>
                        <asp:FileUpload ID="FileUpload1Modificar" runat="server" CssClass="form-control-file"/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-12 text-right">
                        <asp:Button ID="btnModificarProducto" runat="server" Text="Guardar Modificación de Producto" CssClass="btn btn-primary" OnClientClick="modificarProducto(event);"/>
                    </div>
                </div>
            </div>
        </div>



    </form>

    <div id="custom-alert" class="modalAlerta">
      <div class="modal-content-alerta">
        <%--<span class="close-button-alerta">&times;</span>--%>
        <img id="alert-image" src="" alt="Alerta" style="display:none; width: 100px; height: 100px; margin-bottom: 15px;" />
        <p id="alert-message">This is a custom alert!</p>
        <button id="alert-ok-button">OK</button>
      </div>
    </div>
    <script src="../Resources/js/CRUDProductos.js"></script>
</body>
</html>
