import React from 'react'
import {
  ThemeEditor as ThemeEditorContainer,
  ThemeEditorDrawer,
  ThemeEditorColors,
  ThemeEditorFontSizes
} from '@hypertheme-editor/chakra-ui'
import { Button, Icon, useColorMode } from "@chakra-ui/react";
// Custom Icons
import { IoMdMoon, IoMdSunny } from "react-icons/io";

export function ThemeEditor(props) {
    return (
        <ThemeEditorContainer>
          <ThemeEditorButton {...props} />
          {/* <ThemeEditorDrawer hideUpgradeToPro>
            <ThemeEditorColors icon={CgColorPicker} title="Colors" />
            <ThemeEditorFontSizes icon={ImFontSize} title="Font Sizes" />
          </ThemeEditorDrawer> */}
        </ThemeEditorContainer>
      )
}

function ThemeEditorButton({ onOpen, navbarIcon, ...rest }) {
   const { colorMode, toggleColorMode } = useColorMode();
   let bgButton = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";
  return (
    <Button
      // {...rest}
      // variant="no-effects"
      backgroundColor={"transparent"}
      onClick={toggleColorMode}
      display="flex"
      border={"none"}
      p="0px"
      align="center"
      justify="center"
    >
      <Icon
        // h="24px"
        // w="24px"
        color={colorMode === "light" ? "black" : "white"}
        as={colorMode === "light" ? IoMdMoon : IoMdSunny}
      />
    </Button>
  );
}