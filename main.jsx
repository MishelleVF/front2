import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TabNavigator } from "./tabNavigator";
import Login2 from "../screens/login";
import { Crear1 } from "../screens/crearcuenta";
import FormRegistro from "../screens/form_registro";
const Stack = createStackNavigator();

import Toast from 'react-native-toast-message';

export function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login2}  options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Crear1}  options={{ headerShown: false }}/>
        <Stack.Screen name="FormRegistro" component={FormRegistro}  options={{ headerShown: false }}/>
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}