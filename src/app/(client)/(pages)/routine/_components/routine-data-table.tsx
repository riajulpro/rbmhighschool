"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Clock, MapPin, User, BookOpen } from "lucide-react";
import { IClassRoutine } from "@/types/class-routine";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "Computer Science",
];

export default function RoutineDataTable({
  routineData,
}: {
  routineData: IClassRoutine[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedSection, setSelectedSection] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  // Get unique values for filters
  const uniqueClasses = Array.from(
    new Set(routineData.map((item) => item.class))
  ).sort();
  const uniqueSections = Array.from(
    new Set(routineData.map((item) => item.section))
  ).sort();

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    return routineData.filter((routine) => {
      const matchesSearch =
        routine.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        routine.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        routine.room?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        routine.class.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesClass =
        selectedClass === "all" || routine.class === selectedClass;
      const matchesSection =
        selectedSection === "all" || routine.section === selectedSection;
      const matchesDay = selectedDay === "all" || routine.day === selectedDay;
      const matchesSubject =
        selectedSubject === "all" || routine.subject === selectedSubject;

      return (
        matchesSearch &&
        matchesClass &&
        matchesSection &&
        matchesDay &&
        matchesSubject
      );
    });
  }, [
    routineData,
    searchTerm,
    selectedClass,
    selectedSection,
    selectedDay,
    selectedSubject,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedClass("all");
    setSelectedSection("all");
    setSelectedDay("all");
    setSelectedSubject("all");
  };

  const getDayBadgeColor = (day: string) => {
    const colors: Record<string, string> = {
      Monday: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Tuesday:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Wednesday:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      Thursday:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Friday: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      Saturday:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      Sunday: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    return (
      colors[day] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Class Routine Management
          </CardTitle>
          <CardDescription>
            Manage and view class schedules, subjects, and teacher assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by subject, teacher, room, or class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {uniqueClasses.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      Class {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedSection}
                onValueChange={setSelectedSection}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  {uniqueSections.map((section) => (
                    <SelectItem key={section} value={section}>
                      Section {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Days</SelectItem>
                  {days.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredData.length} of {routineData.length} routines
            </p>
          </div>

          {/* Data Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Class</TableHead>
                  <TableHead className="w-[80px]">Section</TableHead>
                  <TableHead className="w-[120px]">Day</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead className="w-[140px]">Time</TableHead>
                  <TableHead>Room</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No routines found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((routine) => (
                    <TableRow key={routine._id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <Badge variant="outline">Class {routine.class}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{routine.section}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getDayBadgeColor(routine.day)}>
                          {routine.day}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          {routine.subject}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {routine.teacher}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div className="text-sm">
                            <div>{routine.startTime}</div>
                            <div className="text-muted-foreground">
                              to {routine.endTime}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {routine.room ? (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {routine.room}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">
                            Not assigned
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
