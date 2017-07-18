#region
using System.Linq;
using WATG_DesignSmartPortal.Model.Classes;
#endregion

namespace WATG_DesignSmartPortal.Contracts.IRepository
{
    public interface IUserRepository
    {
        IQueryable<User> GetAll();
        bool Save(User item, string userName);
        bool Delete(int id, string userName);
    }
}