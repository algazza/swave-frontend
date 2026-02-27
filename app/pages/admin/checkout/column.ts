import type { ColumnDef } from "@tanstack/vue-table";
import { createReusableTemplate } from "@vueuse/core";
import { formatDate, formatRupiah } from "~/lib/utils";
import type { CheckoutTableType } from "~/types/checkout";
import DataTableDropdown from "~/components/admin/checkout/DataTableDropdown.vue";
import { ArrowUpDown } from "lucide-vue-next";

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{
  payment: {
    id: string;
  };
  onExpand: () => void;
}>();

export const columns: ColumnDef<CheckoutTableType>[] = [
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return h(
        "div",
        {
          class: "flex items-center gap-2 cursor-pointer",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        [h("span", "Created At"), h(ArrowUpDown, { class: "h-4 w-4" })],
      );
    },
    cell: ({ row }) => {
      const formatted = formatDate(row.getValue("created_at"));
      return h("div", formatted);
    },
  },
  {
    accessorKey: "order_id",
    header: "Order Id",
    cell: ({ row }) => h("div", row.getValue("order_id")),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => h("div", row.getValue("name")),
    filterFn: (row, filterValue) => {
      const searchLower = String(filterValue).toLowerCase();
      const name = String(row.getValue("name") || "").toLowerCase();
      const orderId = String(row.getValue("order_id") || "").toLowerCase();
      return name.includes(searchLower) || orderId.includes(searchLower);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value = row.getValue("status");
      return h(
        "div",
        {
          class: `capitalize font-semibold ${
            value === "pending"
              ? "text-accent"
              : value === "delivery"
                ? "text-success-blue"
                : value === "success"
                  ? "text-success-green"
                  : "text-destructive"
          }`,
        },
        row.getValue("status"),
      );
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue === "all") return true;
      return row.getValue(columnId) === filterValue;
    },
  },
  {
    accessorKey: "delivery",
    header: "Type",
    cell: ({ row }) =>
      h(
        "div",
        {
          class: `text-center capitalize w-fit px-3 rounded-full ${
            row.getValue("delivery") === "delivery"
              ? "bg-foreground text-white"
              : "border border-foreground"
          }`,
        },
        row.getValue("delivery"),
      ),
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue === "all") return true;
      return row.getValue(columnId) === filterValue;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return h(
        "div",
        {
          class: "flex items-center gap-2 cursor-pointer",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        [h("span", "Amount"), h(ArrowUpDown, { class: "h-4 w-4" })],
      );
    },
    cell: ({ row }) => {
      const formatted = `Rp${formatRupiah(row.getValue("amount"))}`;
      return h("div", formatted);
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const checkout = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DataTableDropdown, { checkout }),
      );
    },
  },
];
