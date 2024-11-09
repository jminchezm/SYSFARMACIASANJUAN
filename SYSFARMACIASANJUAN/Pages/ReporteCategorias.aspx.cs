using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Reporting.WebForms;
using System.Configuration;

namespace SYSFARMACIASANJUAN.Pages
{
    public partial class ReporteCategorias : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewerCategorias.ProcessingMode = ProcessingMode.Local;
                ReportViewerCategorias.LocalReport.ReportPath = Server.MapPath("~/Reportes/ReporteCategorias.rdlc");

                CargarReportes();
            }
        }

        private void CargarReportes()
        {
            // Obtener datos para ambos reportes
            DataTable dtCategorias = ObtenerCategorias();
            DataTable dtSubCategorias = ObtenerSubCategorias();
            ReportViewerCategorias.LocalReport.DataSources.Clear();

            // Cargar las categorías
            if (dtCategorias.Rows.Count > 0)
            {
                ReportDataSource fuenteCategorias = new ReportDataSource("DataSet1", dtCategorias);
                ReportViewerCategorias.LocalReport.DataSources.Add(fuenteCategorias);
            }

            // Cargar las subcategorías
            if (dtSubCategorias.Rows.Count > 0)
            {
                ReportDataSource fuenteSubCategorias = new ReportDataSource("DataSet2", dtSubCategorias);
                ReportViewerCategorias.LocalReport.DataSources.Add(fuenteSubCategorias);
            }

            // Refrescar el ReportViewer para mostrar ambos reportes
            ReportViewerCategorias.LocalReport.Refresh();
        }

        protected void ddlSeleccionReporte_SelectedIndexChanged(object sender, EventArgs e)
        {
            // Mensaje Opcional
        }

        protected void btnGenerarReporte_Click(object sender, EventArgs e)
        {
            // Este método puede ser opcional si ya estás cargando todos los reportes al cargar la página
            CargarReportes();
        }

        private DataTable ObtenerCategorias()
        {
            DataTable dt = new DataTable();
            string conexionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

            using (SqlConnection conn = new SqlConnection(conexionString))
            {
                string query = "SELECT * FROM CATEGORIAPRODUCTO";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);
                }
            }
            return dt;
        }

        private DataTable ObtenerSubCategorias()
        {
            DataTable dt = new DataTable();
            string conexionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

            using (SqlConnection conn = new SqlConnection(conexionString))
            {
                string query = "SELECT * FROM SUBCATEGORIAPRODUCTO";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);
                }
            }
            return dt;
        }
    }
}
