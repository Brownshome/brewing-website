// Store slice for database information
import { createAsyncThunk, createSlice, IdSelector, PayloadAction } from "@reduxjs/toolkit";
import { Brew, brewFromJSON, BrewState } from "./brew";
import { RootState } from "./store";

export type Error = {
	number?: number,
	message?: string,
};

type DatabaseState = {
	error?: Error,
	brews?: Brew[],
};

const initialState: DatabaseState = { };

export const selectBrews = createAsyncThunk("database/selectBrews", async () => {
	const response = await fetch("database/brews.php");

	const rawBrews = await response.json() as any[];
	return rawBrews.map(brewFromJSON);
});

type SetBrewStatePayload = {
	brew: Brew,
	state: BrewState
};

export const setBrewState = createAsyncThunk("database/setBrewState", async (arg: SetBrewStatePayload) => {
	const response = await fetch("database/brews.php", {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ brewID: arg.brew.id }),
	});

	return brewFromJSON(await response.json());
});

export const databaseSlice = createSlice({
	name: "database",
	initialState,
	reducers: {
		setBrewState: (state, action: PayloadAction<{ brew: Brew, state: BrewState }>) => {

		}
	},
	extraReducers: builder => {
		builder.addCase(selectBrews.fulfilled, (state, action) => {
			state.brews = action.payload;
		});

		builder.addCase(selectBrews.rejected, (state, action) => {
			state.error = {
				number: Number(action.error.code) || undefined,
				message: action.error.message
			};
		});
	},
});

export const getError = (state: RootState) => state.database.error;

export default databaseSlice.reducer;