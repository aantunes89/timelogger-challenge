using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Timelogger.Entities;

namespace Timelogger.Api.Controllers
{
	[Route("api/[controller]")]
	public class ProjectsController : Controller
	{
		private readonly ApiContext _context;

		public ProjectsController(ApiContext context)
		{
			_context = context;
		}

		
		// GET api/projects
		[HttpGet]
		public IActionResult Get()
		{
			return Ok(_context.Projects);
		}

		[HttpPost]
		public IActionResult Create([FromBody] Project project)
		{
			var currentProjects = _context.Projects.ToList();
			
			var newProject = new Project
			{
				Name = project.Name,
				DeadLine = project.DeadLine,
				TotalPrice = project.TotalPrice
			};

			_context.Add(newProject);
			_context.SaveChanges();
			
			return Ok();
		}
	}
}
