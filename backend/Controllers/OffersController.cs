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
            Capacity = 20,
            Status = "Active"
        }
    };

    [HttpGet]
    public IActionResult GetOffers()
    {
        return Ok(offers);
    }

    [HttpPost]
    public IActionResult CreateOffer(Offer offer)
    {
        offer.Id = offers.Count + 1;
        offers.Add(offer);

        return Ok(offer);
    }
}