#region
using AutoMapper;
using System;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using WATG_DesignSmartPortal.Contracts;
using WATG_DesignSmartPortal.Contracts.IRepository;
using WATG_DesignSmartPortal.Model.Classes;
#endregion

namespace WATG_DesignSmartPortal.Data.Repository
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly IDesignSmartContext _db;
        public ProjectRepository()
        {
            _db = new DesignSmartContext();
        }
        public ProjectRepository(DesignSmartContext db)
        {
            _db = db;
        }
        public IQueryable<Project> GetAll()
        {
            return _db.Projects.Where(p => p.IsDeleted == false);
        }
        public bool Save(Project project, HttpPostedFileBase image, string userName)
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

                Mapper.Initialize(c =>
                {
                    c.CreateMap<Project, Project>();
                });

                dbItem = Mapper.Map<Project, Project>(project);

                if (image != null)
                {
                    var target = new MemoryStream();
                    image.InputStream.CopyTo(target);
                    dbItem.DisplayImage = target.ToArray();
                }
              
                dbItem.IsDeleted = false;
                if (isNew)
                {
                    _db.Entry(dbItem).State = EntityState.Added;
                    dbItem.DateAdded = DateTime.UtcNow;
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