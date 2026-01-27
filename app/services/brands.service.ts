const API_BASE_URL =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://ecommerce.routemisr.com";

export async function getAllBrands() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/brands`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(res.statusText || "Failed to fetch brands");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return { error: (error as Error).message };
  }
}

export async function getProductsByBrand(brandId: string) {
  try {
    const url = `${API_BASE_URL}/api/v1/products?brand=${brandId}`;
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch products: ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products by brand:", error);
    return { error: (error as Error).message };
  }
}
