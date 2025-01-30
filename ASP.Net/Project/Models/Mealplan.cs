using System;
using System.Collections.Generic;

namespace Project.Models
{
    public partial class Mealplan
    {
        public int MpId { get; set; }
        public string Description { get; set; } = null!;
        public DateOnly Date { get; set; }
        public string Status { get; set; } = null!;
        public int FoodId { get; set; }

        public virtual Food Food { get; set; } = null!;
    }
}
