import ICardProduct from "@/Interfaces/IProducts"

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function getProductsDB(): Promise<ICardProduct[]> {
    try {
        const res = await fetch(`${APIURL}/products` , {
            // const res = await fetch('https://fakestoreapi.com/products' , {
            // next: {revalidate: 1200}
            cache: "no-cache"
        })
        const products: ICardProduct[] = await res.json();
        return products;

    } catch (error: any) {
        throw new Error(error)
    }
}

export async function getProductsById(id: string): Promise<ICardProduct> {
    try {
        const products: ICardProduct[] = await getProductsDB();
        const productFiltered = products.find((product) => product.id.toString() === id);
        if (!productFiltered) throw Error ("Product not found")
        return productFiltered;

    } catch (error: any) {
        throw new Error (error)
    }
}

export async function getProductsByCategory(categoryId: number) : Promise<ICardProduct[]> {
    try {
        const products: ICardProduct[] = await getProductsDB();
        const productsByCategory = products.filter((product) => product.categoryId === categoryId);
        // if(!productsByCategory.length) throw new Error (`Products not found with ${categoryId}`)
            return productsByCategory
    } catch (error: any) {
        throw new Error (error)
    }
}