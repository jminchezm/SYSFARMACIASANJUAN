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
    public class SubCategoriaDataAccess
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["MiConexionDB"].ConnectionString;

        public void MantenimientoAgregarSubCategoria(SubCategoria subcategoria)
        {
            //int edad = edadEmpleado((DateTime)empleado.fechaNacimientoEmpleado);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                //String accion = "";
                SqlCommand command = new SqlCommand("SP_MANTENIMIENTO_CATEGORIAPRODUCTO", connection);
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@CATEGORIAPRODUCTO_ID", 1);
                command.Parameters.AddWithValue("@CATEGORIAPRODUCTO_NOMBRE", subcategoria.nombreCategoria);
                command.Parameters.AddWithValue("@CATEGORIAPRODUCTO_DESCRIPCION", subcategoria.descripCategoria);
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
                    throw new Exception("Error al agregar  Categoria: " + ex.Message);
                }
            }
        }

        public List<SubCategoria> LiscarSubCategoria()
        {
            List<SubCategoria> subcategorias = new List<SubCategoria>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("SP_LISTAR_CATEGORIAS_PRODUCTO", connection);
                command.CommandType = CommandType.StoredProcedure;

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        SubCategoria subcategoria = new SubCategoria
                        {
                            idCategoria = reader["CATEGORIAPRODUCTO_ID"].ToString(),
                            nombreCategoria = reader["CATEGORIAPRODUCTO_NOMBRE"].ToString(),
                            descripCategoria = reader["CATEGORIAPRODUCTO_DESCRIPCION"].ToString(),
                            
                        };

                        subcategorias.Add(subcategoria);
                    }
                }
                catch (Exception ex)
                {
                    // Manejar el error
                    throw new Exception("Error al obtener Categoria: " + ex.Message);
                }
            }

            return subcategorias;
        }

        public List<SubCategoria> ListarSubCategoriaPorId(string id)
        {
            List<SubCategoria> subcategorias = new List<SubCategoria>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("SP_BUSCAR_CATEGORIA_POR_ID", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@CATEGORIAPRODUCTO_ID", id);

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        SubCategoria subcategoria = new SubCategoria
                        {
                            idCategoria = reader["CATEGORIAPRODUCTO_ID"] != DBNull.Value ? reader["CATEGORIAPRODUCTO_ID"].ToString() : string.Empty,
                            nombreCategoria = reader["CATEGORIAPRODUCTO_NOMBRE"] != DBNull.Value ? reader["CATEGORIAPRODUCTO_NOMBRE"].ToString() : string.Empty,
                            descripCategoria = reader["CATEGORIAPRODUCTO_DESCRIPCION"] != DBNull.Value ? reader["CATEGORIAPRODUCTO_DESCRIPCION"].ToString() : string.Empty,
                           

                        };
                        subcategorias.Add(subcategoria);
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception("Error al obtener Categoria: " + ex.Message);
                }
            }

            return subcategorias;
        }


        public void ModificarSubCategoria(SubCategoria subcategoria)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                // Crear el comando para el procedimiento almacenado
                SqlCommand command = new SqlCommand("SP_MODIFICAR_DATOS_CATEGORIA", connection);
                command.CommandType = CommandType.StoredProcedure;

                // Agregar los parámetros requeridos por el procedimiento almacenado
                command.Parameters.AddWithValue("@CATEGORIAPRODUCTO_ID", subcategoria.idCategoria);
                command.Parameters.AddWithValue("@CATEGORIAPRODUCTO_NOMBRE", subcategoria.nombreCategoria);
                command.Parameters.AddWithValue("@CATEGORIAPRODUCTO_DESCRIPCION", subcategoria.descripCategoria);// ?? (object)DBNull.Value); // Permitir valores nulos
                

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