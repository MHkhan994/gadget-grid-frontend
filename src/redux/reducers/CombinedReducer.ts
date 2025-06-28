import { combineSlices } from '@reduxjs/toolkit';
import localforage from 'localforage';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cartReducer } from './cartReducer';
import { compareReducer } from './compareReducer';
let instance;

try {
    instance = localforage.createInstance({
        driver: localforage.INDEXEDDB,
        name: 'gadget_grid_frontend',
    });
} catch (error) {
    console.log(error);
}

const cartPersistConfig = {
    key: 'cart',
    storage: instance || storage,
};
const comparePersistConfig = {
    key: 'compare',
    storage: instance || storage,
};

const rootReducer = combineSlices({
    cart: persistReducer(cartPersistConfig, cartReducer),
    compare: persistReducer(comparePersistConfig, compareReducer),
});

export default rootReducer;
