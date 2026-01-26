import { getUserOrders } from "@/app/services/order.service";
import {
  Package,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle2,
  Clock,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { OrdersResponse } from "@/app/interfaces/alluserorders.interface";

export default async function AllOrdersPage() {
  const orders: OrdersResponse = await getUserOrders();

  if (!orders?.data || orders.data.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Package className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Orders Yet
          </h2>
          <p className="text-gray-600 mb-6">
            Start shopping to see your orders here!
          </p>
          <Link
            href="/products"
            className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-linear-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">
            Track and manage your orders • {orders.data.length}{" "}
            {orders.data.length === 1 ? "order" : "orders"} total
          </p>
        </div>

        {/* Orders Grid */}
        <div className="space-y-6">
          {orders.data.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-linear-to-r from-gray-50 to-white p-6 border-b border-gray-100">
                <div className="flex flex-wrap gap-4 justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ShoppingBag className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">
                        Order ID:
                      </span>
                      <span className="text-sm font-mono text-gray-900">
                        #{order.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {/* Payment Status */}
                    <Badge
                      variant={order.isPaid ? "default" : "secondary"}
                      className={`${
                        order.isPaid
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      } flex items-center gap-1`}
                    >
                      {order.isPaid ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          Paid
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" />
                          Pending Payment
                        </>
                      )}
                    </Badge>

                    {/* Delivery Status */}
                    <Badge
                      variant={order.isDelivered ? "default" : "secondary"}
                      className={`${
                        order.isDelivered
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } flex items-center gap-1`}
                    >
                      <Truck className="w-3 h-3" />
                      {order.isDelivered ? "Delivered" : "In Transit"}
                    </Badge>

                    {/* Payment Method */}
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <CreditCard className="w-3 h-3" />
                      {order.paymentMethodType === "card"
                        ? "Card"
                        : "Cash on Delivery"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Items ({order.cartItems.length})
                </h3>

                <div className="grid gap-4 mb-6">
                  {order.cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="relative w-20 h-20 shrink-0 bg-white rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 mb-1 line-clamp-1">
                          {item.product.title}
                        </h4>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Brand:</span>
                            {item.product.brand.name}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Qty:</span>
                            {item.count}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-bold text-gray-900">
                          {item.price} EGP
                        </div>
                        {item.count > 1 && (
                          <div className="text-xs text-gray-500">
                            {item.price * item.count} EGP total
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      {order.totalOrderPrice -
                        order.shippingPrice -
                        order.taxPrice}{" "}
                      EGP
                    </span>
                  </div>
                  {order.shippingPrice > 0 && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-gray-900">
                        {order.shippingPrice} EGP
                      </span>
                    </div>
                  )}
                  {order.taxPrice > 0 && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium text-gray-900">
                        {order.taxPrice} EGP
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-2">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-red-500">
                      {order.totalOrderPrice} EGP
                    </span>
                  </div>
                </div>

                {/* User Info */}
                <div className="mt-6 pt-6 border-t border-gray-200 bg-blue-50 -m-6  p-6 rounded-b-2xl">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Delivery Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600 block mb-1">Name</span>
                      <span className="font-medium text-gray-900">
                        {order.user.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">Email</span>
                      <span className="font-medium text-gray-900">
                        {order.user.email}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">Phone</span>
                      <span className="font-medium text-gray-900">
                        {order.user.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
