"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

export default function UserSettingsForm() {
  const { data, update } = useSession();
  const [user, setUser] = useState(
    data?.user || { name: "Riajul", email: "test@gmail.com", role: "student" }
  );
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    if (id === "oldPassword") {
      setOldPassword(value);
    } else if (id === "newPassword") {
      setNewPassword(value);
    }
  };

  const handleUpdateUserInfo = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email: data?.user?.email,
      data: { name: user.name, email: user.email },
    };

    const res = await axiosInstance.post("/api/auth/update/by-email", payload);

    if (res.status === 201 || res.status === 200) {
      toast.success("Personal information updated!");
      await update();
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      toast.warning(
        "Please enter both current and new passwords to change it."
      );
      return;
    }

    const payload = {
      email: user.email,
      oldPassword,
      newPassword,
    };

    const res = await axiosInstance.post("/api/auth/change-password", payload);

    if (res.status === 200 || res.status === 201) {
      toast.success("Password successfully changed!");
    } else if (res.status === 400) {
      toast.error(res.data?.message || "Old password doesn't match");
    } else {
      toast.error("Something went wrong! Please try again.");
    }

    setOldPassword("");
    setNewPassword("");
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your personal information and password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal-info" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>

          <TabsContent value="personal-info" className="mt-6 space-y-6">
            <form onSubmit={handleUpdateUserInfo} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={user.name || "name"}
                  onChange={handleUserInfoChange}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user.email || "email"}
                  onChange={handleUserInfoChange}
                  type="email"
                  placeholder="your@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={user.role}
                  disabled
                  className="cursor-not-allowed bg-gray-100 dark:bg-gray-800"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your role cannot be changed.
                </p>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Save Personal Info</Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="password" className="mt-6 space-y-6">
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="oldPassword">Current Password</Label>
                <Input
                  id="oldPassword"
                  value={oldPassword}
                  onChange={handlePasswordInputChange}
                  type="password"
                  placeholder="Enter your current password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  value={newPassword}
                  onChange={handlePasswordInputChange}
                  type="password"
                  placeholder="Enter your new password"
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Change Password</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
