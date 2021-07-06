

import React, { useState } from 'react'
import { View, FlatList, TouchableOpacity, Text } from 'react-native'
import { lightGrey, mediumGrey, darkGrey, textBlack, mainGrey } from '../../../../common/Colors'
import { DummyList } from './InnerScreen'
import { connect } from 'react-redux'

const SalesList = ({ navigation, route, generate_quote_list, isLoading, }) => {
    let arr = [{ "id": 1., "value": "Quote Template" }, { "id": 2., "value": "Insurance & Licencing" },
    { "id": 3., "value": "Risk Assessments" }, { "id": 4., "value": "Safe Work Method Statements" },
    ]

    const [counter, setCounter] = useState(0)
    const [name, setName] = useState("")
    const call_list = (item) => {
        setCounter(1)
        setName(item.name)

    }
    const call_next = () => {
        setName("")
        setCounter(0)
    }
    const RenderItems = ({ item }) => {


        return (


            <TouchableOpacity onPress={() => call_list(item)}
            >
                <View style={{
                    flexDirection: 'row', height: 50, backgroundColor: mediumGrey, marginRight: 10,
                    marginTop: 10, borderWidth: 0.25, borderColor: mainGrey,
                }}>


                    <View style={{ flex: 1, backgroundColor: mediumGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ paddingLeft: 20, color: textBlack, paddingRight: 20, fontSize: 14 }}>{item.name}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }



    const RenderContacts = () => {
        console.log(name)
        return (
            <View style={{ flex: 1, backgroundColor: lightGrey }}>
                <View style={{ height: 60, backgroundColor: mediumGrey, flexDirection: 'row' }}>
                    {name ? (
                        <View style={{ height: 60, backgroundColor: mediumGrey, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => call_next()}>
                                <Text style={{ marginTop: 20, paddingLeft: 30, fontSize: 14 }}>{route.params.name}</Text>
                            </TouchableOpacity>
                            <Text style={{ marginTop: 20, paddingLeft: 10, fontSize: 16 }}>{">"}</Text>
                            <Text style={{ marginTop: 20, paddingLeft: 10, fontSize: 14 }}>{name}</Text>
                        </View>
                    ) : (
                            <Text style={{ marginTop: 20, paddingLeft: 30, fontSize: 14 }}>{route.params.name}</Text>

                        )}

                </View>
                {counter === 1 ? (

                    <DummyList navigation={navigation} />
                ) : (
                        <FlatList
                            style={{ marginTop: '5%', paddingHorizontal: 20 }}
                            data={generate_quote_list}
                            renderItem={RenderItems}

                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, key) => key.toString()}
                        />
                    )}


            </View>
        )
    }




    return (

        <RenderContacts />

    )

}


const mapStateProps = (state) => {
    const { generate_quote_list, isLoading, } = state.sales_enviroWaste
    return { generate_quote_list, isLoading, }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateProps, mapDispatchToProps)(SalesList)



