import type { ColumnDef } from "@tanstack/vue-table";
import { createReusableTemplate } from "@vueuse/core";
import DataTableDropdown from "~/components/admin/DataTableDropdown.vue";
import { formatRupiah } from "~/lib/utils";
import type { CheckoutTableType } from "~/types/checkout";

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{
  payment: {
    id: string;
  };
  onExpand: () => void;
}>();

export const columns: ColumnDef<CheckoutTableType>[] = [
  {
    accessorKey: "order_id",
    header: "Order Id",
    cell: ({ row }) => h("div", row.getValue("order_id")),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => h("div", row.getValue("name")),
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
        row.getValue("status")
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) =>
      h(
        "div",
        {
          class: `text-center capitalize w-fit px-3 rounded-full ${
            row.getValue("type") === "delivery"
              ? "bg-foreground text-white"
              : "border border-foreground"
          }`,
        },
        row.getValue("type")
      ),
  },
  {
    accessorKey: "amount",
    header: () => h("div", "Amount"),
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
        h(DataTableDropdown, { checkout })
      );
    },
  },
];
