import { IProduct } from "@/app/interfaces/products.interface";
import { getProducts } from "@/app/services/products.service";
import ProductItem from "../products/ProductItem";
import SectionTitle from "../shared/SectionTitle";
import NavigationButton from "../shared/ViewBtn";
export default async function ProductsSection() {
  const res = await getProducts(8);
  const products: IProduct[] = res?.data ?? [];
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

        <div className="flex  w-1/6 mx-auto">
          <NavigationButton href={`/products`} title="View All Products" />
        </div>
      </div>
    </section>
  );
}
