/*
  Warnings:

  - Added the required column `daysOfWeek` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_userId_fkey";

-- AlterTable
-- First, add the column with a default value
ALTER TABLE "Medication" ADD COLUMN     "daysOfWeek" TEXT DEFAULT '1,2,3,4,5,6,7',
ADD COLUMN     "dependentUserId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- Then, make it non-nullable
ALTER TABLE "Medication" ALTER COLUMN "daysOfWeek" SET NOT NULL,
ALTER COLUMN "daysOfWeek" DROP DEFAULT;

-- CreateTable
CREATE TABLE "DependentUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DependentUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disease" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DependentUserToDisease" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DependentUserToDisease_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DiseaseToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DiseaseToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DependentUserToDisease_B_index" ON "_DependentUserToDisease"("B");

-- CreateIndex
CREATE INDEX "_DiseaseToUser_B_index" ON "_DiseaseToUser"("B");

-- AddForeignKey
ALTER TABLE "DependentUser" ADD CONSTRAINT "DependentUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_dependentUserId_fkey" FOREIGN KEY ("dependentUserId") REFERENCES "DependentUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependentUserToDisease" ADD CONSTRAINT "_DependentUserToDisease_A_fkey" FOREIGN KEY ("A") REFERENCES "DependentUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependentUserToDisease" ADD CONSTRAINT "_DependentUserToDisease_B_fkey" FOREIGN KEY ("B") REFERENCES "Disease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiseaseToUser" ADD CONSTRAINT "_DiseaseToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Disease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiseaseToUser" ADD CONSTRAINT "_DiseaseToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
