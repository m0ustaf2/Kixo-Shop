import SectionTitle from "@/app/components/shared/SectionTitle";
import SummaryCard from "@/app/components/shared/SummaryCard";
import { ICategory } from "@/app/interfaces/categories.interface";
import { getCategories } from "@/app/services/categories.service";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default async function CategoriesPage() {
  const { data: categories }: { data: ICategory[] } = await getCategories();
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <SectionTitle title="Categories" subTitle="Our Popular Categories" />
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-20">
          {categories &&
            categories.map((category) => (
              <div
                key={category._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group "
              >
                {/* Category Image */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden flex items-center justify-center p-8">
                  <Image
                    src={category.image}
                    alt={category.slug}
                    width={270}
                    height={250}
                    loading="lazy"
                    className="w-full h-[15.625rem] object-contain bg-gray-100 mb-4"
                    unoptimized
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>
                </div>

                {/* Brand Title */}
                <div className="p-4 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900  text-center text-lg mb-3">
                    {category.name}
                  </h3>

                  <Button asChild variant={"destructive"} className="w-full">
                    <Link
                      href={`categories/${category._id}/subcategories`}
                      className="flex items-center justify-center gap-2"
                    >
                      <span>View Sub Categories</span>
                      <svg
                        className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
        </div>

        <SummaryCard Header="Categories" counter={categories.length} />
      </div>
    </section>
  );
}
