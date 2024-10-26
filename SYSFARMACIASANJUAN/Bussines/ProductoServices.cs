using Microsoft.Ajax.Utilities;
using SYSFARMACIASANJUAN.DataAccess;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Bussines
{
    public class ProductoServices
    {
        private ProductoDataAccess productoDataAccess = new ProductoDataAccess();

        public List<Producto> ObtenerListarProductosPorFiltro(string id = null, string nombre = null, DateTime? fechaCreacion = null, string estado = null)
        {
            // Obtén la lista completa de productos que coinciden con el ID, nombre, fecha de creación y estado
            var productos = productoDataAccess.ListarProductosPorFiltro(id, nombre, fechaCreacion, estado);

            // Devuelve la lista de productos (puede estar vacía si no se encontraron coincidencias)
            return productos;
        }

        //public List<Producto> ObtenerListarProductosPorFiltro(string id = null, string nombre = null, DateTime? fechaCreacion = null)
        //{
        //    // Obtén la lista completa de productos que coinciden con el ID, nombre y fecha de creación
        //    var productos = productoDataAccess.ListarProductosPorFiltro(id, nombre, fechaCreacion);

        //    // Devuelve la lista de productos (puede estar vacía si no se encontraron coincidencias)
        //    return productos;
        //}

        //public Producto ObtenerUnProductoPorId(string id)
        //{
        //    var productos = productoDataAccess.ListarProductoPorId(id);
        //    return productos.FirstOrDefault(); // Devuelve el primer empleado o null si no hay resultados
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
        //        // Validaciones adicionales de negocio
        //        if (string.IsNullOrWhiteSpace(productoId) && accion != "1")
        //        {
        //            throw new ArgumentException("El ID del producto es obligatorio para modificar, eliminar o cambiar el estado de un registro.");
        //        }

        //        if (nombre.Length > 100)
        //        {
        //            throw new ArgumentException("El nombre del producto no debe exceder los 100 caracteres.");
        //        }

        //        if (!IsValidAccion(accion))
        //        {
        //            throw new ArgumentException("La acción especificada no es válida. Use '1' (insertar), '2' (modificar), '3' (eliminar) o '4' (modificar estado).");
        //        }

        //        // Llamada a la capa de datos para ejecutar el procedimiento almacenado
        //        return productoDataAccess.MantenimientoProducto(
        //            productoId,
        //            nombre,
        //            descripcion,
        //            fechaCreacion,
        //            formaFarmaceutica,
        //            viaAdministracion,
        //            casaMedica,
        //            imagen,
        //            estado,
        //            subcategoriaId,
        //            accion
        //        );
        //    }

        //    // Método auxiliar para validar la acción
        //    private bool IsValidAccion(string accion)
        //    {
        //        return accion == "1" || accion == "2" || accion == "3" || accion == "4";
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
            // Validaciones adicionales de negocio
            if (string.IsNullOrWhiteSpace(productoId) && accion != "1")
            {
                throw new ArgumentException("El ID del producto es obligatorio para modificar o eliminar un registro.");
            }

            if (nombre.Length > 100)
            {
                throw new ArgumentException("El nombre del producto no debe exceder los 100 caracteres.");
            }

            if (!IsValidAccion(accion))
            {
                throw new ArgumentException("La acción especificada no es válida. Use '1' (insertar), '2' (modificar) o '3' (eliminar).");
            }

            //if (accion == "2" && imagen.Length <= 0)
            //{
            //    //Console.WriteLine(imagen);
            //    Console.WriteLine("Hola Mundo");
            //}

            // Llamada a la capa de datos para ejecutar el procedimiento almacenado
            return productoDataAccess.MantenimientoProducto(
                productoId,
                nombre,
                descripcion,
                fechaCreacion,
                formaFarmaceutica,
                viaAdministracion,
                casaMedica,
                imagen,
                estado,
                subcategoriaId,
                accion
            );
        }

        // Método auxiliar para validar la acción
        private bool IsValidAccion(string accion)
        {
            return accion == "1" || accion == "2" || accion == "3";
        }

        public bool ModificarEstadoProducto(string productoId, string nuevoEstado)
        {
            return productoDataAccess.ModificarEstadoProducto(productoId, nuevoEstado);
        }

    }
}