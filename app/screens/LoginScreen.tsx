import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Header, Screen } from "../components"
import { colors, spacing } from "../theme"
import { isRTL } from "../i18n"
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  VStack,
  Text,
  Container,
  Pressable,
  Icon,
} from "native-base"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { useStores } from "../models"
import * as Google from "expo-auth-session/providers/google"

// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-google-signin/google-signin"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Login: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Login" component={LoginScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const LoginScreen: FC<StackScreenProps<AppStackScreenProps, "Login">> = observer(
  function LoginScreen() {
    // Pull in one of our MST stores
    const { authStore } = useStores()
    const { loginForm } = authStore

    const [request, response, promptAsync] = Google.useAuthRequest({
      expoClientId: "154865436185-3gpoiqsobuhumb2f0q0jfarfqjuf4743.apps.googleusercontent.com",
    })
    const [show, setShow] = useState(false)
    // Pull in navigation via hook
    // const navigation = useNavigation()

    useEffect(() => {
      // GoogleSignin.configure()

      loginForm.setEmail("test@mail.com")
      loginForm.setPassword("P@$$w0rd")
    }, [])

    useEffect(() => {
      if (response?.type === "success") {
        authStore.onLoginGoogle(response)
      }
    }, [response])

    return (
      <Screen style={$root} preset="fixed">
        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" h="100%">
            <Center>
              <Heading size="xl" fontWeight="600" color="coolGray.800">
                Welcome
              </Heading>
              <Heading mt="1" color="coolGray.600" fontWeight="medium" size="sm">
                Sign in to continue!
              </Heading>
            </Center>
            <Box flexDir={"row"} flex={1} alignItems={"center"}>
              <Box safeArea p="2" py="8" w="100%">
                <VStack space={3} mt="5">
                  <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input
                      value={loginForm.email}
                      onChangeText={loginForm.setEmail}
                      _focus={{ bg: colors.palette.primary100 }}
                      focusOutlineColor={colors.palette.primary800}
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input
                      type={show ? "text" : "password"}
                      value={loginForm.password}
                      _focus={{ bg: colors.palette.primary100 }}
                      focusOutlineColor={colors.palette.primary800}
                      onChangeText={loginForm.setPassword}
                      InputRightElement={
                        <Pressable onPress={() => setShow(!show)}>
                          <Icon
                            as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
                            size={5}
                            mr="3"
                            color="muted.400"
                          />
                        </Pressable>
                      }
                      placeholder="Password"
                      onSubmitEditing={authStore.onLogin}
                    />
                  </FormControl>
                  <Button
                    mt="2"
                    py="4"
                    bg={colors.palette.primary800}
                    _pressed={{ bg: colors.palette.primary300 }}
                    variant="solid"
                    onPress={authStore.onLogin}
                  >
                    Login
                  </Button>
                  <Button
                    mt="2"
                    py="4"
                    bg={colors.palette.primary800}
                    _pressed={{ bg: colors.palette.primary300 }}
                    variant="solid"
                    onPress={() => {
                      promptAsync()
                    }}
                    leftIcon={<Icon name="logo-google" as={Ionicons} />}
                  >
                    Google Login
                  </Button>
                </VStack>
              </Box>
            </Box>
          </Box>
        </Center>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  // flex: 1,
  backgroundColor: colors.palette.angry500,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.huge,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}
