using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Project.Models
{
    public partial class Issue
    {
        public Issue()
        {
            Tickets = new HashSet<Ticket>();
        }

        public int IssueId { get; set; }
        public string IssueName { get; set; } = null!;

        [JsonIgnore]
        public virtual ICollection<Ticket> Tickets { get; set; }
    }
}
