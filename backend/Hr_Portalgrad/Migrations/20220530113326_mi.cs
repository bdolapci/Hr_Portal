using Microsoft.EntityFrameworkCore.Migrations;

namespace HR_Portalgrad.Migrations
{
    public partial class mi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isEmailValid",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "regDate",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "regDate",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "isEmailValid",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
