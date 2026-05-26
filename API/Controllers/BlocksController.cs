using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    [Authorize(Roles = "VIP")]
    [ApiController]
    [Route("api/blocks")]
    public class BlocksController : ControllerBase
    {
        private readonly AppDbContext _context;
        public BlocksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("{id}")]
        public async Task<ActionResult> BlockMember(string id)
        {
            var sourceId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (sourceId == id) return BadRequest("You cannot block yourself.");

            var existingBlock = await _context.Blocks
                .FirstOrDefaultAsync(b => b.SourceMemberId == sourceId && b.TargetMemberId == id);

            if (existingBlock != null) return BadRequest("Member already blocked.");

            var block = new MemberBlock
            {
                SourceMemberId = sourceId,
                TargetMemberId = id,
                Reason = "" // For now, empty
            };

            _context.Blocks.Add(block);
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetBlockedMembers()
        {
            var sourceId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var blocks = await _context.Blocks
                .Where(b => b.SourceMemberId == sourceId)
                .Include(b => b.TargetMember)
                .Select(b => new {
                    Id = b.TargetMemberId,
                    DisplayName = b.TargetMember.User.DisplayName,
                    Reason = b.Reason,
                    DateBlocked = b.DateBlocked
                })
                .ToListAsync();
            return Ok(blocks);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> UnblockMember(string id)
        {
            var sourceId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var block = await _context.Blocks
                .FirstOrDefaultAsync(b => b.SourceMemberId == sourceId && b.TargetMemberId == id);
            if (block == null) return NotFound();
            _context.Blocks.Remove(block);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
