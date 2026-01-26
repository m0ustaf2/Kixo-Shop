import SectionTitle from "@/app/components/shared/SectionTitle";
import SummaryCard from "@/app/components/shared/SummaryCard";
import { IBrand } from "@/app/interfaces/brand.interface";
import { getAllBrands } from "@/app/services/brands.service";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default async function Brands() {
  const { data: brands }: { data: IBrand[] } = await getAllBrands();

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <SectionTitle title="Brands" subTitle="Our Latest Brands" />
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-20">
          {brands &&
            brands.map((brand) => (
              <div
                key={brand._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group "
              >
                {/* Brand Image */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden flex items-center justify-center p-8">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={500}
                    height={500}
                    loading="lazy"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>
                </div>

                {/* Brand Title */}
                <div className="p-4 border-t border-gray-100">
                  <h3 className="font-semibold text-red-500  text-center text-lg mb-3">
                    {brand.name}
                  </h3>
                </div>
              </div>
            ))}
        </div>

        <SummaryCard Header={"Brands"} counter={brands.length} />
      </div>
    </section>
  );
}
