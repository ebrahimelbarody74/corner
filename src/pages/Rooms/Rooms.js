import React from 'react'
import BuildingsTable from './RoomsTable';
import { Box, Flex, Grid } from '@chakra-ui/react';
import Card from "components/card/Card.js";
import { Button, Icon, useColorMode } from "@chakra-ui/react";
// Custom Icons
import { IoMdMoon, IoMdSunny } from "react-icons/io";

function Rooms() {
   const { colorMode, toggleColorMode } = useColorMode();
   let bgButton = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex flexDirection="column">
          <Card px="0px" mb="20px">
            <BuildingsTable />
           
          </Card>
        </Flex>
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}

export default Rooms;