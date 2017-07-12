#region
using System.Data.Entity.Migrations;
#endregion

namespace WATG_DesignAwardsPortal.Data.Migrations
{
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                    "dbo.Categories",
                    c => new
                    {
                        Id = c.Int(false, true),
                        CategoryName = c.String(),
                        Image = c.Binary(),
                        DateAdded = c.DateTime(),
                        DateModified = c.DateTime(),
                        AddedBy = c.String(),
                        ModifiedBy = c.String(),
                        IsDeleted = c.Boolean(false)
                    })
                .PrimaryKey(t => t.Id);
            CreateTable(
                    "dbo.Projects",
                    c => new
                    {
                        Id = c.Int(false, true),
                        Title = c.String(),
                        Office = c.String(),
                        Description = c.String(),
                        PdfPath = c.String(),
                        Year = c.Int(false),
                        DisplayImage = c.Binary(),
                        CategoryId = c.Int(false),
                        DateAdded = c.DateTime(),
                        DateModified = c.DateTime(),
                        AddedBy = c.String(),
                        ModifiedBy = c.String(),
                        IsDeleted = c.Boolean(false)
                    })
                .PrimaryKey(t => t.Id);
            CreateTable(
                    "dbo.Results",
                    c => new
                    {
                        Id = c.Int(false, true),
                        ProjectId = c.Int(false),
                        UserId = c.Int(false),
                        CategoryId = c.Int(false),
                        DateAdded = c.DateTime(),
                        DateModified = c.DateTime(),
                        AddedBy = c.String(),
                        ModifiedBy = c.String(),
                        IsDeleted = c.Boolean(false)
                    })
                .PrimaryKey(t => t.Id);
            CreateTable(
                    "dbo.Users",
                    c => new
                    {
                        Id = c.Int(false, true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Email = c.String(),
                        Password = c.String(),
                        Role = c.Int(false),
                        DateAdded = c.DateTime(),
                        DateModified = c.DateTime(),
                        AddedBy = c.String(),
                        ModifiedBy = c.String(),
                        IsDeleted = c.Boolean(false)
                    })
                .PrimaryKey(t => t.Id);
        }
        public override void Down()
        {
            DropTable("dbo.Users");
            DropTable("dbo.Results");
            DropTable("dbo.Projects");
            DropTable("dbo.Categories");
        }
    }
}