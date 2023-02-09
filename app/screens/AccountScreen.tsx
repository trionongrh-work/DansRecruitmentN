import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen } from "../components"
import { AppBar } from "../components/AppBar"
import { Box, HStack, Icon, IconButton, Input, VStack, Text, Center, Button } from "native-base"
import { colors } from "../theme"
import { MaterialIcons } from "@expo/vector-icons"
import { useStores } from "../models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Account: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Account" component={AccountScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const AccountScreen: FC<StackScreenProps<AppStackScreenProps, "Account">> = observer(
  function AccountScreen() {
    // Pull in one of our MST stores
    const { authStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={$root} preset="fixed">
        <AppBar
          title="Account"
          ActionsComponent={
            <HStack>
              <IconButton
                icon={<Icon size="md" as={MaterialIcons} name="logout" color="white" />}
                onPress={authStore.onLogout}
              />
            </HStack>
          }
        />
        <Box h="100%" bg={colors.palette.primary100} justifyContent="center">
          <VStack w="100%" alignItems="center">
            <Text>{authStore.loginForm.email}</Text>
            <Button
              mt="2"
              py="4"
              bg={colors.palette.primary800}
              _pressed={{ bg: colors.palette.primary300 }}
              variant="solid"
              onPress={authStore.onLogout}
            >
              Logout
            </Button>
          </VStack>
        </Box>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
