import SectionTitle from "@/app/components/shared/SectionTitle";
import SummaryCard from "@/app/components/shared/SummaryCard";
import NavigationButton from "@/app/components/shared/ViewBtn";
import { ICategory } from "@/app/interfaces/categories.interface";
import { getCategories } from "@/app/services/categories.service";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default async function CategoriesPage() {
  const res = await getCategories();
  const categories: ICategory[] = res?.data ?? [];
  return (
    <section className="py-20 dark:bg-gray-900">
      <div className="container mx-auto">
        <SectionTitle title="Categories" subTitle="Our Popular Categories" />
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-20">
          {categories &&
            categories.map((category) => (
              <div
                key={category?._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group"
              >
                <div className="relative aspect-square bg-gray-50 dark:bg-gray-900 overflow-hidden flex items-center justify-center p-8">
                  <Image
                    src={category?.image}
                    alt={category?.name || category?.slug}
                    width={270}
                    height={250}
                    className="w-full h-[15.625rem] object-contain bg-gray-100 dark:bg-gray-800 mb-4"
                    unoptimized
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+fAQADhAGA/e0cyQAAAABJRU5ErkJggg=="
                  />
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 dark:group-hover:from-blue-500/10 dark:group-hover:to-purple-500/10 transition-all duration-300"></div>
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-center text-lg mb-3">
                    {category.name}
                  </h3>
                  <NavigationButton
                    href={`/categories/${category?._id}/subcategories`}
                    title="View Sub Categories"
                  />
                </div>
              </div>
            ))}
        </div>
        <SummaryCard Header="Categories" counter={categories?.length ?? 0} />
      </div>
    </section>
  );
}
