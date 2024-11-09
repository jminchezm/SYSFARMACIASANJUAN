<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReporteCategorias.aspx.cs" Inherits="SYSFARMACIASANJUAN.Pages.ReporteCategorias" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=15.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="../Resources/css/Styles_Reporte/estilosReporteEmpleado.css" rel="stylesheet" />
    <title>Reporte de Empleados</title>
</head>
<body>
    <form id="form1" runat="server">
        <!-- Agregar ScriptManager aquí -->
        <asp:ScriptManager ID="ScriptManager1" runat="server" />

        <!-- Control ReportViewer - este ID es el que hay que poner en el archivo .aspx.cs-->
        <rsweb:ReportViewer ID="ReportViewerCategorias" runat="server" Width="100%" Height="100%" ZoomMode="PageWidth">
        </rsweb:ReportViewer>

    </form>
</body>
</html>
