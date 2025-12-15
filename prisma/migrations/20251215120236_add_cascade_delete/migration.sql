-- DropForeignKey
ALTER TABLE "staffs" DROP CONSTRAINT "staffs_organization_id_fkey";

-- AddForeignKey
ALTER TABLE "staffs" ADD CONSTRAINT "staffs_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
