using System;
using System.Collections.Generic;
using System.EnterpriseServices.Internal;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Models
{
    public class Producto
    {
        public string productoID { get; set; }
        public string productoNombre { get; set; }
        public string productoDescripcion { get; set; }
        public DateTime productoFechaCreacion { get; set; }
        public string productoFormaFarmaceutica {  get; set; }
        public string productoViaAdministracion {  get; set; }
        public string productoCasaMedica {  get; set; }
        public string productoImg { get; set; }
        public string productoEstado { get; set; }
        public string productoSubCategoriaId { get; set; }
        public string productoSubCategoria { get; set; }
    }
}