import { Shape, Loader, LoadingManager } from '../../../src/Three.js';

export class FontLoader extends Loader<Font> {
    constructor(manager?: LoadingManager);

    parse(json: any): Font;
}

export class Font {
    constructor(jsondata: any);

    /**
     * @default 'Font'
     */
    type: string;

    data: string;

    generateShapes(text: string, size: number): Shape[];
}
