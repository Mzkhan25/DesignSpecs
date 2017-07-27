#region
using System.Data.Entity;
using WATG_DesignSmartPortal.Contracts;
using WATG_DesignSmartPortal.Model.Classes;
#endregion

namespace WATG_DesignSmartPortal.Data
{
    public class DesignSmartContext : DbContext, IDesignSmartContext
    {
        public DesignSmartContext()
        {
            Database.Connection.ConnectionString = @"Data Source = DESKTOP-JFPKBCF; Initial Catalog = DesignSpecs; User ID = sa; Password = abcd@1234";   
        }
        public DbSet<Project> Projects { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Item> Items { get; set; }
    }
}