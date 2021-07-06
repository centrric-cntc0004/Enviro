import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView, Image, TextInput, Text } from 'react-native'
import { mainBlue, mainWhite, mainGrey, textGrey, textBlue, textlightgrey } from '../../../../common/Colors'
import { connect } from 'react-redux'
import { ClientImage } from '../../../../common/Images'



const SalesDetails = ({ navigation, route, }) => {

    const RenderContacts = () => {

        const [individual_client, setIndividualClient] = useState('')
        const [loader, setLoader] = useState(true)


        
        useEffect(() => {
            let loadingInterval = setInterval(() => {
                setLoader(false)
                clearInterval(loadingInterval)
            }, 1500)
            return () => {
                clearInterval(loadingInterval)
            }
        }, [])


        if (loader) return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={mainBlue} />
            </View>
        )

        return (
            <ScrollView style={{ flex: 1, backgroundColor: textGrey }}>
                <SafeAreaView style={{ flex: 1, backgroundColor: textGrey }}>

                    <View style={{ flex: 1, backgroundColor: textGrey }}>
                        <View style={{ backgroundColor: textGrey, height: 11 }}>
                        </View>
                        <View style={{ flex: 1, backgroundColor: textGrey }}>

                            <View style={{ flex: 2.5, marginTop: '3%', flexDirection: 'row', height: 80 }}>
                                <View style={{ flex: 0.3 }} />
                                <View style={{ flex: 1, }}>
                                    <Image style={{ height: 80, width: 80, borderRadius: 5 }} source={ClientImage} />
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={{ paddingHorizontal: 20, flexDirection: 'column', flex: 2.2, }}>
                                    <View style={{ flex: 0.1, flexDirection: 'row', marginTop: 5, }}>
                                        <View style={styles.staticBoxStyle}>
                                            <Text style={styles.textStyle} >Client Id</Text>
                                        </View>
                                        <View style={{ flex: 0.05 }} />
                                        <View style={styles.editableBoxStyle}>
                                            <Text style={{ alignSelf: 'center' }}>:</Text>

                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                                autoCapitalize='none'
                                                placeholder="Client Id"
                                                editable={false}
                                                value={route.params.items.client_id}
                                            // onChangeText={txt => setClientId(txt)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 30 }}>
                                        <View style={styles.staticBoxStyle}>
                                            <Text style={styles.textStyle} >Client Name</Text>
                                        </View>
                                        <View style={{ flex: 0.1 }} />
                                        <View style={styles.editableBoxStyle}>
                                            <Text style={{ alignSelf: 'center' }}>:</Text>

                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                style={{ color: mainGrey, fontSize: 14, alignSelf: 'center', width: 150 }}
                                                autoCapitalize='none'
                                                placeholder="Client Name"
                                                value={route.params.items.client_name}
                                                numberOfLines={1}
                                                editable={false}
                                            // onChangeText={txt => setClientName(txt)}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 3.3, backgroundColor: textGrey, marginTop: 10, marginBottom: 10 }}>

                                <View style={{ paddingHorizontal: 20, flexDirection: 'column', flex: 2, }}>

                                    <View style={{ flex: 1, flexDirection: 'row', }}>
                                        <View style={{ height: 30, flex: 0.5, }}>
                                            <Text style={styles.textStyle} >Job Code</Text>
                                        </View>
                                        <View style={{ flex: 0.1 }} />
                                        <View style={styles.editableBoxStyle}>
                                            <Text style={{ alignSelf: 'center' }}>:</Text>

                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                                autoCapitalize='none'
                                                value={route.params.items.code}
                                                placeholder="Code"
                                                editable={false}
                                                placeholderTextColor={textlightgrey}
                                            // onChangeText={txt => setClientBuilding(txt)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', }}>
                                        <View style={{ height: 30, flex: 0.5, }}>
                                            <Text style={styles.textStyle} >Job Type</Text>
                                        </View>
                                        <View style={{ flex: 0.1 }} />
                                        <View style={styles.editableBoxStyle}>
                                            <Text style={{ alignSelf: 'center' }}>:</Text>

                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                                autoCapitalize='none'
                                                value={route.params.items.job_type}
                                                placeholder="type"
                                                editable={false}

                                            // onChangeText={txt => setClientLocation(txt)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', }}>
                                        <View style={{ height: 30, flex: 0.5, }}>
                                            <Text style={styles.textStyle} >Created By</Text>
                                        </View>
                                        <View style={{ flex: 0.1 }} />
                                        <View style={styles.editableBoxStyle}>
                                            <Text style={{ alignSelf: 'center' }}>:</Text>

                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                                autoCapitalize='none'
                                                value={route.params.items.created_by}
                                                placeholder="Quoted by"
                                                editable={false}
                                            // onChangeText={txt => setClientLocation(txt)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', }}>
                                        <View style={{ height: 30, flex: 0.5, }}>
                                            <Text style={styles.textStyle} >Type</Text>
                                        </View>
                                        <View style={{ flex: 0.1 }} />
                                        <View style={styles.editableBoxStyle}>
                                            <Text style={{ alignSelf: 'center' }}>:</Text>

                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                                autoCapitalize='none'
                                                value={route.params.items.tab_type}
                                                placeholder="type"
                                                editable={false}
                                            // onChangeText={txt => setClientLocation(txt)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', }}>
                                        <View style={{ height: 30, flex: 0.5, }}>
                                            <Text style={styles.textStyle} >Amount</Text>
                                        </View>
                                        <View style={{ flex: 0.1 }} />
                                        <View style={styles.editableBoxStyle}>
                                            <Text style={{ alignSelf: 'center' }}>:</Text>

                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                                autoCapitalize='none'
                                                value={route.params.items.amount}
                                                placeholder="Amount"
                                                editable={false}
                                            // onChangeText={txt => setClientLocation(txt)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', }}>
                                        <View style={{ height: 30, flex: 0.5, }}>
                                            <Text style={styles.textStyle} >Quote No</Text>
                                        </View>
                                        <View style={{ flex: 0.1 }} />
                                        <View style={styles.editableBoxStyle}>
                                            <Text style={{ alignSelf: 'center' }}>:</Text>

                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                                autoCapitalize='none'
                                                value={route.params.items.quote.toString()}
                                                placeholder="Quote"
                                                editable={false}
                                            // onChangeText={txt => setClientLocation(txt)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', }}>
                                        <View style={{ height: 30, flex: 0.5, }}>
                                            <Text style={styles.textStyle} >Created Date</Text>
                                        </View>
                                        <View style={{ flex: 0.1 }} />
                                        <View style={styles.editableBoxStyle}>
                                            <Text style={{ alignSelf: 'center' }}>:</Text>

                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                                autoCapitalize='none'
                                                value={route.params.items.created_date_time}
                                                placeholder="Status"
                                                editable={false}
                                            // onChangeText={txt => setClientLocation(txt)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', }}>
                                        <View style={{ height: 30, flex: 0.5, }}>
                                            <Text style={styles.textStyle} >Paid Status</Text>
                                        </View>
                                        <View style={{ flex: 0.1 }} />
                                        <View style={styles.editableBoxStyle}>
                                            <Text style={{ alignSelf: 'center' }}>:</Text>

                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                                autoCapitalize='none'
                                                value={route.params.items.paid_status}
                                                placeholder="Status"
                                                editable={false}
                                            // onChangeText={txt => setClientLocation(txt)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', }}>
                                        <View style={{ height: 30, flex: 0.5, }}>
                                            <Text style={styles.textStyle} >Paid Amount</Text>
                                        </View>
                                        <View style={{ flex: 0.1 }} />
                                        <View style={styles.editableBoxStyle}>
                                            <Text style={{ alignSelf: 'center' }}>:</Text>

                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                                autoCapitalize='none'
                                                value={route.params.items.paid_amount}
                                                placeholder="Status"
                                                editable={false}
                                            // onChangeText={txt => setClientLocation(txt)}
                                            />
                                        </View>
                                    </View>

                                </View>

                            </View>
                        </View>
                    </View>
                    {/* )} */}
                </SafeAreaView>

            </ScrollView>

        )
    }





    return (

        <View style={{ flex: 1 }}>
            <RenderContacts />
        </View>

    )

}


const mapStateToProps = (state) => {
    const { selected_client } = state.schedule_enviro
    return { selected_client }
}



export default connect(mapStateToProps)(SalesDetails)



const styles = StyleSheet.create({
    topBox: {
        flex: 2,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: mainWhite,
        borderWidth: 1,
        borderColor: mainBlue,
        borderRadius: 20,
        flexDirection: 'row',
    },
    textStyle: {
        paddingTop: 10,
        color: textBlue
    },
    staticBoxStyle: {
        flex: 1,
        backgroundColor: textGrey,
        height: 40,
    },
    editableBoxStyle: {
        flex: 1,
        height: 40,
        flexDirection: 'row',

    }



});


