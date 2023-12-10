import { Box } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import siteStore from '../store';
import ElectricianList from './ElectricianLayout';
import SiteList from './SiteLayout';

const MainLayout = () => {
  return (
    <Box display={'flex'} height={'100vh'}>
      <Box style={{ flex: 7, overflowY: 'auto', padding: '20px' }}>
        <Provider store={siteStore}>
          <SiteList />
        </Provider>
      </Box>
      <Box
        style={{
          flex: 3,
          overflowY: 'auto',
          padding: '20px',
          borderLeft: '1px solid #ccc',
        }}
      >
        <Provider store={siteStore}>
          <ElectricianList />
        </Provider>
      </Box>
    </Box>
  );
};

export default MainLayout;
