import { IProduct } from "@/app/interfaces/products.interface";
import { getProducts } from "@/app/services/products.service";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductItem from "../products/ProductItem";
import SectionTitle from "../shared/SectionTitle";
export default async function ProductsSection() {
  const { data: products }: { data: IProduct[] } = await getProducts(8);

  return (
    <section className="pb-20">
      <div className="container mx-auto">
        <SectionTitle
          title={"Our Products"}
          subTitle={"Explore Our Products"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
          {products &&
            products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
        </div>

        <div className="flex justify-center items-center">
          <Button asChild variant={"destructive"}>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
