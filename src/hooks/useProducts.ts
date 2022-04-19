import { useEffect, useRef, useState } from "react";
import { HttpClient } from "../common/HttpClient";
import { Producto, Products } from "../models/Products";

export const useProducts = () => {
    const [products, setproducts] = useState<Array<Producto>>([]);
    const allProductsRef = useRef<Array<Producto>>([]);
    const [productCategoryIdSelected, setproductCategoryIdSelected] = useState<string>('0');
    const [isLoading, setisLoading] = useState(false);

    const productLimitRef = useRef<number>(10);
    const lastProductIndex = useRef<number>(0);


    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setisLoading(true);
        lastProductIndex.current = 0;
        const { data: { productos } } = await HttpClient.get<Products>(`productos?limite=${productLimitRef.current}&desde=0`);

        allProductsRef.current = productos;

        productCategoryIdSelected == '0' ? setproducts(productos) : filterProductsByCategoryId(productCategoryIdSelected);
        setisLoading(false);
    }

    const getNextsProducts = async () => {
        setisLoading(true);
        lastProductIndex.current += productLimitRef.current;
        const { data: { productos } } = await HttpClient.get<Products>(`productos?limite=${productLimitRef.current}&desde=${lastProductIndex.current}`);

        allProductsRef.current = [...allProductsRef.current, ...productos];

        productCategoryIdSelected == '0' ? setproducts(allProductsRef.current) : filterProductsByCategoryId(productCategoryIdSelected);
        setisLoading(false);
    }

    const filterProductsByCategoryId = async (categoryId: string) => {
        setproductCategoryIdSelected(categoryId);
        if (categoryId != '0') {
            const filterProducts = allProductsRef.current.filter(product => product.categoria._id == categoryId);
            setproducts(filterProducts);
        } else {
            setproducts(allProductsRef.current);
        }
    }


    return {
        products, productCategoryIdSelected, filterProductsByCategoryId, isLoading, getProducts, getNextsProducts
    };
};
