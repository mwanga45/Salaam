import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Colors } from '../constants/Colors';


export default function Layout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{
        headerBackTitle: "",
        title: "",
        contentStyle: {
          backgroundColor: Colors.dark.background,
        },
        animation: "slide_from_right",
        headerShown: false,
      }}>
        <Stack.Screen name="index" options={{
          headerShown: false,
          title: "",
          headerTitle: ""
        }} />
      <Stack.Screen name="landing" options={{
        headerShown:false,
        title:"",
        contentStyle:{
          backgroundColor:"#081107"
        }
      }}/>
      <Stack.Screen name="asnycTest" options={{
        headerShown:false,
        title:"",
        contentStyle:{
          backgroundColor:"white"
        }
      }}/>
      </Stack>
    </>
  );
} 
