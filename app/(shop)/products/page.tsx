import ProductItem from "@/app/components/products/ProductItem";
import SectionTitle from "@/app/components/shared/SectionTitle";
import { IProduct } from "@/app/interfaces/products.interface";
import { getProducts } from "@/app/services/products.service";
import { Separator } from "@/components/ui/separator";
export default async function Products() {
  const res = await getProducts(40);
  const products: IProduct[] = res?.data ?? [];

  return (
    <section className="py-20 dark:bg-gray-900">
      <div className="container mx-auto">
        <SectionTitle title="Products" subTitle="Our latest products" />
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 py-20 ">
          {products &&
            products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
}
