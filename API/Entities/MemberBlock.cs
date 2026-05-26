using System;

namespace API.Entities
{
    public class MemberBlock
    {
        public int Id { get; set; }
        public string SourceMemberId { get; set; }
        public AppUser SourceMember { get; set; }
        public string TargetMemberId { get; set; }
        public AppUser TargetMember { get; set; }
        public string Reason { get; set; } // Optional for now
        public DateTime DateBlocked { get; set; } = DateTime.UtcNow;
    }
}
