import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, RefreshControl, PermissionsAndroid, SafeAreaView, ActivityIndicator, FlatList, ScrollView,Alert } from 'react-native'
import { mainWhite, darkGrey, textRed, mainGrey, lightGrey, mainBlue, mediumGrey, lightGreen,  } from '../../../../../common/Colors'
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import { PreInspectionList, MaintenanceList, FuelExpense, VehicleList } from './Innerscreen'
import ModalDropdown from 'react-native-modal-dropdown-v2';
let indexposition = 0
import Icon1 from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { fetch_preinspection_list, fetch_maintanace_list, fetch_all_truck_list, fetch_fuel_list, fetch_truck_list } from './common/action'
import RNFetchBlob from 'rn-fetch-blob'
import Api from '../../../../../store/api'
import Toast from 'react-native-simple-toast';
import AllTabs from '../common/AllTabs'


const TruckScreen = ({ navigation, isLoading, all_truck_list, dispatch }) => {
    const [loadData, setLoadData] = useState(false)

    const RenderContacts = ({ values }) => {
        const ref_scrollview = useRef()
        const dropdown = [{ "id": 1., "value": "Vehicle List" },
        { "id": 2., "value": "Pre Inspection check" },
        { "id": 3., "value": "Maintenance Report" },
        { "id": 4., "value": "Fuel Expense" },
        ]
        const dropdown1 = ["Vehicle List"
            , "Pre Inspection check",
            "Maintenance Report",
            "Fuel Expense",
        ]
        const [indexData, setIndexData] = useState(0)
        const [loginPageStatus, setloginPageStatus] = useState(false)

        const [isCheck, setCheck] = useState(false)
        const [isCheck1, setCheck1] = useState(false)
        const [selected, setSelected] = useState(dropdown[0])
        const [selectedData, setSelectedData] = useState(dropdown[0].value)
        const [selectedL, setSelectedL] = useState(false)



        const call_fuel_api = () => {
            const onSuccess = (response) => {
                setloginPageStatus(false)

                set_fuel_data(response.data)
            }

            const onFailue = (response) => {
                setloginPageStatus(false)

            }

            let functions = {
                success: onSuccess,
                failed: onFailue
            }
            fuel_data(1, functions)
        }



        const call_vehicle_api = () => {
            const onSuccess = (response) => {
                set_vehicle_data(response.data)
            }

            const onFailue = (response) => {

            }

            let functions = {
                success: onSuccess,
                failed: onFailue
            }
            get_vehicle_data("truck", functions)
        }

        const call_api = (item) => {

            setSelected(item)

        }


        const RenderItems = ({ item }) => {

            if (item.id === selected.id) {
                return (



                    <TouchableOpacity onPress={() => call_api(item)}
                    >
                        <View style={{
                            flex: 1,

                            flexDirection: 'row', height: 40, marginRight: 10,
                            marginTop: 10, borderWidth: 0.3, borderColor: darkGrey,
                        }}>
                            <View style={{ flex: 1, marginBottom: 5 }}>
                                <Text style={{ marginTop: 10, paddingLeft: 10 }}>{item.value}</Text>
                            </View>
                            <TouchableOpacity onPress={() => call_api(item)} >
                                <View style={{
                                    height: 18,
                                    width: 18,
                                    marginTop: 10,
                                    borderWidth: 1,
                                    marginRight: 10,
                                    borderRadius: 9,
                                    borderColor: mainGrey,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>

                                    <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: mainBlue }}>

                                    </View>


                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                )

            } else {
                return (



                    <TouchableOpacity onPress={() => call_api(item)}
                    >
                        <View style={{
                            flex: 1,

                            flexDirection: 'row', height: 40, marginRight: 10,
                            marginTop: 10, borderWidth: 0.3, borderColor: darkGrey,
                        }}>
                            <View style={{ flex: 1, marginBottom: 5 }}>


                                <Text style={{ marginTop: 10, paddingLeft: 10 }}>{item.value}</Text>
                            </View>
                            <TouchableOpacity onPress={() => call_api(item)} >
                                <View style={{
                                    opacity: 0.6,
                                    height: 18,
                                    width: 18,
                                    marginTop: 10,
                                    marginRight: 10,
                                    borderWidth: 1,
                                    borderRadius: 9,
                                    borderColor: mainGrey,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>

                                    <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: mainGrey }}>

                                    </View>


                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                )
            }
        }



        const onSelect = (index) => {
            indexposition = index

            setIndexData(index)
            setSelectedData(dropdown[index].value)


        }

        const checkClicked = () => {
            setCheck(!isCheck)
        }
        const checkClicked1 = () => {
            setCheck1(!isCheck1)
        }


        const checkPermission = async () => {


            //Function to check the platform
            //If iOS the start downloading
            //If Android then ask for runtime permission

            if (Platform.OS === 'ios') {
                download_api();
            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                        {
                            title: 'Storage Permission Required',
                            message: 'This app needs access to your storage to download Photos',
                        }
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //Once user grant the permission start downloading
                        console.log('Storage Permission Granted.');
                        download_api();
                    } else {
                        //If permission denied then show alert 'Storage Permission Not Granted'
                        Alert.alert('Storage Permission Not Granted');
                    }
                } catch (err) {
                    //To handle permission related issue
                    console.warn(err);
                }
            }

        };

        const download_api = () => {
            setSelectedL(true)
            let d = "https://staging-deep.envirowasteadmin.com.au/api/v1/prints/clients/list/waste/?key=truck"
            Api('get_header', "https://staging-deep.envirowasteadmin.com.au/api/v1/prints/clients/list/waste/?key=truck")
                .then(response => {
                    if (response.status === 200) {
                        var today = new Date();
                        let pdfname = 'truck_' + today.getDate() + '_' + Math.floor(today.getMonth() + 1) + '_' + today.getFullYear() + ".pdf";
                        let ex = "pdf"
                        let ext = getExtention(ex);
                        ext = '.' + ex;

                        // console.log("jj"+config + JSON.stringify(fs) )
                        // let PictureDir = fs.dirs.SDCardApplicationDir;
                        var today = new Date();
                        let date2 = today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear()

                        const { dirs } = RNFetchBlob.fs;
                        const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir
                        const configfb = {


                            fileCache: true,
                            addAndroidDownloads: {
                                useDownloadManager: true,
                                notification: true,
                                title: pdfname,
                                path: `${dirToSave}/${pdfname}`,
                            }
                        }
                        const configOptions = Platform.select({
                            ios: {
                                fileCache: configfb.fileCache,
                                title: configfb.title,
                                path: configfb.path,
                                appendExt: 'pdf',
                            },
                            android: configfb,
                        });


                        console.log('The file saved to 23233', configfb);

                        RNFetchBlob.config(configOptions)
                            .fetch('GET', "https://staging-deep.envirowasteadmin.com.au/api/v1/prints/clients/list/waste/?key=truck", {})
                            .then((res) => {
                                if (Platform.OS === "ios") {
                                    setSelectedL(false)
                                    Toast.showWithGravity('Downloaded Successfully' + configfb.path, Toast.SHORT, Toast.BOTTOM);

                                    RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
                                    RNFetchBlob.ios.previewDocument(configfb.path);
                                }
                                // setisdownloaded(false)
                                if (Platform.OS == 'android') {
                                    console.log('File downloaded');
                                    setSelectedL(false)
                                    Toast.showWithGravity('Downloaded Successfully', Toast.SHORT, Toast.BOTTOM);

                                    // showSnackbar('File downloaded');
                                }
                            })
                            .catch((e) => {
                                // setisdownloaded(true)

                                console.log('The file saved to ERROR', e.message)
                            });
                    }
                })



            // let options = {
            //     fileCache: true,
            //     addAndroidDownloads: {
            //         //Related to the Android only
            //         useDownloadManager: true,
            //         notification: true,
            //         path:
            //            date2,
            //         description: 'Image',
            //     },
            // };
            // const configOptions = Platform.select({
            //     ios: {
            //         fileCache: configfb.fileCache,
            //         title: configfb.title,
            //         path: configfb.path,
            //         appendExt: 'pdf',
            //     },
            //     android: configfb,
            // });






            // let options = {
            //     fileCache: true,
            //     addAndroidDownloads: {
            //         //Related to the Android only
            //         useDownloadManager: true,
            //         notification: true,
            //         path:
            //             PictureDir +
            //             '/truck_' + today.getDate() + '_' + Math.floor(today.getMonth() + 1) + '_' + today.getFullYear() + ext,
            //         description: 'Image',
            //     },
            // };
            // config(options)
            //     .fetch('GET', d)
            //     .then(res => {
            //         //Showing alert after successful downloading
            //         console.log('res -> ', JSON.stringify(res));
            //         //   this.setState({ visibleModal: false })
            //         //   this.setState({
            //         //     loadingProgress: false
            //         //   })

            //         Alert.alert(
            //             "Success",
            //             "Downloaded Successfully",
            //             [

            //                 { text: "OK", onPress: () => console.log("OK Pressed") }
            //             ],
            //             { cancelable: false }
            //         );
            //     });

        }




        //         const { dirs } = RNFetchBlob.fs;
        //         const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir
        //         const configfb = {
        //             fileCache: true,
        //             useDownloadManager: true,
        //             notification: true,
        //             mediaScannable: true,
        //             title:pdfname,
        //             path: `${dirToSave}/${pdfname}`,
        //         }
        //         const configOptions = Platform.select({
        //             ios: {
        //                 fileCache: configfb.fileCache,
        //                 title: configfb.title,
        //                 path: configfb.path,
        //                 appendExt: 'pdf',
        //             },
        //             android: configfb,
        //         });

        //         console.log('The file saved to 23233', configfb, dirs);

        //         RNFetchBlob.config(configOptions)
        //             .fetch('GET', "https://staging-deep.envirowasteadmin.com.au/api/v1/prints/clients/list/waste/?key=truck", {})
        //             .then((res) => {
        //                 if (Platform.OS === "ios") {
        //                     RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
        //                     RNFetchBlob.ios.previewDocument(configfb.path);
        //                 }
        //                 // setisdownloaded(false)
        //                 if (Platform.OS == 'android') {
        //                     console.log('File downloaded');

        //                     // showSnackbar('File downloaded');
        //                 }
        //                 console.log('The file saved to ', res);
        //             })
        //             .catch((e) => {
        //                 // setisdownloaded(true)

        //                 console.log('The file saved to ERROR', e.message)
        //             });
        //     }
        // })






        const getExtention = filename => {
            //To get the file extension
            return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
        };









      
        return (
            <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: mainWhite }}>
                
 <AllTabs navigation={navigation}/>
 
                <View style={{ flexDirection: 'row', marginTop: '1%', backgroundColor: mainWhite }}>
                    
                    <View style={{
                        marginTop: 5,
                        flex: 1, alignItems: 'center', flexDirection: 'row', paddingLeft: 10, paddingRight: 5, borderRadius: 5, height: 40, borderWidth: 0.3, backgroundColor: mainWhite, borderColor: darkGrey
                    }}>
                        <View style={{ flex: 4, justifyContent: 'center', }}>

                            <ModalDropdown
                                options={dropdown1}
                                defaultIndex={0}
                                textStyle={{ color: mainGrey, fontSize: 18 }}
                                dropdownStyle={{ width: 170, height: 150 }}
                                dropdownTextStyle={{ color: mainGrey, fontSize: 14, paddingLeft: 10, paddingTop: 10 }}
                                dropdownTextHighlightStyle={{ color: mainGrey, fontSize: 14, paddingLeft: 10 }}
                                onSelect={(index) => onSelect(index)}
                            >
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <View style={{ flex: 5 }}>
                                        <Text style={{ color: mainGrey, fontSize: 13, }} >{selectedData}</Text>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <Icon name="chevron-down" size={16} color={mainGrey} />
                                    </View>
                                </View>
                            </ModalDropdown>
                        </View>
                    </View>

                    <View style={{ flex: 0.1 }} />
                    {
                        selectedData === "Vehicle List" ? (
                            <TouchableOpacity onPress={() => checkPermission()}
                                style={{
                                    flex: 0.6,
                                    backgroundColor: 'orange',
                                    marginLeft: 30,
                                    marginTop: 5,
                                    marginBottom: 10,
                                    alignItems: 'center', justifyContent: 'center', alignItems: 'center',
                                    flexDirection: 'row', borderRadius: 20, height: 40, borderWidth: 0.5, backgroundColor: mainWhite, borderColor: mainBlue
                                }}>
                                {selectedL ? (
                                    <ActivityIndicator size="small" color={mainBlue}></ActivityIndicator>
                                ) : (
                                        <Text style={{ color: mainBlue, textAlign: 'center' }} >Print</Text>
                                    )}
                            </TouchableOpacity>
                        ) : selectedData === "Pre Inspection check" ? (
                            <TouchableOpacity onPress={() => navigation.navigate('addpreinspection', { vehicledata: all_truck_list })}
                                style={{
                                    flex: 0.6,
                                    backgroundColor: 'orange',
                                    marginLeft: 30,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    alignItems: 'center', justifyContent: 'center', alignItems: 'center',
                                    flexDirection: 'row', borderRadius: 20, height: 40, borderWidth: 0.5, backgroundColor: mainWhite, borderColor: mainBlue
                                }}>

                                <Text style={{ color: mainBlue, textAlign: 'center' }} >Add New +</Text>
                            </TouchableOpacity>
                        ) : selectedData === "Maintenance Report" ? (
                            <TouchableOpacity onPress={() => navigation.navigate('addtruck', { vehicledata: all_truck_list })}
                                style={{
                                    flex: 0.6,
                                    backgroundColor: 'orange',
                                    marginLeft: 30,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    alignItems: 'center', justifyContent: 'center', alignItems: 'center',
                                    flexDirection: 'row', borderRadius: 20, height: 40, borderWidth: 0.5, backgroundColor: mainWhite, borderColor: mainBlue
                                }}>

                                <Text style={{ color: mainBlue, textAlign: 'center' }} >Add New +</Text>
                            </TouchableOpacity>
                        ) : (
                                        <TouchableOpacity onPress={() => navigation.navigate('addfuelExpense', { vehicledata: all_truck_list })}
                                            style={{
                                                flex: 0.6,
                                                backgroundColor: 'orange',
                                                marginLeft: 30,
                                                marginTop: 10,
                                                marginBottom: 10,
                                                alignItems: 'center', justifyContent: 'center', alignItems: 'center',
                                                flexDirection: 'row', borderRadius: 20, height: 40, borderWidth: 0.5, backgroundColor: mainWhite, borderColor: mainBlue
                                            }}>

                                            <Text style={{ color: mainBlue, textAlign: 'center' }} >Add New +</Text>
                                        </TouchableOpacity>
                                    )
                    }

                </View>
                {
                    indexposition == 0 ? (
                        <VehicleList navigation={navigation} />


                    ) : indexposition == 1 ? (
                        <PreInspectionList navigation={navigation} />



                    ) : indexposition == 2 ? (
                        <MaintenanceList navigation={navigation}
                        />

                    )
                                : (

                                    <FuelExpense navigation={navigation} />
                                )
                }
            </View>




        )

    }
    const call_apicompleted = () => {

        dispatch(fetch_preinspection_list()),
            dispatch(fetch_maintanace_list(1)),
            dispatch(fetch_all_truck_list()),
            dispatch(fetch_fuel_list(1)),
            dispatch(fetch_truck_list(1))

    }
    return (
        // <ScrollView showsVerticalScrollIndicator={false}
        // style={{ flex: 1, }}>
        // <ScrollView showsVerticalScrollIndicator={false}

        //     style={{ paddingBottom: 40, backgroundColor: mainWhite,marginTop:'3%' }}
        //     refreshControl={
        //         <RefreshControl refreshing={loadData} onRefresh={call_apicompleted} />
        //     }>

        <FlatList  style={{backgroundColor:mainWhite}}
        data={[]}
       
        ListHeaderComponent={RenderContacts}
    />


        // </ScrollView>


    )

}

const mapStateProps = (state) => {
    const { isLoading, all_truck_list } = state.vehicle__truck
    return { isLoading, all_truck_list }
}

export default connect(mapStateProps)(TruckScreen)


