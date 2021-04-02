export const $q: any = (query: string, doc = window.document) => doc.querySelector(query);
export const $a: any = (query: string, doc = window.document) => Array.from(doc.querySelectorAll(query));
export const $i: any = (query: string, doc = window.document) => doc.getElementById(query);
// Wrap setTimeout in a Promise
export const $delay: any = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const $togID: any = (className: string, id: string, doc = window.document) => {
	let what = doc.getElementById(id);
	what && what.classList.toggle(className);
};
