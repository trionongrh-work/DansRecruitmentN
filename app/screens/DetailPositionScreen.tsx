import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, goBack } from "../navigators"
import { Header, Screen } from "../components"
import { AppBar } from "../components/AppBar"
import {
  Box,
  Card,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  ScrollView,
  Text,
  VStack,
} from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "../theme"
import { useStores } from "../models"
import { Positions } from "../models/Positions"
import RenderHtml from "react-native-render-html"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `DetailPosition: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="DetailPosition" component={DetailPositionScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const DetailPositionScreen: FC<StackScreenProps<AppStackScreenProps, "DetailPosition">> =
  observer(function DetailPositionScreen({ route }) {
    // Pull in one of our MST stores
    const { positionStore } = useStores()
    const [id] = useState(route.params.id)
    const [position, setPositions] = useState<Positions>(null)
    // Pull in navigation via hook
    // const navigation = useNavigation()

    useEffect(() => {
      positionStore.getPositionsDetail(id).then(setPositions)
    }, [])

    return (
      <Screen style={$root} preset="fixed" safeAreaEdges={["bottom"]}>
        <AppBar
          title="Job Detail"
          LeftComponent={
            <HStack pr="3">
              <IconButton
                icon={<Icon size="md" as={MaterialIcons} name="arrow-left" color="white" />}
                onPress={goBack}
              />
            </HStack>
          }
        />
        {position && (
          <Box safeAreaBottom pb="180">
            <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20 }}>
              <Box>
                <Text fontSize="md" fontWeight="medium">
                  Company
                </Text>
                <Card bg={colors.background} mt="2">
                  <HStack flex={1} alignItems="center">
                    <Image
                      source={{ uri: position.company_logo }}
                      style={{ width: 80, height: 80 }}
                    />
                    <VStack alignContent="flex-start" h="100%" flex={1}>
                      <Text fontWeight={"bold"}>{position.company}</Text>
                      <Text fontSize="xs" color={colors.palette.neutral500}>
                        {position.location}
                      </Text>
                      <Link href={position.company_url} mt="2" _text={{ color: "blue.600" }}>
                        Go to Website
                      </Link>
                    </VStack>
                  </HStack>
                </Card>
              </Box>
              <Box mt="5">
                <Text fontSize="md" fontWeight="medium">
                  Job Specification
                </Text>
                <Card bg={colors.background} mt="2">
                  <VStack space="2">
                    <FormControl>
                      <FormControl.Label _text={{ color: colors.palette.neutral500 }}>
                        Title
                      </FormControl.Label>
                      <Text>{position.title}</Text>
                    </FormControl>
                    <FormControl>
                      <FormControl.Label _text={{ color: colors.palette.neutral500 }}>
                        Fulltime
                      </FormControl.Label>
                      <Text>{position.type === "Full Time" ? "Yes" : "No"}</Text>
                    </FormControl>
                    <FormControl>
                      <FormControl.Label _text={{ color: colors.palette.neutral500 }}>
                        Description
                      </FormControl.Label>
                      <RenderHtml source={{ html: position.description }} contentWidth={200} />
                    </FormControl>
                  </VStack>
                </Card>
              </Box>
            </ScrollView>
          </Box>
        )}
      </Screen>
    )
  })

const $root: ViewStyle = {
  flex: 1,
}
