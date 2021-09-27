import {
	TypedUseSelectorHook, 
	useDispatch as reduxUseDispatch, 
	useSelector as reduxUseSelector 
} from 'react-redux'
import { useLocation } from 'react-router-dom';

import type { RootState, Dispatch } from "./store";

export const useDispatch = () => reduxUseDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;
export const useQuery = () => new URLSearchParams(useLocation().search);