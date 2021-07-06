import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import AsyncStorage from '@react-native-community/async-storage'
import thunk from 'redux-thunk'
 import userLogin from '../screens/login/reducer'
 import team  from '../screens/Drawer/Team/reducer'
 import client from '../screens/Drawer/Clients/reducer'
 import notifications from '../screens/Drawer/Notification/common/reducer'
 import ohs from '../screens/Drawer/Projections/common/reducer'

 import vehicle__truck from '../screens/Drawer/Vehicle/VehicleScreen/TruckScreen/common/reducer'
 import vehicle__forklift from '../screens/Drawer/Vehicle/VehicleScreen/ForkLiftScreen/common/reducer'
  import vehicle_cars from '../screens/Drawer/Vehicle/VehicleScreen/CarScreen/common/reducer'
 import sales_enviroWaste from '../screens/Drawer/Sales/components/common/reducer'
 import intranet_enviro from '../screens/Drawer/Intranet/components/common/reducer' 
 import schedule_enviro from '../screens/Drawer/Schedule/components/common/reducer'
 import profile_enviro from '../screens/Drawer/Profile/component/common/reducer'

const appReducer = combineReducers({
    userLogin,team,client,notifications,
     vehicle__truck, vehicle__forklift,ohs,
     sales_enviroWaste,intranet_enviro,
     schedule_enviro,profile_enviro,vehicle_cars
})

const rootReducer = (state, action) => {
    if(action.type === 'USER_LOGOUT') {
        state = undefined
    }
    return appReducer(state, action)
}

const rootPersistConfig = {
    key: 'root',
    storage:AsyncStorage,
    stateReconciler: hardSet
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    persistReducer(rootPersistConfig, rootReducer),
    composeEnhancer(applyMiddleware(thunk))
)

const persistor = persistStore(store)

export { store, persistor}