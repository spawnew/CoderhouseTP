
import React, {useState,useEffect} from 'react'
import { SafeAreaView,StyleSheet,Text,View} from 'react-native'
import{auth} from './firebase'
import{onAuthStateChanged} from 'firebase/auth'
import LoginScreen from './Screen/LoginScreen'
import MainScreen from './Screen/MainScreen'


export default function App(){

 
  const [user, setUser]= useState(null);
  const[loading,setLoading] = useState(true)



useEffect(()=>{
  const unsuscribe = onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser);
    setLoading(false)
  });

  return()=>unsuscribe();
},[])


if(loading){
  return(

    <View>
      <Text>Cargando...</Text>
    </View>
  )

}
return(

  <SafeAreaView style={styles.safeArea}>
{user? <MainScreen user={user}/>: <LoginScreen/>}
  </SafeAreaView>
)

}





const styles = StyleSheet.create({
  safeArea:{
    flex:1,
  },

})


