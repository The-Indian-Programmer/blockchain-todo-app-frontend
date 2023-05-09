export function isEmpty(obj) {
	if (obj === "") return true;
	if (obj === 0) return true;
	if (obj === "0") return true;
	if (obj == null) return true;
	if (obj === false) return true;
	if (obj.length > 0) return false;
	if (obj.length === 0) return true;
	if (typeof (obj) == "undefined") return true;
	if (typeof obj !== "object") return true;
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}
	return false
}