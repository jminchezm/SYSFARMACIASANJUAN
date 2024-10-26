using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Reporting.WebForms;

namespace SYSFARMACIASANJUAN.Pages
{
    public partial class ReporteUsuarios : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    string query = "SELECT * FROM USUARIO";
                    SqlDataAdapter adapter = new SqlDataAdapter(query, connection);
                    DataSet ds = new DataSet();
                    adapter.Fill(ds, "YourData");

                    // Aquí usaremos este dataset más adelante para cargarlo en ReportViewer
                    ReportViewer3.ProcessingMode = ProcessingMode.Local;
                    ReportViewer3.LocalReport.ReportPath = Server.MapPath("~/Reportes/ReporteUsuarios.rdlc");
                    ReportDataSource rds = new ReportDataSource("CamposRepUsuarios", ds.Tables["YourData"]);
                    ReportViewer3.LocalReport.DataSources.Clear();
                    ReportViewer3.LocalReport.DataSources.Add(rds);
                    ReportViewer3.LocalReport.Refresh();
                }
            }
        }
    }
}