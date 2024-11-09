using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Reporting.WebForms;

namespace SYSFARMACIASANJUAN.Pages
{
    public partial class ReporteProveedores : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    string query = "SELECT * FROM PROVEEDOR";
                    SqlDataAdapter adapter = new SqlDataAdapter(query, connection);
                    DataSet ds = new DataSet();
                    adapter.Fill(ds, "YourData");

                    // Aquí usaremos este dataset más adelante para cargarlo en ReportViewer
                    ReportViewer1.ProcessingMode = ProcessingMode.Local;
                    ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reportes/ReporteProveedores.rdlc");
                    ReportDataSource rds = new ReportDataSource("DataSet1", ds.Tables["YourData"]);
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(rds);
                    ReportViewer1.LocalReport.Refresh();
                }
            }
        }
    }
}

//using System;
//using System.Data;
//using System.Data.SqlClient;
//using Microsoft.Reporting.WebForms;

//namespace SYSFARMACIASANJUAN.Pages
//{
//    public partial class ReporteProveedores : System.Web.UI.Page
//    {
//        protected void Page_Load(object sender, EventArgs e)
//        {
//            if (!IsPostBack)
//            {
//                LoadReport(); // Llama sin parámetro para mostrar todos los empleados
//            }
//        }

//        private void LoadReport(int? PROVEEDOR_ID = null)
//        {
//            // Conexión a la base de datos
//            string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;
//            using (SqlConnection conn = new SqlConnection(connectionString))
//            {
//                SqlCommand cmd = new SqlCommand("SP_LISTARPROVEEDORES", conn);
//                cmd.CommandType = CommandType.StoredProcedure;

//                // Si PROVEEDOR_ID tiene un valor, pásalo; de lo contrario, pásale DBNull.Value
//                cmd.Parameters.AddWithValue("@PROVEEDOR_ID", PROVEEDOR_ID.HasValue ? (object)PROVEEDOR_ID.Value : DBNull.Value);

//                SqlDataAdapter da = new SqlDataAdapter(cmd);
//                DataTable dt = new DataTable();
//                da.Fill(dt);

//                // Configurar el ReportViewer
//                ReportDataSource rds = new ReportDataSource("DataSet1", dt); // DataSet1 es el nombre en el RDLC
//                ReportViewer1.LocalReport.DataSources.Clear();
//                ReportViewer1.LocalReport.DataSources.Add(rds);
//                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reportes/ReporteProveedores.rdlc"); // Ruta del reporte RDLC

//                // Refrescar el ReportViewer
//                ReportViewer1.LocalReport.Refresh();
//            }
//        }
//    }
//}