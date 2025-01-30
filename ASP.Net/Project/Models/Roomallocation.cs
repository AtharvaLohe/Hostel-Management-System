using System;
using System.Collections.Generic;

namespace Project.Models
{
    public partial class Roomallocation
    {
        public int RoomAllocId { get; set; }
        public DateOnly Allocationdate { get; set; }
        public int HostlerId { get; set; }
        public int RoomId { get; set; }

        public virtual Hostler Hostler { get; set; } = null!;
        public virtual Room Room { get; set; } = null!;
    }
}
