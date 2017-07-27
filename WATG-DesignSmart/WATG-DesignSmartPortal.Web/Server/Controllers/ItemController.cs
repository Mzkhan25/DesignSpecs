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
            var result = _item.GetAll().ToList();
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
            var result = _item.GetAll().Where(p => p.ProjectId == projectId && p.ParentItemId == 0).ToList();
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
}