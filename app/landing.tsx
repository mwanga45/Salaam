import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  ScrollView,
  Keyboard,
  KeyboardEvent,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  KeyboardAvoidingView
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

interface BubbleProps {
  size: number;
  left: number;
  top: number;
} 

const { height, width } = Dimensions.get("window");
const isSmallDevice = height < 700;

const Bubble: React.FC<BubbleProps> = ({ size, left, top }) => {
  // ... (keep your existing Bubble component implementation)
};

export default function Landingpage() {
  const route = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow', 
      (e: KeyboardEvent) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide', 
      () => {
        setKeyboardHeight(0);
      }
    );
    
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleInputFocus = (index: number) => {
    // Scroll to input when focused
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: index * 70,
        animated: true
      });
    }, 100);
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.titlecontainer}>
        <Bubble size={80} left={0.2} top={100} />
        <Bubble size={60} left={0.6} top={200} />
        <Bubble size={100} left={0.35} top={300} />
        <Bubble size={50} left={0.1} top={400} />
        <Bubble size={70} left={0.7} top={150} />
        <Text style={styles.titlepage}>Let`s get you signed in!</Text>
      </View>
      
      <ScrollView
        ref={scrollViewRef}
        style={styles.maincontainer}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: keyboardHeight + 20 }]}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formdiscription}>
          <Text style={styles.descriptionText}>
            Please use Registration
          </Text>
          <Text style={styles.signUpText}>
            Sign Up
          </Text>
        </View>
        
        <KeyboardAvoidingView style={styles.formcontainer}>
          <TextInput 
            ref={ref => inputRefs.current[0] = ref}
            style={styles.textarea} 
            placeholder="Firstname"
            onFocus={() => handleInputFocus(0)}
          />
        </KeyboardAvoidingView>
        
        <View style={styles.formcontainer}>
          <TextInput 
            ref={ref => inputRefs.current[1] = ref}
            style={styles.textarea} 
            placeholder="Lastname"
            onFocus={() => handleInputFocus(1)}
          />
        </View>
        
        <View style={styles.formcontainer}>
          <TextInput 
            ref={ref => inputRefs.current[2] = ref}
            style={styles.textarea} 
            placeholder="+255....." 
            keyboardType="phone-pad"
            onFocus={() => handleInputFocus(2)}
          />
        </View>
        
        <View style={styles.formcontainerPicker}>
          <Picker>
            <Picker.Item label="Disorder" value="disorder" />
            <Picker.Item label="None" value="none" />
          </Picker>
        </View>
        
        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => route.replace("./")}
        >
          <View style={styles.btncontainer}>
            <Text style={styles.btnText}>Register</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#",
  },
  titlecontainer: {
    height: isSmallDevice ? '30%' : '35%',
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  maincontainer: {
    flex: 1,
    backgroundColor: "#",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: 20,
    paddingBottom: 40,
  },
  formdiscription: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },
  descriptionText: {
    color: "#4A4A4A",
    fontWeight: "500",
    fontSize: isSmallDevice ? 16 : 18,
  },
  signUpText: {
    color: "black",
    fontWeight: "800",
    fontSize: isSmallDevice ? 18 : 20,
  },
  formcontainer: {
    width: "85%",
    borderWidth: 1,
    borderColor: "#D6D6D6",
    backgroundColor: "#D6D6D6",
    borderRadius: 18,
    height: isSmallDevice ? 45 : 50,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  formcontainerPicker: {
    width: "85%",
    borderWidth: 1,
    borderColor: "#D6D6D6",
    backgroundColor: "#D6D6D6",
    borderRadius: 18,
    height: isSmallDevice ? 50 : 55,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginVertical: 8,
    overflow: "hidden",
  },
  btn: {
    width: "85%",
    height: isSmallDevice ? 45 : 50,
    backgroundColor: "#020024",
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  btncontainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white", 
    fontWeight: "800", 
    fontSize: isSmallDevice ? 16 : 18
  },
  titlepage: {
    color: "#4A4A4A",
    fontWeight: "900",
    fontSize: isSmallDevice ? 26 : 30,
    textAlign: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 100,
    pointerEvents: 'none',
  },
  textarea: {
    fontSize: isSmallDevice ? 14 : 16,
    height: '100%',
  },
});