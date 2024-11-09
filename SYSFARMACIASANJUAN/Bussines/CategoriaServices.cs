using SYSFARMACIASANJUAN.DataAccess;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Bussines
{
    public class CategoriaServices
    {
        private CategoriaDataAccess categoriaDataAccess = new CategoriaDataAccess();

        public void MantenimientoAgregarCategoria(Categoria categoria)
        {
            // Aquí puedes agregar validaciones y lógica adicional si es necesario
            categoriaDataAccess.MantenimientoAgregarCategoria(categoria);
        }

        public List<Categoria> LiscarCategoria()
        {
            List<Categoria> categorias = categoriaDataAccess.LiscarCategoria();

            foreach (var usu in categorias)
            {
                Debug.WriteLine($"SubCategoria: {usu.nombresubcategoria} - Descripcion: {usu.descsubCategoria}");
            }

            return categorias;
        }
        public List<Categoria> ObtenerCategoriaPorId(string id)
        {
            // Obtén la lista completa de empleados que coinciden con el ID
            var categorias = categoriaDataAccess.ListarCategoriaPorId(id);

            // Devuelve la lista de empleados (puede estar vacía si no se encontraron coincidencias)
            return categorias;
        }

        public Categoria ObtenerUnCategoriaPorId(string id)
        {
            var categorias = categoriaDataAccess.ListarCategoriaPorId(id);
            return categorias.FirstOrDefault(); // Devuelve el primer empleado o null si no hay resultados
        }

        public void ModificarCategoria(Categoria categoria)
        {
            categoriaDataAccess.ModificarCategoria(categoria); // Implementa este método en EmpleadoDataAccess
        }
    }
}