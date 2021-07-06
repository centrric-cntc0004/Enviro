import React, { useState,  createRef } from 'react'
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image,  Dimensions } from 'react-native'
import { lightGrey, mainWhite, darkkBlue, mainBlack,  textGrey } from '../../../../common/Colors'
import { add_image, select_images } from './common/action'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker';
import { ActionSheet, Root } from 'native-base';
import Icon1 from 'react-native-vector-icons/dist/FontAwesome5'
import Icon from 'react-native-vector-icons/Entypo'
import Toast from 'react-native-simple-toast';

let arr_new = []
let images = ''
let width = Dimensions.get('window').width / 3.6


const AddImage = ({ navigation, route, dispatch, schedule_enviro }) => {


    const { selected_client, array_images, type } = schedule_enviro
    const RenderForm = () => {
        const sign = createRef();
        const [signature, setSign] = useState(null);
        const [photo, setPhoto] = useState(images)
        const [loader, setLoader] = useState(false)
        const [imagarr, setArr] = useState([])


        const call_addimageapi = () => {
            setLoader(true)
            let form_body = new FormData()
            form_body.append('id', selected_client.id)

            for (let i = 0; i < array_images.length; i++) {
                form_body.append("image", array_images[i],"vehicle.jpg");

            }

            const success = (response) => {
                setLoader(false)
                dispatch(select_images())
                Toast.showWithGravity('Image Added Successfully', Toast.SHORT, Toast.BOTTOM);


            }
            const failure = (response) => {
                 setLoader(false)
                dispatch(select_images())
                Toast.showWithGravity('Failed !Try again', Toast.SHORT, Toast.BOTTOM);


            }

             dispatch(add_image(form_body, success, failure, selected_client.start_date, type))
        }

        const delete_image = (item) => {
            if (array_images.length === 1) {
                dispatch(select_images([]))
            } else {
                var array = array_images; // make a separate copy of the array
                var index = array.indexOf(item)
                if (index !== -1) {
                    array.splice(index, 1);
                    arr_new = array
                    dispatch(select_images(array))
                    // image_details(array)
                }
            }
        }

        const back_button = () => {  //IMAGE UPLOADING

            const buttons = ['Camera', 'Photo Library', 'Cancel'];
            ActionSheet.show(
                {
                    options: buttons,
                    cancelButtonIndex: 2,
                },
                buttonIndex => {
                    switch (buttonIndex) {
                        case 0:
                            takePhotoFromCamera();
                            break;
                        case 1:
                            choosePhotosFromGallery();
                            break;
                        default:
                            break;
                    }
                },
            );
        };
        const choosePhotosFromGallery = () => {
            let datanew = ""

            ImagePicker.openPicker({
                multiple: true
            }).then(images => {
                console.log("data" + JSON.stringify(images));
                let image_name = new Date().getTime().toString()
                let jpg_img = image_name + '.jpg'
                let png_img = image_name + '.png'
                for (let i = 0; i < images.length; i++) {
                    if (images[i].path && images[i].mime) {
                        datanew = { 'uri': images[i].path, "type": images[i].mime, "name": jpg_img || png_img }
                        arr_new.push(datanew)
                        console.log("data" + JSON.stringify(arr_new))
                        setArr(arr_new)
                        dispatch(select_images(arr_new))

                        // image_details(arr_new)
                    }
                }

            });
        }
        const takePhotoFromCamera = () => {


            let datanew = ""

            ImagePicker.openCamera({

            }).then(image => {
                let image_name = new Date().getTime().toString()
                let jpg_img = image_name + '.jpg'
                let png_img = image_name + '.png'
                if (image.path && image.mime) {
                    datanew = { 'uri': image.path, "type": image.mime, "name": jpg_img || png_img }
                    arr_new.push(datanew)
                    console.log("data" + JSON.stringify(arr_new))
                    // image_details(arr_new)
                    setArr(arr_new)
                    dispatch(select_images(arr_new))



                }
            });

        }
        const RenderList = ({ item }) => {

            return (
                <View style={{ width: width, height: 130, marginLeft: 7, marginRight: 6, marginBottom: 10, backgroundColor: mainBlack }}>
                    <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => delete_image(item)}>
                        <Icon style={{ alignSelf: 'flex-end' }}
                            name="circle-with-cross" size={20} color={mainWhite} />
                    </TouchableOpacity>
                    <Image source={{ uri: item.uri }}
                        style={{ height: width, width: width }}

                    />
                </View>


            )

        }

        if (array_images === undefined || array_images.length == 0)
            return (
                <View style={{ backgroundColor: lightGrey, flex: 1 }}>
                    <View style={{ backgroundColor: textGrey, height: 10 }}>

                    </View>

                    <View style={{ backgroundColor: lightGrey, flex: 1 }}>
                        <Root >

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>

                                <TouchableOpacity onPress={() => back_button()}
                                    style={{ borderRadius: 5, width: 170, height: 50, backgroundColor: darkkBlue, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: mainWhite }}>Add Images</Text>
                                </TouchableOpacity>
                            </View>
                        </Root>



                    </View>
                </View>
            )

        return (


            <View style={{ backgroundColor: lightGrey, flex: 1 }}>

                <View style={{ backgroundColor: lightGrey, flex: 1 }}>

                    <View style={{ flex: 1, }}>
                        {array_images[0] ? (
                            <View style={{ flex: 1, }}>
                                <View style={{ flex: 4, paddingHorizontal: 10 }}>
                                    <Image style={{ flex: 4, width: '100%', borderRadius: 2, marginTop: '5%' }}

                                        source={{ uri: array_images[0].uri }} />


                                </View>

                            </View>




                        ) : (

                                null

                            )}
                    </View>

                    <View style={{ flex: 0.3, flexDirection: 'row', }}>


                        <FlatList style={{ marginTop: '1%', }}
                            horizontal
                            data={array_images}
                            renderItem={RenderList}
                            keyExtractor={(item, key) => key.toString()}
                            showsHorizontalScrollIndicator={false}
                            onEndReachedThreshold={1}
                            refreshing={false}
                        />
                        <TouchableOpacity
                            // onPress={() => ProfilePictureAdd()}
                            style={{ marginTop: 14, width: 80, marginRight: 20, height: 100, width: width, justifyContent: 'center', alignItems: 'center', }}  >
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1.2, backgroundColor: "#F0F0F0", width: 80, height: 80 }}>
                                <Root >
                                    <TouchableOpacity onPress={() => back_button()}
                                        style={{}}>
                                        <TouchableOpacity style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}
                                            onPress={() => back_button()} >
                                            <Icon1
                                                name="plus" size={20} color="#000" />
                                        </TouchableOpacity>
                                    </TouchableOpacity >
                                </Root>

                            </View>


                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <TouchableOpacity onPress={() => call_addimageapi()}
                            style={{ borderRadius: 5, width: 170, height: 50, backgroundColor: darkkBlue, justifyContent: 'center', alignItems: 'center' }}>
                            {loader ? (
                                <ActivityIndicator color={mainWhite} size="small"></ActivityIndicator>
                            ) : (
                                    <Text style={{ color: mainWhite }}>Submit</Text>
                                )}
                        </TouchableOpacity>
                    </View>
                </View>

            </View>



        )

    }
    return (


        <RenderForm />

    )
}

const style = `.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`;

const mapStateProps = (state) => {
    const { schedule_enviro } = state

    return { schedule_enviro }
}



export default connect(mapStateProps)(AddImage)

