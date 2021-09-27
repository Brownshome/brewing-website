import React, { useState } from "react";
import type { Brew, BrewState } from "./brew";
import { setBrewState } from "./database";
import { useDispatch } from "./hooks";

import brewPageStyles from "./BrewPage.module.css";
import brewTitleBarStyles from "./BrewTitleBar.module.css";
import buttonStyles from "./button.module.css";
import warningBarStyles from "./warningBar.module.css";
import controlPanelStyles from "./controlPanel.module.css";

type BrewMessage = {
	text: string,
	type: "warning" | "info"
}

const BrewTitleBar: React.FC<{ brew: Brew, onNextState: () => void }> = ({ brew, onNextState }) => {
	let msg = `${ brew.brewState } - `;

	if (brew.brewState === "Not Started") {
		msg += `Starts in ${ brew.startTime.getHours() - new Date().getHours() }h`;
	} else {
		msg += `Brewing for ${ new Date().getHours() - brew.startTime.getHours() }h`;
	}

	return <div className={ brewTitleBarStyles.root }>
		<div className={ brewTitleBarStyles.titleBox }>
			<h1>{ brew.brewName }</h1>
			<p>{ msg }</p>
		</div>
		<div className={ brewTitleBarStyles.buttonBox }>
			<button>View Other Brews</button>
			<button onClick={ onNextState } className={ buttonStyles.main }>Change Brew State</button>
		</div>
	</div>;
};

const WarningBar: React.FC<{ warning: BrewMessage, onClose: () => void }> = ({ warning, onClose }) => {
	let className = warningBarStyles.root;

	if (warning.type === "warning") {
		className += " " + warningBarStyles.warning;
	}

	return <div className={ className }>
		<p>{ warning.text }</p>
		<p className={ warningBarStyles.closeButton } onClick={ onClose }>⨉</p>
	</div>;
};

const NextStateDialog: React.FC<{ state: BrewState, onSetState: (s: BrewState) => void, onClose: () => void }> = ({ state, onSetState, onClose }) => {
	return <div>

	</div>;
};

const ControlPanel: React.FC<{ brew: Brew }> = ({ brew }) => {
	return <div className={ controlPanelStyles.root }>
		<p>Temperature ℃</p><input/>
		<p>State: </p><p className={ controlPanelStyles.heating }>Heating</p>
		<p>SG: </p><input/>
	</div>;
};

const EditControllerDialog: React.FC<{ brew: Brew, onClose: () => void }> = ({ brew, onClose }) => {
	return <div>

	</div>;
};

const TimeSeries: React.FC<{ brew: Brew }> = ({ brew }) => {
	return <div></div>;
};

const BrewPage: React.FC<{ brew: Brew }> = ({ brew }) => {
	const dispatch = useDispatch();

	const [warning, setWarning] = useState<BrewMessage | null>(() => {
		// todo warning messages
		
		return { text: "WARNING MESSAGE", type: "warning" };
	});

	const [isStateDialogShowing, showStateDialog] = useState(false);
	const [isEditControllerDialogShowing, showEditControllerDialog] = useState(false);

	return <>
		<BrewTitleBar brew={ brew } onNextState={ () => showStateDialog(true) }/>
		{ warning && <WarningBar warning={ warning! } onClose={ () => setWarning(null) }/> }
		{ isStateDialogShowing && <NextStateDialog state={ brew.brewState } onSetState={ newState => { dispatch(setBrewState({ brew, state: newState })) } } onClose={ () => showStateDialog(false) }/> }
		{ isEditControllerDialogShowing && <EditControllerDialog brew={ brew } onClose={ () => showEditControllerDialog(false) }/> }

		<div className={ brewPageStyles.content }>
			<div className={ brewPageStyles.controllerSidebar }>
				<ControlPanel brew={ brew }/>
				<button onClick={ () => showEditControllerDialog(true) } className={ buttonStyles.main }>Edit Controller</button>
			</div>

			<TimeSeries brew={ brew }/>
		</div>
	</>;
};

export default BrewPage;