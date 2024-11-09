using SYSFARMACIASANJUAN.DataAccess;
using SYSFARMACIASANJUAN.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Bussines
{
    public class SubCategoriaServices
    {
        private SubCategoriaDataAccess subcategoriaDataAccess = new SubCategoriaDataAccess();

        public void MantenimientoAgregarSubCategoria(SubCategoria subcategoria)
        {
            // Aquí puedes agregar validaciones y lógica adicional si es necesario
            subcategoriaDataAccess.MantenimientoAgregarSubCategoria(subcategoria);
        }

        public List<SubCategoria> LiscarSubCategoria()
        {
            List<SubCategoria> subcategorias = subcategoriaDataAccess.LiscarSubCategoria();

            foreach (var usu in subcategorias)
            {
                Debug.WriteLine($"Categoria: {usu.nombreCategoria} - Descripcion: {usu.descripCategoria}");
            }

            return subcategorias;
        }

        public List<SubCategoria> ObtenersubCategoriaPorId(string id)
        {
            // Obtén la lista completa de empleados que coinciden con el ID
            var subcategorias = subcategoriaDataAccess.ListarSubCategoriaPorId(id);

            // Devuelve la lista de empleados (puede estar vacía si no se encontraron coincidencias)
            return subcategorias;
        }

        public SubCategoria ObtenerUnSubCategoriaPorId(string id)
        {
            var suncategorias = subcategoriaDataAccess.ListarSubCategoriaPorId(id);
            return suncategorias.FirstOrDefault(); // Devuelve el primer empleado o null si no hay resultados
        }

        public void ModificarSubCategoria(SubCategoria subcategoria)
        {
            subcategoriaDataAccess.ModificarSubCategoria(subcategoria); // Implementa este método en EmpleadoDataAccess
        }
    }
}