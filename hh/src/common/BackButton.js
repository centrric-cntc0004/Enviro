import React, { useEffect } from 'react'
import { BackHandler } from 'react-native'


const DefaultBack = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      navigation.pop()
      return true
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [])

  return null
}


const BackToHome = ({ navigation, setup }) => {
  const { bottomNavBarStatus, setDrawerStatus } = setup
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('enviro-home')
      let navInterval = setInterval(() => {
        bottomNavBarStatus(true)
        setDrawerStatus(true)
        clearInterval(navInterval)
      }, 500)
      return true
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [])

  return null
}



const BackToClient = ({ navigation, setup }) => {
  const { bottomNavBarStatus, setDrawerStatus } = setup
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('enviro-clients')
      let navInterval = setInterval(() => {
        bottomNavBarStatus(true)
        setDrawerStatus(true)
        clearInterval(navInterval)
      }, 500)
      return true
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [])

  return null
}
const BackToTeam = ({ navigation, setup }) => {
  const { bottomNavBarStatus, setDrawerStatus } = setup
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('enviro-team')
      let navInterval = setInterval(() => {
        bottomNavBarStatus(true)
        setDrawerStatus(true)
        clearInterval(navInterval)
      }, 500)
      return true
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [])

  return null
}






export { DefaultBack, BackToHome, BackToClient, BackToTeam }
