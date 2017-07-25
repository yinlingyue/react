export default function(state, action) {

	if (!state) {
		state = false;
	}

	if (action.type == "CHANGE_COLOR") {
		return !state;
	}

	return state;

}