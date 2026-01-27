import SummaryCard from "@/app/components/shared/SummaryCard";
import { IBrand } from "@/app/interfaces/brand.interface";
import { IProduct } from "@/app/interfaces/products.interface";

import {
  getAllBrands,
  getProductsByBrand,
} from "@/app/services/brands.service";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BrandPageProps {
  params: {
    brandId: string;
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const brandId = (await params).brandId;
  const productsResponse = await getProductsByBrand(brandId);
  if (productsResponse.error) {
    console.error("Error fetching products:", productsResponse.error);
    notFound();
  }
  if (!productsResponse.data || !Array.isArray(productsResponse.data)) {
    console.error("No products data found or invalid format");
    notFound();
  }

  const products: IProduct[] = productsResponse.data;

  if (products.length === 0) {
    const brandsResponse = await getAllBrands();
    const allBrands: IBrand[] = brandsResponse.data || [];
    const brand = allBrands.find((b) => b._id === brandId);
    if (!brand) {
      notFound();
    }
    return (
      <section className="py-20 bg-background dark:bg-gray-900 text-foreground">
        <div className="container mx-auto">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-muted border shadow-sm">
              <Image
                src={brand.image}
                alt={brand.name}
                loading="lazy"
                fill
                className="object-contain p-4"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-red-500 mb-2">
                {brand.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                0 Products Available
              </p>
            </div>
          </div>
          <Separator className="bg-border/50 mb-12" />
          {/* Empty State */}
          <div className="text-center py-20">
            <div className="max-w-md mx-auto space-y-4">
              <div className="text-6xl">📦</div>
              <h3 className="text-2xl font-semibold">No Products Found</h3>
              <p className="text-muted-foreground">
                There are currently no products available for{" "}
                <span className="text-red-500 font-semibold">
                  {brand.name}{" "}
                </span>{" "}
                . Please check back later!
              </p>
              <Link
                href="/brands"
                className="inline-block mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Back to Brands
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const brand =
    typeof products[0].brand === "object" ? products[0].brand : null;
  if (!brand) {
    console.error("Brand information not found in product data");
    notFound();
  }

  return (
    <section className="py-20 bg-background dark:bg-gray-900 text-foreground">
      <div className="container mx-auto">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-muted border shadow-sm">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              loading="lazy"
              className="object-contain p-4"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-red-500 mb-2">
              {brand.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              {products.length} Products Available
            </p>
          </div>
        </div>

        <Separator className="bg-border/50 mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="group overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl"
            >
              <div className="relative aspect-square bg-muted p-6">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  loading="lazy"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />

                {product.priceAfterDiscount &&
                product.priceAfterDiscount > 0 ? (
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                    Save {""}(
                    {(product.price - product.priceAfterDiscount).toFixed(0)}{" "}
                    EGP)
                  </Badge>
                ) : null}
              </div>
              <div className="p-4 space-y-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {typeof product.category === "object"
                    ? product.category.name
                    : ""}
                </p>

                <h3 className="font-semibold text-sm line-clamp-2 min-h-[40px]">
                  {product.title}
                </h3>

                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">
                      {product.ratingsAverage?.toFixed(1) || "N/A"}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product.ratingsQuantity || 0} reviews)
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-red-500">
                      EGP {product.priceAfterDiscount || product.price}
                    </span>
                    {product.priceAfterDiscount &&
                    product.priceAfterDiscount > 0 ? (
                      <span className="text-sm text-muted-foreground line-through">
                        EGP {product.price}
                      </span>
                    ) : null}
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {product.sold} sold
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <SummaryCard
          Header={`${brand.name} Products`}
          counter={products.length}
        />
      </div>
    </section>
  );
}
