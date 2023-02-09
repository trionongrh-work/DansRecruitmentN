import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"Try this example on Snack
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeScreen } from "./HomeScreen"
import { AccountScreen } from "./AccountScreen"
import { Icon } from "native-base"
import { colors } from "../theme"
import { MaterialIcons } from "@expo/vector-icons"

const Tab = createBottomTabNavigator()

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `HomeTab: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="HomeTab" component={HomeTabScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HomeTabScreen: FC<StackScreenProps<AppStackScreenProps, "HomeTab">> = observer(
  function HomeTabScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: (props) => (
              <Icon
                size="md"
                name="home"
                as={MaterialIcons}
                color={props.focused ? props.color : colors.separator}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarIcon: (props) => (
              <Icon
                size="md"
                name="person"
                as={MaterialIcons}
                color={props.focused ? props.color : colors.separator}
              />
            ),
          }}
        />
      </Tab.Navigator>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
