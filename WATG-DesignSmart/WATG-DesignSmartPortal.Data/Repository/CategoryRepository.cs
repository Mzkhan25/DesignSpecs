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
    public class CategoryRepository : ICategoryRepository
    {
        private readonly IDesignAwardsContext _db;
        public CategoryRepository()
        {
            _db = new DesignAwardsContext();
        }
        public CategoryRepository(DesignAwardsContext db)
        {
            _db = db;
        }
        public IQueryable<Category> GetAll()
        {
            return _db.Categories.Where(p => p.IsDeleted == false);
        }
        public bool Save(HttpPostedFileBase httpPostedFileBases, string name, string userName)
        {
            var result = true;
            try
            {
                var dbItem = new Category();
                var isNew = false;
                var check = _db.Categories.Where(p => p.CategoryName == name && p.IsDeleted == false).ToList();
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
                httpPostedFileBases.InputStream.CopyTo(target);
                dbItem.Image = target.ToArray();
                dbItem.CategoryName = name;
                dbItem.IsDeleted = false;
                if (isNew)
                {
                    _db.Entry(dbItem).State = EntityState.Added;
                    _db.Categories.Add(dbItem);
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
            var result = true;
            try
            {
                var dbitem = _db.Categories.Find(id);
                if (dbitem != null)
                {
                    dbitem.DateModified = DateTime.UtcNow;
                    dbitem.IsDeleted = true;
                    dbitem.ModifiedBy = userName;
                    dbitem.DateModified = DateTime.UtcNow;
                    _db.Entry(dbitem).State = EntityState.Modified;
                }
                _db.SaveChanges();
            }
            catch (Exception exception)
            {
                result = false;
            }
            return result;
        }
    }
}