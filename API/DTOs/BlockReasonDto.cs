using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class BlockReasonDto
{
    [Required]
    [StringLength(200, MinimumLength = 1)]
    public string Reason { get; set; } = string.Empty;
}