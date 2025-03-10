using Steeltoe.Discovery.Client;

namespace Project
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			// Add services to the container.
			builder.Services.AddDiscoveryClient(builder.Configuration);
			builder.Services.AddControllers();
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			// Add Steeltoe Discovery Client
			
			var app = builder.Build();

			


			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			//app.UseCors(policy => policy.AllowAnyHeader()
			//	.AllowAnyMethod()
			//	.SetIsOriginAllowed(origin => true)
			//	.AllowCredentials());

			// Use Steeltoe Discovery Client
			app.UseDiscoveryClient();
			//app.UseHttpsRedirection();

			app.UseAuthorization();


			app.MapControllers();

			app.Run();
		}
	}
}
