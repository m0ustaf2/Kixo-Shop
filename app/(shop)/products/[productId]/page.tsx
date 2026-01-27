import AddToCartBtn from "@/app/components/products/AddToCartBtn";
import ProductItem from "@/app/components/products/ProductItem";
import ProductSwiper from "@/app/components/products/ProductSwiper";
import SectionTitle from "@/app/components/shared/SectionTitle";
import { IProduct } from "@/app/interfaces/products.interface";
import {
  getProductDetails,
  getProducts,
} from "@/app/services/products.service";
import { Star } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = (await params).productId;
  const productRes = await getProductDetails(productId);
  const productDetails: IProduct | null = productRes?.data ?? null;

  if (!productDetails) {
    notFound();
  }

  const relatedRes = await getProducts(40, productDetails.category?._id);

  const relatedProducts: IProduct[] = relatedRes?.data ?? [];
  return (
    <>
      <section className="py-20 dark:bg-gray-900 ">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16">
            <div className="lg:col-span-2">
              <ProductSwiper images={productDetails?.images} />
            </div>
            <div className="lg:col-span-1">
              <h1 className="font-semibold text-2xl mb-4 dark:text-gray-100">
                {productDetails?.title}
              </h1>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl block dark:text-gray-100">
                  {productDetails?.price} EGP
                </span>
                <div className="flex gap-1 items-center justify-between">
                  <Star className="text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-gray-500 dark:text-gray-400 text-sm">
                    {productDetails?.ratingsAverage}
                  </span>
                </div>
              </div>
              <p className="text-sm border-b border-b-gray-400 dark:border-b-gray-600 dark:text-gray-300 pb-6 my-6">
                {productDetails?.description}
              </p>
              <AddToCartBtn
                className="w-full bg-red-500 text-white cursor-pointer hover:bg-red-600"
                productId={productId}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 dark:bg-gray-900 ">
        <div className="mx-auto container">
          <SectionTitle
            title={"Related Products"}
            subTitle={"You may also like"}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
            {relatedProducts &&
              relatedProducts.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
