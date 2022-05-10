using Microsoft.EntityFrameworkCore.Migrations;

namespace HR_Portalgrad.Migrations
{
    public partial class up : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProfileId",
                table: "Applicants",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Applicants_ProfileId",
                table: "Applicants",
                column: "ProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applicants_profiles_ProfileId",
                table: "Applicants",
                column: "ProfileId",
                principalTable: "profiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applicants_profiles_ProfileId",
                table: "Applicants");

            migrationBuilder.DropIndex(
                name: "IX_Applicants_ProfileId",
                table: "Applicants");

            migrationBuilder.DropColumn(
                name: "ProfileId",
                table: "Applicants");
        }
    }
}
