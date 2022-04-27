module.exports = {
	log: function(name, message) {
		let cur = new Date();
		let hr = `0${cur.getHours()}`;
		hr = hr.substring(hr.length-2);
		let mi = `0${cur.getMinutes()}`;
		mi = mi.substring(mi.length-2);
		let se = `0${cur.getSeconds()}`;
		se = se.substring(se.length-2);
		let ms = `00${cur.getMilliseconds()}`;
		ms = ms.substring(ms.length-3);
		//console.log(`${hr}:${mi}:${se}:${ms}  :  ${message}`);
		if(name === "") name = `  App  `
		console.log(`[${name}] : `+message)
	}

}
