using System;
using System.Collections.Generic;
using System.EnterpriseServices.Internal;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Models
{
    public class InventarioProducto
    {
        public string inventarioProductoId {  get; set; }
        public string inventarioProductoProductoId { get; set; }
        public int inventarioProductoStock {  get; set; }
        public decimal inventarioProductoPrecioUnitario {  get; set; }
        public string inventarioProductoNombreProducto {  get; set; }
        public string inventarioProductoImgProducto {  get; set; }
    }
}