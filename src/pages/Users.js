import React from "react";
import DashboardTable from "./Dashboard/DashboardTable";
import Card from "components/card/Card";
import { Box } from "@chakra-ui/react";

function Users() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
     
      <Card px="0px" mb="20px">
        <DashboardTable />
      </Card>
      {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid> */}
    </Box>
  );
}

export default Users;
