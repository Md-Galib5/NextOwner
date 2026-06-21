import React from "react";
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { Eye, XCircle, Truck, PackageCheck } from "lucide-react";

const BuyerOrdersPage = async () => {
  const orders = [
    {
      _id: "ORD-1001",
      productName: "iPhone 13 Pro",
      sellerName: "Tech ReStore",
      price: "$650",
      orderDate: "20 Jun 2026",
      status: "Pending",
    },
    {
      _id: "ORD-1002",
      productName: "Gaming Keyboard",
      sellerName: "Gadget Hub",
      price: "$45",
      orderDate: "18 Jun 2026",
      status: "Accepted",
    },
    {
      _id: "ORD-1003",
      productName: "Office Chair",
      sellerName: "Home Deals",
      price: "$120",
      orderDate: "15 Jun 2026",
      status: "Cancelled",
    },
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
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
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
        <Table aria-label="Buyer orders management table">
          <Table.ResizableContainer>
            <Table.Content className="min-w-[900px]">
              <Table.Header>
                <Table.Column isRowHeader defaultWidth="1.2fr" id="orderId">
                  Order ID
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="2fr" id="product" minWidth={200}>
                  Product
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="1.5fr" id="seller" minWidth={160}>
                  Seller
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="1fr" id="price" minWidth={100}>
                  Amount
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="1.2fr" id="date" minWidth={130}>
                  Order Date
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="1fr" id="status" minWidth={120}>
                  Status
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column defaultWidth="1.4fr" id="actions" minWidth={160}>
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body emptyContent="No orders found.">
                {orders.map((order) => (
                  <Table.Row key={order._id}>
                    <Table.Cell>
                      <span className="font-semibold text-slate-800">
                        {order._id}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {order.productName}
                        </p>
                        <p className="text-xs text-slate-400">
                          Second-hand marketplace order
                        </p>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-sm text-slate-600">
                        {order.sellerName}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="font-semibold text-slate-900">
                        {order.price}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-sm text-slate-500">
                        {order.orderDate}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <Chip
                        color={getStatusColor(order.status)}
                        size="sm"
                        variant="soft"
                        className="capitalize"
                      >
                        {order.status}
                      </Chip>
                    </Table.Cell>

                    <Table.Cell>
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

                        {order.status === "Pending" && (
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

                        {order.status === "Accepted" && (
                          <Tooltip content="Order accepted">
                            <Button isIconOnly size="sm" variant="light">
                              <PackageCheck className="h-4 w-4 text-green-500" />
                            </Button>
                          </Tooltip>
                        )}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>
      </div>
    </div>
  );
};

export default BuyerOrdersPage;