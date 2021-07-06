
import React, { useEffect, } from 'react'
import { StyleSheet, View, Text, Image, Alert, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { lightGrey, mainWhite, darkGrey, mainBlue, textGrey, mainGrey, lightGreen, textBlack, lightGreyBackground, mediumGrey } from '../../../../common/Colors'
import { TeamImage } from '../../../../common/Images'
import { CertificateList } from './Innerscreen'
import { select_employee, delete_employee } from '../action'
import { BASE_IMAGE_URL } from '../../../../store/endpoint'
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast';
import MainFolder from '../../Intranet/components/MainFolder'
import { TEAM_FOLDER_CREATE, TEAM_ALL_FOLDERS_LIST1, INTRANET_FILE_CREATE, INTRANET_FOLDER_EDIT, TEAM_INNER_FOLDER_CREATE, ACCOUNTS_FOLDER_CREATE, OHS_AND_S_FOLDER_DELETE } from '../../../../store/endpoint'

const TeamProfile = ({ route, navigation, team, dispatch, all_folders }) => {
    let width = Dimensions.get('window').width / 2.2




    const RenderContacts = () => {

        const { selected_employee, folder_emp } = team

        console.log("selected_employee" + JSON.stringify(folder_emp))
        useEffect(() => {
            select_employee(route.params.item)
        }, [])

        const call_delete = () => {
            Alert.alert(
                "Delete",
                "Are you sure ?",
                [
                    {
                        text: "No",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Yes", onPress: () => call_apidelete() }
                ],
                { cancelable: false }
            );
        }
        const call_apidelete = () => {
            const success = () => {
                Toast.showWithGravity('Deleted Successfully', Toast.SHORT, Toast.BOTTOM);

                navigation.pop()
            }

            const failed = () => {

            }

            dispatch(delete_employee(selected_employee.employee_id, success, failed))

        }
        if (selected_employee) {
            if (selected_employee.dp_thumbnail) {
                var profPic = { uri: selected_employee.dp_thumbnail };
            } else {
                var profPic = TeamImage;

            }
        }

        const RenderItems = ({ item }) => {

            return (
                <View
                    style={{ height: 40, flexDirection: 'row', width: width, margin: 8, marginLeft: 15 }} >
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 35, width: 150, borderWidth: 1, borderColor: mainGrey, borderRadius: 50 }}>
                        <Text numberOfLines={1}
                            style={{ width: 100 }}>{item.name}</Text>
                    </View>
                </View>
            )
        }

        return (
            <SafeAreaView style={{ flex: 1, }}>

                <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1, backgroundColor: lightGrey, }}>
                        <View style={{ borderRadius: 5, paddingBottom: 10, borderWidth: 0.25, borderColor: mainGrey, marginLeft: 10, marginRight: 10, flex: 1.9, paddingHorizontal: 20, backgroundColor: mediumGrey, flexDirection: 'row', marginTop: '7%' }}>

                            <View style={{ flex: 1.2, backgroundColor: mediumGrey, marginTop: 10 }}>
                                <Image style={{ height: 80, width: 80, borderRadius: 40, marginTop: 10 }} source={profPic} />
                            </View>

                            <View style={{
                                marginTop: 10, height: 100,
                                flex: 2, backgroundColor: mediumGrey, marginLeft: 10, marginRight: 10, marginBottom: 10, flexDirection: 'column'
                            }}>
                                <Text numberOfLines={1}
                                    style={{ paddingTop: 8, color: lightGreen, fontSize: 14 }}>{selected_employee.user_type}</Text>

                                <Text numberOfLines={1}
                                    style={{ paddingTop: 8, color: darkGrey, fontSize: 16, width: 180 }}>{selected_employee.name}</Text>

                                <View style={{ marginTop: 10, backgroundColor: mediumGrey, flexDirection: "row" }}>
                                    <TouchableOpacity onPress={() => call_delete()}
                                        style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite, width: 70, height: 35, borderWidth: 0.5, borderRadius: 50, borderColor: lightGreen }}>
                                        <Text style={{ alignSelf: 'center', color: lightGreen }}>Delete</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate("EditTeam")}
                                        style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite, width: 70, height: 35, borderWidth: 0.5, borderRadius: 50, borderColor: lightGreen }}>
                                        <Text style={{ alignSelf: 'center', color: lightGreen }}>Edit</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>
                            <View style={{
                                flex: 0.6, backgroundColor: mediumGrey, marginTop: 10

                            }}>
                            </View>
                        </View>
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 1.5, paddingHorizontal: 20, marginTop: 20 }}>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Address</Text>
                                </View>
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{}}>:</Text>
                                    <Text numberOfLines={1}
                                        style={{ paddingLeft: 5, }} >{selected_employee.address}</Text>

                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Date of Birth</Text>
                                </View>
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{}}>:</Text>
                                    <Text style={{ paddingLeft: 5, }} >{selected_employee.date_of_birth}</Text>

                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Joining Date</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: lightGrey,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{}}>:</Text>
                                    <Text numberOfLines={1}
                                        style={{ paddingLeft: 5, }}>{selected_employee.date_joined}</Text>

                                </View>

                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Email Address</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: lightGrey,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{}}>:</Text>
                                    <Text numberOfLines={1}
                                        style={{ paddingLeft: 5, }}>{selected_employee.email}</Text>

                                </View>

                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Contact Number</Text>
                                </View>
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{}}>:</Text>
                                    <Text style={{ paddingLeft: 5, }}>{selected_employee.contact_number}</Text>

                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Termination Date</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: lightGrey,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{}}>:</Text>
                                    <Text numberOfLines={1}
                                        style={{ paddingLeft: 5, }}>{selected_employee.termination_date}</Text>

                                </View>

                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Employment Status</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: lightGrey,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{}}>:</Text>
                                    <Text numberOfLines={1}
                                        style={{ paddingLeft: 5, }}>{selected_employee.employement_status}</Text>

                                </View>

                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Work Email Address</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: lightGrey,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{}}>:</Text>
                                    <Text numberOfLines={1}
                                        style={{ paddingLeft: 5, }}>{selected_employee.email}</Text>

                                </View>

                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Emergency Contact</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: lightGrey,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{}}>:</Text>
                                    {selected_employee.emergency_contact_name === "null" ? (
                                        <Text numberOfLines={1}
                                            style={{ paddingLeft: 5, }}></Text>

                                    ) : (
                                            <Text numberOfLines={1}
                                                style={{ paddingLeft: 5, }}>{selected_employee.emergency_contact_name}</Text>
                                        )}
                                </View>

                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Emergency Contact No</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: lightGrey,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{}}>:</Text>
                                    {selected_employee.emergency_contact === "null" ? (
                                        <Text numberOfLines={1}
                                            style={{ paddingLeft: 5, }}></Text>
                                    ) : (
                                            <Text numberOfLines={1}
                                                style={{ paddingLeft: 5, }}>{selected_employee.emergency_contact}</Text>
                                        )}
                                </View>

                            </View>
                        </View>

                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 3, backgroundColor: lightGrey }}>
                            <View style={{ flex: 1, backgroundColor: lightGreyBackground, height: 50 }}>

                                <Text style={{ paddingLeft: 10, paddingTop: 15, color: textBlack }}>Employees Folder</Text>
                            </View>
                            <MainFolder navigation={navigation} APIURL={`${TEAM_ALL_FOLDERS_LIST1}${selected_employee.id}/`}
                                FOLDEREDIT={INTRANET_FOLDER_EDIT} FOLDERADD={TEAM_INNER_FOLDER_CREATE} FOLDERCREATE={TEAM_FOLDER_CREATE}
                                FOLDERDELETE={OHS_AND_S_FOLDER_DELETE} FILEADD={INTRANET_FILE_CREATE} SELECTID={selected_employee.id} SELETPATH={"team"} />


                            {/* <CertificateList navigation={navigation} data={folder_emp} /> */}

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }



    return (

        <View style={{ flex: 1, backgroundColor: lightGrey }}>
            <View style={{ backgroundColor: textGrey, height: 11 }}>
            </View>
            <RenderContacts />
        </View>

    )

}

const mapPropState = (state) => {
    const { team, all_folders } = state
    return { team, all_folders }
}
export default connect(mapPropState)(TeamProfile)


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
        color: textBlack,
        fontSize: 14,
    },
    textStyleeditable: {
        paddingTop: 10,
        paddingLeft: 10,
        color: darkGrey,
        fontSize: 14

    },
    staticBoxStyle: {
        flex: 1.0,
        height: 40,
        marginRight: 10,
        alignSelf: 'center'

    },
    editableBoxStyle: {
        flex: 1,
        backgroundColor: lightGrey,
        marginRight: 10,
        height: 40,
        flexDirection: 'row',
        alignSelf: 'center'

    }



});



