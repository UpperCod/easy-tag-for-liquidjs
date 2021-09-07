'use strict';

var liquidjs = require('liquidjs');

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
function createTag(tag) {
    return {
        parse({ args }) {
            const tokenizer = new liquidjs.Tokenizer(args);

            this.index = tokenizer.readFileName().content;

            tokenizer.skipBlank();

            if (tokenizer.peek() === "=") {
                this.type = "=";
                tokenizer.advance();
                this.expression = tokenizer.remaining();
            } else {
                let withValue = tokenizer.readWord();
                if (withValue && withValue.content == "with") {
                    tokenizer.skipBlank();
                    this.expression = tokenizer.readHashes();
                }
            }
        },
        async render(scope) {
            let { index, expression } = this;
            if (/^("|')/.test(index)) {
                index = index.replace(/^("|')|("|')$/g, "");
            } else {
                index = await this.liquid.evalValue(index, scope);
            }
            const value =
                this.type == "="
                    ? await this.liquid.evalValue(expression, scope)
                    : expression
                    ? await Promise.all(
                          expression.map(async (hash) => {
                              return {
                                  index: hash.name.content,
                                  value: liquidjs.evalToken(hash.value, scope),
                              };
                          })
                      ).then((props) => {
                          const data = {};
                          props.forEach(({ index, value }) => {
                              data[index] = value;
                          });
                          return data;
                      })
                    : {};

            return tag.render.call(
                this,
                scope.environments,
                index,
                value,
                (index, value) => (scope.bottom()[index] = value)
            );
        },
    };
}

module.exports = createTag;
//# sourceMappingURL=module.cjs.map
