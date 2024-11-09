using SYSFARMACIASANJUAN.Bussines;
using SYSFARMACIASANJUAN.DataAccess;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Text;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.Services.Description;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SYSFARMACIASANJUAN.Pages
{
    public partial class ModuloProveedor : System.Web.UI.Page
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
                            ddlMunicipioProveedor.Items.Clear();
                            ddlMunicipioProveedorModificar.Items.Clear();
                            while (reader.Read())
                            {
                                string municipioId = reader["MUNICIPIO_ID"].ToString();
                                string nombreMunicipio = reader["MUNICIPIO_NOMBRE"].ToString();
                                ddlMunicipioProveedor.Items.Add(new ListItem(nombreMunicipio, municipioId));
                                ddlMunicipioProveedorModificar.Items.Add(new ListItem(nombreMunicipio, municipioId));
                            }

                            ddlMunicipioProveedor.Items.Insert(0, new ListItem("Seleccione", "0"));
                            ddlMunicipioProveedorModificar.Items.Insert(0, new ListItem("Seleccione", "0"));
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
        //public void limpiarFormularioAgregarEmpleado()
        //{
        //    tbPrimerNombreEmpleado.Text = "";
        //    tbSegundoNombreEmpleado.Text = "";
        //    tbTercerNombreEmpleado.Text = "";
        //    tbPrimerApellidoEmpleado.Text = "";
        //    tbSegundoApellidoEmpleado.Text = "";
        //    tbApellidoCasadaEmpleado.Text = "";
        //    tbCUIEmpleado.Text = "";
        //    tbNITEmpleado.Text = "";
        //    tbFechaNacimientoEmpleado.Text = "";
        //    tbFechaIngresoEmpleado.Text = "";
        //    tbDireccionEmpleado.Text = "";
        //    tbTelefonoEmpleado.Text = "";
        //    tbMovilEmpleado.Text = "";
        //    ddlGeneroEmpleado.Text = "";
        //    ddlEstadoEmpleado.Text = "";
        //    ddlPuestoEmpleado.SelectedIndex = 0; // Regresar al primer ítem del DropDownList
        //}

    }

}