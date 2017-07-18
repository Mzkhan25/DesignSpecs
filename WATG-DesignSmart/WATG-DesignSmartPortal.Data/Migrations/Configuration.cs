#region
using System.Data.Entity.Migrations;
using WATG_DesignSmartPortal.Model.Classes;
using WATG_DesignSmartPortal.Model.Common;
#endregion

namespace WATG_DesignSmartPortal.Data.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<DesignSmartContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }
        protected override void Seed(DesignSmartContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            context.Users.AddOrUpdate(
                p => p.AccountName,
                new User
                {
                    AccountName = "mbajwa",
                    Password = "devops"
                },
                new User
                {
                    AccountName = "atariq",
                    Password = "abc123"
                }
            );
        }
    }
}