using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Models
{
    public class DetalleVenta
    {
        public string detalleVentaId {  get; set; }
        public string ventaId { get; set; }
        public string productoId {  get; set; }
        public string productoNombre {  get; set; }
        public string productoImg { get; set; }
        public int detalleVentaCantidad {  get; set; }
        public decimal detalleVentaPrecioUnitario {  get; set; }
        public decimal detalleSubTotal {  get; set; }

    }
}