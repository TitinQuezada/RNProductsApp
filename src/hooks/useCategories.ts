import { useEffect, useState } from "react";
import { HttpClient } from "../common/HttpClient";
import { Categories, Category } from "../models/Categories";

export const useCategories = () => {
    const [categories, setcategories] = useState<Array<Category>>([]);


    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const { data: { categorias } } = await HttpClient.get<Categories>('categorias');
        setcategories([{ _id: '0', nombre: 'TODOS' }, ...categorias]);
    }

    return {
        categories
    };
};
