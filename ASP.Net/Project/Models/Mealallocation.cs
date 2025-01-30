using System;
using System.Collections.Generic;

namespace Project.Models
{
    public partial class Mealallocation
    {
        public int MaId { get; set; }
        public DateOnly Date { get; set; }
        public string Status { get; set; } = null!;
        public int HId { get; set; }

        public virtual Hostler HIdNavigation { get; set; } = null!;
    }
}
