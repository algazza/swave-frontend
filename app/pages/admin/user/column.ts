import type { ColumnDef } from "@tanstack/vue-table";
import type { AllUserAdminType } from "~/types/user";
import DataTableDropdown from "~/components/admin/user/DataTableDropdown.vue";

export const columns: ColumnDef<AllUserAdminType>[] = [
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => h("div", row.getValue("username")),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => h("div", row.getValue("name")),
    filterFn: (row, filterValue) => {
      const searchLower = String(filterValue).toLowerCase();
      const name = String(row.getValue("name") || "").toLowerCase();
      return name.includes(searchLower);
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => h("div", row.getValue("phone")),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DataTableDropdown, { user }),
      );
    },
  },
];
