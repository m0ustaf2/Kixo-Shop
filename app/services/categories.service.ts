export async function getCategories() {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/categories`);
    if (!res.ok) {
      throw new Error(res.statusText || "Failed to fetch Categories");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error as string };
  }
}
export async function getSubCategoriesInCategory(categoryId: string) {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/categories/${categoryId}/subcategories`,
    );
    if (!res.ok) {
      throw new Error(res.statusText || "Failed to fetch subcategories");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error as string };
  }
}
