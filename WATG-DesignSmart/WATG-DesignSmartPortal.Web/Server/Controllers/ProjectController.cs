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
    public class ProjectController : Controller
    {
        private readonly IProjectRepository _project = new ProjectRepository();
        // GET: Project
        public ActionResult GetAll()
        {
            var result = _project.GetAll().ToList();
            var jsonResult = new JsonResult
            {
                Data = result,
                MaxJsonLength = int.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            return jsonResult;
        }
       
        public ActionResult GetById(int id)
        {
            var result = _project.GetAll().Where(p => p.Id == id).SingleOrDefault();
            var jsonResult = new JsonResult
            {
                Data = result,
                MaxJsonLength = int.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            return jsonResult;
        }
        public ActionResult Save(Project project, HttpPostedFileBase image)
        {
            var result = _project.Save(project,image,"");
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}