using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Project.Models
{
    public partial class Room
    {
        public Room()
        {
            Roomallocations = new HashSet<Roomallocation>();
        }

        public int RoomId { get; set; }
        public int Capacity { get; set; }
        public float Price { get; set; }
        public int RoomNo { get; set; }
        public string RoomType { get; set; } = null!;
        public string Status { get; set; } = null!;

        [JsonIgnore]
        public virtual ICollection<Roomallocation> Roomallocations { get; set; }
    }
}
