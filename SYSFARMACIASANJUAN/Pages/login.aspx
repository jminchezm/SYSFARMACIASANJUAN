<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="SYSFARMACIASANJUAN.Pages.login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="icon" href="../Resources/img/Login/usuario.png" type="image/png"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="../Resources/css/Styles_Login/estiloslogin.css"/>
    <link rel="stylesheet" href="../Resources/css/normalize.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
    <title>Login - Farmacia San Juan</title>
</head>
<body>
    <div class="login-container">
        <h2>Iniciar Sesión</h2>
        <img class="img-login" src="../Resources/img/Login/usuario.png" alt="Icono de usuario"/>
        
        <!-- Formulario de login -->
        <form id="loginForm" runat="server" autocomplete="off">
            <label for="usuarioNombre">Usuario:</label>
            <asp:TextBox ID="usuarioNombre" runat="server" CssClass="input-text" required="true"></asp:TextBox>
            
            <label for="usuarioContraseña">Contraseña:</label>
            <asp:TextBox ID="usuarioContraseña" runat="server" CssClass="input-text" TextMode="Password" required="true"></asp:TextBox>
            
            <asp:Button ID="btnIngresar" runat="server" Text="Ingresar" CssClass="btn-submit" OnClick="btnLogin_Click"/>
        </form>

        <!-- Mensaje de error -->
        <div  role="alert" id="alertaLogin" runat="server">
            <%--<p runat="server" class="alert alert-danger" role="alert"></p>--%>      
        </div>

    </div>
</body>
</html>
