const maybeUpdateTheme = (original: string, now: string) => {
	if(original) {
		let cl = document.body.classList;
		cl.remove(original.replace(/ /g, "") + "Theme");
		cl.add(now.replace(/ /g, "") + "Theme");
	}
};

export default maybeUpdateTheme;
