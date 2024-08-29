import { NodeType, parse, type HTMLElement } from 'node-html-parser';

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
export function children(element: HTMLElement): HTMLElement[] {
    return element.childNodes
        .filter(c => c.nodeType === NodeType.ELEMENT_NODE) as HTMLElement[];
}

/**
 * Finds the first child element of a given HTML element.
 *
 * @param element The HTML element to search.
 * @returns A `Result` object containing the first child element as a success or an error message if no child element is found.
 */
export function firstChild(element: HTMLElement): Result<HTMLElement, string> {
    for (const child of element.childNodes) {
        if (child.nodeType === NodeType.ELEMENT_NODE)
            return Result.Ok(child as HTMLElement);
    }

    return Result.Err("element has no HTMLElement child");
}

/**
 * Finds the last child element of a given HTML element.
 *
 * @param element The HTML element to search.
 * @returns A `Result` object containing the last child element as a success or an error message if no child element is found.
 */
export function lastChild(element: HTMLElement): Result<HTMLElement, string> {
    for (let i = element.childNodes.length - 1; i >= 0; i--) {
        if (element.childNodes[i].nodeType === NodeType.ELEMENT_NODE)
            return Result.Ok(element.childNodes[i] as HTMLElement);
    }

    return Result.Err("element has no HTMLElement child");
}

/**
 * Defines a function that navigates an HTML element tree based on a given direction string.
 *
 * The direction string can contain the following characters:
 *  - `^`: Move to the parent element.
 *  - `>`: Move to the next sibling element.
 *  - `<`: Move to the previous sibling element.
 *  - `v`: Move to the first child element.
 *  - `$`: Move to the last child element.
 *
 * This function is a `FailingMapper` because it can potentially fail due to missing elements
 * in the navigation path specified by the direction string.
 *
 * @param directions A string containing navigation directions.
 * @returns A function that takes an HTML element and returns a `Result` object.
 *  - The success value is the HTML element reached after navigation.
 *  - The error value is a message indicating the missing element along the path.
 */
export function walk(directions: string): FailingMapper<HTMLElement, HTMLElement, string> {
    return ((el: HTMLElement): Result<HTMLElement, string> => {
        let aux: Result<HTMLElement, string> = Result.Ok(el);

        for (let i = 0; i < directions.length; i++) {
            const dir = directions.charAt(i);

            if (aux.isErr)
                break;

            switch (dir) {
                case '^':
                    aux = aux.map(e => e.parentNode);
                    break;
                case '>':
                    aux = aux.flatMap(e => Result.FromNullish(
                        e.nextElementSibling,
                        `missing next sibling at path '${i === 0 ? 'root' : directions.substring(0, i)}'`
                    ));
                    break;
                case '<':
                    aux = aux.flatMap(e => Result.FromNullish(
                        e.previousElementSibling,
                        `missing previous sibling at path '${i === 0 ? 'root' : directions.substring(0, i)}'`
                    ));
                    break;
                case 'v':
                    aux = aux.flatMap(e => firstChild(e)
                        .mapErr(() => `missing child at path '${i === 0 ? 'root' : directions.substring(0, i)}'`)
                    );
                    break;
                case '$':
                    aux = aux.flatMap(e => lastChild(e)
                        .mapErr(() => `missing child at path '${i === 0 ? 'root' : directions.substring(0, i)}'`)
                    );
                    break;
            }
        }

        return aux;
    });
}