#region
using System;
using System.Data.Entity;
using System.Linq;
using WATG_DesignAwardsPortal.Contracts;
using WATG_DesignAwardsPortal.Contracts.IRepository;
using WATG_DesignAwardsPortal.Model.Classes;
#endregion

namespace WATG_DesignAwardsPortal.Data.Repository
{
    public class ResultRepository : IResultRepository
    {
        private readonly IDesignAwardsContext _db;
        public ResultRepository()
        {
            _db = new DesignAwardsContext();
        }
        public ResultRepository(DesignAwardsContext db)
        {
            _db = db;
        }
        public IQueryable<Result> GetAll()
        {
            return _db.Results.Where(p => p.IsDeleted == false);
        }
        public bool Save(Result item, string userName)
        {
            var result = true;
            try
            {
                var dbItem = new Result();
                var isNew = false;
                var check = _db.Results.Where(p => p.Id == item.Id && p.IsDeleted == false).ToList();
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
                dbItem.ProjectId = item.ProjectId;
                dbItem.CategoryId = item.CategoryId;
                dbItem.UserId = item.UserId;
                dbItem.IsDeleted = false;
                if (isNew)
                {
                    _db.Entry(dbItem).State = EntityState.Added;
                    _db.Results.Add(dbItem);
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