#region
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using WATG_DesignSmartPortal.Model.Classes;
#endregion

namespace WATG_DesignSmartPortal.Contracts
{
    public interface IDesignSmartContext
    {
        DbSet<Project> Projects { get; set; }
        DbSet<User> Users { get; set; }
        int SaveChanges();
        DbEntityEntry Entry(object o);
        void Dispose();
    }
}