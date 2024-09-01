import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authSlice from './authSlice';
import productSlice from './productSlice';
import brandSlice from './brandSlice';

const authPersistConfig = {
    key: 'auth',
    storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        product: productSlice,
        brand: brandSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
