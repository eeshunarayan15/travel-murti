import { configureStore } from '@reduxjs/toolkit';
import packagesReducer from './slices/packagesSlice';
import subPackagesReducer from './slices/subPackagesSlice';
import dealReducer from './slices/dealSlice';
import userReducer from './slices/userSlice';
import blogReducer from '@/redux/slices/blogSlice'

const store = configureStore({
  reducer: {
    packages: packagesReducer,
    subPackages: subPackagesReducer,
    deal: dealReducer,
    user: userReducer,
    blogs: blogReducer,
  },
});

export { store };
export default store;
