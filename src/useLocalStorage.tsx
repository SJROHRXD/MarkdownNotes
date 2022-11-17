import { useEffect, useState } from "react";

export function useLocalStorage<T>
    (key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue == null) {
            if (typeof initialValue === 'function') {
                return (initialValue as () => T)();
            } else {
                return initialValue;
            }
        } else {
            return JSON.parse(jsonValue);
        }
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
    return [value, setValue] as [T, typeof setValue];
};

// Hooks ⚡
// Hooks allow function components to have access to state and other React features (without using classes)

// the useState hook keeps track of the state of a component
    // we update state in order to trigger a re-render of the component

// useEffect is a hook that runs a function when the component mounts
    // it allows us to perform `side effects` in our components
    // `side effects` are things that happen outside of the component
    // examples include: fetching data, setting up event listeners, directly updating the DOM, timers, etc.

// A custom hook is a function that starts with the word `use`
// Custom hooks share logic between components


// useLocalStorage 💧
// useLocalStorage is a custom hook that allows us to store data in the browser's local storage
// useLocalStorage takes two arguments, a key and an initial value
// useLocalStorage returns an array with two items
    // the first is the value stored in local storage
    // the second is a function that allows us to update the value stored in local storage

// value is the value stored in local storage
// setValue is a function that allows us to update the value stored in local storage
// initialvalue is the initial value of the value stored in local storage

// setItem is a function that takes a key and a value and stores the value in local storage under the key
// getItem is a function that takes a key and returns the value stored in local storage under the key

// `<T>` in `useLocalStorage<T>` is a type parameter
// T is a generic type that represents the type of the value stored in local storage
// typeof is an operator that returns the type of the operand, T is passed to typeof to get the type of the operand
// *we need to know the type of value stored so that we can parse it correctly when we retrieve it

// jsonValue is the value stored in local storage as a string
// JSON.stringify is a function that takes an object and returns a string representation of the object, value is passed to JSON.stringify to convert it to a string