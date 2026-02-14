import { StyleSheet ,Text,  TextInput, TouchableOpacity,  View } from 'react-native'
import { useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Add(){
    //ประกาศตัวแปร
    const [name, setName]= useState("")
    const [price, setPrice]= useState("")
    const [allSnack, setAllSnack] = useState("")


    useEffect(()=>{
        loadSnack()
    }, [allSnack])

    async function loadSnack() {
        const data = await AsyncStorage.getItem('snack')
        if(data != null){
           setAllSnack(JSON.parse(data)) 
        }
    }

    async function addSnack() {
        // เตรียมข้อมูล
        const snack = {
            snackName : name,
            snackPrice : price
        }
        // ทดสอบ
        console.log(snack)

        const newSnack = [...allSnack ,snack]
        await AsyncStorage.setItem("snack", JSON.stringify(newSnack))
        setName("")
        setPrice("")
    }

    return(
        <View  style={{backgroundColor:"#F9DFDF"  ,marginTop:8 ,}}>
            <Text>เพิ่มข้อมูล {name} | {price} </Text>
            {/*ช่องรับชื่อ */}
            <TextInput style={myStyle.i} value={name} onChangeText={setName} />
            {/* ช่อวรับราคา */}
            <TextInput  style={myStyle.i} value={price} onChangeText={setPrice} />

            <TouchableOpacity onPress={addSnack}>
                <Text>บันทึก</Text>
            </TouchableOpacity>
        </View>
    )
}

const myStyle = StyleSheet.create({
    i:{
        width:"80%",
        borderWidth:1
    }
})