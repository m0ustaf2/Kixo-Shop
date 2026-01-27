import SectionTitle from "@/app/components/shared/SectionTitle";
import SummaryCard from "@/app/components/shared/SummaryCard";
import NavigationButton from "@/app/components/shared/ViewBtn";
import { IBrand } from "@/app/interfaces/brand.interface";
import { getAllBrands } from "@/app/services/brands.service";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

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
              <div
                key={brand?._id}
                className="
              group overflow-hidden rounded-2xl border
              bg-card text-card-foreground
              shadow-sm transition-all duration-300
              hover:shadow-xl
              dark:hover:shadow-2xl
            "
              >
                {/* Brand Image */}
                <div
                  className="
                relative aspect-square flex items-center justify-center p-8
                bg-muted
              "
                >
                  <Image
                    src={brand?.image}
                    alt={brand?.name}
                    width={500}
                    height={500}
                    unoptimized
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+fAQADhAGA/e0cyQAAAABJRU5ErkJggg=="
                  />

                  {/* Hover Overlay */}
                  <div
                    className="
                  absolute inset-0 transition-all duration-300
                  bg-linear-to-br
                  from-blue-500/0 to-purple-500/0
                  group-hover:from-blue-500/10
                  group-hover:to-purple-500/10
                  dark:group-hover:from-blue-400/10
                  dark:group-hover:to-purple-400/10
                "
                  />
                </div>

                {/* Brand Title */}
                <div className="border-t border-border p-4">
                  <h3
                    className="
                  text-center text-lg font-semibold
                  text-red-500 
                "
                  >
                    {brand?.name}
                  </h3>
                  <NavigationButton
                    href={`/brands/${brand?._id}`}
                    title="Explore All Brand Products"
                  />
                </div>
              </div>
            ))}
        </div>

        <SummaryCard Header={"Brands"} counter={brands?.length ?? 0} />
      </div>
    </section>
  );
}
