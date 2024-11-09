using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.DataAccess
{
    public class VentaDataAccess
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

        public string MantenimientoVenta(
        ref string ventaId,
        DateTime? ventaFecha,
        string ventaEstado,
        decimal ventaTotal,
        string venta_clienteId,
        string venta_usuarioId,
        string accion)
        {
            if (accion != "1" && accion != "2" && accion != "3")
            {
                throw new ArgumentException("La acción debe ser '1' (insertar), '2' (modificar) o '3' (eliminar).");
            }

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("SP_MANTENIMIENTO_VENTA", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Configura el parámetro @PEDIDO_ID como OUTPUT
                    var ventaIdParam = command.Parameters.Add("@VENTA_ID", SqlDbType.VarChar, 10);
                    ventaIdParam.Direction = ParameterDirection.InputOutput;
                    ventaIdParam.Value = string.IsNullOrEmpty(ventaId) ? (object)DBNull.Value : ventaId;

                    command.Parameters.AddWithValue("@VENTA_FECHA", ventaFecha);
                    command.Parameters.AddWithValue("@VENTA_ESTADO", ventaEstado ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@VENTA_TOTAL", ventaTotal);
                    command.Parameters.AddWithValue("@CLIENTE_ID", venta_clienteId);
                    command.Parameters.AddWithValue("@USUARIO_ID", venta_usuarioId);

                    var accionParam = command.Parameters.Add("@ACCION", SqlDbType.VarChar, 1);
                    accionParam.Value = accion;
                    accionParam.Direction = ParameterDirection.InputOutput;

                    try
                    {
                        connection.Open();
                        command.ExecuteNonQuery();

                        // Si fue una inserción, actualiza el pedidoId con el valor generado
                        if (accion == "1")
                        {
                            ventaId = ventaIdParam.Value.ToString();
                        }

                        return accionParam.Value.ToString();
                    }
                    catch (SqlException ex)
                    {
                        throw new Exception("Error al realizar la operación en la base de datos: " + ex.Message);
                    }
                    finally
                    {
                        if (connection.State == ConnectionState.Open)
                        {
                            connection.Close();
                        }
                    }
                }
            }
        }
    }
}