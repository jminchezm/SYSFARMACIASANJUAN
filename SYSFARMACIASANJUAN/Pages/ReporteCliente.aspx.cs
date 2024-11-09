using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Reporting.WebForms;


namespace SYSFARMACIASANJUAN.Pages
{
    public partial class ReporteCliente : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    string query = "SELECT * FROM CLIENTE";
                    SqlDataAdapter adapter = new SqlDataAdapter(query, connection);
                    DataSet ds = new DataSet();
                    adapter.Fill(ds, "YourData");

                    // Aquí usaremos este dataset más adelante para cargarlo en ReportViewer
                    ReportViewerCliente.ProcessingMode = ProcessingMode.Local;
                    ReportViewerCliente.LocalReport.ReportPath = Server.MapPath("~/Reportes/ReporteCliente.rdlc");
                    ReportDataSource rds = new ReportDataSource("DataSet1", ds.Tables["YourData"]);
                    ReportViewerCliente.LocalReport.DataSources.Clear();
                    ReportViewerCliente.LocalReport.DataSources.Add(rds);
                    ReportViewerCliente.LocalReport.Refresh();
                }
            }
        }
    }
}