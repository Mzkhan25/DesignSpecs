#region
using System.Linq;
using WATG_DesignAwardsPortal.Model.Classes;
#endregion

namespace WATG_DesignAwardsPortal.Contracts.IRepository
{
    public interface IResultRepository
    {
        IQueryable<Result> GetAll();
        bool Save(Result item, string userName);
        bool Delete(int id, string userName);
    }
}