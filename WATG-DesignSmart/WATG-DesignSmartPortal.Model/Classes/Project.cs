#region
using WATG_DesignSmartPortal.Model.Common;
#endregion

namespace WATG_DesignSmartPortal.Model.Classes
{
    public class Project : BaseModel
    {
        public  string ProjectId { get; set; }
        public string ProjectName { get; set; }                
        public string IsActive { get; set; }
        public string ProjectLocation { get; set; }
        public string ClientName { get; set; }
        public string BillingAddress { get; set; }
        public string ShipToAddress { get; set; }
        public string ShipToPlace { get; set; }
        public string ShipAddressRadio { get; set; }
        public string Terms { get; set; }
        public string RequiredDeposit { get; set; }
        public string ShipMethod { get; set; }
        public string TaxPercentage { get; set; }
        public string QBTaxCode { get; set; }
        public string SalesAgent { get; set; }
        public string CurrencyId { get; set; }
        public string EstimatedHours { get; set; }
        public string EstimatedCost { get; set; }
        public int UserId { get; set; }
        public string Tax { get; set; }
        public string SaleAgent { get; set; }
        public string Merchandise { get; set; }
        public string Labor { get; set; }
        public string Freight { get; set; }
        public string MarkupTax { get; set; }
        public string ReceivingAndDelivery { get; set; }
        public string Other { get; set; }
        public string CalcFreight { get; set; }
        public byte[] DisplayImage { get; set; }
    }
}