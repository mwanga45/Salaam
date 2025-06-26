import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  KeyboardEvent,
  LayoutChangeEvent,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

interface BubbleProps {
  size: number;
  left: number;
  top: number;
}

const { height, width } = Dimensions.get("window");
const isSmallDevice = height < 700;

const Bubble: React.FC<BubbleProps> = ({ size, left, top }) => {
  const bubbleStyle = {
    width: size,
    height: size,
    left: width * left,
    top: top,
    borderRadius: size / 2,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    position: 'absolute' as 'absolute',
    zIndex: 1,
  };
  return <View style={bubbleStyle} />;
};

export default function Landingpage() {
  const route = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const inputLayouts = useRef<{ [key: number]: number }>({});

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
    setTimeout(() => {
      if (inputLayouts.current[index] !== undefined) {
        scrollViewRef.current?.scrollTo({
          y: inputLayouts.current[index],
          animated: true
        });
      }
    }, 100);
  };

  const handleInputLayout = (event: LayoutChangeEvent, index: number) => {
    inputLayouts.current[index] = event.nativeEvent.layout.y;
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.titlecontainer}>
        <Bubble size={80} left={0.2} top={100} />
        <Bubble size={60} left={0.6} top={200} />
        <Bubble size={100} left={0.35} top={300} />
        <Bubble size={50} left={0.1} top={400} />
        <Bubble size={70} left={0.7} top={150} />
        <Text style={styles.titlepage}>Let's get you signed in!</Text>
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
            Register first To get Started
          </Text>
          <Text style={styles.signUpText}>
            Sign Up
          </Text>
        </View>
          <View style={styles.formcontainer} onLayout={(e) => handleInputLayout(e, 0)}>
            <TextInput
              ref={ref => inputRefs.current[0] = ref}
              style={styles.textarea}
              placeholder="Firstname"
              onFocus={() => handleInputFocus(0)}
            />
          </View>

          <View style={styles.formcontainer} onLayout={(e) => handleInputLayout(e, 1)}>
            <TextInput
              ref={ref => inputRefs.current[1] = ref}
              style={styles.textarea}
              placeholder="Lastname"
              onFocus={() => handleInputFocus(1)}
            />
          </View>

          <View style={styles.formcontainer} onLayout={(e) => handleInputLayout(e, 2)}>
            <TextInput
              ref={ref => inputRefs.current[2] = ref}
              style={styles.textarea}
              placeholder="+255....."
              keyboardType="phone-pad"
              onFocus={() => handleInputFocus(2)}
            />
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => route.push("./(main)/dashboard")}
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
    backgroundColor: "#ffffff",
  },
  titlecontainer: {
    height: isSmallDevice ? '30%' : '35%',
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  maincontainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
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
    backgroundColor: "white",
    borderRadius: 18,
    height: isSmallDevice ? 45 : 50,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  textarea: {
    fontSize: isSmallDevice ? 14 : 16,
    color: '#333',
  },
  btn: {
    width: "85%",
    height: isSmallDevice ? 45 : 50,
    backgroundColor: "#020024",
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
});