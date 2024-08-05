import ICardProduct from "@/Interfaces/IProducts";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsDB(): Promise<ICardProduct[]> {
  try {
    const res = await fetch(`${APIURL}/products`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Received non-JSON response");
    }

    const products: ICardProduct[] = await res.json();
    return products;
  } catch (error: any) {
    console.error("Error fetching products:", error);
    throw new Error(error.message || "Error fetching products");
  }
}

export async function getProductsById(id: string): Promise<ICardProduct> {
  try {
    const products: ICardProduct[] = await getProductsDB();
    const productFiltered = products.find(
      (product) => product.id.toString() === id
    );
    if (!productFiltered) throw new Error("Product not found");
    return productFiltered;
  } catch (error: any) {
    console.error("Error fetching product by ID:", error);
    throw new Error(error.message || "Error fetching product by ID");
  }
}

export async function getProductsByCategory(
  categoryId: number
): Promise<ICardProduct[]> {
  try {
    const products: ICardProduct[] = await getProductsDB();
    const productsByCategory = products.filter(
      (product) => product.categoryId === categoryId
    );
    return productsByCategory;
  } catch (error: any) {
    console.error("Error fetching products by category:", error);
    throw new Error(error.message || "Error fetching products by category");
  }
}
