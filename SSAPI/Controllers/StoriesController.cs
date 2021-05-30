using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SSBOL;
using SSDAL;

namespace SSAPI.Controllers
{
    [Route("api/Stories")]
    [ApiController]
    public class StoriesController : ControllerBase
    {
        IStoryDb storyDb;

        public StoriesController(IStoryDb storyDb)
        {
            this.storyDb = storyDb;
        }

        #region GetMethod

        [HttpGet]
        public async Task<IActionResult> GetAllStories()
        {
            var strs = await storyDb.GetAll().ToListAsync();
            return Ok(strs);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetStoriesById(int id)
        {
            var str = await storyDb.GetById(id).FirstOrDefaultAsync();
            return Ok(str);
        }


        // [Authorize(Roles = "Admin")]
        [HttpGet("getStoriesByUserId/{id}")]
        public async Task<IActionResult> GetStoriesByUserId(string id)
        {
            var str = await storyDb.GetByUserId(id).ToListAsync();
            return Ok(str);
        }

        // 
        [HttpGet("getStoriesByStatus/{isApproved}")]
        public async Task<IActionResult> GetStoriesByStatus(bool isApproved)
        {
            var strs = await storyDb.GetAll(isApproved).ToListAsync();
            return Ok(strs);
        }
        #endregion

        [HttpPost]
        public async Task<IActionResult> PostStory(Story story)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    story.CreatedOn = DateTime.Now;
                    story.Id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var result = await storyDb.Create(story);
                    return CreatedAtAction("GetStoriesById", new { id = story.SSId }, story);
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception E)
            {
                var msg = (E.InnerException != null) ? (E.InnerException.Message) : (E.Message);
                return StatusCode(500, "Admin is working on it!" + msg);

            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStory(int id, Story story)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (storyDb.GetById(id) != null)
                    {
                        var result = await storyDb.Update(story);
                        return NoContent();
                    }
                    else
                    {
                        return NotFound();
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception E)
            {

                var msg = (E.InnerException != null) ? (E.InnerException.Message) : (E.Message);
                return StatusCode(500, "Admin is working on it!" + msg);
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("approveStory/{id}")]
        public async Task<IActionResult> ApproveStory(int id, Story story)
        {
            try
            {

                if (storyDb.GetById(id) != null)
                {
                    await storyDb.Approve(id);
                    return NoContent();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception E)
            {
                var msg = (E.InnerException != null) ? (E.InnerException.Message) : (E.Message);
                return StatusCode(500, "Admin is working on it!" + msg);

            }
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteStory(int id)
        {
            try
            {

                if (storyDb.GetById(id) != null)
                {
                    await storyDb.Delete(id);
                    return NoContent();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception E)
            {
                var msg = (E.InnerException != null) ? (E.InnerException.Message) : (E.Message);
                return StatusCode(500, "Admin is working on it!" + msg);

            }
        }


    }

}