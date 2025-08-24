"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  X,
  Calendar,
  FileText,
  Award,
  Phone,
  Building,
  User,
} from "lucide-react";

interface Skill {
  title: string;
  completionDate: string;
  description: string;
  certificateUrl: string;
}

interface TeacherData {
  designation: string;
  phone: string;
  institution: string;
  profileImg: string;
  specialization: string[];
  skills: Skill[];
  joiningDate?: string;
  employeeId?: string;
  department?: string;
}

interface TeacherFormProps {
  initialData?: TeacherData;
  onSubmit: (data: TeacherData) => void;
}

export function TeacherForm({ initialData, onSubmit }: TeacherFormProps) {
  const [formData, setFormData] = useState<TeacherData>({
    designation: initialData?.designation || "",
    phone: initialData?.phone || "",
    institution: initialData?.institution || "Rampur Bazar Majidia High School",
    profileImg: initialData?.profileImg || "",
    specialization: initialData?.specialization || [],
    skills: initialData?.skills || [],
  });

  const [newSpecialization, setNewSpecialization] = useState("");

  const addSpecialization = () => {
    if (
      newSpecialization.trim() &&
      !formData.specialization.includes(newSpecialization.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        specialization: [...prev.specialization, newSpecialization.trim()],
      }));
      setNewSpecialization("");
    }
  };

  const removeSpecialization = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specialization: prev.specialization.filter((_, i) => i !== index),
    }));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      title: "",
      completionDate: "",
      description: "",
      certificateUrl: "",
    };
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) =>
        i === index ? { ...skill, [field]: value } : skill
      ),
    }));
  };

  const removeSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Teacher Profile</h1>
        <p className="text-gray-600">
          Update your professional information and skills
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      designation: e.target.value,
                    }))
                  }
                  placeholder="e.g., Senior Mathematics Teacher"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="e.g., +1 (555) 123-4567"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="institution" className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                Institution
              </Label>
              <Input
                id="institution"
                value={formData.institution}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    institution: e.target.value,
                  }))
                }
                placeholder="e.g., Springfield High School"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profileImg">Profile Image URL</Label>
              <Input
                id="profileImg"
                value={formData.profileImg}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    profileImg: e.target.value,
                  }))
                }
                placeholder="https://example.com/profile.jpg"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="joiningDate">Joining Date</Label>
                <Input
                  id="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      joiningDate: e.target.value,
                    }))
                  }
                  placeholder="Joining date e.g 31/12/2023"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      employeeId: e.target.value,
                    }))
                  }
                  placeholder="Employee ID e.g EMP12345"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Joining Date</Label>
              <Input
                id="department"
                type="date"
                value={formData.department}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    department: e.target.value,
                  }))
                }
                placeholder="Joining date e.g 31/12/2023"
              />
            </div>
          </CardContent>
        </Card>

        {/* Specializations */}
        <Card>
          <CardHeader>
            <CardTitle>Specializations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newSpecialization}
                onChange={(e) => setNewSpecialization(e.target.value)}
                placeholder="Add a specialization"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addSpecialization())
                }
              />
              <Button type="button" onClick={addSpecialization} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specialization.map((spec, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {spec}
                  <button
                    type="button"
                    onClick={() => removeSpecialization(index)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Skills & Certifications
            </CardTitle>
            <Button type="button" onClick={addSkill} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Skill
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.skills.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                {`No skills added yet. Click "Add Skill" to get started.`}
              </p>
            ) : (
              formData.skills.map((skill, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-lg">
                        Skill #{index + 1}
                      </h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`skill-title-${index}`}>
                          Skill Title
                        </Label>
                        <Input
                          id={`skill-title-${index}`}
                          value={skill.title}
                          onChange={(e) =>
                            updateSkill(index, "title", e.target.value)
                          }
                          placeholder="e.g., Advanced Mathematics"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor={`skill-date-${index}`}
                          className="flex items-center gap-1"
                        >
                          <Calendar className="h-4 w-4" />
                          Completion Date
                        </Label>
                        <Input
                          id={`skill-date-${index}`}
                          type="date"
                          value={skill.completionDate}
                          onChange={(e) =>
                            updateSkill(index, "completionDate", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label
                        htmlFor={`skill-description-${index}`}
                        className="flex items-center gap-1"
                      >
                        <FileText className="h-4 w-4" />
                        Description
                      </Label>
                      <Textarea
                        id={`skill-description-${index}`}
                        value={skill.description}
                        onChange={(e) =>
                          updateSkill(index, "description", e.target.value)
                        }
                        placeholder="Describe your skill and achievements..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor={`skill-certificate-${index}`}>
                        Certificate URL
                      </Label>
                      <Input
                        id={`skill-certificate-${index}`}
                        value={skill.certificateUrl}
                        onChange={(e) =>
                          updateSkill(index, "certificateUrl", e.target.value)
                        }
                        placeholder="https://example.com/certificate.pdf"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" className="px-8">
            Save Teacher Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
