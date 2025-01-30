using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Project.Models
{
    public partial class p16_hostelContext : DbContext
    {
        public p16_hostelContext()
        {
        }

        public p16_hostelContext(DbContextOptions<p16_hostelContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Addresses { get; set; } = null!;
        public virtual DbSet<Contract> Contracts { get; set; } = null!;
        public virtual DbSet<Financialreport> Financialreports { get; set; } = null!;
        public virtual DbSet<Food> Foods { get; set; } = null!;
        public virtual DbSet<Hostler> Hostlers { get; set; } = null!;
        public virtual DbSet<Issue> Issues { get; set; } = null!;
        public virtual DbSet<Mealallocation> Mealallocations { get; set; } = null!;
        public virtual DbSet<Mealplan> Mealplans { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Room> Rooms { get; set; } = null!;
        public virtual DbSet<Roomallocation> Roomallocations { get; set; } = null!;
        public virtual DbSet<Ticket> Tickets { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=p16_hostel", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.2.0-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Address>(entity =>
            {
                entity.ToTable("address");

                entity.Property(e => e.AddressId).HasColumnName("address_id");

                entity.Property(e => e.Area)
                    .HasMaxLength(255)
                    .HasColumnName("area");

                entity.Property(e => e.City)
                    .HasMaxLength(255)
                    .HasColumnName("city");

                entity.Property(e => e.PinCode).HasColumnName("pin_code");

                entity.Property(e => e.State)
                    .HasMaxLength(255)
                    .HasColumnName("state");
            });

            modelBuilder.Entity<Contract>(entity =>
            {
                entity.ToTable("contract");

                entity.HasIndex(e => e.HostlerId, "Hostler_ID");

                entity.Property(e => e.ContractId).HasColumnName("Contract_ID");

                entity.Property(e => e.HostlerId).HasColumnName("Hostler_ID");
            });

            modelBuilder.Entity<Financialreport>(entity =>
            {
                entity.HasKey(e => e.ReportId)
                    .HasName("PRIMARY");

                entity.ToTable("financialreport");

                entity.Property(e => e.ReportId).HasColumnName("Report_ID");
            });

            modelBuilder.Entity<Food>(entity =>
            {
                entity.ToTable("food");

                entity.Property(e => e.FoodId).HasColumnName("Food_ID");

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.Fname)
                    .HasMaxLength(255)
                    .HasColumnName("FName");
            });

            modelBuilder.Entity<Hostler>(entity =>
            {
                entity.ToTable("hostler");

                entity.HasIndex(e => e.AddressId, "UK8b0k0cww1si4bnx2ec5g04a4p")
                    .IsUnique();

                entity.HasIndex(e => e.UserId, "UKaj0xsa58120yx3wqmgou30wnu")
                    .IsUnique();

                entity.Property(e => e.HostlerId).HasColumnName("hostler_id");

                entity.Property(e => e.AddressId).HasColumnName("address_id");

                entity.Property(e => e.Dateofbirth)
                    .HasMaxLength(255)
                    .HasColumnName("dateofbirth");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .HasColumnName("email");

                entity.Property(e => e.Firstname)
                    .HasMaxLength(255)
                    .HasColumnName("firstname");

                entity.Property(e => e.Lastname)
                    .HasMaxLength(255)
                    .HasColumnName("lastname");

                entity.Property(e => e.Phonenumber)
                    .HasMaxLength(255)
                    .HasColumnName("phonenumber");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Address)
                    .WithOne(p => p.Hostler)
                    .HasForeignKey<Hostler>(d => d.AddressId)
                    .HasConstraintName("FK392fi11gpdqumxgcu4b4llorc");

                entity.HasOne(d => d.User)
                    .WithOne(p => p.Hostler)
                    .HasForeignKey<Hostler>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FKpj5cd8y5iokq4krtmxnkcwd1i");
            });

            modelBuilder.Entity<Issue>(entity =>
            {
                entity.ToTable("issue");

                entity.Property(e => e.IssueId).HasColumnName("Issue_ID");

                entity.Property(e => e.IssueName)
                    .HasMaxLength(255)
                    .HasColumnName("Issue_Name");
            });

            modelBuilder.Entity<Mealallocation>(entity =>
            {
                entity.HasKey(e => e.MaId)
                    .HasName("PRIMARY");

                entity.ToTable("mealallocation");

                entity.HasIndex(e => e.HId, "fk_hostler_mealallocation");

                entity.Property(e => e.MaId).HasColumnName("MA_ID");

                entity.Property(e => e.HId).HasColumnName("h_ID");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .HasColumnName("status");

                entity.HasOne(d => d.HIdNavigation)
                    .WithMany(p => p.Mealallocations)
                    .HasForeignKey(d => d.HId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_hostler_mealallocation");
            });

            modelBuilder.Entity<Mealplan>(entity =>
            {
                entity.HasKey(e => e.MpId)
                    .HasName("PRIMARY");

                entity.ToTable("mealplan");

                entity.HasIndex(e => e.FoodId, "fk_food_mealplan");

                entity.Property(e => e.MpId).HasColumnName("MP_ID");

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.FoodId).HasColumnName("Food_ID");

                entity.Property(e => e.Status).HasColumnType("enum('B','L','D')");

                entity.HasOne(d => d.Food)
                    .WithMany(p => p.Mealplans)
                    .HasForeignKey(d => d.FoodId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_food_mealplan");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.RId)
                    .HasName("PRIMARY");

                entity.ToTable("role");

                entity.Property(e => e.RId).HasColumnName("R_ID");

                entity.Property(e => e.RName)
                    .HasMaxLength(255)
                    .HasColumnName("R_Name");
            });

            modelBuilder.Entity<Room>(entity =>
            {
                entity.ToTable("room");

                entity.Property(e => e.RoomId).HasColumnName("room_id");

                entity.Property(e => e.Capacity).HasColumnName("capacity");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.RoomNo).HasColumnName("room_no");

                entity.Property(e => e.RoomType)
                    .HasMaxLength(255)
                    .HasColumnName("room_type");

                entity.Property(e => e.Status)
                    .HasColumnType("enum('AVAILABLE','FULL')")
                    .HasColumnName("status");
            });

            modelBuilder.Entity<Roomallocation>(entity =>
            {
                entity.HasKey(e => e.RoomAllocId)
                    .HasName("PRIMARY");

                entity.ToTable("roomallocation");

                entity.HasIndex(e => e.HostlerId, "FK625a8nfe5sr3l63gsxk5rk4te");

                entity.HasIndex(e => e.RoomId, "FKlcqdl3pm4pqj03tfd1dhp5j9r");

                entity.Property(e => e.RoomAllocId).HasColumnName("room_alloc_id");

                entity.Property(e => e.Allocationdate).HasColumnName("allocationdate");

                entity.Property(e => e.HostlerId).HasColumnName("hostler_id");

                entity.Property(e => e.RoomId).HasColumnName("room_id");

                entity.HasOne(d => d.Hostler)
                    .WithMany(p => p.Roomallocations)
                    .HasForeignKey(d => d.HostlerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK625a8nfe5sr3l63gsxk5rk4te");

                entity.HasOne(d => d.Room)
                    .WithMany(p => p.Roomallocations)
                    .HasForeignKey(d => d.RoomId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FKlcqdl3pm4pqj03tfd1dhp5j9r");
            });

            modelBuilder.Entity<Ticket>(entity =>
            {
                entity.ToTable("ticket");

                entity.HasIndex(e => e.HostlerId, "Hostler_ID");

                entity.HasIndex(e => e.IssueId, "Issue_ID");

                entity.Property(e => e.TicketId).HasColumnName("Ticket_ID");

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.HostlerId).HasColumnName("Hostler_ID");

                entity.Property(e => e.IssueId).HasColumnName("Issue_ID");

                entity.HasOne(d => d.Issue)
                    .WithMany(p => p.Tickets)
                    .HasForeignKey(d => d.IssueId)
                    .HasConstraintName("ticket_ibfk_2");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.HasIndex(e => e.RId, "FK8lwi4plrarkg8sbkrphacf8it");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");

                entity.Property(e => e.RId).HasColumnName("r_id");

                entity.Property(e => e.UserName)
                    .HasMaxLength(255)
                    .HasColumnName("user_name");

                entity.HasOne(d => d.RIdNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RId)
                    .HasConstraintName("FK8lwi4plrarkg8sbkrphacf8it");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
