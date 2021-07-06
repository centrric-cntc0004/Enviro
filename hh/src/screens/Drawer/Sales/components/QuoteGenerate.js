

import React, { useState } from 'react'
import { View, TouchableOpacity, Text, ActivityIndicator, Linking, RefreshControl } from 'react-native'
import { lightGrey, mediumGrey, textBlack, mainGrey, mainBlue, textGrey, mainWhite } from '../../../../common/Colors'
import { connect } from 'react-redux'
import { fetch_job_card,fetch_quote_drafts, fetch_quote_client_draft, template_listData, fetch_template, fetch_selected_client, get_client_info } from './common/action'
import { BASE_IMAGE_URL } from '../../../../store/endpoint'
import { ScrollView } from 'react-native-gesture-handler'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import JobCardList from './InnerScreen/JobCardList'


var data1 = []

const QuoteGenerate = ({client_info,job_card_lists, types, navigation, sale_draft_template_list, route, generate_quote_list, isLoading, template_lists, dispatch }) => {
    const [counter, setCounter] = useState(0)
    const [quotename, setQuoteName] = useState("")
    const [data, setData] = useState("")
    const [loadData, setLoadData] = useState(false)
    const [loadDataA, setLoadDataA] = useState(true)
    data1 = template_lists

    const dummyQuoteData = [
        {
            id: 1,
            name: 'Quote Template',
        }
    ]
    let allFolders = dummyQuoteData.concat(generate_quote_list)

    const quoteClickBack = () => {
        setQuoteName("")
        setCounter(0)
    }

    const quoteClick = (item) => {

        if (item.name === "Quote Template") {

            dispatch(template_listData())
            dispatch(get_client_info())
            dispatch(fetch_job_card())


            setCounter(1)
            setQuoteName(item.name)

            let loadingInterval = setInterval(() => {
                setLoadDataA(false)
                clearInterval(loadingInterval)
            }, 1000)
            return () => {
                clearInterval(loadingInterval)
            }


        } else {
            setCounter(1)
            setQuoteName(item.name)
            setData(item)
            setLoadDataA(false)

        }

    }

    const call_link = (url) => {
        Linking.openURL(BASE_IMAGE_URL + url)
    }

    const call_draft = (item) => {
        let data = { "id": item.id, "client_name": item.employee_name }
        dispatch(get_client_info(data))
        const success = () => {


        }

        const failed = () => {


        }


        dispatch(fetch_quote_client_draft("", types, item.id, success, failed))


        if (item.template !== null || "") {
            dispatch(fetch_template(item.template))

        }
        navigation.navigate('AddFile')

    }

    const call_addfile = () => {
        dispatch(fetch_selected_client([]))
        dispatch(get_client_info())
        // dispatch(fetch_job_card())

        navigation.navigate('AddFile')

    }
    const call_apicompleted = () => {

        dispatch(fetch_quote_drafts(types))

    }
    const RenderContacts = () => {
        return (
            <View style={{ flex: 1, backgroundColor: lightGrey }}>
                {counter === 0 ? (
                    <View>
                        <View style={{ height: 50, backgroundColor: mediumGrey, marginTop: '3%' }}>
                            <Text style={{ paddingTop: 15, paddingLeft: 20, color: textBlack, fontSize: 14 }}>Generate Quote</Text>
                        </View>
                        { allFolders.map((item, key2) => {
                            return (

                                <TouchableOpacity onPress={() => quoteClick(item)}>
                                    <View style={{
                                        marginLeft: 10, marginRight: 10,
                                        flexDirection: 'row', height: 55, backgroundColor: textGrey,
                                        marginTop: 10, borderWidth: 0.25, borderColor: mainGrey, borderRadius: 10
                                    }}>

                                        <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <Text style={{ paddingLeft: 10, color: textBlack }}>{key2 + 1}.</Text>
                                                <Text numberOfLines={1}
                                                    style={{ paddingLeft: 10, color: textBlack, paddingRight: 20 }}>{item.name}</Text>
                                            </View>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                ) : counter === 1 ? (
                    <View>

                        <View style={{ flexDirection: "row", height: 50, backgroundColor: mediumGrey, marginTop: '3%' }}>
                            <TouchableOpacity onPress={() => quoteClickBack()}>
                                <Text style={{ paddingTop: 15, paddingLeft: 20, color: textBlack, fontSize: 14 }}>Generate Quote</Text>
                            </TouchableOpacity>
                            <Text style={{ paddingTop: 13, paddingLeft: 10, color: textBlack, fontSize: 18 }}>{">"}</Text>
                            <Text style={{ paddingTop: 15, paddingLeft: 10, color: textBlack, fontSize: 14 }}>{quotename}</Text>
                        </View>
                        {template_lists !== undefined ? (
                            <View>
                                {quotename === "Quote Template" ? (
                                    <View>
                                        {loadDataA ? (
                                            <View style={{ backgroundColor: lightGrey, marginTop: 100 }}>
                                                <ActivityIndicator size="large" color={mainBlue} />
                                            </View>

                                        ) : (
                                                <View>

                                                    { data1.map((item, key2) => {
                                                        return (

                                                            <TouchableOpacity onPress={() => call_addfile()}>
                                                                <View style={{
                                                                    marginLeft: 10, marginRight: 10,
                                                                    flexDirection: 'row', height: 55, backgroundColor: textGrey,
                                                                    marginTop: 10, borderWidth: 0.25, borderColor: mainGrey, borderRadius: 10
                                                                }}>

                                                                    <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                            <Icon1 style={{ paddingLeft: 10 }}
                                                                                name="file-document-outline" size={25} color={mainGrey} />
                                                                            {item.template_name !== null ? (
                                                                                <Text numberOfLines={1}
                                                                                    style={{ marginTop: 3, paddingLeft: 10, color: textBlack, paddingRight: 20 }}>{item.template_name}</Text>
                                                                            ) : (
                                                                                    <Text numberOfLines={1}
                                                                                        style={{ marginTop: 3, paddingLeft: 10, color: textBlack, paddingRight: 20 }}>Template</Text>
                                                                                )}

                                                                        </View>

                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity>
                                                        )
                                                    })}
                                                    <JobCardList navigation={navigation} job_card_lists={job_card_lists} client_info={client_info}/>

                                                    <Text style={{ color: mainGrey, fontSize: 16, marginBottom: 20, marginTop: 20, marginLeft: 10, }}>Saved Drafts</Text>
                                                   
                                                    { sale_draft_template_list.map((item, key2) => {
                                                        return (

                                                            <TouchableOpacity onPress={() => call_draft(item)}>
                                                                <View style={{
                                                                    marginLeft: 10, marginRight: 10,
                                                                    flexDirection: 'row', height: 120, backgroundColor: textGrey,
                                                                    marginTop: 10, borderWidth: 0.25, borderColor: mainGrey, borderRadius: 10
                                                                }}>

                                                                    <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                                                        <View style={{ flex: 1, flexDirection: 'column' }}>
                                                                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                                                                <Icon1 style={{ paddingLeft: 10 }}
                                                                                    name="file-document-outline" size={25} color={mainGrey} />
                                                                                <Text numberOfLines={1}
                                                                                    style={{ marginTop: 3, paddingLeft: 10, color: textBlack, paddingRight: 20, fontWeight: 'bold' }}>{item.client_name}</Text>
                                                                            </View>
                                                                            <Text numberOfLines={1}
                                                                                style={{ marginTop: 3, marginBottom: 3, paddingLeft: 40, color: textBlack, paddingRight: 20 }}> {item.employee_name}</Text>
                                                                            <Text style={{ marginBottom: 3, paddingLeft: 40, color: textBlack, paddingRight: 20 }}> Created   : {moment(item.created_date_time).format('YYYY-MM-DD' + "    " + 'HH:mm:ss')}</Text>
                                                                            <Text style={{ marginTop: 3, paddingLeft: 40, color: textBlack, paddingRight: 20 }}> Modified : {moment(item.edited_date_time).format('YYYY-MM-DD ' + "   " + 'HH:mm:ss')}</Text>

                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity>
                                                        )
                                                    })}
                                                </View>
                                            )}
                                    </View>
                                ) : (
                                        <View>
                                            {data.files.length === 0 ? (
                                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: mediumGrey }}>
                                                    <View style={{ flex: 1, marginTop: 250, marginBottom: 200, height: 10, backgroundColor: mediumGrey, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 16, color: mainGrey }}>No Files Found</Text>
                                                    </View>
                                                </View>
                                            ) : (
                                                    <View>
                                                        { data.files.map((item, key2) => {
                                                            return (

                                                                <TouchableOpacity onPress={() => call_link(item.url)}>
                                                                    <View style={{
                                                                        marginLeft: 10, marginRight: 10,
                                                                        flexDirection: 'row', height: 55, backgroundColor: textGrey,
                                                                        marginTop: 10, borderWidth: 0.25, borderColor: mainGrey, borderRadius: 10
                                                                    }}>

                                                                        <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                                <Text style={{ paddingLeft: 10, color: textBlack }}>{key2 + 1}.</Text>
                                                                                <Text numberOfLines={1}
                                                                                    style={{ paddingLeft: 10, color: textBlack, paddingRight: 20 }}>{item.name}</Text>
                                                                            </View>

                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            )
                                                        })}
                                                    </View>
                                                )}
                                        </View>
                                    )}
                            </View>
                        ) : (
                                <ActivityIndicator size="large" color={mainBlue}></ActivityIndicator>
                            )}
                    </View>
                ) : (
                            null
                        )}
            </View>
        )
    }


    if (isLoading)
        return (
            <View style={{ marginTop: 100 }}>
                <ActivityIndicator size="large" color={mainBlue}></ActivityIndicator>
            </View>
        )

    return (
        <ScrollView showsVerticalScrollIndicator={false}
            style={{ backgroundColor: lightGrey }}
            refreshControl={
                <RefreshControl refreshing={loadData} onRefresh={call_apicompleted} />}>

            <RenderContacts />
        </ScrollView>

    )

}


const mapStateProps = (state) => {
    const {client_info, generate_quote_list, isLoading, template_lists, sale_draft_template_list, types ,job_card_lists} = state.sales_enviroWaste
    return {client_info, generate_quote_list, isLoading, template_lists, sale_draft_template_list, types,job_card_lists }
}


export default connect(mapStateProps)(QuoteGenerate)



