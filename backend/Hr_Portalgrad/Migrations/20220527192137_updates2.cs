using Microsoft.EntityFrameworkCore.Migrations;

namespace HR_Portalgrad.Migrations
{
    public partial class updates2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isCompanyVerified",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isCompanyVerified",
                table: "Users");
        }
    }
}
