export default function(state, action) {

	if (!state) {
		state = []
	}

	if (action.type == "ADD_ITEM") {
		return [...state, action.text]
	}

	if (action.type == "GET_ITEM_SUCC") {
		console.log(action);
		return [...state, ...action.payload]
	}

	return [...state];

}