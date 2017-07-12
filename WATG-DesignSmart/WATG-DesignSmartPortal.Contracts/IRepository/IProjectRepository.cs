#region
using System.Linq;
using System.Web;
using WATG_DesignAwardsPortal.Model.Classes;
#endregion

namespace WATG_DesignAwardsPortal.Contracts.IRepository
{
    public interface IProjectRepository
    {
        IQueryable<Project> GetAll();
        bool Save(Project project, HttpPostedFileBase image, HttpPostedFileBase document, string userName);
        bool Delete(int id, string userName);
    }
}