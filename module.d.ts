/**
 * @callback SetVar
 * @param {string} index
 * @param {any} value
 * @returns {void}
 */
/**
 * @callback Render
 * @param {string} index - Name of the index to associate with the execution
 * @param {Object<string,any>} value - value captured by expression as object
 * @param {SetVar} setVar - allows defining a context value for the content lower than the invocation of the tag
 * @returns {Promise<void>|void}
 */
/**
 * Facilita la creacion de tags personalizados para liquid
 * ofreciendo un patron generico de configuracion para estos
 * `myTag {index} with {value}`
 * @param {{render:Render}} tag
 */
export default function createTag(tag: {
    render: Render;
}): {
    parse({ args }: {
        args: any;
    }): void;
    render(scope: any): Promise<any>;
};
export type SetVar = (index: string, value: any) => void;
export type Render = (index: string, value: {
    [x: string]: any;
}, setVar: SetVar) => Promise<void> | void;
