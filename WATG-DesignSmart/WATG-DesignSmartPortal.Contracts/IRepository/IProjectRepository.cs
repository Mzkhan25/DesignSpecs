#region
using System.Linq;
using System.Web;
using WATG_DesignSmartPortal.Model.Classes;
#endregion

namespace WATG_DesignSmartPortal.Contracts.IRepository
{
    public interface IProjectRepository
    {
        IQueryable<Project> GetAll();
        bool Save(Project project, string userName);
        bool Delete(int id, string userName);
    }
}