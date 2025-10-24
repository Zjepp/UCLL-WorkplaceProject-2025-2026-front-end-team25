import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

const LoginPage: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Image 
          source={require('../assets/images/logo-ipsa.png')}
          style={styles.logo}
        />
      </View> */}
      
      <View style={styles.colorBars}>
        <View style={[styles.colorBar, { backgroundColor: '#28A0A0' }]} />
        <View style={[styles.colorBar, { backgroundColor: '#FED57A' }]} />
        <View style={[styles.colorBar, { backgroundColor: '#B196C7' }]} />
        <View style={[styles.colorBar, { backgroundColor: '#E73E07' }]} />
      </View>

      <View style={styles.formWrapper}>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Log In</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              <Text style={[styles.plusSign, { color: '#B196C7' }]}>+</Text> 
              Gebruikersnaam
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Voer gebruikersnaam in"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              <Text style={[styles.plusSign, { color: '#E73E07' }]}>+</Text> 
              Wachtwoord
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Voer wachtwoord in"
              placeholderTextColor="#999"
              secureTextEntry
            />
          </View>

          <Pressable onPress={() => {}}>
            <Text style={styles.forgotPassword}>
              wachtwoord vergeten?
            </Text>
          </Pressable>

          <Pressable 
            style={styles.loginButton}
            onPress={() => router.push("/scorePage")}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: 80,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop: 20,
    zIndex: 2,
  },
  logo: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 410,
    height: 80,
  },
  colorBars: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    zIndex: 1,
  },
  colorBar: {
    width: '25%',
    height: '100%',
  },
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 2,
  },
  loginContainer: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '400',
    marginBottom: 25,
    color: '#333',
    textAlign: 'left',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusSign: {
    fontSize: 26,
    marginRight: 10,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 2,
    borderColor: '#28A0A0',
    borderRadius: 22,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  forgotPassword: {
    color: '#333',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: 8,
    marginBottom: 20,
    textAlign: 'center',
  },
  loginButton: {
    width: '100%',
    height: 45,
    backgroundColor: '#FED57A',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  }
});

export default LoginPage;

