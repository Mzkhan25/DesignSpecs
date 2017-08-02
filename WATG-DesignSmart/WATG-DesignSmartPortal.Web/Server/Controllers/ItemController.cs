#region
using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WATG_DesignSmartPortal.Contracts.IRepository;
using WATG_DesignSmartPortal.Data.Repository;
using WATG_DesignSmartPortal.Model.Classes;
#endregion

namespace WATG_DesignAwardsPortal.Web.Server.Controllers
{
    public class ItemController : Controller
    {
        private readonly IItemRepository _item = new ItemRepository();
        // GET: Project
        public ActionResult GetAll()
        {
            var result = _item.GetAll().Where(x => x.ParentItemId == 0)
                   .Select(item => new Item
                   {
                       Id = item.Id,

                       ChildItems = _item.GetAll().Where(o => o.Id == item.Id)
                        .Select(st => new Item
                        {
                            Id = st.Id
                        })
                        .ToList()
                   }).ToList();

            var jsonResult = new JsonResult
            {
                Data = result,
                MaxJsonLength = int.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            return jsonResult;
        }

        public ActionResult GetAllByProjectId(int projectId)
        {
            var result = _item.GetAll().Where(p => p.ProjectId == projectId && p.ParentItemId == 0).ToList()
                                         .Select(item => new Item
                                         {
                                             Id = item.Id,
                                             ItemId = item.ItemId,
                                             ItemName = item.ItemName,
                                             EstimatedQty = item.EstimatedQty,
                                             Area = item.Area,
                                             Type = item.Type,
                                             Category = item.Category,
                                             EstimatedUnitCost = item.EstimatedUnitCost,
                                             InvoiceUnitCost = item.InvoiceUnitCost,
                                             ChildItems = _item.GetAll().ToList().Where(o => o.ParentItemId == item.Id).ToList()
                                         }).ToList();
          
            var jsonResult = new JsonResult
            {
                Data = result,
                MaxJsonLength = int.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            return jsonResult;
        }

        public ActionResult GetOne(int id)
        {
            var result = _item.GetAll().Where(p => p.Id == id).SingleOrDefault();
            var jsonResult = new JsonResult
            {
                Data = result,
                MaxJsonLength = int.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            return jsonResult;
        }
        public ActionResult Save(Item item, HttpPostedFileBase image)
        {
            var result = _item.Save(item, image, "");
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }

    public class DummyItem
    {
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


    }
}