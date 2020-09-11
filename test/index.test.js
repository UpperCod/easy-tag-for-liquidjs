import test from "ava";
import tag from "../src";
import { Liquid } from "liquidjs";

test("index as string", async (t) => {
    const engine = new Liquid({
        cache: true,
        dynamicPartials: false,
    });

    const data = {
        text: "eee",
    };
    const content = "...";

    engine.registerTag(
        "myTag",
        tag({
            render(context, index) {
                t.is(context, data);
                t.is(index, data.text);
                return content;
            },
        })
    );

    const result = await engine.parseAndRender(
        `{% myTag '${data.text}' %}`,
        data
    );

    t.is(content, result);
});

test("context-based index", async (t) => {
    const engine = new Liquid({
        cache: true,
        dynamicPartials: false,
    });

    const data = {
        text: "eee",
    };
    const content = "...";

    engine.registerTag(
        "myTag",
        tag({
            render(context, index) {
                t.is(context, data);
                t.is(index, data.text);
                return content;
            },
        })
    );

    const result = await engine.parseAndRender(`{% myTag text %}`, data);

    t.is(content, result);
});

test("variables", async (t) => {
    const engine = new Liquid({
        cache: true,
        dynamicPartials: false,
    });

    const data = {
        value: 10,
    };
    const content = "...";

    engine.registerTag(
        "myTag",
        tag({
            render(context, index, value) {
                t.deepEqual(value, { name: 10 });
                return content;
            },
        })
    );

    const result = await engine.parseAndRender(
        `{% myTag text with name:value %}`,
        data
    );

    t.is(content, result);
});

test("set bottom", async (t) => {
    const engine = new Liquid({
        cache: true,
        dynamicPartials: false,
    });

    const data = {
        value: 10,
    };
    const content = "...";

    engine.registerTag(
        "myTag",
        tag({
            render(context, index, value, set) {
                set("content", content);
                return "";
            },
        })
    );

    const result = await engine.parseAndRender(
        `{% myTag text with name:value %}{{content}}`,
        data
    );

    t.is(content, result);
});
