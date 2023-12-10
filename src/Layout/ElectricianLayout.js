// components/ElectricianList.js
import React from 'react';
import { Box, Grid, GridItem, Avatar, Badge, Text } from '@chakra-ui/react';
// import { electricianData } from '../DataProcessors/electricianData';
import { useDispatch, useSelector } from 'react-redux';
import { electricianActions } from '../store';

const ElectricianList = () => {
  const electricianData = useSelector((state) => state.electrician);

  return (
    <Grid templateColumns="repeat(1, 1fr)" gap={4}>
      {electricianData.map((electrician, index) => (
        <GridItem key={`${index + electrician.name}`}>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            p="2"
            bg="white"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
          >
            {/* Display electrician information */}
            <Avatar
              name={electrician.name}
              src={`https://i.pravatar.cc/150?u=${index}`}
            />
            <Box mt="1" mb="1">
              <Badge
                colorScheme={electrician.grievanceElectrician ? 'red' : 'green'}
                fontSize="0.8rem"
              >
                {electrician.grievanceElectrician
                  ? 'Grievance Electrician'
                  : 'Regular Electrician'}
              </Badge>
            </Box>
            <Box>
              <Box
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                fontSize="1rem"
                color="gray.500"
              >
                {electrician.name}
              </Box>
              <Text color="gray.500" fontSize="0.8rem">
                Phone: {electrician.phoneNumber}
              </Text>
              {electrician.zone.length > 0 && (
                <Text color="gray.500" fontSize="0.8rem">
                  Zone: {electrician.zone.join(', ')}
                </Text>
              )}
            </Box>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

export default ElectricianList;
