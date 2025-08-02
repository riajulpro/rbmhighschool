"use client";

import { useState } from "react";
import { UserTable } from "@/components/tables/user-table";
import { UserRole, type IUser } from "@/types/index";

// Mock data - replace with your actual API calls
const mockUsers: IUser[] = [
  {
    _id: "u1",
    name: "Admin User",
    email: "admin@example.com",
    password: "hashed_password_admin", // In a real app, this would be hashed
    role: UserRole.ADMIN,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2024-07-20"),
  },
  {
    _id: "u2",
    name: "Principal Smith",
    email: "principal@example.com",
    password: "hashed_password_principal",
    role: UserRole.PRINCIPAL,
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2024-06-15"),
  },
  {
    _id: "u3",
    name: "Teacher Johnson",
    email: "teacher@example.com",
    password: "hashed_password_teacher",
    role: UserRole.TEACHER,
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    _id: "u4",
    name: "Student Doe",
    email: "student@example.com",
    password: "hashed_password_student",
    role: UserRole.STUDENT,
    createdAt: new Date("2023-04-20"),
    updatedAt: new Date("2024-04-20"),
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>(mockUsers);

  const handleAdd = async (
    user: Omit<IUser, "_id" | "createdAt" | "updatedAt">
  ) => {
    // In a real application, you would hash the password before saving
    console.log("Adding user:", user);
    const newUser: IUser = {
      ...user,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const handleEdit = async (id: string, updatedUser: Partial<IUser>) => {
    // In a real application, if updatedUser.password exists, you would hash it
    console.log("Editing user:", id, updatedUser);
    setUsers((prev) =>
      prev.map((user) => {
        if (user._id === id) {
          const updatedData = {
            ...user,
            ...updatedUser,
            updatedAt: new Date(),
          };
          // Remove password from the object if it's not being updated or if it's empty
          if (!updatedUser.password) {
            delete updatedData.password;
          }
          return updatedData;
        }
        return user;
      })
    );
  };

  const handleDelete = async (id: string) => {
    // Replace with your actual API call
    setUsers((prev) => prev.filter((user) => user._id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">
          Manage user accounts and roles within the system
        </p>
      </div>

      <UserTable
        data={users}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
