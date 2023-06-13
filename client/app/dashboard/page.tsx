'use client';
import Sidebar from '../../components/Dashboard-Learning/Sidebar';
import { Grid, GridItem } from '@chakra-ui/react';
import UnitGrid from '@/components/Dashboard-Learning/UnitGrid';

const Dashboard = () => (
  <>
    <Grid
      h="800px"
      templateColumns="repeat(3, 1fr)"
      gap={4}
      m={3}>
      <GridItem
        colSpan={1}
        bg="tomato">
        <Sidebar />
      </GridItem>
      <GridItem
        colSpan={2}
        bg="tomato">
        <UnitGrid />
      </GridItem>
    </Grid>
  </>
);
export default Dashboard;
