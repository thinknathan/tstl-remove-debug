# tstl-remove-debug

TypeScriptToLua plugin that strips calls to `print`, `pprint`, `assert`, and any functions attached to `profiler` and `debug`.

## Example

```ts
print(foo);
pprint(foo);
assert(foo === '');
profiler.start();
debug.draw_text('');
```

Becomes:

```lua

```

## Installation

Requires a modern version of TSTL. Tested on TSTL >= 1.22.0.

1. Install this plugin

```bash
yarn add git+https://git@github.com/thinknathan/tstl-remove-debug.git#^1.0.0 -D
# or
npm install git+https://git@github.com/thinknathan/tstl-remove-debug.git#^1.0.0 --save-dev
```

2. Add `tstl-remove-debug` to `tstl.luaPlugins` in `tsconfig.json`

```diff
{
	"tstl": {
		"luaPlugins": [
+			{ "name": "tstl-remove-debug" }
		],
	}
}
```

## License

CC0
