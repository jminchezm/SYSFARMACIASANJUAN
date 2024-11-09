using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SYSFARMACIASANJUAN.Pages
{
    public partial class Ventas : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ListarMunicipioProveedor();
            ListarUsuario();
            ListarCliente();
            //ddlVentaResponsable.Enabled = false;
            //ddlVentaCliente.Enabled = false;
            //Componentes modal nueva venta
            lblVentaFechaCreacion.Text = DateTime.Now.ToString("yyyy-MM-dd");
            lblVentaEstado.Text = "Pendiente";
            ddlVentaResponsable.SelectedItem.Text = Session["UsuarioNombre"].ToString();
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
                            //ddlMunicipioClienteModificar.Items.Clear();
                            while (reader.Read())
                            {
                                string usuarioId = reader["USUARIO_ID"].ToString();
                                string nombreUsuario = reader["USUARIO_NOMBRE"].ToString();
                                ddlVentaResponsable.Items.Add(new ListItem(nombreUsuario, usuarioId));
                                //ddlMunicipioClienteModificar.Items.Add(new ListItem(nombreMunicipio, municipioId));
                            }

                            ddlVentaResponsable.Items.Insert(0, new ListItem("Seleccione", "0"));
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
                            while (reader.Read())
                            {
                                string clienteId = reader["CLIENTE_ID"].ToString();
                                string nombreCliente = reader["CLIENTE_NOMBRE"].ToString();
                                ddlVentaCliente.Items.Add(new ListItem(nombreCliente, clienteId));
                            }

                            ddlVentaCliente.Items.Insert(0, new ListItem("Seleccione", "0"));
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