using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SlotsController : ControllerBase
{
    private static List<OfferSlot> slots = new List<OfferSlot>
    {
        new OfferSlot
        {
            Id = 1,
            OfferId = 1,
            SlotDate = "2026-05-25",
            StartTime = "10:00",
            EndTime = "11:00",
            Capacity = 10,
            BookedCount = 1,
            Status = "Available"
        },
        new OfferSlot
        {
            Id = 2,
            OfferId = 1,
            SlotDate = "2026-05-25",
            StartTime = "17:00",
            EndTime = "18:00",
            Capacity = 15,
            BookedCount = 0,
            Status = "Available"
        }
    };

    [HttpGet]
    public IActionResult GetSlots()
    {
        return Ok(slots);
    }

    [HttpGet("{id}")]
    public IActionResult GetSlotById(int id)
    {
        var slot = slots.FirstOrDefault(s => s.Id == id);

        if (slot == null)
        {
            return NotFound("Slot not found");
        }

        return Ok(slot);
    }

    [HttpGet("/api/offers/{offerId}/slots")]
    public IActionResult GetSlotsByOfferId(int offerId)
    {
        var offerSlots = slots.Where(s => s.OfferId == offerId).ToList();
        return Ok(offerSlots);
    }

    [HttpPost]
    public IActionResult CreateSlot(OfferSlot slot)
    {
        var offer = OffersController.GetOfferByIdStatic(slot.OfferId);

        if (offer == null)
        {
            return BadRequest("Offer does not exist.");
        }

        if (offer.Status != "Active")
        {
            return BadRequest("Cannot create slot for inactive offer.");
        }

        slot.Id = slots.Count + 1;
        slot.BookedCount = 0;
        slot.Status = "Available";

        slots.Add(slot);

        return Ok(slot);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateSlot(int id, OfferSlot updatedSlot)
    {
        var slot = slots.FirstOrDefault(s => s.Id == id);

        if (slot == null)
        {
            return NotFound("Slot not found");
        }

        slot.OfferId = updatedSlot.OfferId;
        slot.SlotDate = updatedSlot.SlotDate;
        slot.StartTime = updatedSlot.StartTime;
        slot.EndTime = updatedSlot.EndTime;
        slot.Capacity = updatedSlot.Capacity;
        slot.Status = updatedSlot.Status;

        return Ok(slot);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteSlot(int id)
    {
        var slot = slots.FirstOrDefault(s => s.Id == id);

        if (slot == null)
        {
            return NotFound("Slot not found");
        }

        slots.Remove(slot);

        return Ok("Slot deleted successfully");
    }

    public static List<OfferSlot> GetAllSlots()
    {
        return slots;
    }

    public static List<OfferSlot> GetSlotsForOffer(int offerId)
    {
        return slots.Where(s => s.OfferId == offerId).ToList();
    }

    public static bool TryBookSlot(
        int offerId,
        string slotTime,
        int peopleCount,
        out string errorMessage
    )
    {
        errorMessage = "";

        var offer = OffersController.GetOfferByIdStatic(offerId);

        if (offer == null)
        {
            errorMessage = "Offer not found.";
            return false;
        }

        if (offer.Status != "Active")
        {
            errorMessage = "This offer is not active.";
            return false;
        }

        var slot = slots.FirstOrDefault(s =>
            s.OfferId == offerId &&
            $"{s.StartTime} - {s.EndTime}" == slotTime
        );

        if (slot == null)
        {
            errorMessage = "Selected slot was not found.";
            return false;
        }

        if (slot.Status != "Available")
        {
            errorMessage = "Selected slot is not available.";
            return false;
        }

        int availableSeats = slot.Capacity - slot.BookedCount;

        if (peopleCount <= 0)
        {
            errorMessage = "Number of people must be at least 1.";
            return false;
        }

        if (peopleCount > availableSeats)
        {
            errorMessage = $"Only {availableSeats} seats available for this slot.";
            return false;
        }

        slot.BookedCount += peopleCount;

        if (slot.BookedCount >= slot.Capacity)
        {
            slot.Status = "Full";
        }

        return true;
    }
}