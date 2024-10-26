using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SYSFARMACIASANJUAN.Pages
{
    public partial class InventarioPedidos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) // Solo asigna la fecha la primera vez que se carga la página
            {
                lblPedidoFechaCreacion.Text = DateTime.Now.ToString("yyyy-MM-dd"); // Formato de fecha
                lblPedidoEstado.Text = "Pendiente";
                ListarPuestosEmpleado();
            }
        }

        private void ListarPuestosEmpleado()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;
            string query = "SELECT PROVEEDOR_ID, PROVEEDOR_NOMBRE FROM PROVEEDOR";

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
                            ddlPedidoProveedor.Items.Clear();
                            //ddlPuestoEmpleadoModificar.Items.Clear();
                            while (reader.Read())
                            {
                                string proveedorId = reader["PROVEEDOR_ID"].ToString();
                                string proveeedorNombre = reader["PROVEEDOR_NOMBRE"].ToString();
                                ddlPedidoProveedor.Items.Add(new ListItem(proveeedorNombre, proveedorId));
                                //ddlPuestoEmpleadoModificar.Items.Add(new ListItem(puestoNombre, puestoId));
                            }

                            ddlPedidoProveedor.Items.Insert(0, new ListItem("Seleccione", "0"));
                            //ddlPuestoEmpleadoModificar.Items.Insert(0, new ListItem("Seleccione", "0"));
                        }

                        reader.Close();
                    }
                    catch (Exception ex)
                    {
                        string mensaje = "Error al cargar a los proveedores: " + ex.Message;
                        ScriptManager.RegisterStartupScript(this, GetType(), "alertMessage", $"alert('{mensaje}');", true);
                    }
                }
            }
        }

        //[WebMethod]
        //public static List<string> FiltrarProductos(string searchQuery)
        //{
        //    // Simulación de datos de ejemplo
        //    List<string> data = new List<string> { "Producto 1", "Producto 2", "Producto 3", "Ejemplo A", "Ejemplo B", "Producto Especial" };

        //    // Filtrar los resultados
        //    var resultadosFiltrados = data
        //        .Where(item => item.ToLower().Contains(searchQuery.ToLower()))
        //        .ToList();

        //    return resultadosFiltrados; // Devuelve una lista de strings
        //}
    }
}