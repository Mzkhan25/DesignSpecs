#region
using WATG_DesignAwardsPortal.Model.Common;
#endregion

namespace WATG_DesignAwardsPortal.Model.Classes
{
    public class Result : BaseModel
    {
        public int ProjectId { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
    }
}