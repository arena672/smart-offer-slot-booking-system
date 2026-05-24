using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private static int gymSlotCapacity = 20;

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
        int alreadyBooked = bookings
            .Where(b => b.SlotTime == booking.SlotTime && b.Status != "Cancelled")
            .Sum(b => b.PeopleCount);

        int availableSeats = gymSlotCapacity - alreadyBooked;

        if (booking.PeopleCount > availableSeats)
        {
            return BadRequest($"Only {availableSeats} seats available for this slot.");
        }

        booking.Id = bookings.Count + 1;
        booking.BookingReference = "BK" + (1000 + booking.Id);
        booking.Status = "Confirmed";

        bookings.Add(booking);

        return Ok(booking);
    }

    [HttpPut("{id}/status")]
    public IActionResult UpdateBookingStatus(int id, [FromBody] string status)
    {
        var booking = bookings.FirstOrDefault(b => b.Id == id);

        if (booking == null)
        {
            return NotFound("Booking not found");
        }

        booking.Status = status;

        return Ok(booking);
    }
}