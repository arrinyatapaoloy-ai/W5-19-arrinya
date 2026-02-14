import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect} from 'react'
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'

type Snack = {
    snackName : string,
    snackPrice : string
}


export default function Home() {

        const [allSnack, setAllSnack] = useState<Snack[]>([])

    useEffect(()=>{
        loadSnack()
    },[allSnack])

    async function loadSnack() {
        const data = await AsyncStorage.getItem('snack')
        if(data != null){
           setAllSnack(JSON.parse(data)) 
        }
    }

    async function removeSnack(index : number) {
        const newSnack = allSnack.filter((_, i) => 1 != index)
        setAllSnack(newSnack)
        await AsyncStorage.setItem("snack", JSON.stringify(newSnack))
    }

    return(
        <View>
            <Text style={{textAlign:'center'}}>หน้าแรก</Text>

            {/* x = [1,2,3,4]   x[2]  */}

            <FlatList style={{ padding:20 , backgroundColor:'#B0FFFA'}}
                data={allSnack}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({item, index })=> (
                    <View>
                        <Text style={{color:'#FF7DB0'}}>ชื่อ : {item.snackName.toString()}</Text>
                        <Text style={{color:'#9112BC'}}>ราคา : {item.snackPrice.toString()}</Text>
                        <TouchableOpacity onPress={() => removeSnack(index)}>
                            <Text style={{color:'#FF7DB0'}}>ลบ</Text>
                        </TouchableOpacity>
                        <Text style={{color:'#08CB00'}}>-----------------</Text>
                    </View>
                )}
            />

        </View>
    )
}

const style = StyleSheet.create({
    card:{
        borderWidth:3,
        borderColor:"black",
        padding:20 ,
        backgroundColor:'#B0FFFA'
    }
})