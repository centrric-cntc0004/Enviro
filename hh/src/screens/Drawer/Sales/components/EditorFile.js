


import React, { useState ,useEffect} from 'react';
import { Dimensions, TouchableWithoutFeedback, Keyboard, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import QuillEditor from 'react-native-quill-editor'
import { mainBlue, mainWhite } from '../../../../common/Colors';
let arr = ""
import { fetch_quote_template, fetch_folder_list } from './common/action'
import { ActivityIndicator } from 'react-native';
let array_list = ''
import Toast from 'react-native-simple-toast';

const EditorFile = ({ navigation, folder_list, template_list, route, quote_file_list, types, dispatch, template_quote_list }) => {


  let data=""
  if(quote_file_list){
    data=quote_file_list
  }
  const [content, setContent] = useState(data)
  const [loader, setLoader] = useState(true)
  const [loader1, setLoader1] = useState(false)

  

  var var1 = content.replace(/"/g, "");


  // console.log("data" + a1.replace(/"/g, ""))
  var NewText = var1.replace("table", "p");
  var NewText1 = NewText.replace("div", "p");

  let a3 = "`" + NewText1 + "`"
  let a = a3.replace(/\s{2,}/g, ' ')

  arr = a.data

  // setArr(a)

  useEffect(() => {
            
   
let loadingInterval = setInterval(() => {
  setLoader(false)
    clearInterval(loadingInterval)
}, 2500)
return () => {
    clearInterval(loadingInterval)
}
}, [])

  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }], ['link', 'image', 'video'],
    [{ 'table': [] }],                                        // remove formatting button

    ['clean']                                         // remove formatting button
  ];

  var width = Dimensions.get('window').width;
  var height = Dimensions.get('window').height;


  const call_template = () => {

    setLoader1(true)
    const success = (response) => {
      setLoader1(false)

      let item = { "id": response.data.template_id, "name": route.params.a }
      let a = folder_list.concat(item)
      const newArray = [];
     a.forEach(obj => {
        if (!newArray.some(o => o.name === obj.name)) {
          newArray.push({ ...obj })
        }

      });

      dispatch(fetch_folder_list(newArray))
      navigation.pop()

      Toast.showWithGravity('Added Successfully', Toast.SHORT, Toast.BOTTOM);

    }

    const failed = () => {
      setLoader1(false)


    }

    let formBody = new FormData()

    formBody.append('quote_attach_template', content)
    formBody.append('template_id', route.params.b)


    dispatch(fetch_quote_template(types, formBody, success, failed))

  }

  if(loader)
  return(
    <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
    <ActivityIndicator size="large" color={mainBlue}></ActivityIndicator>
    </View>
  )
  return (
    <>
      <ScrollView style={{ backgroundColor: mainWhite }}>
        <View style={{ width: width ,paddingHorizontal:10}}>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <QuillEditor
              style={{ height: 4500, marginRight: 20, }}
              defaultValue={a}
              options={{
                placeholder: 'data',
                modules: {

                  toolbar: {

                    container: toolbarOptions,
                    scrollingContainer: {},
                    theme: "snow"


                  }
                }
              }}
              onChange={txt => setContent(txt)}

            />

          </TouchableWithoutFeedback>

        </View>


      </ScrollView>
      <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite }}>
        <TouchableOpacity onPress={() => call_template()}
          style={{ borderRadius: 10, width: 200, height: 40, backgroundColor: mainBlue, justifyContent: 'center', alignItems: 'center' }}>
          {loader1 ? (
            <ActivityIndicator size="small" color={mainWhite}></ActivityIndicator>
          ) : (
              <Text style={{ color: mainWhite }}>Add to Attachment</Text>

            )}
        </TouchableOpacity>
      </View>

    </>
  )
}
const mapStateProps = (state) => {
  const { template_list, quote_file_list, types, template_quote_list, folder_list } = state.sales_enviroWaste
  return { template_list, quote_file_list, types, template_quote_list, folder_list }
}


export default connect(mapStateProps)(EditorFile)