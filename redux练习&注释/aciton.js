export default function(type, data) {
	if( type == "ADD_ITEM" ) {
		return {
			type : type,
			text : data
		}
	}
}