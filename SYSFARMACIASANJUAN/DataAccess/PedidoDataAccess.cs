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
    public class PedidoDataAccess
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

        public List<Pedido> ListarPedidosPorFiltro(string pedidoId = null, DateTime? fechaCreacionPedido = null, string pedidoEstado = null, string pedidoProveedorId = null)
        {
            List<Pedido> pedidos = new List<Pedido>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("SP_OBTENERPEDIDOS", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Agregar el parámetro del ID del pedido, validando si es null o vacío
                    command.Parameters.AddWithValue("@PedidoID", string.IsNullOrEmpty(pedidoId) ? (object)DBNull.Value : pedidoId);

                    // Agregar el parámetro de la fecha de creación del pedido
                    command.Parameters.AddWithValue("@FechaPedido", fechaCreacionPedido.HasValue ? (object)fechaCreacionPedido.Value : DBNull.Value);

                    // Agregar el parámetro del estado del pedido, validando si es null o vacío
                    command.Parameters.AddWithValue("@EstadoPedido", string.IsNullOrEmpty(pedidoEstado) ? (object)DBNull.Value : pedidoEstado);

                    // Agregar el parámetro del proveedor del pedido, validando si es null o vacío
                    command.Parameters.AddWithValue("@ProveedorID", string.IsNullOrEmpty(pedidoProveedorId) ? (object)DBNull.Value : pedidoProveedorId);

                    try
                    {
                        connection.Open();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Pedido pedido = new Pedido
                                {
                                    pedidoId = reader["PEDIDO_ID"].ToString(),
                                    pedidoFechaCreacion = (DateTime)(reader.IsDBNull(reader.GetOrdinal("FECHA_PEDIDO"))
                                                            ? (DateTime?)null
                                                            : reader.GetDateTime(reader.GetOrdinal("FECHA_PEDIDO"))),
                                    pedidoEstado = reader["ESTADO_PEDIDO"].ToString(),
                                    pedidoFechaEntregaEstimada = (DateTime)(reader.IsDBNull(reader.GetOrdinal("FECHA_ENTREGA_ESTIMADA"))
                                                            ? (DateTime?)null
                                                            : reader.GetDateTime(reader.GetOrdinal("FECHA_ENTREGA_ESTIMADA"))),
                                    pedidoObservacion = reader["OBSERVACIONES"].ToString(),
                                    pedidoProveedorId = reader["PROVEEDOR_ID"].ToString(),
                                    pedidoProveedorNombre = reader["PROVEEDOR_NOMBRE"].ToString()
                                };

                                pedidos.Add(pedido);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        // Manejar el error
                        throw new Exception("Error al obtener el pedido: " + ex.Message, ex);
                    }
                }
            }

            return pedidos;
        }

        public string MantenimientoPedido(
        ref string pedidoId,
        DateTime ? fechaCreacion,
        string estado,
        DateTime ? fechaEntregaEstimada,
        string observacion,
        string proveedorId,
        string accion)
        {
            if (accion != "1" && accion != "2" && accion != "3")
            {
                throw new ArgumentException("La acción debe ser '1' (insertar), '2' (modificar) o '3' (eliminar).");
            }

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("SP_MANTENIMIENTO_PEDIDO", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Configura el parámetro @PEDIDO_ID como OUTPUT
                    var pedidoIdParam = command.Parameters.Add("@PEDIDO_ID", SqlDbType.VarChar, 10);
                    pedidoIdParam.Direction = ParameterDirection.InputOutput;
                    pedidoIdParam.Value = string.IsNullOrEmpty(pedidoId) ? (object)DBNull.Value : pedidoId;

                    command.Parameters.AddWithValue("@FECHA_PEDIDO", fechaCreacion);
                    command.Parameters.AddWithValue("@ESTADO_PEDIDO", estado ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@FECHA_ENTREGA_ESTIMADA", fechaEntregaEstimada);
                    command.Parameters.AddWithValue("@OBSERVACIONES", observacion);
                    command.Parameters.AddWithValue("@PROVEEDOR_ID", proveedorId);

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
                            pedidoId = pedidoIdParam.Value.ToString();
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


        //public string MantenimientoPedido(
        //string pedidoId,
        //DateTime fechaCreacion,
        //string estado,
        //DateTime fechaEntregaEstimada,
        //string observacion,
        //string proveedorId,
        //string accion)
        //{

        //    if (accion != "1" && accion != "2" && accion != "3")
        //    {
        //        throw new ArgumentException("La acción debe ser '1' (insertar), '2' (modificar) o '3' (eliminar).");
        //    }

        //    using (SqlConnection connection = new SqlConnection(connectionString))
        //    {

        //        // Procedimiento almacenado para insertar, modificar o eliminar
        //        using (SqlCommand command = new SqlCommand("SP_MANTENIMIENTO_PEDIDO", connection))
        //        {
        //            command.CommandType = CommandType.StoredProcedure;

        //            // Parámetros del procedimiento almacenado
        //            command.Parameters.AddWithValue("@PEDIDO_ID", pedidoId);
        //            command.Parameters.AddWithValue("@FECHA_PEDIDO", fechaCreacion);
        //            command.Parameters.AddWithValue("@ESTADO_PEDIDO", estado ?? (object)DBNull.Value);
        //            command.Parameters.AddWithValue("@FECHA_ENTREGA_ESTIMADA", fechaEntregaEstimada);
        //            command.Parameters.AddWithValue("@OBSERVACIONES", observacion);
        //            command.Parameters.AddWithValue("@PROVEEDOR_ID", proveedorId);
        //            command.Parameters.Add("@ACCION", SqlDbType.VarChar, 50).Value = accion;
        //            command.Parameters["@ACCION"].Direction = ParameterDirection.InputOutput;

        //            // Conexión y ejecución del comando
        //            try
        //            {
        //                connection.Open();
        //                command.ExecuteNonQuery();

        //                // Retorna el resultado de la operación
        //                return command.Parameters["@ACCION"].Value.ToString();
        //            }
        //            catch (SqlException ex)
        //            {
        //                throw new Exception("Error al realizar la operación en la base de datos: " + ex.Message);
        //            }
        //            finally
        //            {
        //                // Asegura el cierre de la conexión
        //                if (connection.State == ConnectionState.Open)
        //                {
        //                    connection.Close();
        //                }
        //            }
        //        }
        //    }
        //}
    }
}