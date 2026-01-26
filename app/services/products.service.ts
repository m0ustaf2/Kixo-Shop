export async function getProducts(limit: number = 40, categoryId?: string) {
  const endPoint = categoryId
    ? `limit=${limit}&category[in]=${categoryId}`
    : `limit=${limit}`;
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/products?${endPoint}`,
      {
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) {
      throw new Error(res.statusText || "Failed to fetch products");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error as string };
  }
}
export async function getProductDetails(id: string) {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/products/${id}`,
      {
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) {
      throw new Error(res.statusText || "Failed to fetch product Details");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error as string };
  }
}
