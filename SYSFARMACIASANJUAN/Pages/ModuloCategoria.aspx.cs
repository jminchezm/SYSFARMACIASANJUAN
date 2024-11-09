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
    public partial class ModuloCategoria : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ListarSubCategoria();

        }


        private void ListarSubCategoria()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;
            string query = "SELECT CATEGORIAPRODUCTO_ID, CATEGORIAPRODUCTO_NOMBRE FROM CATEGORIAPRODUCTO";

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
                            ddlNombreCategoria.Items.Clear();
                            ddlNombreCategoriaModificar.Items.Clear();
                            while (reader.Read())
                            {
                                string categoriaID = reader["CATEGORIAPRODUCTO_ID"].ToString();
                                string nombreCategoria = reader["CATEGORIAPRODUCTO_NOMBRE"].ToString();
                                ddlNombreCategoria.Items.Add(new ListItem(nombreCategoria, categoriaID));
                                ddlNombreCategoriaModificar.Items.Add(new ListItem(nombreCategoria, categoriaID));
                            }

                            ddlNombreCategoria.Items.Insert(0, new ListItem("Seleccione", "0"));
                            ddlNombreCategoriaModificar.Items.Insert(0, new ListItem("Seleccione", "0"));
                        }

                        reader.Close();
                    }
                    catch (Exception ex)
                    {
                        string mensaje = "Error al cargar los Categoria: " + ex.Message;
                        ScriptManager.RegisterStartupScript(this, GetType(), "alertMessage", $"alert('{mensaje}');", true);
                    }
                }
            }
        }
    }
}