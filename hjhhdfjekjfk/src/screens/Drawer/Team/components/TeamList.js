
// export default ClientList
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { mainWhite, darkGrey, mainBlack, lightGrey, mainBlue, mainGrey, textGrey } from '../../../../common/Colors'
import { TeamLists } from './Innerscreen'
import { connect } from 'react-redux'
import { search_employees, } from '../action'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native'
function TeamList({ navigation,
    team_list,
    isLoading,

}) {



    const RenderContacts = () => {

        const [loginPageStatus, setloginPageStatus] = useState(true)

        useEffect(() => {

            // let loadingInterval = setInterval(() => {
            //     setloginPageStatus(false)
            //     clearInterval(loadingInterval)
            // }, 1500)
            // return () => {
            //     clearInterval(loadingInterval)
            //     // all_folders_api.remove
            // }
        }, [])


        // if (loginPageStatus) return (
        //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //         <ActivityIndicator size="large" color={mainBlue} />
        //     </View>
        // )
        if (isLoading === true) return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={mainBlue} />
            </View>
        )


        return (
            <>
                 <SafeAreaView style={{ flex: 1, backgroundColor: lightGrey,}}>
                 <ScrollView style={{ flex: 1, backgroundColor: lightGrey,}}>
                <View style={{ flex: 1, backgroundColor: lightGrey,}}>
                    <View style={{ backgroundColor: textGrey, height: 11 }}>
                    </View>

                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', marginTop: '4%', }}>
                        <View style={{ flex: 1.5, }}>
                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <View style={{ flex: 4.5 }} />
                                    <TouchableOpacity onPress={() => navigation.navigate("AddTeam")}
                                        style={styles.topBox}>
                                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', }}>
                                            <Text style={{ color: mainBlack, fontSize: 14 }} >Add a team member</Text>
                                        </View>

                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>

                    </View>
                    <TeamLists navigation={navigation} />

                </View>
                </ScrollView>
                </SafeAreaView>
            </>



        )
    }

    return (

        <RenderContacts />

    )

}

const mapStateProps = (state) => {
    const { team_list, isLoading, all_folders } = state.team
    return { team_list, isLoading, all_folders }
}

const mapDispatchToProps = (dispatch) => {
    return {
        search_employee: (search_keyword) => dispatch(search_employees(search_keyword)),
    }
}

export default connect(mapStateProps, mapDispatchToProps)(TeamList)



const styles = StyleSheet.create({
    moreBoxes: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: lightGrey,
        borderRadius: 20,
        shadowColor: mainBlack,
        borderWidth: 1,
        borderColor: mainBlue,
        flexDirection: 'row',
    },
    topBox: {
        flex: 3.5,
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 0.25,
        borderColor: mainGrey,
        borderRadius: 20,
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: mainWhite
    },
    textStyle: {
        paddingTop: 10,
        paddingLeft: 10,
        color: darkGrey
    },
    staticBoxStyle: {
        flex: 1.3,
        backgroundColor: mainWhite,
        height: 40,
        marginRight: 10,
        marginTop: 10,
        marginLeft: 10
    },
    editableBoxStyle: {
        flex: 1,
        backgroundColor: mainWhite,
        marginRight: 10,
        marginTop: 10,
        height: 40,
        flexDirection: 'row'
    }






});
