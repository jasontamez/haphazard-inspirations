import localForage from 'localforage';

export const StateStorage = localForage.createInstance({
	name: 'Haphazard Inspiration',
	storeName: 'stateStorage',
	version: 1,
	description: 'Stores state information for the next time we load.'
});

export const IdeaStorage = localForage.createInstance({
	name: 'Haphazard Inspiration',
	storeName: 'ideaStorage',
	version: 1,
	description: 'Stores idea information.'
});
