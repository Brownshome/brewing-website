import React, { useEffect } from "react";
import { useQuery, useSelector } from "./hooks";
import { BrowserRouter, Redirect, Route, Switch, useParams } from "react-router-dom";
import BrewPage from "./BrewPage";
import { getError, selectBrews } from "./database";
import { useDispatch } from "./hooks";
import LoadingDatabasePage from "./LoadingDatabasePage";
import DatabaseErrorPage from "./DatabaseErrorPage";

const App: React.FC = () => {
	const dispatch = useDispatch();
	
	const error = useSelector(getError);
	const brews = useSelector(state => state.database.brews);
	const id = useQuery().get("brew");

	useEffect(() => {
		if (brews === undefined) {
			dispatch(selectBrews());
		}
	}, [dispatch, brews]);

	if (error !== undefined) {
		return <DatabaseErrorPage error={ error }/>
	}

	if (brews === undefined) {
		return <LoadingDatabasePage/>
	}

	if (brews.length === 0) {
		return <div></div>;
	}

	if (id === null) {
		const defaultBrew = brews.find(brew => brew.endTime !== undefined) || brews[brews.length - 1];
		return <Redirect to={ `?brew=${ defaultBrew.id }` }/>;
	}

	const brew = brews && brews.find(b => b.id === parseInt(id, 10));
	if (!brew) {
		return <Redirect to="/"/>;
	}

	return <BrewPage brew={ brew }/>;
};

export default App;
