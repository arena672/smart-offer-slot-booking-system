namespace backend.Models;

public class OfferSlot
{
    public int Id { get; set; }
    public int OfferId { get; set; }
    public string SlotDate { get; set; } = "";
    public string StartTime { get; set; } = "";
    public string EndTime { get; set; } = "";
    public int Capacity { get; set; }
    public int BookedCount { get; set; }
    public string Status { get; set; } = "Available";
}