using Core.Entities;

namespace Core.Interfaces
{
    public interface IProductrepository
    {
        Task<Product> GetProductByIdAsync(int id);
        Task<IReadOnlyList<Product>> GetProductsAsync();
    }
}