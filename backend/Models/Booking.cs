namespace backend.Models;

public class Booking
{
    public int Id { get; set; }
    public string BookingReference { get; set; } = "";
    public string CustomerName { get; set; } = "";
    public string CustomerPhone { get; set; } = "";
    public string OfferName { get; set; } = "";
    public string SlotTime { get; set; } = "";
    public int PeopleCount { get; set; }
    public string Status { get; set; } = "Confirmed";
}