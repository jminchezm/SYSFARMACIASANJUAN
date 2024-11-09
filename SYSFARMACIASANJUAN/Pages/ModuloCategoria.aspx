<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ModuloCategoria.aspx.cs" Inherits="SYSFARMACIASANJUAN.Pages.ModuloCategoria" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link href="../Resources/css/StylesModuloInventario/estiloCategoria.css" rel="stylesheet" />
<link href="~/Content/bootstrap.min.css" rel="stylesheet" />
<script src="~/Scripts/jquery-3.5.1.min.js"></script>
<script src="~/Scripts/bootstrap.min.js"></script>
<title>Módulo Categoria - Sys_FarmaciaSanJuan</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
    
</head>
<body>
<main class="mainModuloCategoria" style="position: relative;">
    <div class="divModuloCategoria">
        <section class="opcionesModuloCategoria">
            <div class="opcionFila1ModuloCategoria">
                <article class="articleOpcionModuloCategoria">
                    <button class="abrirCategoria" onclick="mostrarCategoria()">
                        <img src="../Resources/img/medicamento.png" alt="Registrar Categoria" />
                    </button>
                    <h2 class="h2-opcion">CATEGORIA</h2>
                </article>
                <article class="articleOpcionModuloCategoria">
                    <button class="abrirSubCategoria" onclick="mostrarSubCategoria()">
                        <img src="../Resources/img/listarcategoria.png" alt="Registrar SubCategoria" />
                    </button>
                    <h2 class="h2-opcion">SUB CATEGORIA</h2>
                </article>
                <article class="articleOpcionModuloCategoria">
                    <button class="botonListaCategorias" id="Button1" runat="server" onclick="window.location.href='ReporteCategorias.aspx'">
                        <img src="../Resources/img/tarea.png" alt="Registrar Categoria" />
                    </button>
                    <h2 class="h2-opcion">Reporte</h2>
                </article>
            </div>    
        </section>
    </div>

    <!-- Div para el contenido de Categoría -->
    <div class="mainModuloCategoria overlay" id="divMudoCategoria1" style="display: none;">
        <section class="opcionesModuloCategoria">
            <h1>CATEGORIA</h1>
            <button onclick="cerrarOverlay('divMudoCategoria1')" class="cerrarOverlay">
                <img src="../Resources/img/cerrar.png" alt="Cerrar" class="imgCerrarOverlay" />
            </button>
            <div class="opcionFila1ModuloCategoria">
                <article class="articleOpcionModuloCategoria">
                    <button class="botonRegistrarSubCategoria" onclick="abrirModalAgregarSubCategoria()">
                        <img src="../Resources/img/medicamento.png" alt="Registrar Categoria" />
                    </button>
                    <h2 class="h2-opcion">Nuevo Categoria</h2>
                </article>
                <article class="articleOpcionModuloCategoria">
                    <button class="botonModificarSubCategoria" id="botonModificarSubCategoriaID" runat="server">
                        <img src="../Resources/img/listarcategoria.png" alt="Registrar Categoria" />
                    </button>
                    <h2 class="h2-opcion">Lista Categorias</h2>
                </article>
            </div>
        </section>
    </div>

    <!-- Div para el contenido de Subcategoría -->
    <div class="mainModuloCategoria overlay" id="divSubCategoriaID" style="display: none;">
        <section class="opcionesModuloCategoria">
            <h1>SUBCATEGORIA</h1>
            <button onclick="cerrarOverlay('divSubCategoriaID')" class="cerrarOverlay">
                <img src="../Resources/img/cerrar.png" alt="Cerrar" class="imgCerrarOverlay" />
            </button>
            <div class="opcionFila1ModuloCategoria">
                <article class="articleOpcionModuloCategoria">
                    <button class="botonRegistrarCategoria" onclick="abrirModalAgregarCategoria()">
                        <img src="../Resources/img/medicamento.png" alt="Registrar Categoria" />
                    </button>
                    <h2 class="h2-opcion">Nuevo Sub-Categoria</h2>
                </article>
                <article class="articleOpcionModuloCategoria">
                    <button class="botonModificarCategoria" id="botonModificarCategoriaID" runat="server">
                        <img src="../Resources/img/listarcategoria.png" alt="Registrar Categoria" />
                    </button>
                    <h2 class="h2-opcion">Lista Sub-Categorias</h2>
                </article>
            </div>
        </section>
    </div>
</main>


    <form id="form1" runat="server">

    <%--modal agregar Categoriaes--%>
    <div id="modalRegistrarCategoria" clientidmode="Static" class="modal" style="display:none;">
           <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Agrear Sub Categoria</h2>

        <div class="form-row">
            <%--<div class="form-group col-md-6">
                <asp:Label ID="lblNombreCategoria" runat="server" Text="Nombre Categoria*"></asp:Label>
                <asp:TextBox class="form-control" ID="tbNombreCategoria" runat="server" required="true"></asp:TextBox>
            </div>--%>

            <div class="form-group col-md-6">
             <asp:Label ID="lblNombreCategoria" runat="server" Text="Nombre Categoriaa*"></asp:Label>
            <asp:DropDownList class="form-control" ID="ddlNombreCategoria" runat="server" required="true">
            </asp:DropDownList>
        </div>

        </div>
    
        <div class="form-row">
            <div class="form-group col-md-6">
                <asp:Label ID="lblNombreSubCategoria" runat="server" Text="Sub Categoria*"></asp:Label>
                <asp:TextBox class="form-control" ID="tbNombreSubCategoria" runat="server" TextMode="SingleLine" required="true"></asp:TextBox>
            </div>  
        </div>

        <div class="form-row">
            <div class="form-group col-md-6">
                <asp:Label ID="lblDescripcionCategoria" runat="server" Text="Descripcion "></asp:Label>
                <asp:TextBox class="form-control" ID="tbDescripcionCategoria" runat="server"></asp:TextBox>
            </div>        
        </div>    

        <div class="form-row">
            <div class="form-group col-md-12 text-right">
                <asp:Button ID="btnGuardarCategoria" runat="server" Text="Guardar Registro" CssClass="btn btn-primary" OnClientClick="agregarCategoria(event);"/>
            </div>
        </div>
    </div>
</div>
    <!--Modal listar y modificar subCategoria-->
    <div id="modalModificarCategoria" clientidmode="Static" class="modal" style="display:none;">
    <div class="modal-content-modificarCategoria">
        <span class="closeModificarCategoria">&times;</span>
        <h2 style="text-align:center;">Lista Modificación de Sub Categoriaes</h2>
        <div class="contenedorBuscarCategoriaID" runat="server">
            <asp:TextBox class="form-control me-2" placeholder="Buscar Categoria por ID" aria-label="Search" id="tbBuscarCategoriaID" runat="server"></asp:TextBox>
        </div>
        <div id="contenedor-tabla"></div>
    </div>
</div>

   <%--modal modificar Categoria--%>
    <div id="modalModificarCategoriaM" clientidmode="Static" class="modal" style="display:none;">
    <div class="modal-content-ModificarCategoriaM">
        <span class="close-ModificarCategoriaM">&times;</span>
        <h2 class="modaMod"> Modificar Sub Categoria</h2>

         
            <div class="form-row">  
        <div class="form-group col-md-12">
           <asp:Label ID="lblIdSubCategoriaModificar" runat="server" Text="Id SubCategoria"></asp:Label>
           <asp:TextBox class="form-control" ID="tbIdSubCategoriaModificar" runat="server" required="true" ReadOnly="true"></asp:TextBox>
       </div>
          </div>

        <div class="form-row">
            <%--<div class="form-group col-md-6">
                <asp:Label ID="lblNombreCategoriaModificar" runat="server" Text="Nombre Categoria*"></asp:Label>
                <asp:TextBox class="form-control" ID="tbNombreCategoriaModificar" runat="server" required="true"></asp:TextBox>
            </div>  --%> 
            <div class="form-group col-md-4">
             <asp:Label ID="lblNombreCategoriaModificar" runat="server" Text="Nombre Categoria*"></asp:Label>
            <asp:DropDownList class="form-control" ID="ddlNombreCategoriaModificar" runat="server" required="true">

            </asp:DropDownList>
            </div>            


        </div>
 
        <div class="form-row">
            <div class="form-group col-md-6">
                <asp:Label ID="lbNombreSubCategoriaModificar" runat="server" Text="Sub Categoria*"></asp:Label>
                <asp:TextBox class="form-control" ID="tbNombreSubCategoriaModificar" runat="server" required="true"></asp:TextBox>
            </div>   
        </div>
 
        <div class="form-row">
            <div class="form-group col-md-6">
                <asp:Label ID="lblDescripcioSubCategoriaModificar" runat="server" Text="Descripcion"></asp:Label>
                <asp:TextBox class="form-control" ID="tbDescripcioSubCategoriaModificarr" runat="server"></asp:TextBox>
            </div>             
        </div>
 
        <div class="form-row">
            <div class="form-group col-md-12 text-right">
                <asp:Button ID="btnGuardarCategoriaModificar" runat="server" Text="Modificar Categoria" CssClass="btn btn-primary" OnClientClick="modificarCategoriaAccion()"/>
            </div>
        </div>
    </div>
</div> 

        <%-- --------------------------------------------------------------CATEGORIA--------------------------------------------------------------- --%>


    <%--modal agregar SubCategoriaes--%>
    <div id="modalRegistrarSubCategoria" clientidmode="Static" class="modal" style="display:none;">
           <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Agrear Categoria</h2>

               <div class="form-row">
                   <div class="form-group col-md-6">
                       <asp:Label ID="LbCategoriaNombre" runat="server" Text="Nombre Categoria*"></asp:Label>
                       <asp:TextBox class="form-control" ID="tbNombreCategoria" runat="server" required="true"></asp:TextBox>
                   </div>
               </div>

        <div class="form-row">
            <div class="form-group col-md-6">
                <asp:Label ID="lblDescripcionSubCategoria" runat="server" Text="Descripcion "></asp:Label>
                <asp:TextBox class="form-control" ID="tbDescripcionSubCategoria" runat="server"></asp:TextBox>
            </div>        
        </div>    

        <div class="form-row">
            <div class="form-group col-md-12 text-right">
                <asp:Button ID="btnGuardarSubCategoria" runat="server" Text="Guardar Registro" CssClass="btn btn-primary" OnClientClick="agregarSubCategoria(event);"/>
            </div>
        </div>
    </div>
</div>
    <!--Modal listar y modificar SubCategoria-->
    <div id="modalModificarSubCategoria" clientidmode="Static" class="modal" style="display:none;">
    <div class="modal-content-modificarSubCategoria">
        <span class="closeModificarSubCategoria">&times;</span>
        <h2 style="text-align:center;">Lista Modificación de Categoriaes</h2>
        <div class="contenedorBuscarSubCategoriaID" runat="server">
            <asp:TextBox class="form-control me-2" placeholder="Buscar SubCategoria por ID" aria-label="Search" id="tbBuscarSubCategoriaID" runat="server"></asp:TextBox>
        </div>
        <div id="contenedor-tablaSUB"></div>
    </div>
</div>

   <%--modal modificar SubCategoria--%>
    <div id="modalModificarSubCategoriaM" clientidmode="Static" class="modal" style="display:none;">
    <div class="modal-content-ModificarSubCategoriaM">
        <span class="close-ModificarSubCategoriaM">&times;</span>
        <h2 class="modaMod"> Modificar Categoria</h2>

         
            <div class="form-row">  
        <div class="form-group col-md-12">
           <asp:Label ID="lblIdSubSubCategoriaModificar" runat="server" Text="Id Categoria"></asp:Label>
           <asp:TextBox class="form-control" ID="tbIdSubSubCategoriaModificar" runat="server" required="true" ReadOnly="true"></asp:TextBox>
       </div>
          </div>

        <div class="form-row">
            <div class="form-group col-md-6">
                <asp:Label ID="lblNombreSubCategoriaModificar" runat="server" Text="Nombre Categoria*"></asp:Label>
                <asp:TextBox class="form-control" ID="tbNombreCategoriaModificar" runat="server" required="true"></asp:TextBox>
            </div>   
        </div>
 
    
 
        <div class="form-row">
            <div class="form-group col-md-6">
                <asp:Label ID="lblDescripcioSubSubCategoriaModificar" runat="server" Text="Descripcion"></asp:Label>
                <asp:TextBox class="form-control" ID="tbDescripcioCategoriaModificar" runat="server"></asp:TextBox>
            </div>             
        </div>
 
        <div class="form-row">
            <div class="form-group col-md-12 text-right">
                <asp:Button ID="btnGuardarSubCategoriaModificar" runat="server" Text="Modificar SubCategoria" CssClass="btn btn-primary" OnClientClick="modificarSubCategoriaAccion()"/>
            </div>
        </div>
    </div>
</div>


</form>
































    <%-- sadasdasdasd --%>

<script src="../Resources/js/CRUDCategoria.js"></script>
<script src="../Resources/js/CRUDSubCategoria.js"></script>


    <script>
        function mostrarCategoria() {
            document.getElementById('divMudoCategoria1').style.display = 'flex';
            document.getElementById('divSubCategoriaID').style.display = 'none';
        }

        function mostrarSubCategoria() {
            document.getElementById('divSubCategoriaID').style.display = 'flex';
            document.getElementById('divMudoCategoria1').style.display = 'none';
        }

        function cerrarOverlay(id) {
            document.getElementById(id).style.display = 'none';
        }
</script>

 <%--   <script>
        function mostrarCategoria() {
            document.getElementById('divMudoCategoria1').style.display = 'flex';
            document.getElementById('divSubCategoriaID').style.display = 'none';
        }

        function mostrarSubCategoria() {
            document.getElementById('divSubCategoriaID').style.display = 'flex';
            document.getElementById('divMudoCategoria1').style.display = 'none';
        }

        function cerrarOverlay() {
            document.getElementById('divMudoCategoria1').style.display = 'none';
            document.getElementById('divSubCategoriaID').style.display = 'none';
        }
    </script>--%>

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