using System;
using System.Collections.Generic;

namespace Project.Models
{
    public partial class User
    {
        public int UserId { get; set; }
        public string Password { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public int? RId { get; set; }

        public virtual Role? RIdNavigation { get; set; }
        public virtual Hostler? Hostler { get; set; }
    }
}
