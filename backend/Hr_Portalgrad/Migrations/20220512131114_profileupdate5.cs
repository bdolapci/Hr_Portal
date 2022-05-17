using Microsoft.EntityFrameworkCore.Migrations;

namespace HR_Portalgrad.Migrations
{
    public partial class profileupdate5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_profiles_Users_UserId",
                table: "profiles");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "profiles",
                newName: "Userid");

            migrationBuilder.RenameIndex(
                name: "IX_profiles_UserId",
                table: "profiles",
                newName: "IX_profiles_Userid");

            migrationBuilder.AddForeignKey(
                name: "FK_profiles_Users_Userid",
                table: "profiles",
                column: "Userid",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_profiles_Users_Userid",
                table: "profiles");

            migrationBuilder.RenameColumn(
                name: "Userid",
                table: "profiles",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_profiles_Userid",
                table: "profiles",
                newName: "IX_profiles_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_profiles_Users_UserId",
                table: "profiles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
