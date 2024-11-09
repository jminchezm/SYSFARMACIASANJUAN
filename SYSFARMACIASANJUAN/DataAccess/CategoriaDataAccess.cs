using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using Antlr.Runtime.Misc;
using System.Text;
using System.IO;
using System.Drawing.Imaging;

namespace SYSFARMACIASANJUAN.DataAccess
{
    public class CategoriaDataAccess
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

        public void MantenimientoAgregarCategoria(Categoria categoria)
        {
            //int edad = edadEmpleado((DateTime)empleado.fechaNacimientoEmpleado);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                //String accion = "";
                SqlCommand command = new SqlCommand("SP_MANTENIMIENTO_SUBCATEGORIAPRODUCTO", connection);
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@SUBCATEGORIAPRODUCTO_ID", 1);
                command.Parameters.AddWithValue("@SUBCATEGORIAPRODUCTO_NOMBRE", categoria.nombresubcategoria);
                command.Parameters.AddWithValue("@SUBCATEGORIAPRODUCTO_DESCRIPCION",categoria.descsubCategoria);
                command.Parameters.AddWithValue("@CATEGORIAPRODUCTO_ID", categoria.idCategoria);
                //command.Parameters.AddWithValue("@EMPLEADO_FOTO", SqlDbType.VarBinary).Value = (object)empleado.foto ?? DBNull.Value;
                command.Parameters.AddWithValue("@ACCION", 1);

                try
                {
                    if (connection.State == ConnectionState.Open) connection.Close();
                    connection.Open();
                    command.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    // Manejar el error
                    throw new Exception("Error al agregar Sub Categoria: " + ex.Message);
                }
            }
        }

        public List<Categoria> LiscarCategoria()
        {
            List<Categoria> categorias = new List<Categoria>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("SP_LISTAR_SUBCATEGORIAS_PRODUCTO", connection);
                command.CommandType = CommandType.StoredProcedure;

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Categoria categoria = new Categoria
                        {
                            idsubCategoria = reader["SUBCATEGORIAPRODUCTO_ID"].ToString(),
                            nombresubcategoria = reader["SUBCATEGORIAPRODUCTO_NOMBRE"].ToString(),
                            descsubCategoria = reader["SUBCATEGORIAPRODUCTO_DESCRIPCION"].ToString(),
                            idCategoria = reader["CATEGORIAPRODUCTO_NOMBRE"].ToString(),
                        };

                        categorias.Add(categoria);
                    }
                }
                catch (Exception ex)
                {
                    // Manejar el error
                    throw new Exception("Error al obtener Categoria: " + ex.Message);
                }
            }

            return categorias;
        }

        public List<Categoria> ListarCategoriaPorId(string id)
        {
            List<Categoria> categorias = new List<Categoria>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("SP_BUSCAR_SUBCATEGORIA_POR_ID", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@SUBCATEGORIAPRODUCTO_ID", id);

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Categoria categoria = new Categoria
                        {
                            idsubCategoria = reader["SUBCATEGORIAPRODUCTO_ID"] != DBNull.Value ? reader["SUBCATEGORIAPRODUCTO_ID"].ToString() : string.Empty,
                            nombresubcategoria = reader["SUBCATEGORIAPRODUCTO_NOMBRE"] != DBNull.Value ? reader["SUBCATEGORIAPRODUCTO_NOMBRE"].ToString() : string.Empty,
                            descsubCategoria = reader["SUBCATEGORIAPRODUCTO_DESCRIPCION"] != DBNull.Value ? reader["SUBCATEGORIAPRODUCTO_DESCRIPCION"].ToString() : string.Empty,
                            idCategoria = reader["CATEGORIAPRODUCTO_NOMBRE"] != DBNull.Value ? reader["CATEGORIAPRODUCTO_NOMBRE"].ToString() : string.Empty,
                           
                        };
                        categorias.Add(categoria);
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception("Error al obtener Categoria: " + ex.Message);
                }
            }

            return categorias;
        }
        public void ModificarCategoria(Categoria categoria)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                // Crear el comando para el procedimiento almacenado
                SqlCommand command = new SqlCommand("SP_MODIFICAR_DATOS_SUBCATEGORIA", connection);
                command.CommandType = CommandType.StoredProcedure;

                // Agregar los parámetros requeridos por el procedimiento almacenado
                command.Parameters.AddWithValue("SUBCATEGORIAPRODUCTO_ID", categoria.idsubCategoria);
                command.Parameters.AddWithValue("@SUBCATEGORIAPRODUCTO_NOMBRE", categoria.nombresubcategoria);
                command.Parameters.AddWithValue("@SUBCATEGORIAPRODUCTO_DESCRIPCION", categoria.descsubCategoria);// ?? (object)DBNull.Value); // Permitir valores nulos
                command.Parameters.AddWithValue("@CATEGORIAPRODUCTO_ID", categoria.idCategoria);

                try
                {
                    // Abrir conexión y ejecutar el procedimiento almacenado
                    connection.Open();
                    command.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    // Capturar detalles del error y lanzar la excepción
                    throw new Exception("Error al modificar categoria: " + ex.Message);
                }
            }
        }

    }
}