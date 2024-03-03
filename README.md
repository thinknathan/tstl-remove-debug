# tstl-remove-debug

[![CI](https://github.com/thinknathan/tstl-remove-debug/actions/workflows/ci.yml/badge.svg)](https://github.com/thinknathan/tstl-remove-debug/actions/workflows/ci.yml) ![GitHub License](https://img.shields.io/github/license/thinknathan/tstl-remove-debug)

TypeScriptToLua plugin that strips calls to `print`, `pprint`, `assert`, and any functions attached to `profiler` and `debug`. The purpose is to reduce code size for production builds.

:exclamation: Use this and any code transformation plugin with caution. Mistakes are possible.

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

(This space intentionally left blank)

## Installation

Requires TSTL >= 1.22.0.

1. Install this plugin

```bash
yarn add tstl-remove-debug -D
# or
npm install tstl-remove-debug --save-dev
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
