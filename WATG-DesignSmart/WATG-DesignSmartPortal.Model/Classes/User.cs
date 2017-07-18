#region
using WATG_DesignSmartPortal.Model.Common;
#endregion

namespace WATG_DesignSmartPortal.Model.Classes
{
    public class User : BaseModel
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AccountName { get; set; }
        public string Designation { get; set; }
        public string Password { get; set; }
        public string IsActive { get; set; }
    }
}