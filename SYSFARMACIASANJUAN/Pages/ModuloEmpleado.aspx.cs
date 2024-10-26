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
    public partial class ModuloEmpleados : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ListarPuestosEmpleado();  // Solo cargar los puestos si es la primera vez que se carga la página
            }
        }

        private void ListarPuestosEmpleado()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;
            string query = "SELECT PUESTO_ID, PUESTO_NOMBRE FROM PUESTO";

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
                            ddlPuestoEmpleado.Items.Clear();
                            ddlPuestoEmpleadoModificar.Items.Clear();
                            while (reader.Read())
                            {
                                string puestoId = reader["PUESTO_ID"].ToString();
                                string puestoNombre = reader["PUESTO_NOMBRE"].ToString();
                                ddlPuestoEmpleado.Items.Add(new ListItem(puestoNombre, puestoId));
                                ddlPuestoEmpleadoModificar.Items.Add(new ListItem(puestoNombre, puestoId));
                            }

                            ddlPuestoEmpleado.Items.Insert(0, new ListItem("Seleccione", "0"));
                            ddlPuestoEmpleadoModificar.Items.Insert(0, new ListItem("Seleccione", "0"));
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

        public void limpiarFormularioAgregarEmpleado()
        {
            tbPrimerNombreEmpleado.Text = "";
            tbSegundoNombreEmpleado.Text = "";
            tbTercerNombreEmpleado.Text = "";
            tbPrimerApellidoEmpleado.Text = "";
            tbSegundoApellidoEmpleado.Text = "";
            tbApellidoCasadaEmpleado.Text = "";
            tbCUIEmpleado.Text = "";
            tbNITEmpleado.Text = "";
            tbFechaNacimientoEmpleado.Text = "";
            tbFechaIngresoEmpleado.Text = "";
            tbDireccionEmpleado.Text = "";
            tbTelefonoEmpleado.Text = "";
            tbMovilEmpleado.Text = "";
            ddlGeneroEmpleado.Text = "";
            ddlEstadoEmpleado.Text = "";
            ddlPuestoEmpleado.SelectedIndex = 0; // Regresar al primer ítem del DropDownList
        }
    }
}