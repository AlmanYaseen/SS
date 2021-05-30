using SSBOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace SSDAL
{
    public interface IStoryDb
    {
        IQueryable<Story> GetAll();
        IQueryable<Story> GetAll(bool IsApproved);
        IQueryable<Story> GetById(int SSid);
        IQueryable<Story> GetByUserId(string id);
        Task<bool> Create(Story story);
        Task<bool> Update(Story story);
        Task<bool> Delete(int SSid);
        Task<bool> Approve(int SSid);
    }
    public class StoryDb:IStoryDb
    {
        SSDbContext dbcontext ;
        public StoryDb( SSDbContext dbcontext)
        {
            this.dbcontext =  dbcontext;
        }

        public IQueryable<Story> GetAll()
        {
            return dbcontext.Stories;
        }

       
        public IQueryable<Story> GetAll(bool IsApproved)
        {
            return dbcontext.Stories.Where(x => x.IsApproved == IsApproved);
        }

        public IQueryable<Story> GetById(int SSid)
        {
            return dbcontext.Stories.Where(x => x.SSId == SSid);
        }
        public IQueryable<Story> GetByUserId(string id)
        {
            return dbcontext.Stories.Where(x => x.Id == id);
        }
        public async Task<bool> Create(Story story)
        {
            dbcontext.Add(story);
            var result = await dbcontext.SaveChangesAsync();
            if (result != 0)
                return true;
            else
                return false;


        }

        public async Task<bool> Update(Story story)
        {
            dbcontext.Update(story);
            var result = await dbcontext.SaveChangesAsync();
            if (result != 0)
                return true;
            else
                return false;


        }

        public async Task<bool> Delete(int SSid)
        {
            var s = dbcontext.Stories.Find(SSid);
            dbcontext.Remove(s);
            var result = await dbcontext.SaveChangesAsync();
            if (result != 0)
                return true;
            else
                return false;


        }


        public async Task<bool> Approve(int SSid)
        {
            var s = dbcontext.Stories.Find(SSid);
            s.IsApproved = true;
            dbcontext.Update(s);
            var result = await dbcontext.SaveChangesAsync();
            if (result != 0)
                return true;
            else
                return false;


        }


    }
}
