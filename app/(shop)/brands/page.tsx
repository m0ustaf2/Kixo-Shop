import SectionTitle from "@/app/components/shared/SectionTitle";
import SummaryCard from "@/app/components/shared/SummaryCard";
import { IBrand } from "@/app/interfaces/brand.interface";
import { getAllBrands } from "@/app/services/brands.service";
import { Separator } from "@/components/ui/separator";
import BrandCardClient from "./BrandCardClient";

export default async function Brands() {
  const res = await getAllBrands();
  const brands: IBrand[] = res?.data ?? [];

  return (
    <section className="py-20 dark:bg-gray-900 text-foreground">
      <div className="container mx-auto">
        <SectionTitle title="Brands" subTitle="Our Latest Brands" />
        <Separator className="bg-border/50" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-20">
          {brands &&
            brands.map((brand) => (
              <BrandCardClient key={brand?._id} brand={brand} />
            ))}
        </div>
        <SummaryCard Header={"Brands"} counter={brands?.length ?? 0} />
      </div>
    </section>
  );
}
