using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using SSAPI.ViewModel;
using SSBOL;

namespace SSAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/Account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
       UserManager<SSUser> userManager;
        SignInManager<SSUser> signInManager;

        public AccountController(SignInManager<SSUser> _signInManager, UserManager<SSUser> _userManager)
        {
            signInManager = _signInManager;
            userManager = _userManager;
        }

        [HttpPost("Register"),DisableRequestSizeLimit]
        
        public async Task<IActionResult> Register()
        {
            var model = JsonConvert.DeserializeObject<RegisterViewModel>(Request.Form["myModel"].ToString());
            try
            {
                if (ModelState.IsValid)
                {
                    var user = new SSUser()
                    {
                        UserName = model.UserName,
                        Email = model.Email,
                        DOB = model.DOB

                    };

                    var userResult = await userManager.CreateAsync(user, model.Password);

                    if (userResult.Succeeded)

                    {
                        var resultRole = await userManager.AddToRoleAsync(user, "User");
                        if (resultRole.Succeeded)
                        {
                            if(Request.Form.Files.Count>0)
                            {
                                var filePath = Path.GetFullPath("~/ProfilePics/" + user.Id + ".jpeg").Replace("~\\", "");
                                using (var stream = new FileStream(filePath,FileMode.Create))
                                {
                                    Request.Form.Files[0].CopyTo(stream);
                                }
                            }
                            return Ok(user);
                        }
                    }

                    else
                    {
                        foreach (var item in userResult.Errors)
                        {
                            ModelState.AddModelError(item.Code, item.Description);
                        }

                    }


                }
                return BadRequest(ModelState);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error! Please contact Admin!");
               
            }
            
            
        }

        [HttpPost("Login")]

        public async Task<IActionResult> Login(LoginViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var signInResult = await signInManager.PasswordSignInAsync(model.UserName, model.Password, model.RememberMe, true);
                    if (signInResult.Succeeded)
                    {
                        var user = await userManager.FindByNameAsync(model.UserName);
                        var role = await userManager.GetRolesAsync(user);
                        //  var userId = await userManager.FindByIdAsync(model.);
                       // user.Id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                        return Ok(new { id = user.Id, userName = user.UserName, role = role[0] });

                        // //Step-1 creating claims
                        // IdentityOptions identityOptions = new IdentityOptions();
                        // var claims = new Claim[]
                        // {
                        //// new Claim("Lid","123456789"),
                        // new Claim(identityOptions.ClaimsIdentity.UserIdClaimType,user.Id),
                        // new Claim(identityOptions.ClaimsIdentity.UserNameClaimType,user.UserName),
                        // new Claim(identityOptions.ClaimsIdentity.RoleClaimType,role[0])
                        // };
                        // //Step-2: Creating Signinkey From SecretKey
                        // var signingkey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this-is-my-jwt-secret-key"));
                        // //Step-3: Create signinCredentials from signingKey with HMAC algorithm
                        // var signingCredentials = new SigningCredentials(signingkey, SecurityAlgorithms.HmacSha256);

                        // //Step-4: Create JWT with signingCredentials, IdentityClaims & expiry time
                        // var jwt = new JwtSecurityToken(claims: claims, signingCredentials: signingCredentials, expires: DateTime.Now.AddMinutes(20));

                        // //Step-5: Finally write the token as response with OK().
                        // return Ok(new
                        // {
                        //     tokenJwt = new JwtSecurityTokenHandler().WriteToken(jwt),
                        //     id=user.Id,
                        //     userName = user.UserName,
                        //     role = role[0]
                        // });


                    }
                    else
                    {
                        ModelState.AddModelError( "", "username or password incorrect");

                    }

                }
                return BadRequest(ModelState);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error! Please Contact Admin!");
                
            }
        }

        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Ok();
        }

        [HttpGet("getProfilePic")]
        public  IActionResult GetProfilePic()
        {
            try
            {

                
                var id = User.FindFirstValue(ClaimTypes.NameIdentifier);                
                var filePath = Path.GetFullPath("~/ProfilePics/" + id + ".jpeg").Replace("~\\", "");
                if (!System.IO.File.Exists(filePath))
                {
                    filePath = Path.GetFullPath("~/ProfilePics/universal.jpeg").Replace("~\\", "");
                }
                var profilePic = System.IO.File.OpenRead(filePath);
                return File(profilePic, "image/jpeg");
            }
            catch (Exception)
            {

                return StatusCode(500, "Internal Server Error! Please Contact Admin!");
            }

        }

    }
}