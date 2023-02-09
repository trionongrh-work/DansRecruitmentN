import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, ListRenderItemInfo, TouchableHighlight, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, navigate } from "../navigators"
import { AutoImage, Header, Screen } from "../components"
import { AppBar } from "../components/AppBar"
import {
  Box,
  Card,
  Container,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Input,
  Pressable,
  Switch,
  Text,
  VStack,
} from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import { useStores } from "../models"
import { colors } from "../theme"
import { isEmpty } from "validator"
import { Positions } from "../models/Positions"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Home: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Home" component={HomeScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HomeScreen: FC<StackScreenProps<AppStackScreenProps, "Home">> = observer(
  function HomeScreen() {
    // Pull in one of our MST stores
    const { authStore, positionStore } = useStores()
    const [search, setSearch] = useState("")
    const [location, setLocation] = useState("")
    const [full_time, setFulltime] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [positions, setPositions] = useState<Positions[]>([])
    const [page, setPage] = useState(1)

    useEffect(() => {
      positionStore.getPositions().then(setPositions)
    }, [])

    useEffect(() => {
      let params = {}
      if (!isEmpty(search)) {
        params["description"] = search
      }
      if (!isEmpty(location)) {
        params["location"] = location
      }
      if (full_time) {
        params["full_time"] = full_time
      }
      console.log("ND_params", params)
      positionStore.getPositions(params).then((result) => {
        setPositions(result)
        setPage(1)
      })
    }, [search, location, full_time])

    const fetchMoreData = () => {
      let params = {}
      if (!isEmpty(search)) {
        params["description"] = search
      }
      if (!isEmpty(location)) {
        params["location"] = location
      }
      if (full_time) {
        params["full_time"] = full_time
      }
      params["page"] = page + 1
      positionStore.getPositions(params).then((result) => {
        if (result) {
          setPositions([...positions, ...result])
          setPage(page + 1)
        }
      })
    }
    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={$root} preset="fixed" safeAreaEdges={["bottom"]}>
        <AppBar
          title="Home"
          TitleComponent={
            <Input
              variant="rounded"
              px="5"
              bg={colors.background}
              _focus={{ bg: colors.background }}
              focusOutlineColor={colors.palette.primary300}
              placeholder="Cari data..."
              value={search}
              onChangeText={setSearch}
            />
          }
          ActionsComponent={
            <HStack>
              <IconButton
                icon={<Icon size="md" as={MaterialIcons} name="arrow-circle-down" color="white" />}
                onPress={() => setShowFilter(!showFilter)}
              />
            </HStack>
          }
        />
        {showFilter && (
          <Box px="5" py="3" bg={colors.palette.primary900}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text color="white">Fulltime</Text>
              <Switch value={full_time} onToggle={(test) => setFulltime(!full_time)} />
            </HStack>
            <HStack justifyContent="space-between" alignItems="center">
              <Text color="white">Location</Text>
              <Box w="60%">
                <Input
                  bg="white"
                  _focus={{ bg: colors.background }}
                  placeholder="Location"
                  borderRadius={10}
                  value={location}
                  onChangeText={setLocation}
                />
              </Box>
            </HStack>
          </Box>
        )}
        <Box h="100%" bg={colors.palette.primary100} pb={showFilter ? "430" : 195}>
          <FlatList
            contentContainerStyle={{
              paddingVertical: 20,
            }}
            data={positions.filter((e) => e?.id)}
            ItemSeparatorComponent={() => <Box py="2" />}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}
            renderItem={({ item, index }) => {
              return (
                <Box px="5">
                  <TouchableHighlight
                    onPress={() => {
                      navigate("DetailPosition", { id: item.id })
                    }}
                    style={{ borderRadius: 8 }}
                  >
                    <Card bg={colors.background} flex={1} px="2">
                      <HStack flex={1} alignItems="center">
                        <Box w="80px" h="80px">
                          {item?.company_logo && <Image source={{ uri: item.company_logo }} />}
                        </Box>
                        <VStack flex={1}>
                          <Text fontWeight={"bold"} flex={1}>
                            {item?.title || "-"}
                          </Text>
                          <Text fontSize="xs" flex={1} color={colors.palette.neutral500}>
                            {item?.company || "-"}
                          </Text>
                          <Text fontSize="xs" flex={1} color={colors.palette.neutral500}>
                            {item?.location || "-"}
                          </Text>
                        </VStack>
                        <Icon name="arrow-right" size="md" as={MaterialIcons} />
                      </HStack>
                    </Card>
                  </TouchableHighlight>
                </Box>
              )
            }}
          />
        </Box>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
