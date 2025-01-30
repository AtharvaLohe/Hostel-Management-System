using System;
using System.Collections.Generic;

namespace Project.Models
{
    public partial class Contract
    {
        public int ContractId { get; set; }
        public int HostlerId { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
    }
}
