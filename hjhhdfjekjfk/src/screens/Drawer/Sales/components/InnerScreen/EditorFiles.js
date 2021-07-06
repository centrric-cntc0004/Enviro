


import React, { useState } from 'react';
import { Dimensions, TouchableWithoutFeedback, Keyboard, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import QuillEditor from 'react-native-quill-editor'
import { mainBlue } from '../../../../../common/Colors';
let arr = ""

function EditorFiles(template_list) {

  const [content, setContent] = useState(template_list.template_list[0].html_content)
console.log("kjlj"+template_list.template_list[0].html_content)
  var var1 = content.replace(/"/g, "");
  
  // console.log("data" + a1.replace(/"/g, ""))
  var NewText = var1.replace("table", "p");
  var NewText1 = NewText.replace("div", "p");

  let a3 = "`" + NewText1 + "`"
  let a = a3.replace(/\s{2,}/g, ' ')

  arr = a.data

  // setArr(a)



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

  
  return (
    <ScrollView >
          <QuillEditor
            style={{  marginRight: 20, }}
            defaultValue={a}
            options={{
              placeholder: 'data',
              modules: {

                toolbar: {
                  style: { height: 300 },
                  container: toolbarOptions,
                  scrollingContainer: {},
                  theme: "snow"


                }
              }
            }}
          />
        
       <View style={{justifyContent:'center',alignItems:'center'}}>
        <View style={{width:100,height:100,backgroundColor:mainBlue}}>
        </View>
</View>
        
    </ScrollView>
  )
}
const mapStateProps = (state) => {
  const { template_list } = state.sales_enviroWaste
  return { template_list }
}


export default connect(mapStateProps)(EditorFiles)