import { configureStore } from '@reduxjs/toolkit';
import packagesReducer from './slices/packagesSlice';
import subPackagesReducer from './slices/subPackagesSlice';
import dealReducer from './slices/dealSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    packages: packagesReducer,
    subPackages: subPackagesReducer,
    deal: dealReducer,
    user: userReducer,
  },
});

export { store };
export default store;
