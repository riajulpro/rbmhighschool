"use client";

import { AdmissionTable } from "@/components/tables/admission-table";
import type { IAdmission } from "@/types/index";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function AdmissionsPage({
  admissionData: admissions,
}: {
  admissionData: IAdmission[];
}) {
  const router = useRouter();

  const handleAdd = async (
    admission: Omit<IAdmission, "_id" | "createdAt" | "updatedAt">
  ) => {
    const res = await axiosInstance.post(`/api/admissions`, admission);

    if (res.status === 200 || res.status === 201) {
      router.refresh();
    }
  };

  const handleEdit = async (
    id: string,
    updatedAdmission: Partial<IAdmission>
  ) => {
    // Replace with your actual API call
    const res = await axiosInstance.put(
      `/api/admissions/${id}`,
      updatedAdmission
    );

    if (res.status === 200) {
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await axiosInstance.delete(`/api/admissions/${id}`);

    if (res.status === 200) {
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admissions Management</h1>
        <p className="text-muted-foreground">
          Manage student admission records and applications
        </p>
      </div>

      <AdmissionTable
        data={admissions}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
