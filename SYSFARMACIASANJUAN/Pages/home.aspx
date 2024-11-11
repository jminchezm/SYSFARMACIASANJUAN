<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="home.aspx.cs" Inherits="SYSFARMACIASANJUAN.Pages.home" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link href="../Resources/css/Styles_Home/stylesHome.css" rel="stylesheet" />
    <!-- Link a Font Awesome para los íconos del menú -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title>Home - Farmacia San Juan</title>
</head>
<body>
   <%-- <form id="form1" runat="server">--%>
    <!--BANNER PRINCIPAL-->
    <div class="banner">    
        <!-- Columna izquierda -->
        <div class="banner-left">
            <a href="#" onclick="loadContent('homeInicio.aspx')"><img src="../Resources/img/paginainformativa/logo.png" alt="Icono de usuario" class="logo"/></a>
        </div>   
        <!-- Columna central -->
        <div class="banner-center">
            <h2><span id="nombreRolUsuario" runat="server"></span></h2>
        </div>   
        <!-- Columna derecha -->
        <div class="banner-right">
            <h2>Bienvenido, <span id="usuarioNombre"  runat="server"></span>!</h2>
            <img src="../Resources/img/Home/aprobar.png" alt="Icono de usuario" class="icono" id="user-icon"/> 
            <form id="form1" runat="server">
                <div class="user-info" id="user-info">
                    <p><span id="nombreEmpleado" runat="server"></span></p>
                    <asp:Button ID="btnCerrarSesion" runat="server" Text="Cerrar Sesión" onclick="btnLogout_Click"/>
                    <%--<button >Cerrar sesión</button>--%>
                </div>
            </form>
        </div>
    </div>

    <!-- Contenedor de contenido principal -->
    <div class="main-container">
        <!-- Barra lateral -->
        <div class="sidebar" id="sidebar">
            <ul class="menu">
                <li><a href="#" onclick="loadContent('homeInicio.aspx')"><i class="fas fa-home"></i> Inicio</a></li>

                <li>
                    <!--sub menu-->
                    <a href="#" class ="submenu-toggle"><i class="fas fa-cash-register"></i> Ventas</a>
                    <ul class ="submenu">
                        <%--<li><a href="#"> <i class ="fas fa-boxes"></i>Productos</a></li>--%>
                        <li><a href="#" onclick="loadContent('ModuloCliente.aspx')"> <i class ="fas fa-users"></i>Clientes</a></li>
                        <li><a href="#" onclick="loadContent('ModuloVentasVenta.aspx')"> <i class ="fas fa-cash-register"></i>Ventas</a></li>
                        <%--<li><a href="#"> <i class ="fas fa-file-invoice-dollar"></i>Facturacion</a></li>--%>
                        <%--<li><a href="#"> <i class ="fas fa-file-alt"></i>Reportes</a></li>--%>
                        <%--<li> <a href="#"> <i class="fas fa-chart-line"></i>Historial de Ventas </a></li>--%>
                        <%--<li> <a href="#"> <i class ="fas fa-cash-register"> </i>Caja</a></li>--%>
                    </ul>
                </li>

                <li>
                    <a href="#" class ="submenu-toggle"><i class="fas fa-boxes"></i> Inventario</a>
                    <ul class ="submenu">
                        <li> <a href="#" onclick="loadContent('InventarioProductos.aspx')"> <i class ="fas fa-box-open"></i>Productos</a></li>
                        <li> <a href="#" onclick="loadContent('InventarioPedidos.aspx')"> <i class ="fas fa-clipboard-list"></i>Pedido</a></li>
                        <%--<li> <a href="#"> <i class ="fas fa-shopping-cart"></i>Compras</a></li>--%>
                        <li> <a href="#" onclick="loadContent('ModuloCategoria.aspx')"> <i class ="fas fa-tags"></i>Categoría Producto</a></li>
                        <li> <a href="#" onclick="loadContent('ModuloProveedor.aspx')"> <i class ="fas fa-truck"></i>Proveedor</a></li>
                        <%--<li> <a href="#"> <i class ="fas fa-warehouse"></i>Kardex</a></li>--%>

                    </ul>

                </li>
                   
                <li>
                    <a href="#" class="submenu-toggle"><i class="fas fa-cog"></i> Configuración</a>
                    <ul class="submenu">
                        <li><a href="#" onclick="loadContent('ModuloEmpleado.aspx')"><i class="fas fa-user-tie"></i> Empleados</a></li>
                        <li><a href="#" onclick="loadContent('ModuloUsuarios.aspx')"><i class="fas fa-user"></i> Usuario</a></li>
                        <%--<li><a href="#" onclick="loadContent('Modulo_Pais.aspx')""><i class="fas fa-globe"></i>Pais</a></li>
                        <li><a href="#" onclick="#"><i class="fas fa-building"></i>Departamento</a></li>
                        <li><a href="#" onclick="#"><i class="fas fa-map-marker-alt"></i>Municipio</a></li>--%>
                        <%--<li><a href="#"><i class="fas fa-book"></i> Bitácora</a></li> --%>                   
                    </ul>
                </li>

                <%--<li><a href="#"><i class="fas fa-question-circle"></i> Ayuda</a></li>--%>
            </ul>
            </div>

            <!-- Botón para ocultar/mostrar barra lateral -->
            <div class="toggle-sidebar">
                <i class="fas fa-arrow-left" id="toggle-icon"></i>    
        </div>

        <div class="content">
            <iframe id="content-frame" scrolling="no" src="homeInicio.aspx" frameborder="0"></iframe>
        </div>
    </div>

    <%--</form>--%>

    <script>

        //// Llamar a la función al cargar la página
        //window.onload = function () {
        //    enviarKeyConQueryString();
        //};

        //Permite enviar la key de storage web al servidor
        //function enviarKeyConQueryString() {
        //    let keyValue = localStorage.getItem("usuarioNombre");; // Valor ya capturado

        //    // Redirigir a la página con el valor de la key en la URL
        //    window.location.href = "/Pages/home.aspx?key=" + encodeURIComponent(keyValue);
        //}

        //Logica del iframe
        // Función para cargar contenido en el iframe
        function loadContent(page) {
            document.getElementById('content-frame').src = page;
        }

        // Permite ajustar la altura del iframe del index.html
        function ajustarAlturaIframe() {
            var iframe = document.getElementById('content-frame');
            iframe.onload = function () {
                iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
            }
        }

        window.addEventListener('load', ajustarAlturaIframe);

        // Obtener todos los elementos con la clase 'submenu-toggle' (botones de submenús)
        var submenuToggles = document.querySelectorAll('.submenu-toggle');

        // Agregar un evento de clic a cada botón de submenú
        submenuToggles.forEach(function (toggle) {
            toggle.addEventListener('click', function (event) {
                event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

                // Obtener el submenú correspondiente al botón de submenú clicado
                var submenu = this.nextElementSibling; // Seleccionar el siguiente elemento (submenú)
                var isSubmenuVisible = submenu.style.display === 'block'; // Verificar si el submenú ya está visible

                // Ocultar todos los submenús
                var allSubmenus = document.querySelectorAll('.submenu');
                allSubmenus.forEach(function (submenu) {
                    submenu.style.display = 'none';
                });

                // Si el submenú no estaba visible, mostrarlo
                if (!isSubmenuVisible) {
                    submenu.style.display = 'block'; // Mostrar el submenú si estaba oculto
                }
            });
        });


        //// Mostrar/Ocultar submenús
        //document.querySelectorAll('.submenu-toggle').forEach(function (toggle) {
        //    toggle.addEventListener('click', function (event) {
        //        event.preventDefault();
        //        var submenu = this.nextElementSibling;
        //        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        //    });
        //});


        // Mostrar/Ocultar barra lateral
        document.getElementById('toggle-icon').addEventListener('click', function () {
            var sidebar = document.getElementById('sidebar');
            var icon = document.getElementById('toggle-icon');
            var menu = document.querySelector('.menu');

            if (sidebar.classList.contains('collapsed')) {
                sidebar.classList.remove('collapsed');
                menu.classList.remove('collapsed');
                icon.classList.remove('fa-arrow-right');
                icon.classList.add('fa-arrow-left');
            } else {
                sidebar.classList.add('collapsed');
                menu.classList.add('collapsed');
                icon.classList.remove('fa-arrow-left');
                icon.classList.add('fa-arrow-right');
            }
        });

        // Mostrar u ocultar el cuadro de información al hacer clic en el ícono
        document.getElementById('user-icon').addEventListener('click', function () {
            var userInfo = document.getElementById('user-info');

            if (userInfo.style.display === 'block') {
                userInfo.style.display = 'none'; // Ocultar el cuadro de información si está visible
            } else {
                userInfo.style.display = 'block'; // Mostrar el cuadro de información si está oculto
            }
        });

        // Función para el botón de cerrar sesión
        function cerrarSesion() {
            // Eliminar el nombre de usuario del localStorage
            localStorage.removeItem("usuarioNombre");

            // Redirigir al usuario a la página de inicio de sesión
            window.location.href = "login.aspx"; // Cambia a la página de login correspondiente

        }

        //var usuarioNombre = localStorage.getItem("usuarioNombre");
        //if (usuarioNombre) {
        //    /*window.location.href = "/Pages/home.aspx?key=" + encodeURIComponent(usuarioNombre);*/
        //    // Mostrar el nombre de usuario en el elemento con id usuarioNombre
        //    $("#usuarioNombre").text(usuarioNombre);
        //} else {
        //    // Si no hay nombre de usuario, redirigir al login
        //    window.location.href = "login.aspx"; // O cualquier página de tu elección
        //}

    </script>

</body>
</html>

