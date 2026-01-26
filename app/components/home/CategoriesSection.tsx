import { ICategory } from "@/app/interfaces/categories.interface";
import { getCategories } from "@/app/services/categories.service";
import CategoriesSlider from "../CategoriesSlider";
import SectionTitle from "../shared/SectionTitle";
import { Separator } from "@/components/ui/separator";
export default async function CategoriesSection() {
  const { data: categories }: { data: ICategory[] } = await getCategories();
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <SectionTitle title={"Categories"} subTitle={"Browse By Categories"} />
        <CategoriesSlider categories={categories} />
        <Separator />
      </div>
    </section>
  );
}
