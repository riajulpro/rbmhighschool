"use client";

import { VacancyTable } from "@/components/tables/vacancy-table";
import type { IVacancy } from "@/types/index";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function VacancyContainer({
  vacancyData: vacancies,
}: {
  vacancyData: IVacancy[];
}) {
  const router = useRouter();

  const handleAdd = async (
    vacancy: Omit<IVacancy, "_id" | "createdAt" | "updatedAt">
  ) => {
    const res = await axiosInstance.post(`/api/vacancies`, vacancy);

    if (res.status === 200 || res.status === 201) {
      router.refresh();
    }
  };

  const handleEdit = async (id: string, updatedvacancy: Partial<IVacancy>) => {
    const res = await axiosInstance.put(`/api/vacancies/${id}`, updatedvacancy);

    if (res.status === 200) {
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    // Replace with your actual API call
    const res = await axiosInstance.delete(`/api/vacancies/${id}`);

    if (res.status === 200) {
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">School vacancies</h1>
        <p className="text-muted-foreground">
          Manage school administration and vacancy members
        </p>
      </div>

      <VacancyTable
        data={vacancies}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
