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
    public class DetallePedidoDataAccess
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

        public List<DetallePedido> ListarDetallePedidoPorFiltro(string detallePedidoId = null, string pedidoId = null, string productoId = null)
        {
            List<DetallePedido> detallePedidos = new List<DetallePedido>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("SP_OBTENERDETALLESPEDIDO", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Agregar el parámetro del ID del producto, validando si es null o vacío
                    command.Parameters.AddWithValue("@DetallePedidoID", string.IsNullOrEmpty(detallePedidoId) ? (object)DBNull.Value : detallePedidoId);

                    // Agregar el parámetro del nombre del producto
                    command.Parameters.AddWithValue("@PedidoID", string.IsNullOrEmpty(pedidoId) ? (object)DBNull.Value : pedidoId);

                    // Agregar el parámetro de la fecha de creación
                    //command.Parameters.AddWithValue("@FechaCreacion", fechaCreacion.HasValue ? (object)fechaCreacion.Value : DBNull.Value);

                    // Agregar el parámetro del estado del producto, validando si es null o vacío
                    command.Parameters.AddWithValue("@ProductoID", string.IsNullOrEmpty(productoId) ? (object)DBNull.Value : productoId);

                    try
                    {
                        connection.Open();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                DetallePedido detallePedido = new DetallePedido
                                {
                                    detallePedidoId = reader["DETALLEPEDIDO_ID"].ToString(),
                                    detallePedido_PedidoId = reader["PEDIDO_ID"].ToString(),
                                    detallePedido_ProductoId = reader["PRODUCTO_ID"].ToString(),
                                    detallePedidoProductoNombre = reader["PRODUCTO_NOMBRE"].ToString(),
                                    detallePedidoImg = reader["PRODUCTO_IMG"].ToString(),
                                    detallePedidoCantidad = (int) reader["DETALLEPEDIDO_CANTIDAD"],
                                    detallePedidoPrecioUnitario = (decimal) reader["PRECIO_UNITARIO"],
                                    detallePedidoSubTotal = (decimal) reader["SUBTOTAL"]
                                };

                                detallePedidos.Add(detallePedido);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        // Manejar el error
                        throw new Exception("Error al obtener los productos del pedido: " + ex.Message, ex);
                    }
                }
            }

            return detallePedidos;
        }

        public string MantenimientoDetallePedido(
        string detallePedidoId,
        string detallePedido_PedidoId,
        string detallePedido_ProductoId,
        int detallePedidoCantidad,
        decimal detallePedidoPrecioUnitario,
        decimal detallePedidoSubTotal,
        string accion)
        {

            if (accion != "1" && accion != "2" && accion != "3" && accion != "4")
            {
                throw new ArgumentException("La acción debe ser '1' (insertar), '2' (modificar), '3' (eliminar) o '4' (eliminar2).");
            }

            using (SqlConnection connection = new SqlConnection(connectionString))
            {

                // Procedimiento almacenado para insertar, modificar o eliminar
                using (SqlCommand command = new SqlCommand("SP_MANTENIMIENTO_DETALLEPEDIDO", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parámetros del procedimiento almacenado
                    command.Parameters.AddWithValue("@DETALLEPEDIDO_ID", detallePedidoId);
                    command.Parameters.AddWithValue("@PEDIDO_ID", detallePedido_PedidoId);
                    command.Parameters.AddWithValue("@PRODUCTO_ID", detallePedido_ProductoId); //?? (object)DBNull.Value
                    command.Parameters.AddWithValue("@DETALLEPEDIDO_CANTIDAD", detallePedidoCantidad);
                    command.Parameters.AddWithValue("@PRECIO_UNITARIO", detallePedidoPrecioUnitario);
                    //command.Parameters.AddWithValue("@SUBTOTAL", detallePedidoSubTotal);
                    command.Parameters.Add("@ACCION", SqlDbType.VarChar, 50).Value = accion;
                    command.Parameters["@ACCION"].Direction = ParameterDirection.InputOutput;

                    // Conexión y ejecución del comando
                    try
                    {
                        connection.Open();
                        command.ExecuteNonQuery();

                        // Retorna el resultado de la operación
                        return command.Parameters["@ACCION"].Value.ToString();
                    }
                    catch (SqlException ex)
                    {
                        throw new Exception("Error al realizar la operación en la base de datos: " + ex.Message);
                    }
                    finally
                    {
                        // Asegura el cierre de la conexión
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