
using System.Collections.Generic;
using WATG_DesignSmartPortal.Model.Common;

namespace WATG_DesignSmartPortal.Model.Classes
{
    public class Item : BaseModel
    {
        public Item()
        {
            ChildItems = new List<Item>();
        }
        public string ItemId { get; set; }
        public string ItemName { get; set; }
        public int EstimatedQty { get; set; }
        public string Area { get; set; }
        public string Type { get; set; }
        public string Category { get; set; }
        public int EstimatedUnitCost { get; set; }
        public string InvoiceUnitCost { get; set; }
        public string Classification { get; set; }
        public string QtyMethod { get; set; }
        public int DistributedQty { get; set; }
        public int ProjectId { get; set; }
        public string UnitOfMeasure { get; set; }
        public int EstimatedMarkup { get; set; } 
        public int EstimatedMarkupAmount { get; set; }
        public int TotalSellPrice { get; set; }
        public string ModelNumber { get; set; }
        public string Finish { get; set; }
        public string Color { get; set; }
        public string Dimension { get; set; }
        public string Pattern { get; set; }
        public string Content { get; set; }
        public string Width { get; set; }
        public string Repeat { get; set; }

        public string Codification { get; set; }
        public string ItemDetail { get; set; }
        public string ItemURL { get; set; }
        public string VendorItemName { get; set; }
        public string InvoiceDescription { get; set; }
        public string Sidemark { get; set; }
        public bool IsIncludeInMaterialsReport { get; set; }
        public string MaterialRefNotes { get; set; }

        public int ParentItemId { get; set; }
        public byte[] DisplayImage { get; set; }

        public virtual ICollection<Item> ChildItems { get; set; }
    }
}