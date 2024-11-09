using Microsoft.IdentityModel.Tokens;
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
    public class InventarioProductoDataAccess
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

        public List<InventarioProducto> ListarInventarioProductoPorFiltro(string inventarioId = null, string inventarioProductoId = null, string inventarioProductoNombre = null, int inventarioStock = 0, decimal inventarioPrecioUnitario = 0)
        {
            List<InventarioProducto> inventarioProductos = new List<InventarioProducto>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("SP_OBTENERINVENTARIO_PRODUCTO", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Agregar el parámetro del ID del producto, validando si es null o vacío
                    command.Parameters.AddWithValue("@InventarioID", string.IsNullOrEmpty(inventarioId) ? (object)DBNull.Value : inventarioId);

                    // Agregar el parámetro del nombre del producto
                    command.Parameters.AddWithValue("@ProductoID", string.IsNullOrEmpty(inventarioProductoId) ? (object)DBNull.Value : inventarioProductoId);

                    command.Parameters.AddWithValue("@NombreProducto", string.IsNullOrEmpty(inventarioProductoNombre) ? (object)DBNull.Value : inventarioProductoNombre);

                    command.Parameters.AddWithValue("@StockActual", inventarioStock > 0 ? (object)inventarioStock : DBNull.Value);
                    
                    command.Parameters.AddWithValue("@PrecioUnitario", inventarioPrecioUnitario > 0 ? (object)inventarioPrecioUnitario : DBNull.Value);


                    try
                    {
                        connection.Open();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                InventarioProducto inventarioProducto = new InventarioProducto
                                {
                                    inventarioProductoId = reader["INVENTARIO_ID"].ToString(),
                                    inventarioProductoProductoId = reader["PRODUCTO_ID"].ToString(),
                                    inventarioProductoNombreProducto = reader["PRODUCTO_NOMBRE"].ToString(),
                                    inventarioProductoImgProducto = reader["PRODUCTO_IMG"].ToString(),
                                    inventarioProductoStock = (int) reader["STOCK_ACTUAL"],
                                    inventarioProductoPrecioUnitario = (decimal) reader["PRECIO_UNITARIO"]
                                };

                                inventarioProductos.Add(inventarioProducto);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        // Manejar el error
                        throw new Exception("Error al obtener los productos del inventario: " + ex.Message, ex);
                    }
                }
            }

            return inventarioProductos;
        }

        public string MantenimientoInventarioProducto(
        string inventarioProductoId,
        string inventarioProductoProductoId,
        int inventarioProductoStock,
        decimal inventarioProductoPrecioUnitario,
        string accion)
        {

            if (accion != "1" && accion != "2" && accion != "3")
            {
                throw new ArgumentException("La acción debe ser '1' (insertar), '2' (modificar) o '3' (eliminar)");
            }

            using (SqlConnection connection = new SqlConnection(connectionString))
            {

                // Procedimiento almacenado para insertar, modificar o eliminar
                using (SqlCommand command = new SqlCommand("SP_MANTENIMIENTO_INVENTARIO", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parámetros del procedimiento almacenado
                    command.Parameters.AddWithValue("@INVENTARIO_ID", inventarioProductoId);
                    command.Parameters.AddWithValue("@PRODUCTO_ID", inventarioProductoProductoId);
                    command.Parameters.AddWithValue("@STOCK_ACTUAL", inventarioProductoStock); //?? (object)DBNull.Value
                    command.Parameters.AddWithValue("@PRECIO_UNITARIO", inventarioProductoPrecioUnitario);
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