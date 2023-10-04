import React from 'react'
import BuildingsTable from './BuildingsTable';
import { Box, Flex, Grid } from '@chakra-ui/react';
import Card from "components/card/Card.js";

function Buildings() {
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

export default Buildings