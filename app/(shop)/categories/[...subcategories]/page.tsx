import SectionTitle from "@/app/components/shared/SectionTitle";
import SummaryCard from "@/app/components/shared/SummaryCard";
import NavigationButton from "@/app/components/shared/ViewBtn";
import { ISubcategory } from "@/app/interfaces/subcategory.interface";
import { getSubCategoriesInCategory } from "@/app/services/categories.service";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Apple,
  Baby,
  Home,
  Laptop,
  LucideIcon,
  Package,
  Shirt,
  ShoppingBag,
  Smartphone,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "6439d5b90049ad0b52b90048": Shirt, // Men's Fashion
  "6439d58a0049ad0b52b9003f": ShoppingBag, // Women's Fashion
  "6439d41c67d9aa4ca97064d5": Apple, // Food & Grocery
  "6439d40367d9aa4ca97064cc": Baby, // Baby & Kids
  "6439d3e067d9aa4ca97064c3": Home, // Home & Garden
  "6439d30b67d9aa4ca97064b1": Sparkles, // Beauty & Health
  "6439d2f467d9aa4ca97064a8": Smartphone, // Mobile
  "6439d2d167d9aa4ca970649f": Laptop, // Electronics
};

const getCategoryIcon = (categoryId: string) => {
  const IconComponent = CATEGORY_ICONS[categoryId] || Package;
  return <IconComponent className="w-20 h-20" strokeWidth={1.5} />;
};

// Gradient colors array
const gradients = [
  "from-purple-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-purple-500",
  "from-teal-500 to-green-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-500",
  "from-violet-500 to-purple-500",
];

export default async function SubCategories({
  params,
}: {
  params: Promise<{ subcategories: string[] }>;
}) {
  const resolvedParams = await params;
  const categoryID = resolvedParams.subcategories[0];
  if (!categoryID) return null;
  const res = await getSubCategoriesInCategory(categoryID);
  const subCategories: ISubcategory[] = res?.data ?? [];

  return (
    <>
      <section className="py-20 dark:bg-gray-900">
        <div className="container mx-auto">
          <SectionTitle title="Sub Categories" subTitle="Our Sub Categories" />
          <Separator />

          {subCategories.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-5">
                {subCategories.map((subCat, index) => (
                  <div
                    key={subCat._id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl dark:shadow-gray-900/50 dark:hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 group"
                  >
                    {/* Gradient Icon Section */}
                    <div
                      className={`relative h-56 bg-linear-to-br ${
                        gradients[index % gradients.length]
                      } flex items-center justify-center overflow-hidden`}
                    >
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-20 dark:opacity-30">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle, white 1.5px, transparent 1.5px)",
                            backgroundSize: "24px 24px",
                          }}
                        />
                      </div>

                      {/* Animated Circles */}
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 dark:bg-white/15 rounded-full group-hover:scale-150 transition-transform duration-700" />
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 dark:bg-white/15 rounded-full group-hover:scale-150 transition-transform duration-700" />
                      </div>

                      {/* Icon */}
                      <div className="relative z-10 text-white group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">
                        {getCategoryIcon(subCat.category)}
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 dark:from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 text-center text-lg mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-purple-600 group-hover:to-pink-600 dark:group-hover:from-purple-400 dark:group-hover:to-pink-400 transition-all duration-300">
                        {subCat.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              <SummaryCard
                Header="Sub Categories"
                counter={subCategories.length}
              />
            </>
          ) : (
            <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-8 max-w-md mx-auto border-2 border-blue-100 dark:border-blue-900/50 my-5">
              <p className="text-center font-bold text-gray-900 dark:text-gray-100 text-xl mb-4">
                No Sub Categories Found in this Category
              </p>

              <NavigationButton
                href={`categories`}
                title="Back to Categories"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
