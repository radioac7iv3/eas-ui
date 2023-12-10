// components/SiteList.js
import React, { useState } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Badge,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { siteActions } from '../store';
import DatePicker from 'react-date-picker';
import { electricianActions } from '../store';
const SiteList = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const siteState = useSelector((state) => state.site);

  const [showAllSites, setShowAllSites] = useState(true);
  const [newInstallationDate, setNewInstallationDate] = useState('');
  const [selectedSite, setSelectedSite] = useState(null);

  const handleDateChange = (date) => {
    setNewInstallationDate(date);
  };

  const handleManageSite = (site) => {
    setSelectedSite(site);
    setNewInstallationDate(site?.newInstallationDate || '');
    onOpen();
  };

  const handleUpdateDate = () => {
    if (selectedSite) {
      dispatch(
        siteActions.updateInstallationDate({
          name: selectedSite.name,
          city: selectedSite.city,
          newInstallationDate: new Date(newInstallationDate).toISOString(),
        })
      );
    }

    // Clear the selected site and input field
    setSelectedSite(null);
    setNewInstallationDate('');
    onClose();
  };

  const currentDate = new Date();
  const filteredSites = showAllSites
    ? siteState
    : siteState.filter((site) => {
        const siteDate = new Date(site.InstallationDate);
        return (
          siteDate.getFullYear() === currentDate.getFullYear() &&
          siteDate.getMonth() === currentDate.getMonth() &&
          siteDate.getDate() === currentDate.getDate()
        );
      });

  const autoAssignHandler = () => {
    if (!showAllSites && filteredSites?.length > 0) {
      dispatch(electricianActions.autoAssign(filteredSites));
    }
    // return;
  };

  return (
    <Box>
      <Flex justifyContent={'space-between'}>
        <Button onClick={() => setShowAllSites(!showAllSites)} mb="4">
          {showAllSites ? 'Show Available Sites' : 'Show All Sites'}
        </Button>
        {!showAllSites && filteredSites?.length > 0 && (
          <Button onClick={() => autoAssignHandler()} mb="4">
            Auto-assign
          </Button>
        )}
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        style={{ minWidth: '400px', height: '400px' }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Installation Date</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DatePicker
              isOpen={true}
              onChange={handleDateChange}
              value={
                newInstallationDate || new Date(selectedSite?.InstallationDate)
              }
              clearIcon={null} // Remove the clear icon
              style={{ minWidth: '300px' }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateDate}>
              Update Installation Date
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {filteredSites.map((site, idx) => (
          <GridItem key={idx}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              p="4"
              bg="white"
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.05)' }}
            >
              {/* Display site information */}
              <Box mb="2">
                <Badge colorScheme={site.grievance ? 'red' : 'green'}>
                  {site.grievance ? 'Grievance' : 'No Grievance'}
                </Badge>
              </Box>
              <Box>
                <Box
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  fontSize="xl"
                  color="gray.500"
                >
                  {site.name}
                </Box>
                <Text color="gray.500" fontSize="sm">
                  Phone: {site.phone}
                </Text>
                <Text color="gray.500" fontSize="sm">
                  Installation Date:{' '}
                  {new Date(site.InstallationDate).toLocaleDateString()}
                </Text>
                <Text color="gray.500" fontSize="sm">
                  Grievance: {site.grievance ? 'Yes' : 'No'}
                </Text>
                <Button
                  colorScheme="blue"
                  mt="2"
                  onClick={() => handleManageSite(site)}
                >
                  Manage Site
                </Button>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default SiteList;
