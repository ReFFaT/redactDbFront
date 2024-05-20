import { writable } from 'svelte/store';

export const modal = writable<boolean>(false)

export function showModal(){
    modal.set(true)
}

export function hideModal(){
    modal.set(false)
}