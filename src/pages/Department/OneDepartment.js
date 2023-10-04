import React from "react";
import { Box, Flex, Grid } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import OneDepartmentTable from "./OneDepartmentTable";
function OneDepartment() {
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
            <OneDepartmentTable />
          </Card>
        </Flex>
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}

export default OneDepartment;
