using Microsoft.EntityFrameworkCore.Migrations;

namespace HR_Portalgrad.Migrations
{
    public partial class updates3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    firstName = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    lastName = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    email = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    Passwords = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    userRole = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    phoneNumber = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    country = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    gender = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    isEmailValid = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Jobs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    Date = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    category = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    photo = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Jobs_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "profiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Userid = table.Column<int>(type: "int", nullable: false),
                    about = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    experience = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    education = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    certification = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    Facebook = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    Linkedin = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    Twitter = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    website = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Followers = table.Column<int>(type: "int", nullable: false),
                    Following = table.Column<int>(type: "int", nullable: false),
                    Skills = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    photo = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    currentTitle = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_profiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_profiles_Users_Userid",
                        column: x => x.Userid,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "files",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Userid = table.Column<int>(type: "int", nullable: false),
                    Jobid = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    FileType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JobsId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_files", x => x.Id);
                    table.ForeignKey(
                        name: "FK_files_Jobs_JobsId",
                        column: x => x.JobsId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_files_Users_Userid",
                        column: x => x.Userid,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Applicants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    Jobsid = table.Column<int>(type: "int", nullable: false),
                    ProfileId = table.Column<int>(type: "int", nullable: true),
                    isAccepted = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Applicants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Applicants_Jobs_Jobsid",
                        column: x => x.Jobsid,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Applicants_profiles_ProfileId",
                        column: x => x.ProfileId,
                        principalTable: "profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Applicants_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Applicants_Jobsid",
                table: "Applicants",
                column: "Jobsid");

            migrationBuilder.CreateIndex(
                name: "IX_Applicants_ProfileId",
                table: "Applicants",
                column: "ProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Applicants_UserId",
                table: "Applicants",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_files_JobsId",
                table: "files",
                column: "JobsId");

            migrationBuilder.CreateIndex(
                name: "IX_files_Userid",
                table: "files",
                column: "Userid");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_UserId",
                table: "Jobs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_profiles_Userid",
                table: "profiles",
                column: "Userid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Applicants");

            migrationBuilder.DropTable(
                name: "files");

            migrationBuilder.DropTable(
                name: "profiles");

            migrationBuilder.DropTable(
                name: "Jobs");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
