import localForage from 'localforage';

export const StateStorage = localForage.createInstance({
	name: 'Haphazard Inspiration',
	storeName: 'stateStorage',
	version: 1,
	description: 'Stores state information for the next time we load.'
});

export const CustomStorage = localForage.createInstance({
	name: 'Haphazard Inspiration',
	storeName: 'customStorage',
	version: 1,
	description: 'Stores custom information.'
});
