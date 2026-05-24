namespace backend.Models;

public class Offer
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string BusinessName { get; set; } = "";
    public decimal OriginalPrice { get; set; }
    public decimal OfferPrice { get; set; }
    public string Category { get; set; } = "";
    public int Capacity { get; set; }
    public string Status { get; set; } = "Active";
}