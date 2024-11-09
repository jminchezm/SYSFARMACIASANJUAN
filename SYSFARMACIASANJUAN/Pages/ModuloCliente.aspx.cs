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
    public partial class ModuloCliente : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ListarMunicipioProveedor();  // Solo cargar los puestos si es la primera vez que se carga la página
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
                            ddlMunicipioClienteModificar.Items.Clear();
                            while (reader.Read())
                            {
                                string municipioId = reader["MUNICIPIO_ID"].ToString();
                                string nombreMunicipio = reader["MUNICIPIO_NOMBRE"].ToString();
                                ddlMunicipioCliente.Items.Add(new ListItem(nombreMunicipio, municipioId));
                                ddlMunicipioClienteModificar.Items.Add(new ListItem(nombreMunicipio, municipioId));
                            }

                            ddlMunicipioCliente.Items.Insert(0, new ListItem("Seleccione", "0"));
                            ddlMunicipioClienteModificar.Items.Insert(0, new ListItem("Seleccione", "0"));
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

    }
}