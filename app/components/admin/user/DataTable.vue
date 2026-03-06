<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, ColumnFiltersState } from "@tanstack/vue-table";
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { valueUpdater } from "../../ui/table/utils";

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}>();

const columnFilters = ref<ColumnFiltersState>([]);
const searchValue = ref("");
const sorting = ref([]);

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  initialState: {
    pagination: {
      pageSize: 10,
    },
  },
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  getSortedRowModel: getSortedRowModel(),
  state: {
    get columnFilters() {
      return columnFilters.value;
    },
    get sorting() {
      return sorting.value;
    },
  },
});
</script>

<template>
  <div>
    <div class="flex items-center gap-4 py-4">
      <UiInput
        class="w-full"
        placeholder="Search name or username"
        v-model="searchValue"
      />
    </div>
    <div class="border rounded-md">
      <UiTable>
        <UiTableHeader>
          <UiTableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <UiTableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="font-bold"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <template v-if="table.getRowModel().rows?.length">
            <UiTableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <UiTableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                class="font-medium"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </UiTableCell>
            </UiTableRow>
          </template>
          <template v-else>
            <UiTableRow>
              <UiTableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </UiTableCell>
            </UiTableRow>
          </template>
        </UiTableBody>
      </UiTable>
    </div>
    <div class="flex items-center justify-center py-4">
      <UiPagination
        v-slot="{ page }"
        :total="table.getFilteredRowModel().rows.length"
        :items-per-page="10"
        :sibling-count="1"
        show-edges
        :default-page="1"
        @update:page="(newPage) => table.setPageIndex(newPage - 1)"
      >
        <UiPaginationContent>
          <UiPaginationFirst />
          <UiPaginationPrevious />

          <template v-if="table.getPageCount() <= 7">
            <UiPaginationItem
              v-for="item in table.getPageCount()"
              :key="item"
              :value="item"
              :is-active="page === item"
              as-child
            >
              <span>{{ item }}</span>
            </UiPaginationItem>
          </template>
          <template v-else>
            <UiPaginationItem :value="1" :is-active="page === 1" as-child>
              <span>1</span>
            </UiPaginationItem>

            <UiPaginationEllipsis v-if="page > 3" />

            <template v-for="item in [page - 1, page, page + 1]" :key="item">
              <UiPaginationItem
                v-if="item > 1 && item < table.getPageCount()"
                :value="item"
                :is-active="page === item"
                as-child
              >
                <span>{{ item }}</span>
              </UiPaginationItem>
            </template>

            <UiPaginationEllipsis v-if="page < table.getPageCount() - 2" />

            <UiPaginationItem
              :value="table.getPageCount()"
              :is-active="page === table.getPageCount()"
              as-child
            >
              <span>{{ table.getPageCount() }}</span>
            </UiPaginationItem>
          </template>

          <UiPaginationNext />
          <UiPaginationLast />
        </UiPaginationContent>
      </UiPagination>
    </div>
  </div>
</template>
