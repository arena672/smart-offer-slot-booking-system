using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private static List<Booking> bookings = new List<Booking>
    {
        new Booking
        {
            Id = 1,
            BookingReference = "BK1001",
            CustomerName = "Rahul Sharma",
            CustomerPhone = "9876543210",
            OfferName = "Gym Trial Slot",
            SlotTime = "10 AM - 11 AM",
            PeopleCount = 1,
            Status = "Confirmed"
        }
    };

    [HttpGet]
    public IActionResult GetBookings()
    {
        return Ok(bookings);
    }

    [HttpPost]
    public IActionResult CreateBooking(Booking booking)
    {
        booking.Id = bookings.Count + 1;
        booking.BookingReference = "BK" + (1000 + booking.Id);
        booking.Status = "Confirmed";

        bookings.Add(booking);

        return Ok(booking);
    }
}