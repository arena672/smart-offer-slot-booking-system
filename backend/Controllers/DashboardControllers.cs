using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    [HttpGet("summary")]
    public IActionResult GetSummary()
    {
        var summary = new
        {
            totalOffers = 2,
            activeOffers = 2,
            totalBookings = 1,
            bookedSeats = 1,
            availableSeats = 19
        };

        return Ok(summary);
    }
}