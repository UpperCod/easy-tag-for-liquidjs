# easy-tag-for-liquidjs

[Liquidjs](https://liquidjs.com/) is an amazing engine, but creating a tag can be challenging, this script speeds up this process by giving a simple interface for tag creation, example.

```liquid
{% myTag "index" with any:"value" %}
```

```js
import tag from "easy-tag-for-liquidjs";

engine.registerTag(
    "myTag",
    tag({
        render(context, index, value, set) {},
    })
);
```

Where :

1. `context` : Root data
2. `index`: first parameter given to tag
3. `value` : second parameter declared after `with` or`=`.
4. `set`: Callback to define values to the context below the tag.

## Todo

1. [ ] Add support for content capture inside the block.
