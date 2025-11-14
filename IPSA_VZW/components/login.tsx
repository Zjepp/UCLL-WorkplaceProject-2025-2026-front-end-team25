// import React, { useState } from "react";
// import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
// import { useRouter } from "expo-router";

// const Login: React.FC = () => {
//   const router = useRouter();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = () => {
//     setError("");
//     if (!username.trim() || !password) {
//       setError("Please enter both username and password.");
//       return;
//     }
//     // TODO: replace with real auth call
//     router.push("/scorePage");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sign in</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//         autoCapitalize="none"
//         keyboardType="default"
//         returnKeyType="next"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         returnKeyType="done"
//       />

//       {error ? <Text style={styles.error}>{error}</Text> : null}

//       <Pressable style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Log in</Text>
//       </Pressable>
//     </View>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   container: {
//     padding: 24,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "600",
//     marginBottom: 16,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     marginBottom: 12,
//   },
//   button: {
//     backgroundColor: "#0a84ff",
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 6,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "600",
//   },
//   error: {
//     color: "crimson",
//     marginBottom: 8,
//   },
// });

import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import userService from "@/services/userService";
import { LoginUserResponse } from "@/types";


interface LoginProps {
  user: LoginUserResponse | null;
  setUser: (user: LoginUserResponse | null) => void;
}

const Login: React.FC<LoginProps> = ({ user, setUser }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!email.trim() || !password) {
      setError("Please enter both username and password.");
      return;
    }
    const loginUser = { email: email, password: password };
    try {
      const response = await userService.login(loginUser);
  
      if (response.status === 200) {
        console.log("Login successful");
        const user = await response.json();
        // sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        const userValue = JSON.stringify(user);
        await AsyncStorage.setItem("loggedInUser", userValue);
        setUser(user);
      } else {
        console.log("Login failed");
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <View style={loginStyles.container}>
      {/* <View style={styles.header}>
        <Image 
          source={require('../assets/images/logo-ipsa.png')}
          style={styles.logo}
        />
      </View> */}
      
      <View style={loginStyles.colorBars}>
        <View style={[loginStyles.colorBar, { backgroundColor: '#28A0A0' }]} />
        <View style={[loginStyles.colorBar, { backgroundColor: '#FED57A' }]} />
        <View style={[loginStyles.colorBar, { backgroundColor: '#B196C7' }]} />
        <View style={[loginStyles.colorBar, { backgroundColor: '#E73E07' }]} />
      </View>

      <View style={loginStyles.formWrapper}>
        <View style={loginStyles.loginContainer}>
          <Text style={loginStyles.title}>Log In</Text>

          <View style={loginStyles.inputContainer}>
            <Text style={loginStyles.label}>
              <Text style={[loginStyles.plusSign, { color: '#B196C7' }]}>+</Text> 
              Gebruikersnaam
            </Text>
            <TextInput
              style={loginStyles.input}
              placeholder="Voer gebruikersnaam in"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="next"
            />
          </View>

          <View style={loginStyles.inputContainer}>
            <Text style={loginStyles.label}>
              <Text style={[loginStyles.plusSign, { color: '#E73E07' }]}>+</Text> 
              Wachtwoord
            </Text>
            <TextInput
              style={loginStyles.input}
              placeholder="Voer wachtwoord in"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Pressable onPress={() => {}}>
            <Text style={loginStyles.forgotPassword}>
              wachtwoord vergeten?
            </Text>
          </Pressable>

          <Pressable 
            style={loginStyles.loginButton}
            onPress={() => handleSubmit()}
          >
            <Text style={loginStyles.loginButtonText}>Log In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const loginStyles = StyleSheet.create({
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

export default Login;