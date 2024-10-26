using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SYSFARMACIASANJUAN.Pages
{
    public partial class home : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string usuarioNombreSession = string.Empty;

            if (Session["UsuarioNombre"] != null)
            {
                usuarioNombreSession = Session["UsuarioNombre"].ToString();
                usuarioNombre.InnerText = usuarioNombreSession;
                MostrarRolDelUsuario(usuarioNombreSession);
            }
            else
            {
                // Manejar el caso en el que la sesión no existe
                // Por ejemplo, redirigir al usuario a la página de inicio de sesión
                Response.Redirect("login.aspx");
            }
            //string usuarioNombreSession = Session["UsuarioNombre"].ToString();
            //usuarioNombre.InnerText = usuarioNombreSession;
            //MostrarRolDelUsuario(usuarioNombreSession);
            //if (!IsPostBack)
            //{
            //    MostrarRolDelUsuario(); // Solo se ejecuta en la primera carga
            //}

            //Accede a storage web para capturar el valor de la variable key
            //string key = Request.QueryString["key"];
            //usuarioNombre.InnerText = key;
            ////nombreRolUsuario.InnerText = key;
            //MostrarRolDelUsuario(key);
        }

        //[WebMethod]
        private void MostrarRolDelUsuario(String nombreUsuario)
        {
            //string key = Request.QueryString["key"];
            //nombreRolUsuario.InnerText = key;

            string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

            // aquí debes colocar el nombre de tu procedimiento almacenado
            string procedimientoalmacenado = "SP_MOSTRARROLDELUSUARIO";

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(procedimientoalmacenado, conn))
                {
                    // indica que el comando es un procedimiento almacenado
                    cmd.CommandType = CommandType.StoredProcedure;

                    // agregar el parámetro del nombre del usuario
                    cmd.Parameters.AddWithValue("@nombredelusuario", nombreUsuario);

                    try
                    {
                        conn.Open();
                        SqlDataReader reader = cmd.ExecuteReader();

                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                // asignar el valor del rol obtenido al elemento html
                                string rolNombreUsuarioDB = reader["ROL_NOMBRE"].ToString();
                                string nombreEmpleadoDB = reader["EMPLEADO_PRIMERNOMBRE"].ToString();
                                string apellidoEmpleadoDB = reader["EMPLEADO_PRIMERAPELLIDO"].ToString();
                                nombreRolUsuario.InnerText = rolNombreUsuarioDB;
                                nombreEmpleado.InnerText = nombreEmpleadoDB + " " + apellidoEmpleadoDB;
                                
                                //nombrerolusuario.innertext = rolnombreusuario;
                            }
                        }
                        reader.Close();
                    }
                    catch (Exception ex)
                    {
                        string mensaje = "error al cargar el rol de usuario: " + ex.Message;
                        ScriptManager.RegisterStartupScript(this, GetType(), "alertmessage", $"alert('{mensaje}');", true);
                    }
                }
            }
        }

        protected void btnLogout_Click(object sender, EventArgs e)
        {
            // Limpiar todas las variables de sesión
            Session.Clear();

            // Eliminar la sesión actual
            Session.Abandon();

            // Opcional: Eliminar la cookie de autenticación si estás utilizando Forms Authentication
            if (Request.Cookies["ASP.NET_SessionId"] != null)
            {
                Response.Cookies["ASP.NET_SessionId"].Expires = DateTime.Now.AddDays(-1);
            }

            // Redirigir al usuario a la página de inicio de sesión
            Response.Redirect("login.aspx");
        }

    }
}