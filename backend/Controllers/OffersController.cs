using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OffersController : ControllerBase
{
    private static List<Offer> offers = new List<Offer>
    {
        new Offer
        {
            Id = 1,
            Title = "Gym Trial Slot",
            BusinessName = "PowerFit Gym",
            OriginalPrice = 499,
            OfferPrice = 99,
            Category = "Gym",
            Capacity = 25,
            Status = "Active"
        }
    };

    [HttpGet]
    public IActionResult GetOffers()
    {
        var result = offers.Select(o => BuildOfferResponse(o));
        return Ok(result);
    }

    [HttpGet("active")]
    public IActionResult GetActiveOffers()
    {
        var result = offers
            .Where(o => o.Status == "Active")
            .Select(o => BuildOfferResponse(o));

        return Ok(result);
    }

    [HttpGet("{id}")]
    public IActionResult GetOfferById(int id)
    {
        var offer = offers.FirstOrDefault(o => o.Id == id);

        if (offer == null)
        {
            return NotFound("Offer not found");
        }

        return Ok(BuildOfferResponse(offer));
    }

    [HttpPost]
    public IActionResult CreateOffer(Offer offer)
    {
        offer.Id = offers.Count + 1;
        offer.Status = string.IsNullOrWhiteSpace(offer.Status)
            ? "Active"
            : offer.Status;

        offers.Add(offer);

        return Ok(offer);
    }

    [HttpPut("{id}/status")]
    public IActionResult UpdateOfferStatus(int id, [FromBody] string status)
    {
        var offer = offers.FirstOrDefault(o => o.Id == id);

        if (offer == null)
        {
            return NotFound("Offer not found");
        }

        offer.Status = status;

        return Ok(BuildOfferResponse(offer));
    }

    public static List<Offer> GetAllOffers()
    {
        return offers;
    }

    public static Offer? GetOfferByIdStatic(int id)
    {
        return offers.FirstOrDefault(o => o.Id == id);
    }

    private static object BuildOfferResponse(Offer offer)
    {
        var slots = SlotsController.GetSlotsForOffer(offer.Id);

        var totalCapacity = slots.Sum(s => s.Capacity);
        var bookedSeats = slots.Sum(s => s.BookedCount);
        var availableSeats = Math.Max(0, totalCapacity - bookedSeats);

        return new
        {
            offer.Id,
            offer.Title,
            offer.BusinessName,
            offer.OriginalPrice,
            offer.OfferPrice,
            offer.Category,
            Capacity = totalCapacity,
            offer.Status,
            BookedSeats = bookedSeats,
            AvailableSeats = availableSeats,
            AvailableSlots = slots.Count(s => s.Status == "Available")
        };
    }
}