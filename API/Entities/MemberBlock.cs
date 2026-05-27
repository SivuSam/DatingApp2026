using System;

namespace API.Entities
{
    public class MemberBlock
    {
        
        public required string SourceMemberId { get; set; }
        public Member SourceMember { get; set; } = null!;
        public required string TargetMemberId { get; set; }
        public Member TargetMember { get; set; } = null!;
        public string? Reason { get; set; } 
        public DateTime DateBlocked { get; set; } = DateTime.UtcNow;
    }
}
