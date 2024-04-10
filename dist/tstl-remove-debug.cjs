'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
// Capture statements from the keyword, to the ending parenthesis
const patternToRemove =
	/((?:print|pprint|assert|(?:debug|profiler)\.\w*)\s*\([^]*?(?:(?:(?:\([^()]*\))|[^()])*)\))/g;
// Variable to capture matches
let matchToRemove;
function removeDebug(file) {
	while ((matchToRemove = patternToRemove.exec(file.code)) !== null) {
		const statement = matchToRemove[0];
		// @ts-expect-error Missing console definition
		console.log(`Removing ${statement}`);
		// Replace statement with an empty line
		file.code = file.code.replace(statement, '');
	}
}
const patternToReplace = /sys\.get_engine_info\(\)\.is_debug/g;
let matchToReplace;
function replaceDebug(file) {
	while ((matchToReplace = patternToReplace.exec(file.code)) !== null) {
		const statement = matchToReplace[0];
		// @ts-expect-error Missing console definition
		console.log(`Removing ${statement}`);
		// Replace statement with false
		file.code = file.code.replace(statement, 'false');
	}
}
/**
 * Plugin definition for TypeScript-to-Lua
 */
const plugin = {
	afterEmit: (_program, _options, emitHost, result) => {
		for (const file of result) {
			// Running only once doesn't find all values
			// so we re-run the function this many times per file
			const maxLoop = 100;
			for (let index = 0; index < maxLoop; index++) {
				removeDebug(file);
			}
			// Replace call to `is_debug` with `false`
			replaceDebug(file);
			// Write the changed code
			emitHost.writeFile(file.outputPath, file.code, false);
		}
	},
};
// Export the plugin for use in TypeScript-to-Lua
exports.default = plugin;
