import { NodeType, parse, type HTMLElement } from 'node-html-parser';

/**
 * Represents a potential HTML element, encapsulating error handling and providing convenient methods for working with HTML elements.
 */
export class MaybeHtmlElement {
    #success: boolean;
    #value: HTMLElement | string;

    /**
    * Creates a new MaybeHtmlElement instance.
    *
    * @param {boolean} success - Indicates whether the element exists.
    * @param {HTMLElement | string} value - The HTML element or error message.
    */
    private constructor(success: boolean, value: HTMLElement | string) {
        this.#success = success;
        this.#value = value;
    }

    /**
     * Indicates whether the element exists.
     *
     * @returns {boolean} True if the element exists, false otherwise.
     */
    public get success(): boolean {
        return this.#success;
    }

    /**
     * Returns the HTML element if it exists, or throws an error if it doesn't.
     *
     * @throws {Error} If the element doesn't exist.
     * @returns {HTMLElement} The HTML element.
     */
    public get element(): HTMLElement {
        if (!this.#success) {
            throw new Error("Trying to get element from an Err");
        }

        return this.#value as HTMLElement;
    }

    /**
     * Returns the error message if the element doesn't exist, or throws an error if it does.
     *
     * @throws {Error} If the element exists.
     * @returns {string} The error message.
     */
    public get message(): string {
        if (this.#success) {
            throw new Error("Trying to get error message from Ok");
        }

        return this.#value as string;
    }

    /**
     * Returns a MaybeHtmlElement representing the first child element, or Err if there are no children.
     *
     * @returns {MaybeHtmlElement} The first child element or Err.
     */
    public get firstChild(): MaybeHtmlElement {
        if (!this.#success) return this;

        const child = firstElementChild(this.element);

        return child ? MaybeHtmlElement.Ok(child) : MaybeHtmlElement.Err("No children");
    }

    /**
     * Returns a MaybeHtmlElement representing the last child element, or Err if there are no children.
     *
     * @returns {MaybeHtmlElement} The last child element or Err.
     */
    public get lastChild(): MaybeHtmlElement {
        if (!this.#success) return this;

        const child = lastElementChild(this.element);

        return child ? MaybeHtmlElement.Ok(child) : MaybeHtmlElement.Err("No children");
    }

    /**
     * Walks through the element tree based on a given direction string.
     *
     * @param {string} directions - A string representing the directions to walk.
     *   - '^': Move up to the parent element.
     *   - '>': Move to the next sibling element.
     *   - '<': Move to the previous sibling element.
     *   - 'v': Move down to the first child element.
     *   - '$': Move down to the last child element.
     * @returns {MaybeHtmlElement} The resulting MaybeHtmlElement.
     */
    public walk(directions: string): MaybeHtmlElement {
        if (!this.#success) return this;

        const result = walk(this.element, directions);

        return result ? MaybeHtmlElement.Ok(result) : MaybeHtmlElement.Err(`Path '${directions}' resulted in nothing`);
    }

    /**
     * Returns an array of child elements if the element exists, or an empty array otherwise.
     *
     * @returns {HTMLElement[]} The child elements.
     */
    public children(): HTMLElement[] {
        return this.#success ? elementChildren(this.element) : [];
    }

    /**
     * Returns the element's text content if it exists, or the fallback value otherwise.
     *
     * @template T
     * @param {T} fallback - The fallback value.
     * @returns {string | T} The text content or fallback value.
     */
    public textOrElse<T>(fallback: T): string | T {
        return this.#success ? this.element.textContent : fallback;
    }

    /**
     * Returns the element's attribute value if it exists, or the fallback value otherwise.
     *
     * @template T
     * @param {string} attribute - The attribute name.
     * @param {T} fallback - The fallback value.
     * @returns {string | T} The attribute value or fallback value.
     */
    public attrOrElse<T>(attribute: string, fallback: T): string | T {
        return this.#success ? this.element.attrs[attribute] : fallback;
    }

    /**
     * Creates a new MaybeHtmlElement with the given HTML element and success set to true.
     *
     * @param {HTMLElement} value - The HTML element.
     * @returns {MaybeHtmlElement} The new MaybeHtmlElement instance.
     */
    public static Ok(value: HTMLElement): MaybeHtmlElement {
        return new MaybeHtmlElement(true, value);
    }

    /**
     * Creates a new MaybeHtmlElement with an error message and success set to false.
     *
     * @param {string} msg - The error message.
     * @returns {MaybeHtmlElement} The new MaybeHtmlElement instance.
     */
    public static Err(msg: string): MaybeHtmlElement {
        return new MaybeHtmlElement(false, msg);
    }

    /**
     * Creates a new MaybeHtmlElement from a HTMLElement setting success if the element is non null.
     *
     * @param {HTMLElement | null} element - The element that may exist.
     * @returns {MaybeHtmlElement} The new MaybeHtmlElement instance.
     */
    public static fromElement(element: HTMLElement | null): MaybeHtmlElement {
        return element ? MaybeHtmlElement.Ok(element) : MaybeHtmlElement.Err("No element provided");
    }
}

/**
 * Fetches the HTML content of a given URL and parses it into an HTMLElement.
 *
 * @async
 * @param {string} url - The URL of the HTML document to fetch.
 * @returns {Promise<HTMLElement>} A Promise that resolves to the parsed HTMLElement.
 */
export async function fetchHtml(url: string): Promise<HTMLElement> {
    const response = await fetch(url);
    return parse(await response.text());
}

/**
 * Downloads an image from a given URL and saves it to a specified file.
 *
 * @async
 * @param {string} url - The URL of the image to download.
 * @param {string} file - The path to the file where the image will be saved.
 * @returns {Promise<void>} A Promise that resolves when the download is complete.
 */
export async function downloadImage(url: string, file: string): Promise<void> {
    const response = await fetch(url);
    await Bun.write(file, await response.arrayBuffer());
}

/**
 * Returns an array of all child elements of a given HTMLElement.
 *
 * @param {HTMLElement} el - The HTMLElement whose child elements to retrieve.
 * @returns {HTMLElement[]} An array of the child elements.
 */
export function elementChildren(el: HTMLElement): HTMLElement[] {
    return el.childNodes
        .filter(c => c.nodeType === NodeType.ELEMENT_NODE);
}

/**
 * Returns the first child element of a given HTMLElement, or null if there are no child elements.
 *
 * @param {HTMLElement} el - The HTMLElement whose first child element to retrieve.
 * @returns {HTMLElement | null} The first child element, or null if none exists.
 */
export function firstElementChild(el: HTMLElement): HTMLElement | null {
    for (const child of el.childNodes) {
        if (child.nodeType === NodeType.ELEMENT_NODE)
            return child as HTMLElement;
    }

    return null;
}

/**
 * Returns the last child element of a given HTMLElement, or null if there are no child elements.
 *
 * @param {HTMLElement} el - The HTMLElement whose last child element to retrieve.
 * @returns {HTMLElement | null} The last child element, or null if none exists.
 */
export function lastElementChild(el: HTMLElement): HTMLElement | null {
    for (let i = el.childNodes.length - 1; i >= 0; i--) {
        if (el.childNodes[i].nodeType === NodeType.ELEMENT_NODE)
            return el.childNodes[i] as HTMLElement;
    }

    return null;
}

/**
 * Walks through an HTML element tree based on a given direction string.
 *
 * @param {HTMLElement} el - The starting HTML element.
 * @param {string} directions - A string representing the directions to walk.
 *   - '^': Move up to the parent element.
 *   - '>': Move to the next sibling element.
 *   - '<': Move to the previous sibling element.
 *   - 'v': Move down to the first child element.
 *   - '$': Move down to the last child element.
 * @returns {HTMLElement | null} The resulting HTML element after walking the directions, or null if the path is invalid.
 */
export function walk(el: HTMLElement, directions: string): HTMLElement | null {
    let aux: HTMLElement | null = el;

    for (const dir of directions) {
        if (aux === null) return null;

        switch (dir) {
            case '^':
                aux = aux.parentNode;
                break;
            case '>':
                aux = aux.nextElementSibling;
                break;
            case '<':
                aux = aux.previousElementSibling;
                break;
            case 'v':
                aux = firstElementChild(aux);
                break;
            case '$':
                aux = lastElementChild(aux);
                break;
        }
    }

    return aux;
}