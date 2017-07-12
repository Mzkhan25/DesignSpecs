#region
using WATG_DesignAwardsPortal.Model.Common;
#endregion

namespace WATG_DesignAwardsPortal.Model.Classes
{
    public class Project : BaseModel
    {
        public string Title { get; set; }
        public string Office { get; set; }
        public string Description { get; set; }
        public string PdfPath { get; set; }
        public int Year { get; set; }
        public byte[] DisplayImage { get; set; }

        // foreign key for Category
        public int CategoryId { get; set; }
    }
}