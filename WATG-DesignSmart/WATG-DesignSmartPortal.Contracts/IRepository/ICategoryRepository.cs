#region
using System.Linq;
using System.Web;
using WATG_DesignAwardsPortal.Model.Classes;
#endregion

namespace WATG_DesignAwardsPortal.Contracts.IRepository
{
    public interface ICategoryRepository
    {
        IQueryable<Category> GetAll();
        bool Save(HttpPostedFileBase httpPostedFileBases, string name,
            string userName);
        bool Delete(int id, string userName);
    }
}