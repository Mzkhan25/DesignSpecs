#region
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using WATG_DesignAwardsPortal.Model.Classes;
#endregion

namespace WATG_DesignAwardsPortal.Contracts
{
    public interface IDesignAwardsContext
    {
        DbSet<Category> Categories { get; set; }
        DbSet<Project> Projects { get; set; }
        DbSet<Result> Results { get; set; }
        DbSet<User> Users { get; set; }
        int SaveChanges();
        DbEntityEntry Entry(object o);
        void Dispose();
    }
}