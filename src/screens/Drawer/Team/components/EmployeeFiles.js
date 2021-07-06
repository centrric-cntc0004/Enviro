



import React, { useState } from 'react'
import { View, Text, Linking, ScrollView } from 'react-native'
import { lightGrey, mediumGrey, textGrey, } from '../../../../common/Colors'
import { connect } from 'react-redux'
import { TEAM_FOLDER_CREATE, TEAM_ALL_FOLDERS_LIST1, INTRANET_FILES_RENAME, INTRANET_FOLDER_EDIT, TEAM_INNER_FOLDER_CREATE, TEAM_FILES_CREATE, OHS_AND_S_FOLDER_DELETE, OHS_AND_S_FILE_DELETE } from '../../../../store/endpoint'
import IntranetNewFolders from '../../../Drawer/Intranet/components/IntranetNewFolder'


const EmployeeFiles = ({ navigation, route, team, dispatch }) => {



    const { sub_files, selected_employee } = team
    if (sub_files === undefined)
        return (
            <View style={{ flex: 1, backgroundColor: lightGrey }}>
                <View style={{ height: 10, backgroundColor: textGrey }}>

                </View>
                <View style={{ height: 45, backgroundColor: mediumGrey, flexDirection: 'row', }}>
                    <Text style={{ marginTop: 15, paddingLeft: 30, fontSize: 14 }}>{route.params.name}</Text>

                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 250 }}>
                    <Text style={{ textAlign: 'center' }}>No Files Found</Text>
                </View>
            </View>
        )




    return (

        <ScrollView style={{ backgroundColor: lightGrey }}
            showsVerticalScrollIndicator={false}>
            <View style={{ height: 10, backgroundColor: textGrey }}>

            </View>
            <View style={{ flex: 0.1, marginBottom: 10, }}>
                <IntranetNewFolders navigation={navigation} APIURL={`${TEAM_ALL_FOLDERS_LIST1}${selected_employee.id}/`}
                    FOLDEREDIT={INTRANET_FOLDER_EDIT} FOLDERADD={TEAM_INNER_FOLDER_CREATE} FOLDERCREATE={TEAM_FOLDER_CREATE}
                    FOLDERDELETE={OHS_AND_S_FOLDER_DELETE} FILEADD={TEAM_FILES_CREATE} SELECTID={selected_employee.id} SELETPATH={"team"}
                    FILEEDIT={INTRANET_FILES_RENAME} FILEDELETE={OHS_AND_S_FILE_DELETE}
                    id={route.params.id} name={route.params.name}
                />
            </View>
        </ScrollView>



    )

}
const mapStateProps = (state) => {
    const { team } = state

    return { team }
}



export default connect(mapStateProps)(EmployeeFiles)





