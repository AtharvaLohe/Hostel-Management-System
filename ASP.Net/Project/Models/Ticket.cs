using System;
using System.Collections.Generic;

namespace Project.Models
{
    public partial class Ticket
    {
        public int TicketId { get; set; }
        public int HostlerId { get; set; }
        public int IssueId { get; set; }
        public string Description { get; set; } = null!;
        public bool Status { get; set; }
        public DateTime RaisedAt { get; set; }
        public DateTime? ResolvedAt { get; set; }

        public virtual Issue? Issue { get; set; }
    }
}
