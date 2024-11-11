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
    public class DetalleVentaDataAccess
    {

        private string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

        public List<DetalleVenta> ListarDetalleVentaPorFiltro(string detalleVentaId = null, string ventaId = null, string productoId = null)
        {
            List<DetalleVenta> detalleVentas = new List<DetalleVenta>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("SP_OBTENERDETALLEVENTA", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Agregar el parámetro del ID del producto, validando si es null o vacío
                    command.Parameters.AddWithValue("@DetalleVentaID", string.IsNullOrEmpty(detalleVentaId) ? (object)DBNull.Value : detalleVentaId);

                    // Agregar el parámetro del nombre del producto
                    command.Parameters.AddWithValue("@VentaID", string.IsNullOrEmpty(ventaId) ? (object)DBNull.Value : ventaId);

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
                                DetalleVenta detalleVenta = new DetalleVenta
                                {
                                    detalleVentaId = reader["DETALLEVENTA_ID"].ToString(),
                                    ventaId = reader["VENTA_ID"].ToString(),
                                    productoId = reader["PRODUCTO_ID"].ToString(),
                                    productoNombre = reader["PRODUCTO_NOMBRE"].ToString(),
                                    productoImg = reader["PRODUCTO_IMG"].ToString(),
                                    detalleVentaCantidad = (int) reader["DETALLEVENTA_CANTIDADVENDIDA"],
                                    detalleVentaPrecioUnitario = (decimal) reader["DETALLEVENTA_PRECIOUNITARIO"],
                                    detalleSubTotal = (decimal)reader["DETALLEVENTA_SUBTOTAL"]
                                };

                                detalleVentas.Add(detalleVenta);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        // Manejar el error
                        throw new Exception("Error al obtener los productos de la venta: " + ex.Message, ex);
                    }
                }
            }

            return detalleVentas;
        }

        public string MantenimientoDetalleVenta(
        string detalleVentaId,
        string ventaId,
        string productoId,
        int detalleVentaCantidad,
        decimal detalleVentaPrecioUnitario,
        string accion)
        {

            if (accion != "1" && accion != "2" && accion != "3" && accion != "4")
            {
                throw new ArgumentException("La acción debe ser '1' (insertar), '2' (modificar), '3' (eliminar) o '4' (eliminar2).");
            }

            using (SqlConnection connection = new SqlConnection(connectionString))
            {

                // Procedimiento almacenado para insertar, modificar o eliminar
                using (SqlCommand command = new SqlCommand("SP_MANTENIMIENTO_DETALLEVENTA", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parámetros del procedimiento almacenado
                    command.Parameters.AddWithValue("@DETALLEVENTA_ID", detalleVentaId);
                    command.Parameters.AddWithValue("@VENTA_ID", ventaId);
                    command.Parameters.AddWithValue("@PRODUCTO_ID", productoId);
                    command.Parameters.AddWithValue("@DETALLEVENTA_CANTIDADVENDIDA", detalleVentaCantidad);
                    command.Parameters.AddWithValue("@DETALLEVENTA_PRECIOUNITARIO", detalleVentaPrecioUnitario); //?? (object)DBNull.Value
                    
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

        public bool DescontarStockInventario(string ventaId)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("SP_DESCONTAR_STOCK_INVENTARIO", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@VENTA_ID", ventaId);

                    try
                    {
                        connection.Open();
                        command.ExecuteNonQuery();
                        return true;
                    }
                    catch (Exception ex)
                    {
                        // Maneja el error de la base de datos
                        throw new Exception("Error al descontar el stock del inventario", ex);
                    }
                }
            }
        }


        //public bool DescontarStockInventario(string ventaId, List<(int productoId, int cantidadVendida)> productos)
        //{
        //    using (SqlConnection connection = new SqlConnection(connectionString))
        //    {
        //        using (SqlCommand command = new SqlCommand("SP_DESCONTAR_STOCK_INVENTARIO", connection))
        //        {
        //            command.CommandType = CommandType.StoredProcedure;
        //            command.Parameters.AddWithValue("@VENTA_ID", ventaId);

        //            // Crear un parámetro de tipo tabla
        //            var table = new DataTable();
        //            table.Columns.Add("ProductoId", typeof(int));
        //            table.Columns.Add("CantidadVendida", typeof(int));

        //            foreach (var producto in productos)
        //            {
        //                table.Rows.Add(producto.productoId, producto.cantidadVendida);
        //            }

        //            var productosParameter = command.Parameters.AddWithValue("@Productos", table);
        //            productosParameter.SqlDbType = SqlDbType.Structured;
        //            productosParameter.TypeName = "dbo.VentaProducto";

        //            try
        //            {
        //                connection.Open();
        //                command.ExecuteNonQuery();
        //                return true;
        //            }
        //            catch (Exception ex)
        //            {
        //                // Maneja el error de la base de datos
        //                throw new Exception("Error al descontar el stock del inventario", ex);
        //            }
        //        }
        //    }
        //}


        //public bool DescontarStockInventario(string ventaId)
        //{
        //    using (SqlConnection connection = new SqlConnection(connectionString))
        //    {
        //        using (SqlCommand command = new SqlCommand("SP_DESCONTAR_STOCK_INVENTARIO", connection))
        //        {
        //            command.CommandType = CommandType.StoredProcedure;
        //            command.Parameters.AddWithValue("@VENTA_ID", ventaId);

        //            try
        //            {
        //                connection.Open();
        //                command.ExecuteNonQuery();
        //                return true;
        //            }
        //            catch (Exception ex)
        //            {
        //                // Maneja el error de la base de datos
        //                // Podrías registrar el error en un log o lanzar una excepción personalizada
        //                throw new Exception("Error al descontar el stock del inventario", ex);
        //            }
        //        }
        //    }
        //}
    }
}