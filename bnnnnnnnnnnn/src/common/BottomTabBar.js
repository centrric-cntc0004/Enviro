import React from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { lightGrey, } from './Colors'


function EnviroBottomTabBar({ state, descriptors, navigation }) {
  return (

    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '100%', flexDirection: 'row', height: 60, backgroundColor: lightGrey, marginBottom: 5 }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          };
          let width_value = Dimensions.get('window').width / 5

          const TabIcon = () => {

            if (label === 'calendar') {
              return (
                <View style={{
                  marginLeft: 45,
                  marginRight: 10,
                  marginTop: 10,
                  marginBottom: 10,
                  alignItems: 'center',
                }}>
                  <Icon1 style={{}}
                    name={label} size={25} color={isFocused ? lightGrey : lightGrey} />
                </View>
              )
            } else if (label === 'account-balance-wallet') {
              return (
                <View style={{

                  marginLeft: 25,
                  marginRight: 10,
                  marginTop: 10,
                  marginBottom: 10,
                  alignItems: 'center',
                }}>
                  <Icon style={{}}
                    name={label} size={25} color={isFocused ? lightGrey : lightGrey} />
                </View>
              )
            }
            else {
              return (
                <View style={{
                  marginLeft: 5,
                  marginRight: 10,
                  marginTop: 10,
                  marginBottom: 10,
                  alignItems: 'center',
                }}>
                  <Icon style={{}}
                    name={label} size={25} color={isFocused ? lightGrey : lightGrey} />
                </View>
              )
            }
          }

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: width_value }}
            >

              {
                label === 'Enviro' ? (
                  <View style={{
                    flex: 1,
                    marginLeft: 30,
                    marginRight: 10,
                    marginTop: 10,
                    marginBottom: 10,
                    alignItems: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: "row", width: 80, height: 35, borderWidth: 1, borderRadius: 10, borderColor: lightGrey
                  }}>
                    <Icon name="home" color={lightGrey} size={20}></Icon>
                    <Text style={{ fontSize: 12, color: lightGrey, marginLeft: 5 }}>Home</Text>
                  </View>
                ) : (
                    <TabIcon />
                  )
              }

            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  )
}


export default EnviroBottomTabBar
