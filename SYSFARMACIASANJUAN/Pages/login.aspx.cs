using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Web.Services.Description;

namespace SYSFARMACIASANJUAN.Pages
{
    public partial class login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        private string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;
        //Validar el ingreso del usuario al sistema

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            // Obtener los valores del formulario
            string username = usuarioNombre.Text;
            string password = usuarioContraseña.Text;

            // Validar las credenciales contra la base de datos
            if (ValidarUsuario(username, password))
            {
                // Si las credenciales son válidas, almacenar el nombre de usuario en la sesión
                Session["UsuarioNombre"] = username;

                // Mostrar alerta de inicio de sesión correcto
                alertaLogin.InnerHtml = "¡Sesión iniciada con éxito! Espera un momento...";
                alertaLogin.Style["display"] = "block"; // Mostrar el mensaje de éxito

                // Cambiar la clase CSS del div alertaLogin
                alertaLogin.Attributes["class"] = "alert alert-success";

                // Usar JavaScript para redirigir después de unos segundos
                string script = "<script type=\"text/javascript\">setTimeout(function(){ window.location = 'home.aspx'; }, 2000);</script>";
                ClientScript.RegisterStartupScript(this.GetType(), "Redirect", script);
            }
            else
            {
                // Mostrar mensaje de error si las credenciales son inválidas
                alertaLogin.InnerHtml = "Nombre de usuario o contraseña incorrectos.";
                alertaLogin.Style["display"] = "block"; // Mostrar el mensaje de error

                // Cambiar la clase CSS del div alertaLogin
                alertaLogin.Attributes["class"] = "alert alert-danger fade-in";
            }
        }


        public bool ValidarUsuario(string usuarioNombre, string usuarioContraseña)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("SP_LOGINOUSUARIO", conn);
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@USUARIO_NOMBRE", usuarioNombre);
                command.Parameters.AddWithValue("@USUARIO_CONTRASEÑA", usuarioContraseña);

                conn.Open();

                // Ejecutar y devolver TRUE o FALSE
                var resultado = command.ExecuteScalar();
                return Convert.ToBoolean(resultado);
            }
        }

        
    }
}