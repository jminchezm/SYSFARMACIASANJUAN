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
    public partial class Inventario_Productos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ListItem> ListarSubCategoriaProducto()
        {
            List<ListItem> subcategorias = new List<ListItem>();

            string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;
            string query = "SELECT SUBCATEGORIAPRODUCTO_ID, SUBCATEGORIAPRODUCTO_NOMBRE FROM SUBCATEGORIAPRODUCTO";

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
                            subcategorias.Add(new ListItem
                            {
                                Value = reader["SUBCATEGORIAPRODUCTO_ID"].ToString(),
                                Text = reader["SUBCATEGORIAPRODUCTO_NOMBRE"].ToString()
                            });
                        }

                        reader.Close();
                    }
                    catch (Exception ex)
                    {
                        throw new Exception("Error al cargar las subcategorías: " + ex.Message);
                    }
                }
            }

            return subcategorias;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<ListItem> obtenerSubCategoriaPorNombre(string nombreSubCategoria)
        {
            List<ListItem> subcategorias = new List<ListItem>();

            string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;
            string query = "SELECT SUBCATEGORIAPRODUCTO_ID FROM SUBCATEGORIAPRODUCTO WHERE UPPER(SUBCATEGORIAPRODUCTO_NOMBRE) = UPPER(@nombre)";

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    // Agregar el parámetro a la consulta
                    cmd.Parameters.AddWithValue("@nombre", nombreSubCategoria);

                    try
                    {
                        conn.Open();
                        SqlDataReader reader = cmd.ExecuteReader();

                        while (reader.Read())
                        {
                            subcategorias.Add(new ListItem
                            {
                                Value = reader["SUBCATEGORIAPRODUCTO_ID"].ToString(),
                                Text = nombreSubCategoria // Puedes ajustar esto si necesitas mostrar otro valor
                            });
                        }

                        reader.Close();
                    }
                    catch (Exception ex)
                    {
                        throw new Exception("Error al cargar las subcategorías: " + ex.Message);
                    }
                }
            }

            return subcategorias;
        }



    }
}