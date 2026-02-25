import { useQuery } from "@tanstack/vue-query";

export type DashboardSummary = {
  total_revenue: number;
  total_order: number;
  pending_order: number;
  completed_order: number;
  total_customer: number;
  total_product: number;
  low_stock_count: number;
};

export type DashboardSalesTrend = {
  date: string;
  checkout: number;
};

export type DashboardOrderStatus = {
  status: string;
  count: number;
};

export type DashboardTopProduct = {
  id: number;
  name: string;
  slug: string;
  category: string;
  image_path: string;
  sold_quantity: number;
  revenue: number;
};

export type DashboardLowStockVariant = {
  id: number;
  variant: string;
  stock: number;
  price: number;
  product_id: number;
  product_name: string;
  product_slug: string;
};

export type DashboardRecentOrder = {
  order_id: string;
  created_at: string;
  customer_name: string;
  customer_username: string;
  delivery_type: string;
  total_price: number;
  total_item: number;
  order_status: string;
};

export type DashboardOverviewResponse = {
  summary: DashboardSummary;
  sales_trend: DashboardSalesTrend[];
  order_status_breakdown: DashboardOrderStatus[];
  top_products: DashboardTopProduct[];
  low_stock_variants: DashboardLowStockVariant[];
  recent_orders: DashboardRecentOrder[];
};

export const useOverview = () => {
  const { $api } = useNuxtApp();
  const token = useCookie("token");

  return useQuery<DashboardOverviewResponse>({
    queryKey: ["dashboard-overview"],
    queryFn: async () => {
      try {
        const res = await $api.get<{
          success: boolean;
          data: DashboardOverviewResponse;
        }>("dashboard/overview", {
          headers: {
            Authorization: `${token.value}`,
          },
        });
        return res.data.data;
      } catch (err) {
        throw new Error("Gagal mendapatkan data overview");
      }
    },
  });
};
