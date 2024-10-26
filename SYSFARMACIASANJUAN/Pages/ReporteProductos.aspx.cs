using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Reporting.WebForms;

namespace SYSFARMACIASANJUAN.Pages
{
    public partial class ReporteProductos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    string query = "SELECT * FROM PRODUCTO";
                    SqlDataAdapter adapter = new SqlDataAdapter(query, connection);
                    DataSet ds = new DataSet();
                    adapter.Fill(ds, "YourData");

                    // Aquí usaremos este dataset más adelante para cargarlo en ReportViewer
                    ReportViewer2.ProcessingMode = ProcessingMode.Local;
                    ReportViewer2.LocalReport.ReportPath = Server.MapPath("~/Reportes/ReporteProductos.rdlc");
                    ReportDataSource rds = new ReportDataSource("CamposRepProductos", ds.Tables["YourData"]);
                    ReportViewer2.LocalReport.DataSources.Clear();
                    ReportViewer2.LocalReport.DataSources.Add(rds);
                    ReportViewer2.LocalReport.Refresh();
                }
            }
        }
    }
}