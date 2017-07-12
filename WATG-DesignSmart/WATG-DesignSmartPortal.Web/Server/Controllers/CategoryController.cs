#region
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WATG_DesignAwardsPortal.Contracts.IRepository;
using WATG_DesignAwardsPortal.Data.Repository;
#endregion

namespace WATG_DesignAwardsPortal.Web.Server.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ICategoryRepository _category = new CategoryRepository();
        // GET: Category
        public ActionResult GetAll()
        {
            var result = _category.GetAll().ToList();
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
            var result = _category.GetAll().Where(p => p.Id == id).ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Save(HttpPostedFileBase file, string name)
        {
            var result = _category.Save(file, name, "");
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Delete(int id)
        {
            var result = _category.Delete(id, "");
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}