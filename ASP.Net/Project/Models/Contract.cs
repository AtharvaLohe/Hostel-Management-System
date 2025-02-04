using System;
using System.Collections.Generic;

namespace Project.Models
{
    public partial class Contract
    {
        public int ContractId { get; set; }
        public int HostlerId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
