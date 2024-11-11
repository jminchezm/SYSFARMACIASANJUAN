using SYSFARMACIASANJUAN.Bussines;
using SYSFARMACIASANJUAN.Models;
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
    public partial class Ventas : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ListarCliente();
                ListarUsuario();

                ListarMunicipioProveedor();

                inputBuscarInventarioProducto.ReadOnly = true;
                //btnConfirmarVenta.Enabled = false;

                //ddlVentaResponsable.Enabled = false;
                //ddlVentaCliente.Enabled = false;
                //Componentes modal nueva venta
                lblVentaFechaCreacion.Text = DateTime.Now.ToString("yyyy-MM-dd");
                //lblVentaEstado.Text = "Pendiente";
                //ddlVentaResponsable = Session["UsuarioNombre"].ToString();

                // Verifica si el DropDownList tiene ese texto
                ListItem item = ddlVentaResponsable.Items.FindByText(Session["UsuarioNombre"].ToString());

                if (item != null)
                {
                    // Si se encuentra el texto, lo selecciona
                    ddlVentaResponsable.SelectedIndex = ddlVentaResponsable.Items.IndexOf(item);
                }
                else
                {
                    // Si no se encuentra el texto
                    ScriptManager.RegisterStartupScript(this, GetType(), "alertMessage", "alert('El texto no se encontró en el dropdown');", true);
                }
            }
        }

        private void ListarMunicipioProveedor()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

            string query = "SELECT MUNICIPIO_ID, MUNICIPIO_NOMBRE FROM MUNICIPIO";

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
                            ddlMunicipioCliente.Items.Clear();
                            //ddlMunicipioClienteModificar.Items.Clear();
                            while (reader.Read())
                            {
                                string municipioId = reader["MUNICIPIO_ID"].ToString();
                                string nombreMunicipio = reader["MUNICIPIO_NOMBRE"].ToString();
                                ddlMunicipioCliente.Items.Add(new ListItem(nombreMunicipio, municipioId));
                                //ddlMunicipioClienteModificar.Items.Add(new ListItem(nombreMunicipio, municipioId));
                            }

                            ddlMunicipioCliente.Items.Insert(0, new ListItem("Seleccione", "0"));
                            //ddlMunicipioClienteModificar.Items.Insert(0, new ListItem("Seleccione", "0"));
                        }

                        reader.Close();
                    }
                    catch (Exception ex)
                    {
                        string mensaje = "Error al cargar los puestos: " + ex.Message;
                        ScriptManager.RegisterStartupScript(this, GetType(), "alertMessage", $"alert('{mensaje}');", true);
                    }
                }
            }
        }

        private void ListarUsuario()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

            string query = "SELECT USUARIO_ID, USUARIO_NOMBRE FROM USUARIO";

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
                            ddlVentaResponsable.Items.Clear();
                            ddlVerVentaResponsable.Items.Clear();
                            //ddlMunicipioClienteModificar.Items.Clear();
                            while (reader.Read())
                            {
                                string usuarioId = reader["USUARIO_ID"].ToString();
                                string nombreUsuario = reader["USUARIO_NOMBRE"].ToString();
                                ddlVentaResponsable.Items.Add(new ListItem(nombreUsuario, usuarioId));
                                ddlVerVentaResponsable.Items.Add(new ListItem(nombreUsuario, usuarioId));
                                //ddlMunicipioClienteModificar.Items.Add(new ListItem(nombreMunicipio, municipioId));
                            }

                            ddlVentaResponsable.Items.Insert(0, new ListItem("Seleccione", "0"));
                            ddlVerVentaResponsable.Items.Insert(0, new ListItem("Seleccione", "0"));
                            //ddlMunicipioClienteModificar.Items.Insert(0, new ListItem("Seleccione", "0"));
                        }

                        reader.Close();
                    }
                    catch (Exception ex)
                    {
                        string mensaje = "Error al cargar a los usuarios: " + ex.Message;
                        ScriptManager.RegisterStartupScript(this, GetType(), "alertMessage", $"alert('{mensaje}');", true);
                    }
                }
            }
        }

        private void ListarCliente()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

            // Consulta adaptada para obtener el nombre completo del cliente
            string query = @"SELECT CLIENTE_ID, 
                            CONCAT(CLIENTE_PRIMERNOMBRE, ' ', 
                                   COALESCE(CLIENTE_SEGUNDONOMBRE, ''), ' ', 
                                   COALESCE(CLIENTE_TERCERNOMBRE, ''), ' ', 
                                   CLIENTE_PRIMERAPELLIDO, ' ', 
                                   COALESCE(CLIENTE_SEGUNDOAPELLIDO, ''), ' ', 
                                   COALESCE(CLIENTE_APELLIDOCASADA, '')) AS CLIENTE_NOMBRE
                     FROM CLIENTE";

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
                            ddlVentaCliente.Items.Clear();
                            ddlBuscarVentaCliente.Items.Clear();
                            ddlVerVentaCliente.Items.Clear();
                            while (reader.Read())
                            {
                                string clienteId = reader["CLIENTE_ID"].ToString();
                                string nombreCliente = reader["CLIENTE_NOMBRE"].ToString();
                                ddlVentaCliente.Items.Add(new ListItem(nombreCliente, clienteId));
                                ddlBuscarVentaCliente.Items.Add(new ListItem(nombreCliente, clienteId));
                                ddlVerVentaCliente.Items.Add(new ListItem(nombreCliente, clienteId));
                            }

                            ddlVentaCliente.Items.Insert(0, new ListItem("Seleccione", "0"));
                            ddlBuscarVentaCliente.Items.Insert(0, new ListItem("Seleccione", "0"));
                            ddlVerVentaCliente.Items.Insert(0, new ListItem("Seleccione", "0"));
                        }

                        reader.Close();
                    }
                    catch (Exception ex)
                    {
                        string mensaje = "Error al cargar los clientes: " + ex.Message;
                        ScriptManager.RegisterStartupScript(this, GetType(), "alertMessage", $"alert('{mensaje}');", true);
                    }
                }
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<Cliente> ObtenerClientes()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;
            string query = @"SELECT CLIENTE_ID, 
                            CONCAT(CLIENTE_PRIMERNOMBRE, ' ', 
                                   COALESCE(CLIENTE_SEGUNDONOMBRE, ''), ' ', 
                                   COALESCE(CLIENTE_TERCERNOMBRE, ''), ' ', 
                                   CLIENTE_PRIMERAPELLIDO, ' ', 
                                   COALESCE(CLIENTE_SEGUNDOAPELLIDO, ''), ' ', 
                                   COALESCE(CLIENTE_APELLIDOCASADA, '')) AS CLIENTE_NOMBRE
                     FROM CLIENTE";

            List<Cliente> clientes = new List<Cliente>();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    try
                    {
                        conn.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        while (reader.Read())
                        {
                            string clienteId = reader["CLIENTE_ID"].ToString();
                            string nombreCliente = reader["CLIENTE_NOMBRE"].ToString();
                            clientes.Add(new Cliente { idCliente = clienteId, nombreCompleto = nombreCliente });
                        }
                        reader.Close();
                    }
                    catch (Exception ex)
                    {
                        // Manejo de errores
                    }
                }
            }

            return clientes;
        }

        [WebMethod]
        public static object LlenarCamposFormVenta()
        {
            string fechaCreacion = DateTime.Now.ToString("yyyy-MM-dd");
            //string estado = "Pendiente";
            string usuarioNombre = HttpContext.Current.Session["UsuarioNombre"]?.ToString() ?? "";

            return new
            {
                FechaCreacion = fechaCreacion,
                //Estado = estado,
                UsuarioNombre = usuarioNombre,
                TbVentaNit = "" // Valor en blanco para tbVentaNit
            };
        }

        //[WebMethod]
        //public static bool DescontarStockInventarioPorVenta(string ventaId)
        //{
        //    var detalleVentaServices = new DetalleVentaServices();
        //    return detalleVentaServices.DescontarStockInventarioPorVenta(ventaId);
        //}



        //private void ListarCliente()
        //{
        //    string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

        //    string query = "SELECT CLIENTE_ID, CLIENTE_NOMBRE FROM CLIENTE";

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
        //                    ddlVentaCliente.Items.Clear();
        //                    //ddlMunicipioClienteModificar.Items.Clear();
        //                    while (reader.Read())
        //                    {
        //                        string clienteId = reader["CLIENTE_ID"].ToString();
        //                        string nombreCliente = reader["CLIENTE_NOMBRE"].ToString();
        //                        ddlVentaCliente.Items.Add(new ListItem(nombreCliente, clienteId));
        //                        //ddlMunicipioClienteModificar.Items.Add(new ListItem(nombreMunicipio, municipioId));
        //                    }

        //                    ddlVentaCliente.Items.Insert(0, new ListItem("Seleccione", "0"));
        //                    //ddlMunicipioClienteModificar.Items.Insert(0, new ListItem("Seleccione", "0"));
        //                }

        //                reader.Close();
        //            }
        //            catch (Exception ex)
        //            {
        //                string mensaje = "Error al cargar los clientes: " + ex.Message;
        //                ScriptManager.RegisterStartupScript(this, GetType(), "alertMessage", $"alert('{mensaje}');", true);
        //            }
        //        }
        //    }
        //}
    }
}