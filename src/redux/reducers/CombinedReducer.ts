import { combineSlices } from '@reduxjs/toolkit';
import localforage from 'localforage';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cartReducer } from './cartReducer';
let instance;

try {
    instance = localforage.createInstance({
        driver: localforage.INDEXEDDB,
        name: 'gadget_grid_admin',
    });
} catch (error) {
    console.log(error);
}

const cartPersistConfig = {
    key: 'table',
    storage: instance || storage,
};

const rootReducer = combineSlices({
    cart: persistReducer(cartPersistConfig, cartReducer),
});

export default rootReducer;
