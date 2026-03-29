using Microsoft.AspNetCore.Mvc;
using EthicsFormApi.Data;
using EthicsFormApi.Models;

namespace EthicsFormApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EthicsApplicationsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public EthicsApplicationsController(AppDbContext db) => _db = db;

        [HttpPost]
        public async Task<IActionResult> Submit([FromBody] EthicsApplication application)
        {
            application.SubmittedAt = DateTime.UtcNow;
            _db.EthicsApplications.Add(application);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = application.Id }, application);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var app = await _db.EthicsApplications.FindAsync(id);
            return app is null ? NotFound() : Ok(app);
        }
    }
}
