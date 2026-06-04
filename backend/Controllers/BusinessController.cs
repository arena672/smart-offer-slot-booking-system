using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BusinessController : ControllerBase
{
    private static Business business = new Business
    {
        Id = 1,
        BusinessName = "PowerFit Gym",
        BusinessType = "Gym",
        OwnerName = "Rahul Sharma",
        PhoneNumber = "9876543210",
        Email = "powerfit@example.com",
        Address = "Sector 15 Market",
        City = "Delhi",
        OpeningTime = "06:00",
        ClosingTime = "22:00"
    };

    [HttpGet]
    public IActionResult GetBusiness()
    {
        return Ok(business);
    }

    [HttpPost]
    public IActionResult CreateBusiness(Business newBusiness)
    {
        newBusiness.Id = 1;
        business = newBusiness;
        return Ok(business);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateBusiness(int id, Business updatedBusiness)
    {
        if (id != business.Id)
        {
            return NotFound("Business not found");
        }

        updatedBusiness.Id = id;
        business = updatedBusiness;

        return Ok(business);
    }
    
}