#region
using WATG_DesignSmartPortal.Model.Common;
#endregion

namespace WATG_DesignSmartPortal.Model.Classes
{
    public class Project : BaseModel
    {
        public string ProjectName { get; set; }                
        public bool IsActive { get; set; }
        public string ProjectLocation { get; set; }
        public string ClientName { get; set; }
        public string BillingAddress { get; set; }
        public string ShipToAddress { get; set; }
        public string ShipToPlace { get; set; }
        public string Terms { get; set; }
        public string RequiredDeposit { get; set; }
        public string ShipMethod { get; set; }
        public string TaxPercentage { get; set; }
        public string QBTaxCode { get; set; }
        public string SalesAgent { get; set; }
        public int CurrencyId { get; set; }
        public string EstimatedHours { get; set; }
        public string EstimatedCost { get; set; }
        public int UserId { get; set; }
    }
}