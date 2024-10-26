using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Configuration;

namespace SYSFARMACIASANJUAN.DataAccess
{
    public class ProductoDataAccess
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

        public List<Producto> ListarProductosPorFiltro(string id = null, string nombre = null, DateTime? fechaCreacion = null, string estado = null)
        {
            List<Producto> productos = new List<Producto>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("SP_OBTENERPRODUCTOS", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Agregar el parámetro del ID del producto, validando si es null o vacío
                    command.Parameters.AddWithValue("@ProductoID", string.IsNullOrEmpty(id) ? (object)DBNull.Value : id);

                    // Agregar el parámetro del nombre del producto
                    command.Parameters.AddWithValue("@NombreProducto", string.IsNullOrEmpty(nombre) ? (object)DBNull.Value : nombre);

                    // Agregar el parámetro de la fecha de creación
                    command.Parameters.AddWithValue("@FechaCreacion", fechaCreacion.HasValue ? (object)fechaCreacion.Value : DBNull.Value);

                    // Agregar el parámetro del estado del producto, validando si es null o vacío
                    command.Parameters.AddWithValue("@EstadoProducto", string.IsNullOrEmpty(estado) ? (object)DBNull.Value : estado);

                    try
                    {
                        connection.Open();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Producto producto = new Producto
                                {
                                    productoID = reader["PRODUCTO_ID"].ToString(),
                                    productoNombre = reader["PRODUCTO_NOMBRE"].ToString(),
                                    productoDescripcion = reader["PRODUCTO_DESCRIPCION"].ToString(),
                                    productoFechaCreacion = (DateTime)(reader.IsDBNull(reader.GetOrdinal("PRODUCTO_FECHACREACION"))
                                                            ? (DateTime?)null
                                                            : reader.GetDateTime(reader.GetOrdinal("PRODUCTO_FECHACREACION"))),
                                    productoFormaFarmaceutica = reader["PRODUCTO_FORMAFARMACEUTICA"].ToString(),
                                    productoViaAdministracion = reader["PRODUCTO_VIAADMINISTRACION"].ToString(),
                                    productoCasaMedica = reader["PRODUCTO_CASAMEDICA"].ToString(),
                                    productoImg = reader["PRODUCTO_IMG"].ToString(),
                                    productoEstado = reader["PRODUCTO_ESTADO"].ToString(),
                                    productoSubCategoria = reader["SUBCATEGORIAPRODUCTO_NOMBRE"].ToString()
                                };

                                productos.Add(producto);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        // Manejar el error
                        throw new Exception("Error al obtener productos: " + ex.Message, ex);
                    }
                }
            }

            return productos;
        }


        //public List<Producto> ListarProductosPorFiltro(string id = null, string nombre = null, DateTime? fechaCreacion = null)
        //{
        //    List<Producto> productos = new List<Producto>();

        //    using (SqlConnection connection = new SqlConnection(connectionString))
        //    {
        //        using (SqlCommand command = new SqlCommand("SP_OBTENERPRODUCTOS", connection))
        //        {
        //            command.CommandType = CommandType.StoredProcedure;

        //            // Agregar el parámetro del ID del producto, validando si es null o vacío
        //            if (string.IsNullOrEmpty(id))
        //            {
        //                command.Parameters.AddWithValue("@ProductoID", DBNull.Value);
        //            }
        //            else
        //            {
        //                command.Parameters.AddWithValue("@ProductoID", id);
        //            }

        //            // Agregar el parámetro del nombre
        //            command.Parameters.AddWithValue("@NombreProducto", string.IsNullOrEmpty(nombre) ? (object)DBNull.Value : nombre);

        //            // Agregar el parámetro de la fecha de creación
        //            command.Parameters.AddWithValue("@FechaCreacion", fechaCreacion.HasValue ? (object)fechaCreacion.Value : DBNull.Value);

        //            try
        //            {
        //                connection.Open();
        //                using (SqlDataReader reader = command.ExecuteReader())
        //                {
        //                    while (reader.Read())
        //                    {
        //                        Producto producto = new Producto
        //                        {
        //                            productoID = reader["PRODUCTO_ID"].ToString(),
        //                            productoNombre = reader["PRODUCTO_NOMBRE"].ToString(),
        //                            productoDescripcion = reader["PRODUCTO_DESCRIPCION"].ToString(),
        //                            productoFechaCreacion = (DateTime)(reader.IsDBNull(reader.GetOrdinal("PRODUCTO_FECHACREACION"))
        //                                                    ? (DateTime?)null
        //                                                    : reader.GetDateTime(reader.GetOrdinal("PRODUCTO_FECHACREACION"))),
        //                            productoFormaFarmaceutica = reader["PRODUCTO_FORMAFARMACEUTICA"].ToString(),
        //                            productoViaAdministracion = reader["PRODUCTO_VIAADMINISTRACION"].ToString(),
        //                            productoCasaMedica = reader["PRODUCTO_CASAMEDICA"].ToString(),
        //                            productoImg = reader["PRODUCTO_IMG"].ToString(),
        //                            productoEstado = reader["PRODUCTO_ESTADO"].ToString(),
        //                            productoSubCategoria = reader["SUBCATEGORIAPRODUCTO_NOMBRE"].ToString()
        //                        };

        //                        productos.Add(producto);
        //                    }
        //                }
        //            }
        //            catch (Exception ex)
        //            {
        //                // Manejar el error: aquí puedes registrar el error o lanzar una excepción personalizada
        //                throw new Exception("Error al obtener productos: " + ex.Message, ex);
        //            }
        //        }
        //    }

        //    return productos;
        //}

        //public List<Producto> ListarProductoPorId(string id)
        //{
        //    List<Producto> productos = new List<Producto>();

        //    using (SqlConnection connection = new SqlConnection(connectionString))
        //    {
        //        SqlCommand command = new SqlCommand("SP_OBTENERPRODUCTOS", connection);
        //        command.CommandType = CommandType.StoredProcedure;

        //        // Agregar el parámetro del ID del empleado
        //        command.Parameters.AddWithValue("@ProductoID", id);
        //        //command.Parameters.AddWithValue("@EMPLEADO_ESTADO", estado);

        //        // Agregar el parámetro del estado si no es null, de lo contrario enviar DBNull
        //        //if (string.IsNullOrEmpty(estado))
        //        //{
        //        //    command.Parameters.AddWithValue("@EMPLEADO_ESTADO", DBNull.Value);  // Si no se envía el estado
        //        //}
        //        //else
        //        //{
        //        //    command.Parameters.AddWithValue("@EMPLEADO_ESTADO", estado);  // Enviar el estado si está presente
        //        //}

        //        try
        //        {
        //            connection.Open();
        //            SqlDataReader reader = command.ExecuteReader();

        //            while (reader.Read())
        //            {
        //                Producto producto = new Producto
        //                {
        //                    productoID = reader["PRODUCTO_ID"].ToString(),
        //                    productoNombre = reader["PRODUCTO_NOMBRE"].ToString(),
        //                    productoDescripcion = reader["PRODUCTO_DESCRIPCION"].ToString(),
        //                    productoFechaCreacion = Convert.ToDateTime(reader["PRODUCTO_FECHACREACION"].ToString()),
        //                    productoFormaFarmaceutica = reader["PRODUCTO_FORMAFARMACEUTICA"].ToString(),
        //                    productoViaAdministracion = reader["PRODUCTO_VIAADMINISTRACION"].ToString(),
        //                    productoCasaMedica = reader["PRODUCTO_CASAMEDICA"].ToString(),
        //                    productoImg = reader["PRODUCTO_IMG"].ToString(),
        //                    productoSubCategoria = reader["SUBCATEGORIAPRODUCTO_NOMBRE"].ToString()
        //                };

        //                productos.Add(producto);
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            // Manejar el error
        //            throw new Exception("Error al obtener empleados: " + ex.Message);
        //        }
        //    }

        //    return productos;
        //}

        //    public string MantenimientoProducto(
        //string productoId,
        //string nombre,
        //string descripcion,
        //DateTime fechaCreacion,
        //string formaFarmaceutica,
        //string viaAdministracion,
        //string casaMedica,
        //string imagen,
        //string estado,
        //string subcategoriaId,
        //string accion)
        //    {
        //        // Validaciones de entrada para la acción de insertar (1), modificar (2) y eliminar (3)
        //        if (accion != "1" && accion != "2" && accion != "3" && accion != "4")
        //        {
        //            throw new ArgumentException("La acción debe ser '1' (insertar), '2' (modificar), '3' (eliminar), o '4' (modificar solo estado).");
        //        }

        //        // Si la acción es modificar solo el estado ('4')
        //        if (accion == "4")
        //        {
        //            if (string.IsNullOrWhiteSpace(productoId))
        //            {
        //                throw new ArgumentException("El ID del producto es obligatorio para cambiar el estado.");
        //            }

        //            if (string.IsNullOrWhiteSpace(estado))
        //            {
        //                throw new ArgumentException("El estado del producto es obligatorio.");
        //            }
        //        }
        //        else
        //        {
        //            // Validaciones de entrada para las demás acciones
        //            if (string.IsNullOrWhiteSpace(nombre))
        //            {
        //                throw new ArgumentException("El nombre del producto es obligatorio.");
        //            }

        //            if (fechaCreacion == default(DateTime))
        //            {
        //                throw new ArgumentException("La fecha de creación del producto es obligatoria.");
        //            }

        //            if (string.IsNullOrWhiteSpace(subcategoriaId))
        //            {
        //                throw new ArgumentException("La subcategoría del producto es obligatoria.");
        //            }
        //        }

        //        using (SqlConnection connection = new SqlConnection(connectionString))
        //        {
        //            // Si la acción es modificar ('2') y no se proporciona una nueva imagen, consulta la actual de la base de datos
        //            if (accion == "2" && string.IsNullOrWhiteSpace(imagen))
        //            {
        //                string query = "SELECT PRODUCTO_IMG FROM PRODUCTO WHERE PRODUCTO_ID = @PRODUCTO_ID";

        //                using (SqlCommand selectCommand = new SqlCommand(query, connection))
        //                {
        //                    selectCommand.Parameters.AddWithValue("@PRODUCTO_ID", productoId);

        //                    try
        //                    {
        //                        connection.Open();
        //                        var result = selectCommand.ExecuteScalar();

        //                        if (result != null)
        //                        {
        //                            imagen = result.ToString(); // Asigna el valor de la imagen actual
        //                        }
        //                    }
        //                    catch (SqlException ex)
        //                    {
        //                        throw new Exception("Error al consultar la imagen actual: " + ex.Message);
        //                    }
        //                    finally
        //                    {
        //                        connection.Close();
        //                    }
        //                }
        //            }

        //            // Procedimiento almacenado para insertar, modificar, eliminar o cambiar estado
        //            using (SqlCommand command = new SqlCommand("SP_MANTENIMIENTO_PRODUCTO", connection))
        //            {
        //                command.CommandType = CommandType.StoredProcedure;

        //                // Parámetros del procedimiento almacenado
        //                command.Parameters.AddWithValue("@PRODUCTO_ID", productoId ?? (object)DBNull.Value);
        //                command.Parameters.AddWithValue("@PRODUCTO_NOMBRE", nombre ?? (object)DBNull.Value);
        //                command.Parameters.AddWithValue("@PRODUCTO_DESCRIPCION", descripcion ?? (object)DBNull.Value);
        //                command.Parameters.AddWithValue("@PRODUCTO_FECHACREACION", fechaCreacion != default(DateTime) ? (object)fechaCreacion : DBNull.Value);
        //                command.Parameters.AddWithValue("@PRODUCTO_FORMAFARMACEUTICA", formaFarmaceutica ?? (object)DBNull.Value);
        //                command.Parameters.AddWithValue("@PRODUCTO_VIAADMINISTRACION", viaAdministracion ?? (object)DBNull.Value);
        //                command.Parameters.AddWithValue("@PRODUCTO_CASAMEDICA", casaMedica ?? (object)DBNull.Value);
        //                command.Parameters.AddWithValue("@PRODUCTO_IMG", imagen ?? (object)DBNull.Value);
        //                command.Parameters.AddWithValue("@PRODUCTO_ESTADO", estado ?? (object)DBNull.Value);
        //                command.Parameters.AddWithValue("@SUBCATEGORIAPRODUCTO_ID", subcategoriaId ?? (object)DBNull.Value);
        //                command.Parameters.Add("@ACCION", SqlDbType.VarChar, 50).Value = accion;
        //                command.Parameters["@ACCION"].Direction = ParameterDirection.InputOutput;

        //                // Conexión y ejecución del comando
        //                try
        //                {
        //                    connection.Open();
        //                    command.ExecuteNonQuery();

        //                    // Retorna el resultado de la operación
        //                    return command.Parameters["@ACCION"].Value.ToString();
        //                }
        //                catch (SqlException ex)
        //                {
        //                    throw new Exception("Error al realizar la operación en la base de datos: " + ex.Message);
        //                }
        //                finally
        //                {
        //                    // Asegura el cierre de la conexión
        //                    if (connection.State == ConnectionState.Open)
        //                    {
        //                        connection.Close();
        //                    }
        //                }
        //            }
        //        }
        //    }



        public string MantenimientoProducto(
        string productoId,
        string nombre,
        string descripcion,
        DateTime fechaCreacion,
        string formaFarmaceutica,
        string viaAdministracion,
        string casaMedica,
        string imagen,
        string estado,
        string subcategoriaId,
        string accion)
        {
            // Validaciones de entrada
            if (string.IsNullOrWhiteSpace(nombre))
            {
                throw new ArgumentException("El nombre del producto es obligatorio.");
            }

            if (fechaCreacion == default(DateTime))
            {
                throw new ArgumentException("La fecha de creación del producto es obligatoria.");
            }

            if (string.IsNullOrWhiteSpace(subcategoriaId))
            {
                throw new ArgumentException("La subcategoría del producto es obligatoria.");
            }

            if (accion != "1" && accion != "2" && accion != "3")
            {
                throw new ArgumentException("La acción debe ser '1' (insertar), '2' (modificar) o '3' (eliminar).");
            }

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                // Verifica si la acción es modificar (accion = "2")
                if (accion == "2" && string.IsNullOrWhiteSpace(imagen))
                {
                    // Consulta la imagen actual almacenada en la base de datos si no se proporciona una nueva
                    string query = "SELECT PRODUCTO_IMG FROM PRODUCTO WHERE PRODUCTO_ID = @PRODUCTO_ID";

                    using (SqlCommand selectCommand = new SqlCommand(query, connection))
                    {
                        selectCommand.Parameters.AddWithValue("@PRODUCTO_ID", productoId);

                        try
                        {
                            connection.Open();
                            var result = selectCommand.ExecuteScalar();

                            if (result != null)
                            {
                                imagen = result.ToString(); // Asigna el valor de la imagen actual
                            }
                        }
                        catch (SqlException ex)
                        {
                            throw new Exception("Error al consultar la imagen actual: " + ex.Message);
                        }
                        finally
                        {
                            connection.Close();
                        }
                    }
                }

                // Procedimiento almacenado para insertar, modificar o eliminar
                using (SqlCommand command = new SqlCommand("SP_MANTENIMIENTO_PRODUCTO", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Parámetros del procedimiento almacenado
                    command.Parameters.AddWithValue("@PRODUCTO_ID", productoId);
                    command.Parameters.AddWithValue("@PRODUCTO_NOMBRE", nombre);
                    command.Parameters.AddWithValue("@PRODUCTO_DESCRIPCION", descripcion ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@PRODUCTO_FECHACREACION", fechaCreacion);
                    command.Parameters.AddWithValue("@PRODUCTO_FORMAFARMACEUTICA", formaFarmaceutica);
                    command.Parameters.AddWithValue("@PRODUCTO_VIAADMINISTRACION", viaAdministracion);
                    command.Parameters.AddWithValue("@PRODUCTO_CASAMEDICA", casaMedica ?? (object)DBNull.Value);

                    // Usa la imagen actual o la nueva proporcionada
                    command.Parameters.AddWithValue("@PRODUCTO_IMG", imagen ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@PRODUCTO_ESTADO", estado ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@SUBCATEGORIAPRODUCTO_ID", subcategoriaId);
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

        public bool ModificarEstadoProducto(string productoId, string nuevoEstado)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("SP_MODIFICAR_ESTADO_PRODUCTO", connection);
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@PRODUCTO_ID", productoId);
                command.Parameters.AddWithValue("@PRODUCTO_ESTADO", nuevoEstado);

                connection.Open();
                int result = command.ExecuteNonQuery();
                return result > 0; // Devuelve true si se actualizó al menos un registro
            }
        }

        //public string MantenimientoProducto(
        //string productoId,
        //string nombre,
        //string descripcion,
        //DateTime fechaCreacion,
        //string formaFarmaceutica,
        //string viaAdministracion,
        //string casaMedica,
        //string imagen,
        //string subcategoriaId,
        //string accion)
        //{
        //    // Validaciones de entrada
        //    if (string.IsNullOrWhiteSpace(nombre))
        //    {
        //        throw new ArgumentException("El nombre del producto es obligatorio.");
        //    }

        //    if (fechaCreacion == default(DateTime))
        //    {
        //        throw new ArgumentException("La fecha de creación del producto es obligatoria.");
        //    }

        //    if (string.IsNullOrWhiteSpace(subcategoriaId))
        //    {
        //        throw new ArgumentException("La subcategoría del producto es obligatoria.");
        //    }

        //    if (accion != "1" && accion != "2" && accion != "3")
        //    {
        //        throw new ArgumentException("La acción debe ser '1' (insertar), '2' (modificar) o '3' (eliminar).");
        //    }

        //    using (SqlConnection connection = new SqlConnection(connectionString))
        //    {
        //        using (SqlCommand command = new SqlCommand("SP_MANTENIMIENTO_PRODUCTO", connection))
        //        {
        //            command.CommandType = CommandType.StoredProcedure;

        //            // Parámetros del procedimiento almacenado
        //            command.Parameters.AddWithValue("@PRODUCTO_ID", productoId);
        //            command.Parameters.AddWithValue("@PRODUCTO_NOMBRE", nombre);
        //            command.Parameters.AddWithValue("@PRODUCTO_DESCRIPCION", descripcion ?? (object)DBNull.Value);
        //            command.Parameters.AddWithValue("@PRODUCTO_FECHACREACION", fechaCreacion);
        //            command.Parameters.AddWithValue("@PRODUCTO_FORMAFARMACEUTICA", formaFarmaceutica);
        //            command.Parameters.AddWithValue("@PRODUCTO_VIAADMINISTRACION", viaAdministracion);

        //            command.Parameters.AddWithValue("@PRODUCTO_CASAMEDICA", casaMedica ?? (object)DBNull.Value);
        //            command.Parameters.AddWithValue("@PRODUCTO_IMG", imagen ?? (object)DBNull.Value);
        //            command.Parameters.AddWithValue("@SUBCATEGORIAPRODUCTO_ID", subcategoriaId);
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
        //                // Manejo de errores de SQL
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