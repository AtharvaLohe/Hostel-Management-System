using System;
using System.Collections.Generic;

namespace Project.Models
{
    public partial class Address
    {
        public int AddressId { get; set; }
        public string Area { get; set; } = null!;
        public string City { get; set; } = null!;
        public int PinCode { get; set; }
        public string State { get; set; } = null!;

        public virtual Hostler? Hostler { get; set; }
    }
}
