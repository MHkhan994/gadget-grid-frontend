import { TProduct } from '@/types/product.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

type InitialState = {
    compareItems: TProduct[];
};

const initialState: InitialState = {
    compareItems: [],
};

const compareSlice = createSlice({
    name: 'compare',
    initialState: initialState,
    reducers: {
        addToCompare: (state, action: PayloadAction<TProduct>) => {
            const product = action.payload;
            const exist = state.compareItems?.find(
                (item) => item._id === product._id,
            );

            if (exist) {
                toast.warning('Product already exist in compare');
                return;
            }

            if (!exist && state.compareItems?.length < 4) {
                state.compareItems.push(product);
            }
        },
        removeFromCompare: (state, action: PayloadAction<'add' | 'remove'>) => {
            const id = action.payload;
            const exist = state.compareItems?.find((item) => item._id === id);
            if (exist) {
                state.compareItems.filter((item) => item._id !== id);
            }
        },
    },
});

export const { addToCompare, removeFromCompare } = compareSlice.actions;

export const compareReducer = compareSlice.reducer;
