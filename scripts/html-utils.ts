import { NodeType, parse, type HTMLElement } from 'node-html-parser';



class MaybeHtmlElement {
    private #success: boolean;
    private #value: HTMLElement | string;

    private constructor(success: boolean, value: HTMLElement | string) {
        this.#success = success;
        this.#value = value;
    }

    public get success(): boolean {
        return this.#success;
    }

    public get element(): HTMLElement {
        if (!this.#success) {
            throw new Error("Trying to get element from an Err");
        }

        return this.#value as HTMLElement;
    }

    public get message(): string {
        if (this.#success) {
            throw new Error("Trying to get error message from Ok");
        }

        return this.#value as string;
    }

    public children(): HTMLElement[] {
        return this.#success ? elementChildren(this.element) : [];
    }

    public textOrElse<T>(fallback: T): string | T {
        return this.#success ? this.element.textContent : fallback;
    }

    public attrOrElse<T>(attribute: string, fallback: T): string | T {
        return this.#success ? this.element.attrs[attribute] : fallback;
    }

    public static Ok(value: HTMLElement): MaybeHtmlElement {
        return new MaybeHtmlElement(true, value);
    }

    public static Err(msg: string): MaybeHtmlElement {
        return new MaybeHtmlElement(false, msg);
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