
import { useState } from "react";

import TeacherHeader from "./header";
import TeacherFilterBar from "./filter";
import TeacherListing from "./Listing";

import { SegmentTypeEnum } from "../../../../sharedComponents/Segment/utils/enum";
import {
	ContBody,
	TableContainer,
} from "../../../../sharedComponents/MainFlexContainer";
import CreateTeacher from "./composer/createTeacher";

const TeacherPage = () => {
	const [state, setState] = useState({
		filter: {
			segmentType: SegmentTypeEnum.Grid,
			search: "",
		},
		mode: "list", // list | create
	});

	const openCreateTeacher = () => {
		setState((prev) => ({ ...prev, mode: "create" }));
	};

	const goBackToList = () => {
		setState((prev) => ({ ...prev, mode: "list" }));
	};

	return (
		<TableContainer>
			<TeacherHeader
				onAddTeacher={openCreateTeacher}
				mode={state.mode}
				onBack={goBackToList}
			/>

			{state.mode === "list" && (
				<TeacherFilterBar
					state={state.filter}
					onChange={(filter) => setState((prev) => ({ ...prev, filter }))}
				/>
			)}

			<ContBody>
				{state.mode === "list" && <TeacherListing filter={state.filter} />}

				{state.mode === "create" && (
					<CreateTeacher onCancel={goBackToList} />
				)}
			</ContBody>
		</TableContainer>
	);
};

export default TeacherPage;
