import React from "react";
import { Error } from "./database";

type Params = {
	error: Error
};

const DatabaseErrorPage: React.FC<Params> = ({ error }) => {
	return <>
		Error reading database({ error.number }): { error.message };
	</>;
}

export default DatabaseErrorPage;