using System;
using System.Collections.Generic;

namespace Project.Models
{
    public partial class Hostler
    {
        public Hostler()
        {
            Mealallocations = new HashSet<Mealallocation>();
            Roomallocations = new HashSet<Roomallocation>();
        }

        public int HostlerId { get; set; }
        public string Dateofbirth { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Firstname { get; set; } = null!;
        public string Lastname { get; set; } = null!;
        public string Phonenumber { get; set; } = null!;
        public int? AddressId { get; set; }
        public int UserId { get; set; }

        public virtual Address? Address { get; set; }
        public virtual User User { get; set; } = null!;
        public virtual ICollection<Mealallocation> Mealallocations { get; set; }
        public virtual ICollection<Roomallocation> Roomallocations { get; set; }
    }
}
