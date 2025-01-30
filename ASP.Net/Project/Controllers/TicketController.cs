using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;

namespace Project.Controllers
{
    [Route("api/[controller][action]")]
    [ApiController]
    public class TicketController : ControllerBase
    {

	

		// Constructor injection of the DbContext
		

		// Admin side method to get all request
		[HttpGet]
        public ActionResult<List<Ticket>> GetTickets()
        {
			using (var _context = new p16_hostelContext())
			{
				if (_context.Tickets == null)
				{
					return NotFound();
				}

				return _context.Tickets.ToList();
			}
        }

		// hostler side for getting all sent tickets
		[HttpGet("{hostlerId}")]
		public async Task<ActionResult<List<Ticket>>> GetTicketsByHostlerId(int hostlerId)
		{
			using (var _context = new p16_hostelContext())
			{
				if (_context.Tickets == null)
				{
					return NotFound();
				}

				// Find all tickets for the given HostlerId
				var tickets = await _context.Tickets
											.Where(t => t.HostlerId == hostlerId)
											.ToListAsync();

				if (tickets.Count == 0)
				{
					return NotFound(); // Return NotFound if no tickets are found
				}

				return Ok(tickets); // Return the list of tickets for the hostler
			}
		}


		//hostler side for adding the Tickets
		[HttpPost]
		public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
		{
			using (var _context = new p16_hostelContext())
			{
				if (_context.Tickets == null)
				{
					return Problem("Entity set 'p16_hostelContext.Tickets' is null.");
				}
				var issue = await _context.Issues.FindAsync(ticket.IssueId);
				if (issue == null)
				{
					return NotFound();
				}
				ticket.Issue = issue;
				ticket.Status = false;
				ticket.RaisedAt = DateTime.Now; // Ensure the current date is set
				_context.Tickets.Add(ticket);
				await _context.SaveChangesAsync();

				return Ok(ticket);
			}
		}

		
		[HttpPut]
		public async Task<ActionResult<Ticket>> MakeResolved(int id)
		{
			using (var _context = new p16_hostelContext()) { 
			var ticket = await _context.Tickets.FindAsync(id);

			if (ticket == null)
			{
				return NotFound();
			}
			ticket.ResolvedAt = DateTime.Now;
			ticket.Status = true;
			await _context.SaveChangesAsync();
			
			return Ok(ticket);
			}

		}



	}
}
