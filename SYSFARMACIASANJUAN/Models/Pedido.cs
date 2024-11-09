using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SYSFARMACIASANJUAN.Models
{
    public class Pedido
    {
        public string pedidoId {  get; set; }
        public DateTime pedidoFechaCreacion { get; set; }
        public string pedidoEstado { get; set; }
        public DateTime pedidoFechaEntregaEstimada { get; set; }
        public string pedidoObservacion { get; set; }
        public string pedidoProveedorId { get; set; }
        public string pedidoProveedorNombre { get; set; }

    }
}