import React from 'react'
import BuildingsTable from './NewMapTable';
import { Box, Flex, Grid } from '@chakra-ui/react';
import Card from "components/card/Card.js";
import NewMapTable from './NewMapTable';

function NewMap() {
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }} className='mt-8'>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex flexDirection="column">
          <Card px="0px" mb="20px">
            <NewMapTable />
          </Card>
        </Flex>
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}

export default NewMap;