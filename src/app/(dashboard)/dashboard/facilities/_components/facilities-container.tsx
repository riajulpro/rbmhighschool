"use client";

import { FacilityTable } from "@/components/tables/facility-table";
import axiosInstance from "@/lib/axios";
import type { IFacility } from "@/types/index";
import { useRouter } from "next/navigation";

export default function FacilitiesPage({
  facilityData: facilities,
}: {
  facilityData: IFacility[];
}) {
  const router = useRouter();

  const handleAdd = async (
    facility: Omit<IFacility, "_id" | "createdAt" | "updatedAt">
  ) => {
    const res = await axiosInstance.post(`/api/facilities`, facility);

    if (res.status === 200 || res.status === 201) {
      router.refresh();
    }
  };

  const handleEdit = async (
    id: string,
    updatedFacility: Partial<IFacility>
  ) => {
    const res = await axiosInstance.put(
      `/api/facilities/${id}`,
      updatedFacility
    );

    if (res.status === 200) {
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await axiosInstance.delete(`/api/facilities/${id}`);

    if (res.status === 200) {
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">School Facilities</h1>
        <p className="text-muted-foreground">
          Manage school facilities, equipment, and resources
        </p>
      </div>

      <FacilityTable
        data={facilities}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
