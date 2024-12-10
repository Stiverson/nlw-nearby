import { useEffect, useState } from "react";
import { View, Text, Alert} from "react-native";

import { api } from "@/services/api";
import { Categories , CategoriesProps } from "@/components/categories"

export default function Home(){

    const [categories, setCategories] = useState<CategoriesProps>([])
    const [category, setCategory] = useState("")
    const [markets, setMarket ] = useState()

    async function fetchCategories() {

        try {
            const { data } = await api.get("/categories")
            setCategories(data)
            setCategory(data[0].id)
            
        } catch (error) {
            console.log(error)
            Alert.alert("Categorias", "Não foi possivel carregar as categorias")
        }
        
    }

    async function fetchMarkets(){
        try {

            if(!category){
                return
            }

            const { data } = await api.get("/markets/category/" + category)

            
        } catch (error) {
           console.log(error)
           Alert.alert("Locais", "Nçao foi possivel encontrar os locais")
        }
    }
    useEffect(() => {
        fetchCategories()
    },[])


    return (
        <View style={{flex: 1}}>
            <Categories data={categories} onSelect={setCategory} selected={category}/>
        </View>
    )

}