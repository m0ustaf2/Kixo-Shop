async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries: number = 1,
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);

    // Retry if retries remaining
    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts left)`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1s before retry
      return fetchWithRetry(url, options, retries - 1);
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getCategories() {
  try {
    const data = await fetchWithRetry(
      `${process.env.API_BASE_URL}/api/v1/categories`,
      { next: { revalidate: 3600 } },
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return {
      data: [],
      error:
        error instanceof Error ? error.message : "Failed to fetch categories",
    };
  }
}

export async function getSubCategoriesInCategory(categoryId: string) {
  try {
    const data = await fetchWithRetry(
      `${process.env.API_BASE_URL}/api/v1/categories/${categoryId}/subcategories`,
      { next: { revalidate: 3600 } },
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch subcategories:", error);
    return {
      data: [],
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch subcategories",
    };
  }
}
