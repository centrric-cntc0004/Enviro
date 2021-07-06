import React, { useState } from 'react'
import { StyleSheet, View, Text, } from 'react-native'
import { mainWhite, darkGrey, lightGrey, textBlack, mainBlue, } from '../../../../../../common/Colors'
import CheckBoxReviewEdit from './CheckBoxReviewEdit'


const ReviewScreen = ({ navigation, data }) => {

    const RenderContacts = () => {
        let safe_ready_to_operate = ""
        let reported_faults = ""
        let reviewed_form = ""
        let corrected = ""
        let scheduled_for_repair = ""
        let no_action = ""
        let do_not_affect_safe_operation = ""
        let name = ""
        let signatures = ""
        let date_now = ""
        let vehicle = ""
        let driver_name = ""
        if (data) {
            safe_ready_to_operate = data.safe_ready_to_operate
            reported_faults = data.reported_faults
            reviewed_form = data.reviewed_form
            corrected = data.corrected
            scheduled_for_repair = data.scheduled_for_repair
            no_action = data.no_action
            do_not_affect_safe_operation = data.do_not_affect_safe_operation
            name = data.name
            signatures = data.signature
            date_now = data.date_now
            vehicle = data.vehicle
            driver_name = data.driver_name
        }

        const [isCheck34, setCheck34] = useState(reviewed_form)
        const [isCheck35, setCheck35] = useState(corrected)
        const [isCheck36, setCheck36] = useState(no_action)
        const [isCheck37, setCheck37] = useState(scheduled_for_repair)
        const [isCheck38, setCheck38] = useState(do_not_affect_safe_operation)



        const checkClicked = () => {
            setCheck(!isCheck)
        }

        const submit_form = () => {
            let form_body = new FormData()
            form_body.append("vehicle", Vehicle)
            form_body.append("odometer", Odometer)
            form_body.append("driver_name", driver_id)
            form_body.append("odometdriver_signature", DriverSignature)
            form_body.append("hour_meter_start", HourMeterStart)

            form_body.append("fit_for_work", FitForWork)
            form_body.append("Valid_driving_license", ValidDrivingLicense)
            form_body.append("appropriate_ppe", AppropriatePPE)

            form_body.append("engine_oil_level", EngineOilLevel)
            form_body.append("warning_system", WarningSystem)
            form_body.append("steering", Steering)
            form_body.append("safety_emerg_stop", SafetyEmrgStop)
            form_body.append("handbreak_alarm", HandBreakAlram)
            form_body.append("pto_vacpump", PTOVacPump)

            form_body.append("horn", Horn)
            form_body.append("rev_alarm_camera", RevAlarmCamera)
            form_body.append("lights_head", LightsHead)
            form_body.append("lights_tail", LightsTail)
            form_body.append("light_beacons", LightsBeacon)
            form_body.append("hazard_light", HazardLight)

            form_body.append("rims_wheelnut", RimsWheels)
            form_body.append("coolant", Coolant)
            form_body.append("wheels", Wheels)
            form_body.append("mirror_windowscreen", MirrorWindows)
            form_body.append("structure_bodywork", StructureBody)
            form_body.append("wipers", Wipers)

            form_body.append("fuel_levelpump", setFuelLevelPump)
            form_body.append("fuel_leveltruck", FuelLevelTruck)
            form_body.append("seat_seatbelt", SeatSeatbelt)
            form_body.append("parkbrake_trailer", ParkBreakTrailer)
            form_body.append("foot_brake", FootBrake)
            form_body.append("electrical", Electrical)
            form_body.append("pin_retainers", PinRetainer)

            form_body.append("hoses", Hoses)
            form_body.append("fittings", Fittings)
            form_body.append("first_aid_kit", FirstAidKit)
            form_body.append("ppe", PPE)
            form_body.append("fire_extinguisher_date", FireExtingusreDate)

            form_body.append("garden_hose", GardenHose)
            form_body.append("gatic_lifters", GaticLiters)
            form_body.append("bucket_rags", BucketRag)
            form_body.append("spill_kit", SpillKit)

            form_body.append("reported_faults", ReportedFaults)
            form_body.append("reviewed_form", ReviewdForm)
            form_body.append("corrected", Corrected)
            form_body.append("scheduled_for_repair", ScheduledForRepair)

            form_body.append("no_action", NoAction)
            form_body.append("do_not_affect_safe_operation", DoNotAffectSafeOperation)

            const success = () => {

            }

            const failed = () => {

            }

            create_preinspection(form_body, success, failed)
        }

        return (
            <View style={{ flex: 1, backgroundColor: "#c3edf6", marginTop: '10%', paddingHorizontal: 10 }}>
                <View style={{ height: 40, backgroundColor: "#c3edf6" }}>
                    <Text style={{ fontSize: 14, color: textBlack, opacity: 1, paddingTop: 20, }}>Manager Brief and Review</Text>
                </View>
                <View style={{ flex: 0.5, paddingTop: 20, backgroundColor: "#c3edf6", flexDirection: 'row', height: 90 }}>
                    <CheckBoxReviewEdit checked={isCheck34}  />
                    <Text style={{ paddingLeft: 20, fontSize: 14, color: textBlack, opacity: 1, paddingRight: 5 }}>I have reviewed this form and satisfied that required maintenance or safety related items have been addressed.</Text>
                </View>
                <View style={{ flex: 0.5, backgroundColor: "#c3edf6", flexDirection: 'column' }}>
                    <Text>I certify that faults reported have been</Text>
                    <View style={{ flex: 0.5, backgroundColor: "#c3edf6", flexDirection: 'row', height: 40, marginTop: 20 }}>
                        <CheckBoxReviewEdit checked={isCheck35}  />
                        <Text style={{ paddingLeft: 20, fontSize: 14, color: textBlack, opacity: 1 }}>Corrected</Text>
                        <View style={{ flex: 1 }} />
                        <CheckBoxReviewEdit checked={isCheck36} />
                        <Text style={{ paddingLeft: 20, fontSize: 14, color: textBlack, opacity: 1 }}>No Action</Text>

                    </View>
                    <View style={{ flex: 0.5, backgroundColor: "#c3edf6", flexDirection: 'row', height: 40, }}>

                        <CheckBoxReviewEdit checked={isCheck37}  />
                        <Text style={{ paddingLeft: 20, fontSize: 14, color: textBlack, opacity: 1 }}>Schedule for repair</Text>
                    </View>
                    <View style={{ flex: 0.5, backgroundColor: "#c3edf6", flexDirection: 'row', height: 50, }}>

                        <CheckBoxReviewEdit checked={isCheck38}  />
                        <Text style={{ paddingLeft: 20, fontSize: 14, color: textBlack, opacity: 1 }}>Issues scheduled for maintenance or repair do not affect the safe operation of this vehicle</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 10, flex: 0.5, backgroundColor: "#c3edf6", justifyContent: 'flex-start' }}>
                   <View style={{flexDirection:'column'}}>
                    <Text>Date</Text>
                    <Text style={{fontSize:14}}>{date_now}</Text>

                    </View>
                </View>
                <View style={{ flex: 0.5, backgroundColor: "#c3edf6" }}>
                    <View style={{ flex: 2.5, marginTop: '7%', flexDirection: 'row', height: 80 }}>
                        <View style={{ flex: 0.3 }} />

                        <View style={{ flex: 0.2, }}>
                        </View>

                    </View>

                </View>
                <View style={{ paddingTop: 20, paddingBottom: 60, flex: 0.5, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    {/* <View style={{ width: 150, height: 40, backgroundColor: mainBlue, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: mainWhite, }}>Submit</Text>
                    </View> */}
                </View>
            </View>
        )
    }



    return (

        <RenderContacts />

    )

}

export default ReviewScreen
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
        paddingLeft: 10,
        color: darkGrey
    },
    staticBoxStyle: {
        flex: 1.5,
        backgroundColor: lightGrey,
        height: 30,
        marginRight: 10,
    },
    editableBoxStyle: {
        flex: 1.5,
        backgroundColor: lightGrey,
        height: 30,
        flexDirection: 'row'
    }



});






