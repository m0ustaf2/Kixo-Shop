export async function getAllBrands() {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/brands`);
    if (!res.ok) {
      throw new Error(res.statusText || "Failed to fetch brands");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error as string };
  }
}
