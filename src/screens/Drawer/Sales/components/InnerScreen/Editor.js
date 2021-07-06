import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import QuillEditor from 'react-native-quill-editor'
import { ActivityIndicator } from 'react-native';
import { mainBlue, mainWhite, textBlack, textGrey, mainGrey, lightGrey, textDark, mediumGrey } from '../../../../../common/Colors';
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import { Table, Row, Rows } from 'react-native-table-component';
import ModalDropdown from 'react-native-modal-dropdown-v2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetch_sales_quote_amount } from '../common/action'
let comment_data = [{ item_description: 'Descn', type_of_waste: 'type of waste', volume: 'Vol', pricing: 0, total: 0 }]
let tableData1 = [['item Description', 'Type of waste', 'Volume', 0, 0]]
let a = ""
let a2 = ""
let arr = ""
const Editor = ({ set_quote_amount, wastes_list, set_quote_content, template_list, quote_content, template_client_list, dispatch, client_info }) => {
  const [content, setContent] = useState(quote_content)
  const [loader, setLoader] = useState(true)
  const [loaderA, setLoaderA] = useState(false)
  const [modalA, setModalA] = useState(false)
  const [status, setStatus] = useState(false)
  const [totalAmt, setTotalAmt] = useState(0)
  const [totalAmtA, setTotalAmtA] = useState(0)

  const [data, setData] = useState("")
  const [desc, setDesc] = useState("")
  const [type, setType] = useState("")
  const [vol, setVol] = useState("")
  const [price, setPrice] = useState("")
  const [total, setTotal] = useState("")
  const [editable, setEditable] = useState(false)
  const [index, setIndex] = useState('')
  const [tableVisble, setVisible] = useState(true)


  let dropdownData = []
  if (wastes_list) {
    wastes_list.map((item) => {
      const { w_type } = item
      return (
        dropdownData.push(w_type)
      )
    })
  }

  let arr_initial = [{ item_description: 'Descn', type_of_waste: 'type of waste', volume: 'Vol', pricing: 0, total: 0 }]

  const [tableContent, setTableContent] = useState(arr_initial)
  let tableHead = ['item Description', 'Type of waste', 'Volume', 'Pricing', 'Total']
  //test// 

  tableData1 = [
    [tableContent[0].item_description, tableContent[0].type_of_waste, tableContent[0].volume, tableContent[0].pricing, tableContent[0].total],
    ['Total Amount', totalAmt]
  ]
  if (tableContent.length === 2) {
    if (tableContent[0] && tableContent[1]) {
      tableData1 = [
        [tableContent[0].item_description, tableContent[0].type_of_waste, tableContent[0].volume, tableContent[0].pricing, tableContent[0].total],
        [tableContent[1].item_description, tableContent[1].type_of_waste, tableContent[1].volume, tableContent[1].pricing, tableContent[1].total],

        ['Total Amount', totalAmt]
      ]
    }
  }
  else if (tableContent.length === 3) {

    if (tableContent[0] && tableContent[1] && tableContent[2]) {
      tableData1 = [
        [tableContent[0].item_description, tableContent[0].type_of_waste, tableContent[0].volume, tableContent[0].pricing, tableContent[0].total],
        [tableContent[1].item_description, tableContent[1].type_of_waste, tableContent[1].volume, tableContent[1].pricing, tableContent[1].total],
        [tableContent[2].item_description, tableContent[2].type_of_waste, tableContent[2].volume, tableContent[2].pricing, tableContent[2].total],

        ['Total Amount', totalAmt]
      ]

    }
  }

  const [selectedData, setSelectedData] = useState(dropdownData[0])

  if (quote_content.includes('</colgroup>')) {
    // Found world
    console.log("yesssssss")

    let outPut1 = quote_content.substr(0, quote_content.indexOf('<!-- ##scope00dstart -->'))
    let outPut4 = quote_content.substr(quote_content.indexOf('<!-- ##scope00dend -->'), quote_content.length - 1)


    var var1 = outPut1.replace(/"/g, "");
    var var2 = outPut4.replace(/"/g, "");
    var NewText = var1.replace("table", "p");
    var NewText12 = var2.replace("table", "p");
    var NewText13 = NewText12.replace("div", "p");
    let a31 = "`" + NewText13 + "`"
    a2 = a31.replace(/\s{2,}/g, ' ')
    var NewText1 = NewText.replace("div", "p");
    let a3 = "`" + NewText1 + "`"
    a = a3.replace(/\s{2,}/g, ' ')
    arr = a.data


  } else {

    var var1 = quote_content.replace(/"/g, "");
    var NewText = var1.replace("table", "p");
    var NewText1 = NewText.replace("div", "p");
    let a3 = "`" + NewText1 + "`"
    a = a3.replace(/\s{2,}/g, ' ')
    arr = a.data
  }

  useEffect(() => {
    let loadingInterval = setInterval(() => {
      setLoader(false)
      clearInterval(loadingInterval)
    }, 2500)
    return () => {
      clearInterval(loadingInterval)
    }
  }, [])


  const edit_data = (item, key) => {
    setData(item)
    setDesc(item.item_description)
    setVol(item.volume)
    setPrice(item.pricing)
    setTotal(item.total)
    setEditable(true)
    setIndex(key)
    setModalA(false)
    let interval = setInterval(() => {
      setLoaderA(true)
      console.log("Modal B Openend")
      clearInterval(interval)
    }, 500)

  }

  const edit_commentapi = () => {
    let duplicateArray = comment_data

    duplicateArray[index].item_description = desc;
    duplicateArray[index].volume = vol;
    duplicateArray[index].pricing = price;
    duplicateArray[index].total = total;
    duplicateArray[index].type_of_waste = selectedData;

    comment_data = Array.from(duplicateArray)

    setLoaderA(false)
    updateTotal()
    setTableContent(comment_data)
    tableData1 = comment_data
    let interval = setInterval(() => {
      setModalA(true)
      console.log("Modal A Openend")
      clearInterval(interval)
    }, 500)


    // setCurrentArray(Array.from(duplicateArray )) 
  }

  const call_ModalData = () => {
    setModalA(true)
  }

  const call_modalCancel = () => {
    let duplicateArray = comment_data

    duplicateArray[index].item_description = desc;
    duplicateArray[index].volume = vol;
    duplicateArray[index].pricing = price;
    duplicateArray[index].total = total;
    duplicateArray[index].type_of_waste = selectedData;
    comment_data = Array.from(duplicateArray)
    setLoaderA(false)
    updateTotal()
    setTableContent(comment_data)
    tableData1 = comment_data
    let interval = setInterval(() => {
      setModalA(true)
      console.log("Modal A Openend")
      clearInterval(interval)
    }, 500)

  }

  const addAttachment = () => {


    let htmlStrStart = `<!-- ##scope00dstart -->
                <br>
    <table style="border:none;border-collapse:collapse;">
        <colgroup>
            <col width="210">
            <col width="198">
            <col width="143">
            <col width="174">
            <col width="240">
        </colgroup>
        <tbody>
            <tr style="height:31pt">
                <td style="vertical-align:middle;padding:2pt 2pt 2pt 2pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.7999999999999998;margin-left: 13.5pt;margin-right: -4.5pt;margin-top:0pt;margin-bottom:5pt;"><span style="font-size:10pt;font-family:Nunito,sans-serif;color:#00a0e3;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">ITEM DESCRIPTION</span></p>
                </td>
                <td style="vertical-align:middle;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.7999999999999998;margin-left: 13.5pt;margin-top:0pt;margin-bottom:5pt;"><span style="font-size:10pt;font-family:Nunito,sans-serif;color:#00a0e3;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">TYPE OF WASTE</span></p>
                </td>
                <td style="vertical-align:middle;padding:2pt 2pt 2pt 2pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.7999999999999998;margin-left: 13.5pt;margin-top:0pt;margin-bottom:5pt;"><span style="font-size:10pt;font-family:Nunito,sans-serif;color:#00a0e3;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">VOLUME/ITEM</span></p>
                </td>
                <td style="vertical-align:middle;padding:2pt 2pt 2pt 2pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.7999999999999998;margin-left: 13.5pt;margin-top:0pt;margin-bottom:5pt;"><span style="font-size:10pt;font-family:Nunito,sans-serif;color:#00a0e3;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">PRICING</span></p>
                </td>
                <td style="vertical-align:middle;padding:2pt 2pt 2pt 2pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.7999999999999998;margin-left: 13.5pt;margin-top:0pt;margin-bottom:5pt;"><span style="font-size:10pt;font-family:Nunito,sans-serif;color:#00a0e3;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">TOTAL (EXC GST)</span></p>
                </td>
            </tr>`
    let htmlStr1 = [`<tr style="height:26pt">
    <td style="vertical-align:middle;padding:2pt 2pt 2pt 2pt;overflow:hidden;overflow-wrap:break-word;">
        <p dir="ltr" style="line-height:1.7999999999999998;margin-left: 13.5pt;margin-right: 0.3070866141732438pt;border-top:solid #f9cb9c 2.25pt;margin-top:0pt;margin-bottom:0pt;padding:2pt 0pt 0pt 0pt;"><span style="font-size:11pt;font-family:Nunito,sans-serif;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">`,
      `</span></p>
                            </td>
                            <td style="vertical-align:middle;padding:2pt 2pt 2pt 2pt;overflow:hidden;overflow-wrap:break-word;">
                                <p dir="ltr" style="line-height:1.7999999999999998;margin-left: 13.5pt;margin-right: 0.3070866141732438pt;text-align: right;border-top:solid #f9cb9c 2.25pt;margin-top:0pt;margin-bottom:0pt;padding:2pt 0pt 0pt 0pt;"><span style="font-size:11pt;font-family:Nunito,sans-serif;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">`,
      `</span></p>
                            </td>
                            <td style="vertical-align:middle;padding:2pt 2pt 2pt 2pt;overflow:hidden;overflow-wrap:break-word;">
                                <p dir="ltr" style="line-height:1.7999999999999998;margin-left: 13.5pt;margin-right: 0.3070866141732438pt;text-align: right;border-top:solid #f9cb9c 2.25pt;margin-top:0pt;margin-bottom:0pt;padding:2pt 0pt 0pt 0pt;"><span style="font-size:11pt;font-family:Nunito,sans-serif;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">`,
      `</span></p>
                            </td>
                            <td style="vertical-align:middle;padding:2pt 2pt 2pt 2pt;overflow:hidden;overflow-wrap:break-word;">
                                <p dir="ltr" style="line-height:1.7999999999999998;margin-left: 13.5pt;margin-right: 0.3070866141732438pt;text-align: right;border-top:solid #f9cb9c 2.25pt;margin-top:0pt;margin-bottom:0pt;padding:2pt 0pt 0pt 0pt;"><span style="font-size:11pt;font-family:Nunito,sans-serif;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">$`,
      `</span></p>
                            </td>
                            <td style="vertical-align:middle;padding:2pt 2pt 2pt 2pt;overflow:hidden;overflow-wrap:break-word;">
                                <p dir="ltr" style="line-height:1.7999999999999998;margin-left: 13.5pt;margin-right: 0.3070866141732438pt;text-align: right;border-top:solid #f9cb9c 2.25pt;margin-top:0pt;margin-bottom:0pt;padding:2pt 0pt 0pt 0pt;"><span style="font-size:11pt;font-family:Nunito,sans-serif;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">$`,
      `</span></p>
                            <br>
                        </td>
                    </tr>`]

    let htmlStrEnd = [`<tr style="height:26pt">
                                <td style="vertical-align:middle;padding:2pt 2pt 2pt 2pt;overflow:hidden;overflow-wrap:break-word;">
                                    <p dir="ltr" style="line-height:1.7999999999999998;margin-left: 13.5pt;margin-right: 0.3070866141732438pt;border-top:solid #f9cb9c 2.25pt;margin-top:0pt;margin-bottom:0pt;padding:2pt 0pt 0pt 0pt;">&nbsp;</p>
                                </td>
                                <td style="vertical-align:middle;padding:2pt 2pt 2pt 2pt;overflow:hidden;overflow-wrap:break-word;">
                                    <p dir="ltr" style="line-height:1.7999999999999998;margin-left: 13.5pt;margin-right: 0.3070866141732438pt;text-align: right;border-top:solid #f9cb9c 2.25pt;margin-top:0pt;margin-bottom:0pt;padding:2pt 0pt 0pt 0pt;">&nbsp;</p>
                                </td>
                                <td style="vertical-align:middle;padding:2pt 2pt 2pt 2pt;overflow:hidden;overflow-wrap:break-word;">
                                    <p dir="ltr" style="line-height:1.7999999999999998;margin-left: 13.5pt;margin-right: 0.3070866141732438pt;text-align: right;border-top:solid #f9cb9c 2.25pt;margin-top:0pt;margin-bottom:0pt;padding:2pt 0pt 0pt 0pt;">&nbsp;</p>
                                </td>
                                <td style="vertical-align:middle;padding:2pt 2pt 2pt 2pt;overflow:hidden;overflow-wrap:break-word;">
                                    <p dir="ltr" style="line-height:1.7999999999999998;margin-left: 13.5pt;margin-right: 0.3070866141732438pt;text-align: right;border-top:solid #f9cb9c 2.25pt;margin-top:0pt;margin-bottom:0pt;padding:2pt 0pt 0pt 0pt;">&nbsp;</p>
                                </td>
                                <td style="vertical-align:middle;padding:2pt 2pt 2pt 2pt;overflow:hidden;overflow-wrap:break-word;">
                                    <p dir="ltr" style="line-height:1.7999999999999998;margin-left: 13.5pt;margin-right: 0.3070866141732438pt;text-align: right;border-top:solid #f9cb9c 2.25pt;margin-top:0pt;margin-bottom:0pt;padding:2pt 0pt 0pt 0pt;">&nbsp;</p>
                                </td>
                            </tr>
                            <tr style="height:47.25pt">
                                <td style="vertical-align:middle;padding:2pt 2pt 2pt 2pt;overflow:hidden;overflow-wrap:break-word;"><br></td>
                                <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;"><br></td>
                                <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;"><br></td>
                                <td style="vertical-align:top;background-color:#00a0e3;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                                    <h1 dir="ltr" style="line-height:1.7999999999999998;margin-left: 13.5pt;margin-right: 0.3070866141732438pt;text-align: right;margin-top:10pt;margin-bottom:0pt;"><span style="font-size:13.999999999999998pt;font-family:Nunito,sans-serif;color:#31394d;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">TOTAL</span></h1>
                                </td>
                                <td style="vertical-align:top;background-color:#00a0e3;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                                    <h1 dir="ltr" style="line-height:1.7999999999999998;margin-left: 13.5pt;margin-right: 0.3070866141732438pt;text-align: right;margin-top:10pt;margin-bottom:0pt;"><span style="font-size:13.999999999999998pt;font-family:Nunito,sans-serif;color:#31394d;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">$`, `</span></h1>
                                </td>
                            </tr>
                        </tbody>
                    </table><!-- ##scope00dend -->`]
    let outPut1 = quote_content.substr(0, quote_content.indexOf('<!-- ##scope00dstart -->'))
    let outPut4 = quote_content.substr(quote_content.indexOf('<!-- ##scope00dend -->'), quote_content.length - 1)
    let tempStr = ''
    for (let i = 0; i < comment_data.length; i++) {
      tempStr = tempStr + htmlStr1[0] + comment_data[i].item_description + htmlStr1[1] + comment_data[i].type_of_waste + htmlStr1[2] + comment_data[i].volume + htmlStr1[3] + comment_data[i].pricing + htmlStr1[4] + comment_data[i].total + htmlStr1[5]

    }
    agg = outPut1 + htmlStrStart + tempStr + htmlStrEnd[0] + totalAmt + htmlStrEnd[1] + outPut4

    set_quote_content(outPut1 + htmlStrStart + tempStr + htmlStrEnd[0] + totalAmt + htmlStrEnd[1] + outPut4)
    set_quote_amount(totalAmt)
    setModalA(false)
    comment_data = [{
      item_description: 'Descn',
      type_of_waste: 'type of waste',
      volume: 'Vol',
      pricing: 0,
      total: 0
    }]
    setTotalAmtA(0)
  }



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




  if (quote_content === undefined) {
    return (
      <ActivityIndicator size="large" color={mainBlue}></ActivityIndicator>
    )
  }


  const add_newData = () => {
    setDesc('')
    setVol('')
    setPrice(0)
    setTotal(0)
    setEditable(false)
    setModalA(false)
    console.log("Modal A Closed")
    let interval = setInterval(() => {
      setLoaderA(true)
      console.log("Modal B Openend")
      clearInterval(interval)
    }, 500)

  }

  const add_commentapi = () => {
    var s = {
      item_description: desc,
      type_of_waste: selectedData,
      volume: vol,
      pricing: price,
      total: total
    }
    comment_data = comment_data.concat(s)
    updateTotal()
    setLoaderA(false)
    setDesc('')
    setVol('')
    setSelectedData(dropdownData[0])
    setPrice('')
    setTotal('')
    setTableContent(comment_data)
    let interval = setInterval(() => {
      setModalA(true)
      console.log("Modal A Openend")
      clearInterval(interval)
    }, 500)

  }





  const call_modals = () => {
    setLoaderA(false)
    let interval = setInterval(() => {
      setModalA(true)
      console.log("Modal A Openend")
      clearInterval(interval)
    }, 500)
  }

  const call_data = () => {
    setTotalAmt(0)
    setTotalAmtA(0)
  }



  const updateTotal = () => {
    let amt = 0
    for (let i = 0; i < comment_data.length; i++)
      amt = amt + parseFloat(comment_data[i].total)
    setTotalAmt(amt)
    setTotalAmtA(amt)
  }
  if (loader)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 200 }}>
        <ActivityIndicator size="large" color={mainBlue}></ActivityIndicator>
      </View>
    )

  return (

    <SafeAreaView>
      {client_info ? (
        <TouchableOpacity onPress={() => call_ModalData()}
          style={{ marginLeft:10, justifyContent: 'center', alignItems: 'center', width: 150, height: 30, backgroundColor: lightGrey, borderWidth: 0.4, borderColor: textDark, borderRadius: 50 }}>
          <Text>Update scope of work</Text>
        </TouchableOpacity>
      ) : (
          <Text style={{ color: "red" }}>Choose the client to edit the Template</Text>
        )}

      <QuillEditor
        style={{ height: 2130, marginTop: 30 }}
        defaultValue={a}
        options={{
          placeholder: 'data',
          modules: {
            toolbar: toolbarOptions,
          },
          theme: "snow"

        }}

        onChange={txt => call_data(txt)}

      />
      {a2 ? (
        <ScrollView showsHorizontalScrollIndicator={false}
          horizontal
          style={{}}>
          <Table borderStyle={{ width: 1000, borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={tableData1} style={styles.head} textStyle={styles.text1} />
          </Table>
        </ScrollView>
      ) : (
          null
        )}
      {a2 ? (
        <QuillEditor
          style={{ height: 2020, marginBottom: 100 }}
          defaultValue={a2}
          options={{
            placeholder: 'data',
            modules: {
              toolbar: [],
            },

            theme: 'bubble'

          }}
          onChange={txt => call_data(txt)}

        />
      ) : (
          null
        )}
      <Modal
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
        isVisible={modalA}
        onSwipeComplete={() => setModalA(false)}
        onBackdropPress={() => setModalA(false)}
        swipeDirection="left"
      >
        <View style={{ width: '90%', backgroundColor: mainWhite, paddingHorizontal: 20, borderRadius: 10 }}>
          <View style={{ backgroundColor: mainWhite, borderRadius: 10, flexDirection: "column" }}>
            <View style={{ paddingLeft: 10, paddingTop: 20, flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Scope of Work</Text>
              <TouchableOpacity onPress={() => add_newData()}
                style={{ marginLeft: '10%', justifyContent: 'center', alignItems: 'center', width: 80, height: 30, borderWidth: 0.5, borderColor: mainGrey, borderRadius: 50 }}>
                <Text style={{ fontSize: 12 }}>Add New</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
              {comment_data.map((item, key2) => {
                return (
                  <TouchableOpacity onPress={() => edit_data(item, key2)} >
                    <View style={{
                      flexDirection: 'row', height: 120, backgroundColor: mediumGrey,
                      marginTop: 10, borderWidth: 0.25, borderColor: mainGrey, borderRadius: 10
                    }}>

                      <View style={{ flex: 1, backgroundColor: mediumGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>

                          <View style={{ flex: 2.5, flexDirection: 'row' }}>

                            <Text numberOfLines={1}
                              style={{ fontSize: 12, width: '60%', paddingLeft: 10, color: textBlack, paddingRight: 10 }}>SI.No : {key2 + 1}</Text>

                            <Text numberOfLines={1}
                              style={{ fontSize: 12, paddingLeft: 10, color: textBlack, paddingRight: 10 }}>Volume : {item.volume}</Text>
                          </View>
                          <View style={{ flex: 2.5, flexDirection: 'row' }}>
                            <Text numberOfLines={1}
                              style={{ fontSize: 12, width: '60%', paddingLeft: 10, color: textBlack, paddingRight: 10 }}>Pricing : {item.pricing}</Text>
                            <Text numberOfLines={1}
                              style={{ fontSize: 12, paddingLeft: 10, color: textBlack, paddingRight: 10 }}>Total : {item.total}</Text>
                          </View>
                          <View style={{ flex: 5, flexDirection: 'column' }}>

                            <Text numberOfLines={1}
                              style={{ fontSize: 12, paddingLeft: 10, color: textBlack, paddingRight: 10 }}>Description : {item.item_description}</Text>

                            <Text numberOfLines={1}
                              style={{ fontSize: 12, marginTop: 5, paddingLeft: 10, color: textBlack, paddingRight: 10 }}>Waste Type : {item.type_of_waste}</Text>


                          </View>

                        </View>

                      </View>
                    </View>
                  </TouchableOpacity>

                )
              })}

            </View>
          </View>

          <View style={{ marginBottom: 20, flexDirection: 'column', marginTop: 15 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ paddingLeft: 10, color: textBlack, fontWeight: 'bold', fontSize: 16 }}>Total : </Text>
              <Text style={{ color: textBlack, fontWeight: 'bold', fontSize: 16 }}> {totalAmtA}</Text>

            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {comment_data.length === 0 ? (
                <View
                  style={{ opacity: 0.7, borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>

                  <Text style={{ color: mainWhite, fontSize: 12 }}>Edit Table</Text>


                </View>

              ) : (
                  <TouchableOpacity onPress={() => addAttachment()}
                    style={{ borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: mainWhite, fontSize: 12 }}>Edit Table</Text>
                  </TouchableOpacity>
                )}

            </View>
          </View>
        </View>
      </Modal>
      <Modal
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        isVisible={loaderA}
      >
        {editable === false ? (

          <View style={{ width: '90%', backgroundColor: mainWhite, paddingHorizontal: 20, borderRadius: 10 }}>
            <View style={{ backgroundColor: mainWhite, borderRadius: 10, flexDirection: "column" }}>
              <View style={{ paddingLeft: 10, paddingTop: 10, }}>

              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: textBlack, fontSize: 12 }}>Description</Text>
                <View style={{
                  width: '100%',

                  height: 40,
                  marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                }}>

                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    {/* <Text style={{ marginTop: 5, marginRight: 20, }}>{key2 + 1}</Text> */}

                    <TextInput
                      style={{ width: '100%', paddingLeft: 15, fontSize: 12, color: mainGrey, }}
                      placeholder="Description"
                      value={desc}

                      onChangeText={txt => setDesc(txt)}

                    />
                  </View>

                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ color: textBlack, fontSize: 14, fontSize: 12, }}>Type of Waste</Text>
                  <View style={{
                    width: '100%',

                    height: 40,
                    marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                  }}>

                    <View style={{ width: '70%', marginTop: 10, marginLeft: 10 }}>
                      <ModalDropdown
                        options={dropdownData}
                        defaultIndex={0}
                        textStyle={{ color: mainGrey, fontSize: 12 }}
                        dropdownStyle={{ width: '70%', height: 100 }}
                        dropdownTextStyle={{ color: mainGrey, fontSize: 14, paddingTop: 10 }}
                        dropdownTextHighlightStyle={{ color: mainGrey, fontSize: 14, paddingLeft: 10 }}
                        onSelect={(index) => {
                          setSelectedData(dropdownData[index])

                        }}
                      >
                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                          <View style={{ flex: 5 }}>
                            <Text style={{ color: mainGrey, fontSize: 12, }} >{selectedData}</Text>
                          </View>

                          <View style={{ flex: 1 }}>
                            <Icon name="chevron-down" size={12} color={mainGrey} />
                          </View>
                        </View>
                      </ModalDropdown>
                    </View>

                  </View>
                </View>


                <Text style={{ marginTop: 10, color: textBlack, fontSize: 12, }}>Volume/Item</Text>
                <View style={{

                  height: 40,
                  marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextInput
                      style={{ padding: 0, fontSize: 12, color: mainGrey, paddingLeft: 15, width: '90%' }}
                      placeholder="Volume/Item"
                      value={vol}

                      onChangeText={txt => setVol(txt)}

                    />

                  </View>
                </View>

                <Text style={{ marginTop: 10, color: textBlack, fontSize: 12, }}>Pricing</Text>
                <View style={{

                  height: 40,
                  marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextInput
                      style={{ padding: 0, paddingLeft: 15, fontSize: 12, color: mainGrey, width: '100%' }}
                      placeholder="0"
                      value={price}
                      keyboardType={"number-pad"}

                      onChangeText={txt => setPrice(txt)}

                    />
                  </View>

                </View>
                <Text style={{ marginTop: 10, color: textBlack, fontSize: 12, }}>Total</Text>

                <View style={{

                  height: 40,
                  marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextInput
                      style={{ padding: 0, paddingLeft: 15, fontSize: 12, color: mainGrey, paddingLeft: 10, width: '100%' }}
                      placeholder="0"
                      value={total}
                      keyboardType={"number-pad"}

                      onChangeText={txt => setTotal(txt)}

                    />
                  </View>

                </View>
              </View>

            </View>

            <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>

              {desc && vol && price && total ? (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => add_commentapi()}
                    style={{ borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: mainWhite, fontSize: 12 }}>Add </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => call_modals()}
                    style={{ marginLeft: 10, borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: mainWhite, fontSize: 12 }}>Cancel </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{ opacity: 0.7, borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: mainWhite, fontSize: 12 }}>Add </Text>
                    </View>
                    <TouchableOpacity onPress={() => call_modals()}
                      style={{ marginLeft: 10, borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: mainWhite, fontSize: 12 }}>Cancel </Text>
                    </TouchableOpacity>
                  </View>
                )}
            </View>
          </View>
        ) : (
            <View style={{ width: '90%', backgroundColor: mainWhite, paddingHorizontal: 20, borderRadius: 10 }}>
              <View style={{ backgroundColor: mainWhite, borderRadius: 10, flexDirection: "column" }}>
                <View style={{ paddingLeft: 10, paddingTop: 10, }}>

                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ color: textBlack, fontSize: 12 }}>Description</Text>
                  <View style={{
                    width: '100%',

                    height: 40,
                    marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                  }}>

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      {/* <Text style={{ marginTop: 5, marginRight: 20, }}>{key2 + 1}</Text> */}

                      <TextInput
                        style={{ width: '100%', paddingLeft: 15, fontSize: 12, color: mainGrey, }}
                        placeholder="Description"
                        value={desc}

                        onChangeText={txt => setDesc(txt)}

                      />
                    </View>

                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ color: textBlack, fontSize: 14, fontSize: 12, }}>Type of Waste</Text>
                    <View style={{
                      width: '100%',

                      height: 40,
                      marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                    }}>

                      <View style={{ width: '70%', marginTop: 10, marginLeft: 10 }}>
                        <ModalDropdown
                          options={dropdownData}
                          defaultIndex={0}
                          textStyle={{ color: mainGrey, fontSize: 12 }}
                          dropdownStyle={{ width: '70%', height: 100 }}
                          dropdownTextStyle={{ color: mainGrey, fontSize: 14, paddingTop: 10 }}
                          dropdownTextHighlightStyle={{ color: mainGrey, fontSize: 14, paddingLeft: 10 }}
                          onSelect={(index) => {
                            setSelectedData(dropdownData[index])

                          }}
                        >
                          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ flex: 5 }}>
                              <Text style={{ color: mainGrey, fontSize: 12, }} >{selectedData}</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                              <Icon name="chevron-down" size={12} color={mainGrey} />
                            </View>
                          </View>
                        </ModalDropdown>
                      </View>

                    </View>
                  </View>


                  <Text style={{ marginTop: 10, color: textBlack, fontSize: 12, }}>Volume/Item</Text>
                  <View style={{

                    height: 40,
                    marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                  }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <TextInput
                        style={{ padding: 0, fontSize: 12, color: mainGrey, paddingLeft: 15, width: '90%' }}
                        placeholder="Volume/Item"
                        value={vol}

                        onChangeText={txt => setVol(txt)}

                      />

                    </View>
                  </View>

                  <Text style={{ marginTop: 10, color: textBlack, fontSize: 12, }}>Pricing</Text>
                  <View style={{

                    height: 40,
                    marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                  }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <TextInput
                        style={{ padding: 0, paddingLeft: 15, fontSize: 12, color: mainGrey, width: '100%' }}
                        placeholder="0"
                        value={price}
                        keyboardType={"number-pad"}

                        onChangeText={txt => setPrice(txt)}
                      />
                    </View>

                  </View>
                  <Text style={{ marginTop: 10, color: textBlack, fontSize: 12, }}>Total</Text>
                  <View style={{

                    height: 40,
                    marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                  }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <TextInput
                        style={{ padding: 0, paddingLeft: 15, fontSize: 12, color: mainGrey, paddingLeft: 10, width: '100%' }}
                        placeholder="0"
                        value={total}
                        keyboardType={"number-pad"}

                        onChangeText={txt => setTotal(txt)}

                      />
                    </View>

                  </View>
                </View>
              </View>

              <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>

                {desc && vol && price && total ? (
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => edit_commentapi()}
                      style={{ borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: mainWhite, fontSize: 12 }}>Edit </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => call_modalCancel()}
                      style={{ marginLeft: 10, borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: mainWhite, fontSize: 12 }}>Cancel </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{ opacity: 0.7, borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={{ color: mainWhite, fontSize: 12 }}>Edit </Text>
                      </View>
                      <TouchableOpacity onPress={() => call_modalCancel()}
                        style={{ marginLeft: 10, borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: mainWhite, fontSize: 12 }}>Cancel </Text>
                      </TouchableOpacity>
                    </View>
                  )}
              </View>
            </View>
          )}
      </Modal>


    </SafeAreaView>
  )
}
const mapStateProps = (state) => {
  const { template_list, quote_content, template_client_list, client_info, wastes_list } = state.sales_enviroWaste
  return { template_list, quote_content, template_client_list, client_info, wastes_list }
}

const mapDispatchToProps = (dispatch) => {
  return {
    set_quote_content: (content) => dispatch({ type: 'SALES_SET_CONTENT_QUOTE', content: content }),
    set_quote_amount: (amount) => dispatch(fetch_sales_quote_amount(amount))
  }
}
export default connect(mapStateProps, mapDispatchToProps)(Editor)
const styles = StyleSheet.create({
  container: { width: 800, flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { width: 500, height: 60, backgroundColor: mainWhite, },
  text: { margin: 6, fontWeight: 'bold', color: mainBlue },
  text1: { margin: 6 }

});