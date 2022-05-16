using System;
using System.Collections.Generic;

namespace Timelogger.Entities
{
	public class Project
	{
		public int Id { get; set; }
		public string Name { get; set; }
		
		public DateTime DeadLine { get; set; }
		
		public int TotalPrice { get; set; }
	}
}
