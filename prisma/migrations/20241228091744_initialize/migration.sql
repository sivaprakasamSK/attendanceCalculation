-- CreateTable
CREATE TABLE "Student" (
    "regno" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "passowrd" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("regno")
);

-- CreateTable
CREATE TABLE "Admin" (
    "regno" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("regno")
);
