import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Chip, Button, Tooltip } from "@heroui/react";
import { Eye, XCircle, Truck, PackageCheck } from "lucide-react";
import { getBuyerOrders } from "@/lib/api/orders";

const BuyerOrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;
  const orders = email ? await getBuyerOrders(email) : [];
  console.log(orders)

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
      case "processing":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-6 shadow-sm">
        <h1 className="text-3xl font-black text-slate-950">My Orders</h1>
        <p className="mt-2 text-sm text-slate-500">
          View, track, and manage all your product orders.
        </p>

        <p className="mt-3 text-xs font-semibold text-slate-400">
          Logged in as: {email || "Not logged in"}
        </p>
      </div>

      <div className="overflow-x-auto rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
        <table className="min-w-[900px] w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Seller</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Order Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-sm font-semibold text-slate-500"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-slate-100 text-sm last:border-0"
                >
                  <td className="px-4 py-4">
                    <span className="font-bold text-slate-800">
                      {order._id?.toString().slice(-8).toUpperCase()}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          order?.productInfo?.image ||
                          "/placeholder-product.png"
                        }
                        alt={order?.productInfo?.title || "Product"}
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-bold text-slate-900">
                          {order?.productInfo?.title || "Unknown product"}
                        </p>
                        <p className="text-xs text-slate-400">
                          {order?.productInfo?.category || "N/A"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-slate-600">
                    {order?.sellerInfo?.name || "N/A"}
                  </td>

                  <td className="px-4 py-4 font-bold text-slate-900">
                    ${order?.productInfo?.price || 0}
                  </td>

                  <td className="px-4 py-4 text-slate-500">
                    {order?.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="px-4 py-4">
                    <Chip
                      color={getStatusColor(order?.orderStatus)}
                      size="sm"
                      variant="flat"
                      className="capitalize"
                    >
                      {order?.orderStatus || "pending"}
                    </Chip>
                  </td>

                  <td className="px-4 py-4">
                    <Chip
                      color={
                        order?.paymentStatus === "paid"
                          ? "success"
                          : "warning"
                      }
                      size="sm"
                      variant="flat"
                      className="capitalize"
                    >
                      {order?.paymentStatus || "pending"}
                    </Chip>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Tooltip content="View details">
                        <Button isIconOnly size="sm" variant="light">
                          <Eye className="h-4 w-4 text-slate-500" />
                        </Button>
                      </Tooltip>

                      <Tooltip content="Track order">
                        <Button isIconOnly size="sm" variant="light">
                          <Truck className="h-4 w-4 text-blue-500" />
                        </Button>
                      </Tooltip>

                      {order?.orderStatus === "pending" && (
                        <Tooltip content="Cancel order">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                          >
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                        </Tooltip>
                      )}

                      {order?.orderStatus === "processing" && (
                        <Tooltip content="Order processing">
                          <Button isIconOnly size="sm" variant="light">
                            <PackageCheck className="h-4 w-4 text-green-500" />
                          </Button>
                        </Tooltip>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyerOrdersPage;