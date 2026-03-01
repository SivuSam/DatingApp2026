using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MembersController(AppDbContext context) : BaseApiController
    {
        
        [HttpGet]  // localhost:5001/api/members
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMembers()
        {
            var members = context.Users.ToList();

            return members;
        }
        [Authorize]

        [HttpGet("{id}")]  // localhost:5001/api/members/bob-id
        public async Task<ActionResult<AppUser>> GetMember(string id)
        {
            var member = await context.Users.FindAsync(id);

            if (member == null) return NotFound();

            return member;
        }
    }
}
