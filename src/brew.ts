export type Brew = {
	id: number,
	brewName: string,
	startTime: Date,
	endTime?: Date,
	setPoint: number,
	sgSampleTime: Date,
	bottleTime: Date,
	deadbandHigh: number, 
	deadbandLow: number,
	highTripPoint: number,
	lowTripPoint: number,
	sgTarget: number,
	sgFinal: number,
	sgReading: number,
	brewState: BrewState,
};

function parseDate(s: string) {
	return new Date(s);
}

export function brewFromJSON(r: any) {
	const brew: Brew = {
		id: parseInt(r.id, 10),
		brewName: r.brew_name,
		startTime: parseDate(r.start_time),
		endTime: r.end_time ? parseDate(r.end_time) : undefined,
		setPoint: r.set_point,
		sgSampleTime: r.sg_sample_time,
		bottleTime: r.bottle_time,
		deadbandHigh: r.deadband_high,
		deadbandLow: r.deadband_low,
		highTripPoint: r.high_trip_point,
		lowTripPoint: r.low_trip_point,
		sgTarget: r.sg_target,
		sgFinal: r.sg_final,
		sgReading: r.sg_reading,
		brewState: "Not Started",
	};

	if (brew.startTime > new Date()) {
		brew.brewState = "Fermenting";
	}

	if (brew.endTime) {
		brew.brewState = "Done";
	}

	return brew;
}

export const brewStates = [ "Not Started", "Fermenting", "Bottled", "Done" ] as const;
export type BrewState = typeof brewStates[number];