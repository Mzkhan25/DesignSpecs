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
    public class ItemRepository : IItemRepository
    {
        private readonly IDesignSmartContext _db;
        public ItemRepository()
        {
            _db = new DesignSmartContext();
        }
        public ItemRepository(DesignSmartContext db)
        {
            _db = db;
        }

        public IQueryable<Item> GetAll()
        {
            return _db.Items.Where(p => p.IsDeleted == false);
        }
        public bool Save(Item item, string userName)
        {
            var result = true;
            try
            {
                var dbItem = new Item();
                var isNew = false;
                var check = _db.Items.Where(p => p.ProjectId == item.Id && p.IsDeleted == false).ToList();
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

                dbItem = Mapper.Map<Item, Item>(item);

                //if (image != null)
                //{
                //    var target = new MemoryStream();
                //    image.InputStream.CopyTo(target);
                //    dbItem.DisplayImage = target.ToArray();
                //}

                dbItem.IsDeleted = false;
                if (isNew)
                {
                    _db.Entry(dbItem).State = EntityState.Added;
                    dbItem.DateAdded = DateTime.UtcNow;
                    _db.Items.Add(dbItem);
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