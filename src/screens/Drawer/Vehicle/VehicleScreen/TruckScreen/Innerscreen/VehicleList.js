import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { mainWhite, darkGrey, mainGrey, lightGrey, mainBlue } from '../../../../../../common/Colors'
import { connect } from 'react-redux'
import { vehicle_list_pagination, complete_vehicle_list, get_vehicle_info } from '../common/action'
import Api from '../../../../../../store/api'
import { VEHICLE_GET } from '../../../../../../store/endpoint'
import NoDataContent from '../../../../../../common/NoDataContent'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler'

const VehicleList = ({ isLoading, companytypes, navigation, data, vehicledata, vehicle_list_paginationdata, truck_preinspection_list, truck_list, complete_vehicle_lists, dispatch }) => {
    const RenderContacts = () => {

        const [pageNo, setPageNo] = useState(2)
        const [apiRecall, setapiRecall] = useState(true)
        const [loading, setLoading] = useState(true);
        const [dataSource, setDataSource] = useState([]);
        const [dataresponse, setResponse] = useState(false);

        const [offset, setOffset] = useState(1);

        let data = []
        console.log("truck_list" + JSON.stringify(truck_list))
        // useEffect(() => {

        const fetch_api_call = () => {
            setLoading(true)
            let get_url = VEHICLE_GET + companytypes.name + '/' + 'truck/' + offset + '/'

            Api('get', get_url).then(response => {
                console.log("kjihkjhyuhyu" + JSON.stringify(response))
                setOffset(offset + 1);
                //Increasing the offset for the next API call
                setDataSource([...dataSource, ...response]);
                setLoading(false);
            })
        }


        useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                fetch_api_call()

            });
            const fetch_api_call = () => {
                setLoading(true)
                let get_url = VEHICLE_GET + companytypes.name + '/' + 'truck' +'/all/' + offset + '/'
                console.log("kjihkjhyuhyu" + JSON.stringify(get_url))
                Api('get', get_url).then(response => {
                    console.log("kjihkjhyuhyu" + JSON.stringify(response))
                    setOffset(offset + 1);
                    //Increasing the offset for the next API call
                    setDataSource([...dataSource, ...response]);
                    setLoading(false);
                })
            }
            fetch_api_call()



            return unsubscribe;
        }, [VEHICLE_GET])




        const getData = () => {
            if (!dataresponse) {


                setLoading(true);
                let get_url = VEHICLE_GET + companytypes.name + '/' + 'truck' +'/all/' + offset + '/'

                console.log("geturl" + get_url)
                //Service to get the data from the server to render
                Api('get', get_url)
                    //Sending the currect offset with get request

                    .then((responseJson) => {
                        console.log("sjdhkjshcjzgjscjz" + JSON.stringify(responseJson))
                        //Successful response
                        setOffset(offset + 1);
                        //Increasing the offset for the next API call
                        setDataSource([...dataSource, ...responseJson]);
                        setLoading(false);
                        if (responseJson.length === 0) {
                            setResponse(true)
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else { }
        };


        const call_apis1 = (itemss) => {
            console.log("item" + JSON.stringify(itemss))
            dispatch(get_vehicle_info(itemss))

            navigation.navigate('enviro-vehicle', { items: itemss })
        }
        const call_icon = (item) => {
            dispatch(get_vehicle_info(item))
            navigation.navigate("FleetList", { items: item })
        }
        const call_nextapi = () => {
            console.log("Inside Method")
            setPageNo(pageNo + 1)
            let length = vehicle_list_paginationdata.length

            if (length % 8 === 0) {
                let get_url = VEHICLE_GET + 'truck/' + pageNo + '/'
                let length = vehicle_list_paginationdata.length
                console.log("urlll" + get_url)
                console.log("leeeeeeeeeeeeeeeeee" + length)
                Api('get', get_url)
                    .then(response => {

                        if (response.length > 0) {
                            let arry = []
                            arry = vehicle_list_paginationdata.concat(response)
                            const newArrayList = [];
                            arry.forEach(obj => {
                                if (!newArrayList.some(o => o.id === obj.id)) {
                                    newArrayList.push({ ...obj });
                                }
                            });

                            console.log("klahskuayui" + JSON.stringify(response))

                            dispatch({ type: 'VEHICLE_LIST_PAGINATION', vehicle_page: newArrayList })
                        }
                    })



                // const success = (response) => {

                //     if (vehicle_list_paginationdata) {
                //         let get_url = VEHICLE_GET + 'truck/' + pageNo + '/'
                //         Api('get', get_url)
                //             .then(response => {

                //                 if (response) {
                //                     dispatch({ type: 'VEHICLE_LIST_PAGINATION', vehicle_page: response })
                //                 }
                //             })
                //         // dispatch(complete_vehicle_list(vehicle_list_paginationdata.concat(response)))
                //         setPageNo(pageNo + 1)
                //     }

                //     else {

                //         dispatch(complete_vehicle_list(vehicle_list_paginationdata.concat(response)))
                //         setPageNo(pageNo + 1)
                //     }

                // }
                // const failed = (response) => {
                // }

                // dispatch(vehicle_list_pagination(pageNo, success, failed))

            } else {

            }

        }

        const renderFooter = () => {
            return (
                //Footer View with Load More button
                <View style={{ backgroundColor: mainWhite }}>
                    {loading ? (
                        <ActivityIndicator
                            color={mainBlue} size="large"
                            style={{ marginLeft: 8 }} />
                    ) : null}
                </View>

            );
        };
        const renderHeader = () => {
            return (
                <FlatList
                    data={dataSource}
                    renderItem={RenderList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, key) => key.toString()} />

            );
        };

        const delete_api = (id) => {
            Alert.alert(
                "Confirmation",
                "Are you sure to delete?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("kkk"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => call_api(id) }
                ],
                { cancelable: false }
            );
        }
        const call_api = (id) => {
            let data = {
                id: id
            }
            const onSuccess = (response) => {
                recall_notifications()
            }

            const onFailue = (response) => {
            }
            let functions = {
                success: onSuccess,
                failed: onFailue
            }
            truck_delete_data(data, functions)

        }

        const RenderList = ({ item }) => {
            const { id, types, registration, previous_rego, due_rego } = item
            return (


                <TouchableOpacity
                    // onLongPress={() => delete_api(id)}
                    onPress={() => call_apis1(item)}
                    style={{
                        flexDirection: 'column', borderRadius: 1,
                        height: 170, backgroundColor: mainWhite, marginTop: 15, borderWidth: 0.25, borderColor: darkGrey
                    }}>
                    <View style={{ flexDirection: 'row', flex: 1, backgroundColor: mainWhite, marginTop: 2, marginLeft: 5, marginRight: 5, }}>

                        <View style={{ flex: 2.8, marginLeft: 10, marginRight: 10, flexDirection: 'column', }}>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Registration No</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Rego Due</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Type</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Year</Text>

                        </View>
                        <View style={{ flex: 3, marginLeft: 10, marginRight: 10, }}>

                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {item.registration}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {item.due_rego}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {item.types}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {item.year}</Text>

                        </View>
                        <TouchableOpacity style={{ marginTop: 5 }}
                            onPress={() => call_icon(item)}>
                            <Icon name="video-input-antenna" size={17}></Icon>
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        flex: 1,
                        marginTop: '10%',


                    }}>
                    </View>
                </TouchableOpacity>




            )
        }
        if (loading)
            return (
                <View style={{ justifyContent: 'center', alignContent: 'center', marginTop: '50%' }}>
                    <ActivityIndicator size="large" color={mainBlue}></ActivityIndicator>
                </View>
            )
        if (dataSource.length === 0)
            return (
                <View style={{ justifyContent: 'center', alignContent: 'center', marginTop: '50%' }}>
                    <NoDataContent />
                </View>
            )
        console.log("ksjdfhkjsd" + JSON.stringify(dataSource))
        return (
            <View style={{ flex: 1, backgroundColor: mainWhite, marginTop: '1%', marginBottom: 30 }}>
                {/* {complete_vehicle_lists!==undefined?(
                  <>
                { complete_vehicle_lists.length > 0 ? (
            <FlatList
                style={{ marginTop: '3%', }}
                scrollEnabled={false}
                data={complete_vehicle_lists}
                renderItem={RenderList}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, key) => key.toString()}
                onEndReached={() => call_nextapi()}
                onEndReachedThreshold={1}
            />
        ) : ( */}
                <FlatList
                    style={{ paddingBottom: 150 }}
                    data={dataSource}
                    renderItem={RenderList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, key) => key.toString()}
                    onEndReached={() => getData()}
                    onEndReachedThreshold={1}
                    ListFooterComponent={renderFooter}
                    ListHeaderComponent={renderHeader}
                />
                {/* )
        } */}
                {/* </>
        ):(null)}
            </View>
        ) */}

                {/* } */}
            </View>)
    }


    return (

        <RenderContacts />
    )
}
const mapStateProps = (state) => {
    const { isLoading, companytypes, truck_preinspection_list, truck_list, vehicle_list_paginationdata, complete_vehicle_lists } = state.vehicle__truck
    return { isLoading, companytypes, truck_preinspection_list, truck_list, complete_vehicle_lists, vehicle_list_paginationdata }
}

export default connect(mapStateProps)(VehicleList)


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#800000',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
});


