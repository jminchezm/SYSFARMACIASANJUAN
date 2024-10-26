using SYSFARMACIASANJUAN.Bussines;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SYSFARMACIASANJUAN.Pages
{
    public partial class ModuloUsuarios : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ListarRol();
            //ListarEmpleado();
        }

        private void ListarRol()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;
            string query = "SELECT ROL_ID, ROL_NOMBRE FROM ROL";

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    try
                    {
                        conn.Open();
                        SqlDataReader reader = cmd.ExecuteReader();

                        if (reader.HasRows)
                        {
                            ddlRolUsuario.Items.Clear();
                            ddlRolUsuarioModificar.Items.Clear();
                            while (reader.Read())
                            {
                                string idRol = reader["ROL_ID"].ToString();
                                string nombreRol = reader["ROL_NOMBRE"].ToString();
                                ddlRolUsuario.Items.Add(new ListItem(nombreRol, idRol));
                                ddlRolUsuarioModificar.Items.Add(new ListItem(nombreRol, idRol));
                            }

                            ddlRolUsuario.Items.Insert(0, new ListItem("Seleccione", "0"));
                            ddlRolUsuarioModificar.Items.Insert(0, new ListItem("Seleccione", "0"));
                        }

                        reader.Close();
                    }
                    catch (Exception ex)
                    {
                        string mensaje = "Error al cargar los roles: " + ex.Message;
                        ScriptManager.RegisterStartupScript(this, GetType(), "alertMessage", $"alert('{mensaje}');", true);
                    }
                }
            }
        }
        //[WebMethod]
        //private void ListarEmpleado()
        //{
        //    string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;
        //    string query = "SELECT E.EMPLEADO_ID, " +
        //                   "LTRIM(COALESCE(NULLIF(E.EMPLEADO_PRIMERNOMBRE, '') + ' ', '') + " +
        //                   "COALESCE(NULLIF(E.EMPLEADO_SEGUNDONOMBRE, '') + ' ', '') + " +
        //                   "COALESCE(NULLIF(E.EMPLEADO_TERCERNOMBRE, '') + ' ', '') + " +
        //                   "COALESCE(NULLIF(E.EMPLEADO_PRIMERAPELLIDO, '') + ' ', '') + " +
        //                   "COALESCE(NULLIF(E.EMPLEADO_SEGUNDOAPELLIDO, '') + ' ', '') + " +
        //                   "COALESCE(NULLIF(E.EMPLEADO_APELLIDOCASADA, ''), '')) AS NOMBRE_COMPLETO " +
        //                   "FROM EMPLEADO E " +
        //                   "LEFT JOIN USUARIO U " +
        //                   "ON E.EMPLEADO_ID = U.EMPLEADO_ID " +
        //                   "WHERE U.EMPLEADO_ID IS NULL;";

        //    using (SqlConnection conn = new SqlConnection(connectionString))
        //    {
        //        using (SqlCommand cmd = new SqlCommand(query, conn))
        //        {
        //            try
        //            {
        //                conn.Open();
        //                SqlDataReader reader = cmd.ExecuteReader();

        //                if (reader.HasRows)
        //                {
        //                    ddlIdEmpleadoUsuario.Items.Clear();
        //                    //ddlPuestoEmpleadoModificar.Items.Clear();
        //                    while (reader.Read())
        //                    {
        //                        string idEmpleadoUsuario = reader["EMPLEADO_ID"].ToString();
        //                        string nombreCompletoEmpleadoUsuario = reader["NOMBRE_COMPLETO"].ToString();
        //                        ddlIdEmpleadoUsuario.Items.Add(new ListItem(nombreCompletoEmpleadoUsuario, idEmpleadoUsuario)); //texto - valor
        //                        //ddlPuestoEmpleadoModificar.Items.Add(new ListItem(puestoNombre, puestoId));
        //                    }

        //                    ddlIdEmpleadoUsuario.Items.Insert(0, new ListItem("Seleccione", "0"));
        //                    //ddlPuestoEmpleadoModificar.Items.Insert(0, new ListItem("Seleccione", "0"));
        //                }

        //                reader.Close();
        //            }
        //            catch (Exception ex)
        //            {
        //                string mensaje = "Error al cargar a los Empleados: " + ex.Message;
        //                ScriptManager.RegisterStartupScript(this, GetType(), "alertMessage", $"alert('{mensaje}');", true);
        //            }
        //        }
        //    }
        //}

        [WebMethod]
        public static List<ListItem> ListarEmpleado()
        {
            List<ListItem> empleados = new List<ListItem>();
            string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;
            string query = "SELECT E.EMPLEADO_ID, " +
                           "LTRIM(COALESCE(NULLIF(E.EMPLEADO_PRIMERNOMBRE, '') + ' ', '') + " +
                           "COALESCE(NULLIF(E.EMPLEADO_SEGUNDONOMBRE, '') + ' ', '') + " +
                           "COALESCE(NULLIF(E.EMPLEADO_TERCERNOMBRE, '') + ' ', '') + " +
                           "COALESCE(NULLIF(E.EMPLEADO_PRIMERAPELLIDO, '') + ' ', '') + " +
                           "COALESCE(NULLIF(E.EMPLEADO_SEGUNDOAPELLIDO, '') + ' ', '') + " +
                           "COALESCE(NULLIF(E.EMPLEADO_APELLIDOCASADA, ''), '')) AS NOMBRE_COMPLETO " +
                           "FROM EMPLEADO E " +
                           "LEFT JOIN USUARIO U " +
                           "ON E.EMPLEADO_ID = U.EMPLEADO_ID " +
                           "WHERE U.EMPLEADO_ID IS NULL AND E.EMPLEADO_ESTADO = '1';";

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            string idEmpleadoUsuario = reader["EMPLEADO_ID"].ToString();
                            string nombreCompletoEmpleadoUsuario = reader["NOMBRE_COMPLETO"].ToString();
                            empleados.Add(new ListItem(nombreCompletoEmpleadoUsuario, idEmpleadoUsuario));
                        }
                    }
                    reader.Close();
                }
            }
            return empleados;
        }

        [WebMethod]
        public static string CambiarContraseñaUsuario(string usuarioId, string contraseñaAnterior, string nuevaContraseña)
        {
            try
            {
                UsuarioServices usuarioService = new UsuarioServices();
                bool cambioExitoso = usuarioService.CambiarContraseña(usuarioId, contraseñaAnterior, nuevaContraseña);

                if (cambioExitoso)
                {
                    return "OK";
                }
                else
                {
                    return "La contraseña anterior no es correcta.";
                }
            }
            catch (Exception ex)
            {
                return $"Error al cambiar la contraseña: {ex.Message}";
            }
        }
    }
}