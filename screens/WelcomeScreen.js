import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, Modal, ScrollView } from 'react-native';
import db from '../Config.js';
import firebase from 'firebase';

export default class WelcomeScreen extends Component{

    constructor(){
        super()
        this.state={
            emailId:'' ,
            password:'',
            name:'',
            address:'',
            contact:'',
            isModalVisible:false,
            confirmPassword:''
        }
    }

    signup=(emailId, password, confirmPassword)=>{
        if(password!==confirmPassword){
            return Alert.alert("password doesnot match");
        }else{
            firebase.auth().createUserWithEmailAndPassword(emailId, password)
            .then(() => {
               db.collection('users').add({
                   name:this.state.name,
                   address:this.state.address,
                   contact:this.state.contact,
                   emailId:this.state.emailId
                   
               })
               return Alert.alert('user added','',[{text:'ok',onPress:()=>this.setState({"isModalVisible":false})}]);
              // Signed in 
              //var user = response.user;
              // ...
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
                return Alert.alert(errorMessage)
      
              });
        }

        
        
       

        
      
    }

    login=(emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(() => {
            return Alert("logged in");
            console.log("logged in");
          // Signed in 
          //var user = response.user;
          // ...
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
          return Alert.alert(errorMessage)
        });

        
      
    }

    showModal=()=>{
        return(
            <Modal 
            animationType='fade'
            transparent={true}
            visible={this.state.isModalVisible}>
                 <View>
                   <ScrollView>
                       <Text>registration</Text>
                       <TextInput style={styles.loginBox} placeholder="name" 
                        onChangeText={(text)=>{ this.setState({ name: text }) }}/>

                        <TextInput style={styles.loginBox} placeholder="phonenumber" 
                        onChangeText={(text)=>{ this.setState({ contact: text }) }}/>

                        <TextInput style={styles.loginBox} placeholder="address" 
                        onChangeText={(text)=>{ this.setState({ address: text }) }}/>

                        <TextInput style={styles.loginBox} placeholder="emailId" 
                        onChangeText={(text)=>{ this.setState({ emailId: text }) }}/>

                        <TextInput style={styles.loginBox} placeholder="password" 
                        onChangeText={(text)=>{ this.setState({ password: text }) }}/>

                        <TextInput style={styles.loginBox} placeholder="confirmPassword" 
                        onChangeText={(text)=>{ this.setState({ confirmPassword: text }) }}/>

                        <TouchableOpacity style={
                        {height:30,
                        width:90,
                        borderWidth:1,
                        marginTop:20,
                        paddingTop:5,
                        borderRadius:7}
                    } 
                    onPress={()=>{this.signup(this.state.emailId ,this.state.password)}}>
                        <Text>register</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={
                        {height:30,
                        width:90,
                        borderWidth:1,
                        marginTop:20,
                        paddingTop:5,
                        borderRadius:7}
                    } 
                    onPress={()=>this.setState({"isModalVisible":false})}>
                        <Text>cancel</Text>
                    </TouchableOpacity>


                   </ScrollView>
                 </View>
            </Modal>

           
        )
    }

    render(){
        return(
<View>

            <View>
            
            {this.showModal()}
            </View>

            <View>
            <Text>book santa</Text>
            </View>


            <View>
               

                <TextInput style={styles.loginBox} placeholder="abc@example.com" 
                onChangeText={(text)=>{ this.setState({ emailId: text }) }}/>

                <TextInput style={styles.loginBox} placeholder="enterPassword" 
                onChangeText={(text)=>{ this.setState({ password: text }) }}/>

                <TouchableOpacity style={
                    {height:30,
                    width:90,
                    borderWidth:1,
                    marginTop:20,
                    paddingTop:5,
                    borderRadius:7}
                    } 
                    onPress={()=>{this.login(this.state.emailId ,this.state.password)}}>
                        <Text>login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={
                    {height:30,
                    width:90,
                    borderWidth:1,
                    marginTop:20,
                    paddingTop:5,
                    borderRadius:7}
                    } 
                    onPress={()=>{this.signup(this.state.emailId ,this.state.password)}}>
                        <Text>sign up</Text>
                    </TouchableOpacity>
            </View>
            </View>
        )
    }
       
    
}

const styles = StyleSheet.create(
    { 
    loginBox: { width: 300, 
        height: 40, 
        borderWidth: 1.5, 
        fontSize: 20, 
        margin:10, 
        paddingLeft:10 } 
    }
    )