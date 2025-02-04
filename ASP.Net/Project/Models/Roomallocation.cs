using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Project.Models
{
    public partial class Roomallocation
    {
        public int RoomAllocId { get; set; }
        public DateTime Allocationdate { get; set; }
        public int HostlerId { get; set; }
        public int RoomId { get; set; }

        [JsonIgnore]
        public virtual Hostler Hostler { get; set; } = null!;
        public virtual Room Room { get; set; } = null!;
    }
}
