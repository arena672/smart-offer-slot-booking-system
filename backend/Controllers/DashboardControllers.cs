using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    [HttpGet("summary")]
    public IActionResult GetSummary()
    {
        var offers = OffersController.GetAllOffers();
        var slots = SlotsController.GetAllSlots();
        var bookings = BookingsController.GetAllBookings();

        var activeOfferIds = offers
            .Where(o => o.Status == "Active")
            .Select(o => o.Id)
            .ToList();

        var activeSlots = slots
            .Where(s => activeOfferIds.Contains(s.OfferId))
            .ToList();

        var totalCapacity = activeSlots.Sum(s => s.Capacity);
        var bookedSeats = activeSlots.Sum(s => s.BookedCount);
        var availableSeats = Math.Max(0, totalCapacity - bookedSeats);

        var summary = new
        {
            totalOffers = offers.Count,
            activeOffers = offers.Count(o => o.Status == "Active"),
            totalBookings = bookings.Count,
            bookedSeats,
            availableSeats
        };

        return Ok(summary);
    }
}