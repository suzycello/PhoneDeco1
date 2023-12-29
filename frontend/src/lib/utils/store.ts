import { writable } from 'svelte/store';

const casenumber = writable('');
const stickername = writable('');

export { casenumber, stickername };