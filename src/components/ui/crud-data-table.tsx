/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { MoreHorizontal, Plus, Search, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type {
  BaseDocument,
  CrudTableProps,
  FormField,
  SubjectResult,
} from "@/types/index";

export function CrudDataTable<T extends BaseDocument>({
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  title,
  createFormFields,
  editFormFields,
}: CrudTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  // Dialog states
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<T | null>(null);
  const [formData, setFormData] = React.useState<Record<string, any>>({});

  // Add actions column to the provided columns
  const tableColumns: ColumnDef<T>[] = [
    ...columns,
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedItem(item);
                  // Initialize formData with item values, applying defaultValue functions
                  const initialFormData: Record<string, any> = {};
                  editFormFields.forEach((field) => {
                    if (field.defaultValue) {
                      initialFormData[field.name] = field.defaultValue(item);
                    } else {
                      initialFormData[field.name] = (item as any)[field.name];
                    }
                  });
                  setFormData(initialFormData);
                  setIsEditOpen(true);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSelectedItem(item);
                  setIsDeleteOpen(true);
                }}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns: tableColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  const handleCreate = async () => {
    try {
      await onAdd(formData as Omit<T, "_id" | "createdAt" | "updatedAt">);
      setIsCreateOpen(false);
      setFormData({});
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleEdit = async () => {
    if (!selectedItem?._id) return;
    try {
      await onEdit(selectedItem._id, formData as Partial<T>);
      setIsEditOpen(false);
      setFormData({});
      setSelectedItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem?._id) return;
    try {
      await onDelete(selectedItem._id);
      setIsDeleteOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const renderFormField = (
    field: FormField,
    value: any,
    onChange: (value: any) => void
  ) => {
    switch (field.type) {
      case "select":
        return (
          <Select value={value || ""} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue
                placeholder={field.placeholder || `Select ${field.label}`}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "textarea":
        return (
          <Textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
        );
      case "date":
        return (
          <Input
            type="date"
            value={value ? new Date(value).toISOString().split("T")[0] : ""}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case "password":
        return (
          <Input
            type="password"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
        );
      case "subject-list":
        const currentSubjects = (value || []) as SubjectResult[];

        const handleSubjectChange = (
          index: number,
          subField: string,
          subValue: any
        ) => {
          const updatedSubjects = [...currentSubjects];
          updatedSubjects[index] = {
            ...updatedSubjects[index],
            [subField]: subValue,
          };
          onChange(updatedSubjects); // Update parent formData
        };

        const addSubject = () => {
          onChange([
            ...currentSubjects,
            { subject: "", marks: 0, grade: "", point: 0, comments: "" },
          ]);
        };

        const removeSubject = (index: number) => {
          const updatedSubjects = currentSubjects.filter((_, i) => i !== index);
          onChange(updatedSubjects);
        };

        return (
          <div className="space-y-4">
            {currentSubjects.map((sub, index) => (
              <div key={index} className="border p-3 rounded-md relative">
                <h5 className="font-semibold mb-2 text-sm">
                  Subject {index + 1}
                </h5>
                {field.subjectFields?.map((subFieldDef) => (
                  <div
                    key={subFieldDef.name}
                    className="grid grid-cols-4 items-center gap-4 mb-2"
                  >
                    <Label
                      htmlFor={`${field.name}-${index}-${subFieldDef.name}`}
                      className="text-right text-xs"
                    >
                      {subFieldDef.label}
                    </Label>
                    <div className="col-span-3">
                      {/* Recursively call renderFormField for nested subject fields */}
                      {renderFormField(
                        subFieldDef,
                        (sub as any)[subFieldDef.name],
                        (val) =>
                          handleSubjectChange(index, subFieldDef.name, val)
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSubject(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSubject}
              className="w-full bg-transparent"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Subject
            </Button>
          </div>
        );
      default:
        return (
          <Input
            type={field.type}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${title.toLowerCase()}...`}
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(String(event.target.value))}
            className="max-w-sm"
          />
        </div>
        <Button
          onClick={() => {
            setFormData({}); // Clear form data for new entry
            setIsCreateOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add {title.slice(0, -1)}
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New {title.slice(0, -1)}</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new{" "}
              {title.toLowerCase().slice(0, -1)}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {createFormFields.map((field) => (
              <div
                key={field.name}
                className="grid grid-cols-4 items-center gap-4"
              >
                <Label htmlFor={field.name} className="text-right">
                  {field.label}
                </Label>
                <div className="col-span-3">
                  {renderFormField(field, formData[field.name], (value) =>
                    setFormData((prev) => ({ ...prev, [field.name]: value }))
                  )}
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleCreate}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit {title.slice(0, -1)}</DialogTitle>
            <DialogDescription>
              Make changes to the {title.toLowerCase().slice(0, -1)} details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {editFormFields.map((field) => (
              <div
                key={field.name}
                className="grid grid-cols-4 items-center gap-4"
              >
                <Label htmlFor={field.name} className="text-right">
                  {field.label}
                </Label>
                <div className="col-span-3">
                  {renderFormField(field, formData[field.name], (value) =>
                    setFormData((prev) => ({ ...prev, [field.name]: value }))
                  )}
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the{" "}
              {title.toLowerCase().slice(0, -1)}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
