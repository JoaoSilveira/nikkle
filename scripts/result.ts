/**
 * Represents either a value or a getter function that returns a value.
 *
 * @template T The type of the value or the return type of the getter function.
 */
export type ValueOrGetter<T> = T | (() => T);

/**
 * Represents a mapping function that transforms a value of one type into a value of another type.
 *
 * @template T The input type.
 * @template U The output type.
 */
export type Mapper<T, U> = (value: T) => U;

/**
 * Represents a mapping function that may fail, returning a `Result` object with either the transformed value or an error.
 *
 * @template T The input type.
 * @template U The output type.
 * @template E The error type.
 */
export type FailingMapper<T, U, E> = (value: T) => Result<U, E>;

/**
 * Checks if a given value is a getter function.
 *
 * @template T The type of the value or getter function.
 * @param valueOrGetter The value or getter function to check.
 * @returns `true` if the value is a getter function, `false` otherwise.
 */
function isGetter<T>(valueOrGetter: ValueOrGetter<T>): valueOrGetter is () => T {
    return typeof valueOrGetter === 'function';
}

/**
 * Gets the value from a `ValueOrGetter`. If it's a getter function, it calls it.
 *
 * @template T The type of the value or getter function.
 * @param valueOrGetter The value or getter function.
 * @returns The value.
 */
function getValue<T>(valueOrGetter: ValueOrGetter<T>): T {
    if (isGetter(valueOrGetter)) {
        return valueOrGetter();
    } else {
        return valueOrGetter;
    }
}

/**
 * Represents a result of an operation that may succeed or fail.
 *
 * @template Value The type of the successful value.
 * @template Err The type of the error.
 */
export class Result<Value, Err> {
    readonly #success: boolean;
    readonly #value: Value | Err;

    private constructor(success: boolean, value: Value | Err) {
        this.#success = success;
        this.#value = value;
    }

    /**
     * Checks if the result is successful.
     *
     * @returns `true` if the result is successful, `false` otherwise.
     */
    public get isOk(): boolean {
        return this.#success;
    }

    /**
     * Checks if the result is a failure.
     *
     * @returns `true` if the result is a failure, `false` otherwise.
     */
    public get isErr(): boolean {
        return !this.#success;
    }

    /**
     * Unwraps the result, returning the successful value.
     *
     * Throws an error if the result is a failure.
     *
     * @returns The successful value.
     */
    public unwrap(): Value {
        if (this.isErr) throw Error('calling unwrap on Err');

        return this.#value as Value;
    }

    /**
     * Unwraps the result, returning the error.
     *
     * Throws an error if the result is a success.
     *
     * @returns The error.
     */
    public unwrapErr(): Err {
        if (this.isOk) throw Error('calling unwrapErr on Ok');

        return this.#value as Err;
    }

    /**
     * Returns the successful value if the result is a success, otherwise returns the fallback value.
     *
     * @param fallback The fallback value or getter function.
     * @returns The successful value or the fallback value.
     */
    public orDefault(fallback: ValueOrGetter<Value>): Value {
        if (this.#success) {
            return this.#value as Value;
        }

        return getValue(fallback);
    }

    /**
     * Maps the successful value of the result to a new value.
     *
     * @template NewValue The type of the new value.
     * @param mapper The mapping function.
     * @returns A new `Result` object with the mapped value or the original error.
     */
    public map<NewValue>(mapper: Mapper<Value, NewValue>): Result<NewValue, Err> {
        if (this.#success) {
            return Result.Ok(mapper(this.#value as Value)) as Result<NewValue, Err>;
        }

        return this as unknown as Result<NewValue, Err>;
    }


    /**
     * Maps the successful value of the result to a new value, potentially returning a `Result` object with a new error.
     *
     * @template NewValue The type of the new value.
     * @param mapper The mapping function.
     * @returns A new `Result` object with the mapped value or the new error.
     */
    public flatMap<NewValue>(mapper: FailingMapper<Value, NewValue, Err>): Result<NewValue, Err> {
        if (this.#success) {
            return mapper(this.#value as Value);
        }

        return this as unknown as Result<NewValue, Err>;
    }

    /**
     * Maps the error value of the result to a new error.
     *
     * @template NewErr The type of the new error.
     * @param mapper The mapping function.
     * @returns A new `Result` object with the original value or the mapped error.
     */
    public mapErr<NewErr>(mapper: Mapper<Err, NewErr>): Result<Value, NewErr> {
        if (this.#success) {
            return this as unknown as Result<Value, NewErr>;
        }

        return Result.Err(mapper(this.#value as Err)) as Result<Value, NewErr>;
    }

    /**
     * Creates a successful `Result` object.
     *
     * @template T The type of the value.
     * @param value The value.
     * @returns A new successful `Result` object.
     */
    public static Ok<T>(value: T): Result<T, never> {
        return new Result<T, never>(true, value);
    }

    /**
     * Creates a failed `Result` object.
     *
     * @template E The type of the error.
     * @param error The error.
     * @returns A new failed `Result` object.
     */
    public static Err<E>(error: E): Result<never, E> {
        return new Result<never, E>(false, error);
    }

    /**
     * Creates a `Result` object from a nullable or undefined value.
     *
     * @template V The type of the value.
     * @param value The value.
     * @param err The error if the value is null or undefined.
     * @returns A `Result` object.
     */
    public static FromNullish<V, E>(value: V | null | undefined, err: ValueOrGetter<E>): Result<V, E> {
        if (value == null) {
            return Result.Err(getValue(err)) as Result<V, E>;
        }

        return Result.Ok(value) as Result<V, E>;
    }
}

/**
 * Extracts the successful values from an object containing `Result` values.
 *
 * @template T The type of the object.
 */
export type OkObject<T> = {
    [k in keyof T]: T[k] extends Result<infer U, any> ? U : T[k];
};

/**
 * Extracts the error values from an object containing `Result` values.
 *
 * @template T The type of the object.
 */
export type ErrObject<T> = {
    [k in keyof T as T[k] extends Result<any, any> ? k : never]?: T[k] extends Result<any, infer U> ? U : never;
};

/**
 * Checks if an object is empty.
 *
 * @template T The type of the object.
 * @param obj The object to check.
 * @returns `true` if the object is empty, `false` otherwise.
 */
export function isEmpty<T extends Record<string, any>>(obj: T): boolean {
    for (const key in obj) {
        if (Object.hasOwn(obj, key))
            return false;
    }

    return true;
}

/**
 * Creates a `Result` object from an object containing `Result` values.
 *
 * @template T The type of the object.
 * @param obj The object to process.
 * @returns A `Result` object containing the successful values or an error object.
 */
export function makeObj<T extends Record<string, any>>(obj: T): Result<OkObject<T>, ErrObject<T>> {
    const ok: Record<string, any> = {};
    const err: Record<string, any> = {};

    for (const key of Object.keys(obj)) {
        if (obj[key] instanceof Result) {
            if (obj[key].isOk) {
                ok[key] = obj[key].unwrap();
            } else {
                err[key] = obj[key].unwrapErr();
            }
        } else {
            ok[key] = obj[key];
        }
    }

    if (isEmpty(err)) {
        return Result.Ok(ok as OkObject<T>);
    }

    return Result.Err(err as ErrObject<T>);
}
