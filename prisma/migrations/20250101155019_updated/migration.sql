-- CreateTable
CREATE TABLE "Attendence" (
    "id" SERIAL NOT NULL,
    "month" TEXT NOT NULL,
    "userreg" INTEGER NOT NULL,

    CONSTRAINT "Attendence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workingdays" (
    "id" SERIAL NOT NULL,
    "month" TEXT NOT NULL,
    "days" INTEGER NOT NULL,
    "hours" INTEGER NOT NULL,

    CONSTRAINT "Workingdays_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attendence" ADD CONSTRAINT "Attendence_userreg_fkey" FOREIGN KEY ("userreg") REFERENCES "Student"("regno") ON DELETE RESTRICT ON UPDATE CASCADE;
