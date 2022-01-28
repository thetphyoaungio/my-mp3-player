import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import Screen from "../components/Screen";
import color from "../misc/color";
import { AdMobBanner } from "expo-ads-admob";

const About = () => {
  return (
    <Screen>
      <ImageBackground
        source={require("../../assets/my-imgs/about_cover/Buddha.jpg")}
        style={styles.backageImg}
      />
      <View style={styles.container}>
        <Text style={styles.text}>
          ပဌာန်းဒေသနာ၊ ပရိတ်တရားတော်များကို နေ့ညမပြတ်၊ ကြည်ညိုစွာ
          နာယူနိုင်ကြပါစေ
        </Text>

        <Text style={styles.text}>🙏🙏🙏</Text>

        <Text style={styles.text}>ကုသိုလ်အထူး ရရှိနိုင်ကြပါစေ...</Text>

        <View
          style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 280 }}
        >
          <Text style={[styles.text, { color: "dodgerblue", paddingRight: 2 }]}>
            ကိုပေါက်
          </Text>

          <Text style={styles.text}>မှ ဓမ္မဒါနကုသိုလ်ပြုအပ်ပါသည်။</Text>
        </View>

        <Text style={styles.text}>Email: kopauk46@gmail.com</Text>
      </View>

      <AdMobBanner
        style={{ alignItems: "center", justifyContent: "center" }}
        bannerSize="banner"
        adUnitID="ca-app-pub-5889748970088125/9548708144"
        servePersonalizedAds={false}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backageImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    opacity: 0.3,
    top: 40,
  },
  text: {
    fontSize: 18,
    color: color.FONT,
    lineHeight: 30,
  },
});

export default About;
