import { writable, type StartStopNotifier, type Updater, type Writable } from "svelte/store";


type ParamType<T> = {
    value?: T;
    start?: StartStopNotifier<T>;
    stringify: (value: T) => string;
    parse: (str: string) => T;
    strategy: 'value' | 'store';
};

export function localStore<T>(key: string, params: ParamType<T> = {
    parse: s => JSON.parse(s) as T,
    stringify: JSON.stringify,
    strategy: 'store',
}): Writable<T> {
    const updateStorage = (v?: T) => {
        if (v) {
            localStorage.setItem(key, params.stringify(v));
        } else {
            localStorage.removeItem(key);
        }
    };
    const getStartValue = () => {
        if (params.strategy === 'value') {
            updateStorage(params.value);
            return params.value;
        } else {
            const storedValue = localStorage.getItem(key);

            if (storedValue) {
                return params.parse(storedValue);
            }

            updateStorage(params.value);
            return params.value;
        }
    };
    const store = writable(getStartValue(), params.start);

    return {
        subscribe: store.subscribe,
        set(value: T) {
            updateStorage(value);
            store.set(value);
        },
        update(updater: Updater<T>) {
            store.update(v => {
                const newValue = updater(v);
                updateStorage(newValue);
                return newValue;
            });
        },
    };
}