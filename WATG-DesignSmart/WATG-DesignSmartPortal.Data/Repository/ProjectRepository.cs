#region
using System;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using WATG_DesignAwardsPortal.Contracts;
using WATG_DesignAwardsPortal.Contracts.IRepository;
using WATG_DesignAwardsPortal.Model.Classes;
#endregion

namespace WATG_DesignAwardsPortal.Data.Repository
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly IDesignAwardsContext _db;
        public ProjectRepository()
        {
            _db = new DesignAwardsContext();
        }
        public ProjectRepository(DesignAwardsContext db)
        {
            _db = db;
        }
        public IQueryable<Project> GetAll()
        {
            return _db.Projects.Where(p => p.IsDeleted == false);
        }
        public bool Save(Project project, HttpPostedFileBase image, HttpPostedFileBase document, string userName)
        {
            var result = true;
            try
            {
                var dbItem = new Project();
                var isNew = false;
                var check = _db.Projects.Where(p => p.Id == project.Id && p.IsDeleted == false).ToList();
                if (check.Count > 0)
                {
                    dbItem = check.First();
                    _db.Entry(dbItem).State = EntityState.Modified;
                    dbItem.ModifiedBy = userName;
                    dbItem.DateModified = DateTime.UtcNow;
                }
                else
                {
                    dbItem.DateAdded = DateTime.UtcNow;
                    dbItem.AddedBy = userName;
                    isNew = true;
                }
                var target = new MemoryStream();
                image.InputStream.CopyTo(target);
                dbItem.DisplayImage = target.ToArray();
                dbItem.PdfPath = project.PdfPath;
                dbItem.Title = project.Title;
                dbItem.CategoryId = project.CategoryId;
                dbItem.Office = project.Office;
                dbItem.Description = project.Description;
                dbItem.IsDeleted = false;
                if (isNew)
                {
                    _db.Entry(dbItem).State = EntityState.Added;
                    _db.Projects.Add(dbItem);
                }
                _db.SaveChanges();
            }
            catch (Exception)
            {
                result = false;
            }
            return result;
        }
        public bool Delete(int id, string userName)
        {
            throw new NotImplementedException();
        }
    }
}