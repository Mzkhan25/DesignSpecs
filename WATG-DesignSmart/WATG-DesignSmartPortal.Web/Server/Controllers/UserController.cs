﻿#region
using System.Linq;
using System.Web.Mvc;
using WATG_DesignSmartPortal.Contracts.IRepository;
using WATG_DesignSmartPortal.Data.Repository;
using WATG_DesignSmartPortal.Model.Classes;
#endregion

namespace WATG_DesignSmartPortal.Web.Server.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserRepository _user = new UserRepository();
        // GET: User
        public ActionResult GetAll()
        {
            var result = _user.GetAll().ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Login(string accountName ,string password)
        {
            var result = _user.GetAll().ToList().FirstOrDefault(p => p.AccountName == accountName && p.Password == password && p.IsDeleted == false);
           
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Save(User user)
        {
            var result = _user.Save(user, "");
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Delete(int id)
        {
            var result = _user.Delete(id, "");
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}