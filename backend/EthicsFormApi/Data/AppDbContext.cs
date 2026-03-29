using Microsoft.EntityFrameworkCore;
using EthicsFormApi.Models;

namespace EthicsFormApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<EthicsApplication> EthicsApplications => Set<EthicsApplication>();
    }
}

// This file defines the Entity Framework Core database context for your application — it's the central bridge between your C# code |
// and the underlying database.

// AppDbContext inherits from EF Core's DbContext, which provides all the functionality for querying, tracking changes, and saving data to a database.

// The constructor accepts a DbContextOptions<AppDbContext> object (typically configured in Program.cs or Startup.cs with a connection string
// and database provider like SQL Server or SQLite) and passes it to the base DbContext constructor. This pattern supports dependency injection —
// the framework creates and configures this context for you.

// The DBSet property exposes the EthicsApplications table as a queryable collection. It uses an expression-bodied property that delegates to
// Set<EthicsApplication>() rather than the more traditional { get; set; } auto-property syntax. Each DbSet<T> maps a C# model class to a database table.

// Key Concepts
// - One DbSet = one table. Right now, the context only manages the EthicsApplication entity/table.
// - EF Core uses this class to generate SQL queries, track changes to objects, and apply migrations.

// Gotchas
// - Expression-bodied DbSet: The => Set<EthicsApplication>() syntax calls Set<>() on every access. In practice this is fine —
//  EF Core caches the DbSet internally — but it's worth knowing this differs from the classic { get; set; } pattern you'll see in most EF Core tutorials.
// - No OnModelCreating override: There's no Fluent API configuration here, so EF Core will rely entirely on data annotations
// on the EthicsApplication model and conventions (e.g., a property named Id becomes the primary key).
// If you need custom table mappings, indexes, or relationships later, you'd override OnModelCreating.