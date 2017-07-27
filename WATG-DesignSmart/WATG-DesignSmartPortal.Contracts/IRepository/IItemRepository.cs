#region
using System.Linq;
using System.Web;
using WATG_DesignSmartPortal.Model.Classes;
#endregion

namespace WATG_DesignSmartPortal.Contracts.IRepository
{
    public interface IItemRepository
    {
        IQueryable<Item> GetAll();
        bool Save(Item item, string userName);
        bool Delete(int id, string userName);
    }
}