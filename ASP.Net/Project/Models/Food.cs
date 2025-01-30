using System;
using System.Collections.Generic;

namespace Project.Models
{
    public partial class Food
    {
        public Food()
        {
            Mealplans = new HashSet<Mealplan>();
        }

        public int FoodId { get; set; }
        public string Fname { get; set; } = null!;
        public string? Description { get; set; }

        public virtual ICollection<Mealplan> Mealplans { get; set; }
    }
}
