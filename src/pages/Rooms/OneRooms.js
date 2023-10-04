import React from "react";
import { Box, Flex, Grid } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import OneRoomsTable from "./OneRoomsTable";
function OneRooms() {
  return (
    <Box className="mt-6" pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex flexDirection="column">
          <Card px="0px" mb="20px">
            <OneRoomsTable />
          </Card>
        </Flex>
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}

export default OneRooms;
