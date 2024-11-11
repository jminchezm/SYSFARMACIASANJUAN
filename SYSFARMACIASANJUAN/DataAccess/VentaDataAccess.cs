using SYSFARMACIASANJUAN.Models;
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

        public List<Venta> ListarVentasPorFiltro(string ventaId = null, DateTime? fechaInicio = null, DateTime? fechaFin = null, string clienteId = null)
        {
            List<Venta> ventas = new List<Venta>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("SP_OBTENERVENTAS", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Agregar el parámetro del ID de la venta, validando si es null o vacío
                    command.Parameters.AddWithValue("@VentaID", string.IsNullOrEmpty(ventaId) ? (object)DBNull.Value : ventaId);

                    // Agregar los parámetros del rango de fechas
                    command.Parameters.AddWithValue("@FechaInicio", fechaInicio.HasValue ? (object)fechaInicio.Value : DBNull.Value);
                    command.Parameters.AddWithValue("@FechaFin", fechaFin.HasValue ? (object)fechaFin.Value : DBNull.Value);

                    // Agregar el parámetro del ID del cliente, validando si es null o vacío
                    command.Parameters.AddWithValue("@ClienteID", string.IsNullOrEmpty(clienteId) ? (object)DBNull.Value : clienteId);

                    try
                    {
                        connection.Open();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Venta venta = new Venta
                                {
                                    ventaId = reader["VENTA_ID"].ToString(),
                                    ventaFecha = (DateTime) reader["VENTA_FECHA"],
                                    ventaTotal = (decimal)reader["VENTA_TOTAL"],
                                    venta_clienteId = reader["CLIENTE_ID"].ToString(),
                                    venta_clienteNit = reader["CLIENTE_NIT"].ToString(),
                                    venta_clienteCui = reader["CLIENTE_CUI"].ToString(),
                                    venta_clienteNombre = reader["CLIENTE_NOMBRE_COMPLETO"].ToString(),
                                    venta_usuarioId = reader["USUARIO_ID"].ToString(),
                                    venta_usuarioNomre = reader["USUARIO_NOMBRE"].ToString()
                                };

                                ventas.Add(venta);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        // Manejar el error
                        throw new Exception("Error al obtener la venta: " + ex.Message, ex);
                    }
                }
            }

            return ventas;
        }


        public string MantenimientoVenta(
        ref string ventaId,
        DateTime? ventaFecha,
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

        public string ModificarTotalVenta(Venta venta)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("SP_MODIFICAR_TOTAL_VENTA", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@VENTA_ID", venta.ventaId);
                    command.Parameters.AddWithValue("@VENTA_TOTAL", venta.ventaTotal);

                    try
                    {
                        connection.Open();
                        command.ExecuteNonQuery();
                        return "Venta actualizada exitosamente";
                    }
                    catch (SqlException ex)
                    {
                        throw new Exception("Error al modificar la venta: " + ex.Message);
                    }
                }
            }
        }

    }
}