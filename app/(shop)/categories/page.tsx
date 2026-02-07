import SectionTitle from "@/app/components/shared/SectionTitle";
import SummaryCard from "@/app/components/shared/SummaryCard";
import { ICategory } from "@/app/interfaces/categories.interface";
import { getCategories } from "@/app/services/categories.service";
import { Separator } from "@/components/ui/separator";
import CategoryCardClient from "./CategoryCardClient";

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
              <CategoryCardClient key={category?._id} category={category} />
            ))}
        </div>
        <SummaryCard Header="Categories" counter={categories?.length ?? 0} />
      </div>
    </section>
  );
}
