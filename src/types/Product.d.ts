// Defines the state shape for products in Redux
export interface ProductState {
    products: Product[];             // list of products
    loading: boolean;                // loading state
    error: string | null;           // error message
    // selectedProduct: Product | null; // currently viewed/selected product
    message:string|null
}
// Represents a single product payload (e.g., returned from API or passed to an action)
export interface Product{
    
    _id:string;
    name: string;
    description: string;
    price: number;
    cat: string;
    pimg: string;
    brand:string;
    color:string
}


