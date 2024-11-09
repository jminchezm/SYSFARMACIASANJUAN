using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.EnterpriseServices.Internal;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Models
{
    public class DetallePedido
    {
        public string detallePedidoId { get; set; }
        public string detallePedido_PedidoId { get; set; }
        public string detallePedido_ProductoId {  get; set; }
        public int detallePedidoCantidad {  get; set; }
        public decimal detallePedidoPrecioUnitario {  get; set; }
        public decimal detallePedidoSubTotal {  get; set; }
        public string detallePedidoProductoNombre {  get; set; }
        public string detallePedidoImg {  get; set; }
    }
}