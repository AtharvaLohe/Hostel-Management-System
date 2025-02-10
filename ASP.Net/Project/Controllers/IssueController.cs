using Microsoft.AspNetCore.Mvc;
using Project.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project.Controllers
{
	[Route("ticket/api/[controller]")]
	[ApiController]
	public class IssueController : ControllerBase
	{
		
		
		[HttpGet]
		public ActionResult<List<Issue>> GetIssues()
		{
			var context = new p16_hostelContext();
			var issues = context.Issues.ToList();
			return Ok(issues);
		}

		
	}
}
