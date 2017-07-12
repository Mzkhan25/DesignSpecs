#region
using WATG_DesignAwardsPortal.Model.Common;
#endregion

namespace WATG_DesignAwardsPortal.Model.Classes
{
    public class User : BaseModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public ApplicationRoles Role { get; set; }
    }
}