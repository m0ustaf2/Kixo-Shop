"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import RemoveFromCartBtn from "../../components/products/RemoveFromCartBtn";
import { useCart } from "../../Context/CartContext";
import {
  removeItemFromCart,
  removeUserCart,
  updateQtyProductCart,
} from "../../services/cart.service";
import EmptyCartState from "./EmptyCartState";
export default function CartPage() {
  const { cartDetails, setCartDetails } = useCart();
  async function handleRemoveCart() {
    const res = await removeUserCart();
    if (res.message == "success") {
      toast.success("Cart removed successfully");
      setCartDetails(null);
    } else {
      toast.error("Failed to remove cart");
    }
  }

  async function handelRemoveItem(productId: string) {
    const res = await removeItemFromCart(productId);
    if (res.success) {
      toast.success(res.message || "Product removed successfully", {
        position: "top-center",
      });
      setCartDetails(res.data);
    } else {
      toast.error(res.message || "Failed to remove product", {
        position: "top-center",
      });
    }
  }
  async function handelUpdateItem(productId: string, count: number) {
    const res = await updateQtyProductCart(productId, count);
    if (res.success) {
      toast.success(res.message || "Product updated successfully", {
        position: "top-center",
      });
      setCartDetails(res.data);
    } else {
      toast.error(res.message || "Failed to update product", {
        position: "top-center",
      });
    }
  }
  return (
    <section className="py-20">
      <div className="container mx-auto">
        {(cartDetails?.data?.products?.length ?? 0) > 0 ? (
          <>
            <section className="mb-20">
              <Table className="mb-6">
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartDetails?.data?.products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-5">
                          <Image
                            src={product?.product?.imageCover}
                            alt={product?.product?.title}
                            width={55}
                            height={55}
                          />
                          <h2>{product?.product?.title}</h2>
                        </div>
                      </TableCell>
                      <TableCell>{product?.price} EGP</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Button
                            onClick={() =>
                              handelUpdateItem(
                                product.product._id,
                                product.count - 1,
                              )
                            }
                            variant={"outline"}
                            size={"sm"}
                          >
                            -
                          </Button>
                          {product?.count}
                          <Button
                            onClick={() =>
                              handelUpdateItem(
                                product.product._id,
                                product.count + 1,
                              )
                            }
                            variant={"outline"}
                            size={"sm"}
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <RemoveFromCartBtn
                          onRemove={() => handelRemoveItem(product.product._id)}
                          productName={product.product.title}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        EGP {product?.price * product?.count}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between">
                <Button asChild variant={"outline"}>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button onClick={handleRemoveCart} variant={"destructive"}>
                  Remove All
                </Button>
              </div>
            </section>
            <section className="flex justify-end">
              <div className="w-5/12 py-8 px-6 border border-gray-950">
                <h3 className="font-bold  mb-6 text-xl">Cart Total</h3>
                <ul className="divide-y divide-gray-950">
                  <li className="py-6 flex justify-between">
                    <span>Subtotal: </span>{" "}
                    <span>{cartDetails?.data?.totalCartPrice} EGP</span>
                  </li>
                  <li className="py-6 flex justify-between">
                    <span>Shipping: </span> <span>Free</span>
                  </li>
                  <li className="py-6 flex justify-between">
                    <span>Total: </span>{" "}
                    <span>{cartDetails?.data?.totalCartPrice} EGP</span>
                  </li>
                </ul>
                <div className="flex justify-center">
                  <Button asChild variant={"destructive"}>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </div>
              </div>
            </section>
          </>
        ) : (
          <EmptyCartState />
        )}
      </div>
    </section>
  );
}
