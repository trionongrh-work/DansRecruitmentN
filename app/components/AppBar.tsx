import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Box, HStack, Icon, IconButton, StatusBar, Text } from "native-base"
import { MaterialIcons } from "@expo/vector-icons"

export interface AppBarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  title?: string
  LeftComponent?: React.ReactNode
  TitleComponent?: React.ReactNode
  ActionsComponent?: React.ReactNode
}

/**
 * Describe your component here
 */
export const AppBar = observer(function AppBar(props: AppBarProps) {
  const { style, title, ActionsComponent, TitleComponent, LeftComponent } = props
  const $styles = [$container, style]

  let titleComponent

  if (title) {
    titleComponent = (
      <Text color="white" fontSize="20" fontWeight="bold">
        {title}
      </Text>
    )
  }

  if (TitleComponent) {
    titleComponent = TitleComponent
  }

  return (
    <View style={$styles}>
      <StatusBar barStyle="light-content" />
      <Box safeAreaTop bg={colors.palette.primary900} />
      <HStack
        bg={colors.palette.primary900}
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack alignItems="center" px="3">
          {LeftComponent}
          {/* <IconButton
            icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />}
            borderRadius={10}
          /> */}
          <Box mr="3" flex={1}>
            {titleComponent}
          </Box>
          {ActionsComponent}
        </HStack>
      </HStack>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
