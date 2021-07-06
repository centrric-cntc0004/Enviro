import React, { useEffect } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { Header, HeaderClientNav, HeaderBackIcon, HeaderNotificationIcon } from '../../../common/Header'
import {fetch_job_card_list,fetch_waste_list, quote_register_list, job_list,attach_file_list,fetch_temp_clients, fetch_waste_sale_performance,generate_quote_list ,fetch_quote_drafts} from './components/common/action'
import { connect } from 'react-redux'
import DefaultSales from './components/Sales'
import SalesList from './components/SalesList'
import DetailData from './components/DetailData'
import JobDetails from './components/JobDetails'
import QuoteGenerate from './components/QuoteGenerate'
import AddFile from './components/AddFile'
import EditorFile from './components/EditorFile'
import{fetch_client_list} from '../Clients/action'
import QuoteDetail from './components/QuoteDetail'
import JobCardDetail from './components/JobCardDetail'
import AddJobCard from './components/AddJobCard'
import UpdateJobCard from './components/UpdateJobCard'
import AddJobClient from './components/AddJobClient'
import AddJobIndividual from './components/AddJobIndividual'
const Stack = createStackNavigator()



function Sales({fetch_job_list,types, ownProps, fetch_perClinet,fetch_quote_data,fetch_draft_list, fetch_quote_register_data,fetch_temp_client, fetch_file_list,fetch_job_list_data,fetch_generate_quote_list,fetch_was_list }) {


    useEffect(() => {
        let current_date = new Date()
        fetch_quote_data(current_date.getFullYear(), current_date.getMonth() + 1)
        fetch_quote_register_data(1)
        fetch_job_list_data(1)
        fetch_generate_quote_list()
        fetch_file_list(types)
        fetch_temp_client(types)
        fetch_perClinet(types)
        fetch_draft_list(types)
        fetch_was_list()
        fetch_job_list()
        return () => fetch_quote_data.remove, fetch_quote_register_data.remove, fetch_job_list_data.remove,fetch_generate_quote_list.remove,fetch_file_list.remove,fetch_temp_client.remove,fetch_perClinet.remove,fetch_draft_list.remove,fetch_was_list.remove,fetch_job_list.remove
    }, [fetch_quote_data, fetch_quote_register_data, fetch_job_list_data,fetch_generate_quote_list,fetch_file_list,fetch_temp_client,fetch_perClinet,fetch_draft_list,fetch_was_list,fetch_job_list]);

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            initialRouteName="enviro-sales"
        >
            <Stack.Screen name="enviro-sales" component={DefaultSales}

                options={{
                    title: '',

                    headerLeft: () => (<HeaderClientNav {...ownProps} />),
                    headerBackground: () => (<Header title="Sales Managment" />),
                    headerRight: () => (<HeaderNotificationIcon {...ownProps} />)
                }}

            />
            <Stack.Screen name="salesList" component={SalesList}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Sales Management" />)
                }}

            />

            <Stack.Screen name="detaildata" component={DetailData}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Sales Management" />)
                }}

            />
            <Stack.Screen name="JobDetails" component={JobDetails}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Sales Management" />)
                }}

            />
             <Stack.Screen name="QuoteGenerate" component={QuoteGenerate}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Sales " />)
                }}

            />
            <Stack.Screen name="AddFile" component={AddFile}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Generate Quote" />)
                }}

            />
             <Stack.Screen name="EditorFile" component={EditorFile}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Generate Quote" />)
                }}

            />
             <Stack.Screen name="QuoteDetail" component={QuoteDetail}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Generate Quote" />)
                }}

            />
             <Stack.Screen name="JobCardDetail" component={JobCardDetail}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Job Card" />)
                }}

            />
             <Stack.Screen name="AddJobCard" component={AddJobCard}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Job Card" />)
                }}

            />
            <Stack.Screen name="UpdateJobCard" component={UpdateJobCard}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Job Card" />)
                }}

            />
            
             <Stack.Screen name="AddJobClient" component={AddJobClient}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Job Card" />)
                }}

            />
            <Stack.Screen name="AddJobIndividual" component={AddJobIndividual}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Job Card" />)
                }}

            />
             
        </Stack.Navigator>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { isLoading,types } = state.sales_enviroWaste
    return { ownProps,types };
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetch_job_list_data: (page) => dispatch(job_list(page)),
        fetch_quote_data: (year, month) => dispatch(fetch_waste_sale_performance(year, month)),
        fetch_quote_register_data: (page) => dispatch(quote_register_list(page)),
        fetch_generate_quote_list:()=>dispatch(generate_quote_list()),
        fetch_file_list:(type)=>dispatch(attach_file_list(type)),
        fetch_temp_client:(type)=>dispatch(fetch_temp_clients(type)),
        fetch_perClinet: (type) => dispatch(fetch_client_list(type)),
        fetch_draft_list:(type)=>dispatch(fetch_quote_drafts(type)),
        fetch_was_list:()=>dispatch(fetch_waste_list()),
        fetch_job_list:()=>dispatch(fetch_job_card_list()),





    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sales)






