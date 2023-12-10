import { createSlice, configureStore } from '@reduxjs/toolkit';
import { electricianData } from '../DataProcessors/electricianData';
import { rawSite } from '../DataProcessors/rawSiteData';

const initialState = rawSite;
const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    updateInstallationDate(state, payload) {
      //TODO:
      // 1) Find Which site is being changed
      state.find(
        (el) =>
          el.city === payload.payload.city && el.name === payload.payload.name
      ).InstallationDate = payload.payload.newInstallationDate;
      // 2) Change the date
    },

    updateAssignedElec(state, payload) {},
  },
});

const electricianSlice = createSlice({
  name: 'electrician',
  initialState: electricianData,
  reducers: {
    autoAssign(state, payload) {
      console.log('AutoAssigning...');
    },
  },
});

const rootReducer = {
  site: siteSlice.reducer,
  electrician: electricianSlice.reducer,
};

export const siteStore = configureStore({
  reducer: rootReducer,
});

export const siteActions = siteSlice.actions;
export const electricianActions = electricianSlice.actions;

export default siteStore;
