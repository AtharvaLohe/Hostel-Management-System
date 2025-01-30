using System;
using System.Collections.Generic;

namespace Project.Models
{
    public partial class Financialreport
    {
        public int ReportId { get; set; }
        public int OccupancyRate { get; set; }
        public int NoRooms { get; set; }
        public int AvailableRoom { get; set; }
        public float TotalRevenue { get; set; }
    }
}
