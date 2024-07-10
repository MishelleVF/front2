import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TabNavigator } from "./tabNavigator";
import Login2 from "../screens/Login";
import { Crear1 } from "../screens/SignUp_Crearcuenta";
import FormRegistro from "../screens/formRegistro";
const Stack = createStackNavigator();

export function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login2}  options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Crear1}  options={{ headerShown: false }}/>
        <Stack.Screen name="FormRegistro" component={FormRegistro}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}