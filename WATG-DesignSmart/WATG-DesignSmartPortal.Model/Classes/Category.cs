#region
using WATG_DesignAwardsPortal.Model.Common;
#endregion

namespace WATG_DesignAwardsPortal.Model.Classes
{
    public class Category : BaseModel
    {
        public string CategoryName { get; set; }
        public byte[] Image { get; set; }
    }
}