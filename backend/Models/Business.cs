namespace backend.Models;

public class Business
{
    public int Id { get; set; }
    public string BusinessName { get; set; } = "";
    public string BusinessType { get; set; } = "";
    public string OwnerName { get; set; } = "";
    public string PhoneNumber { get; set; } = "";
    public string Email { get; set; } = "";
    public string Address { get; set; } = "";
    public string City { get; set; } = "";
    public string OpeningTime { get; set; } = "";
    public string ClosingTime { get; set; } = "";
}