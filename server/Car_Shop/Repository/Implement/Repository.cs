using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;
using Repository.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Database;

namespace Repository.Implement
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly CarShopDBContext _context;

        public Repository(CarShopDBContext context)
        {
            _context = context;
        }
        public void Update(T entity)
        {

            try
            {
                EntityEntry entry = _context.Entry<T>(entity);
                entry.State = EntityState.Modified;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.ToString());
            }
        }
        public void Delete(T entity)
        {
            try
            {
                EntityEntry entry = _context.Entry<T>(entity);
                entry.State = EntityState.Deleted;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.ToString());
            }
        }

        public void Create(T entity)
        {
            try
            {
                EntityEntry entry = _context.Entry<T>(entity);
                entry.State = EntityState.Added;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.ToString());
            }
        }

        public async Task InsertRangeAsync(IEnumerable<T> entities)
        {
            await _context.Set<T>().AddRangeAsync(entities);
        }

        public async Task CommitChangeAsync()
        {
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        public async Task<IEnumerable<T>> GetDataIncludeAsync(Expression<Func<T, bool>> expression = null, Expression<Func<T, object>> include1 = null, Expression<Func<T, object>> include2 = null, Expression<Func<T, object>> include3 = null)
        {
            IQueryable<T> query = _context.Set<T>();
            if (expression != null)
            {
                query = query.Where(expression);
            }
            if (include1 != null)
            {
                query = query.Include(include1);
            }
            if (include2 != null)
            {
                query = query.Include(include2);
            }
            if (include3 != null)
            {
                query = query.Include(include3);
            }
            IEnumerable<T> result = await query.ToListAsync();
            return result;
        }

        public async Task<T> GetObjectByCondition(Expression<Func<T, bool>> expression, Expression<Func<T, object>> include1 = null, Expression<Func<T, object>> include2 = null, Expression<Func<T, object>> include3 = null)
        {
            try
            {
                IQueryable<T> query = _context.Set<T>();
                if (expression != null)
                {
                    query = query.Where(expression);

                }
                if (include1 != null)
                {
                    query = query.Include(include1);
                }
                if (include2 != null)
                {
                    query = query.Include(include2);
                }
                if (include3 != null)
                {
                    query = query.Include(include3);
                }
                T result = await query.FirstOrDefaultAsync();
                return result;

            }
            catch (Exception)
            {

                throw;
            }

        }

        public async Task<IEnumerable<T>> GetDataAsync(Expression<Func<T, bool>> expression = null)
        {
            try
            {
                if (expression == null)
                {
                    return await _context.Set<T>().ToListAsync();
                }
                return await _context.Set<T>().Where(expression).ToListAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }


    }
}
