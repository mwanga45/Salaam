import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";


export default function Layout() {
    return (
        <>
            <StatusBar style="dark" />
            <Stack screenOptions={{
                headerBackTitle: "",
                title: "",
                contentStyle: {
                    backgroundColor: "white"
                }
            }}>
                <Stack.Screen name="dashboard" options={{
                    headerShown: false,
                    title: "",
                    contentStyle: {
                        backgroundColor: "whitesmoke"
                    }
                }} />
            </Stack>
        </>
    )
}