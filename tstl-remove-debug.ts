import * as ts from 'typescript';
import * as tstl from 'typescript-to-lua';

// Capture statements from the keyword, to the ending parenthesis
const patternToRemove =
	/((?:print|pprint|assert|(?:debug|profiler)\.\w*)\s*\([^]*?(?:(?:(?:\([^()]*\))|[^()])*)\))/g;
// Variable to capture matches
let matchToRemove: RegExpExecArray | null;
function removeDebug(file: tstl.EmitFile) {
	while ((matchToRemove = patternToRemove.exec(file.code)) !== null) {
		const statement = matchToRemove[0];
		console.log(`Removing ${statement}`);
		// Replace statement with an empty line
		file.code = file.code.replace(statement, '');
	}
}

const patternToReplace = /sys\.get_engine_info\(\)\.is_debug/g;
let matchToReplace: RegExpExecArray | null;
function replaceDebug(file: tstl.EmitFile) {
	while ((matchToReplace = patternToReplace.exec(file.code)) !== null) {
		const statement = matchToReplace[0];
		console.log(`Removing ${statement}`);
		// Replace statement with false
		file.code = file.code.replace(statement, 'false');
	}
}

/**
 * Plugin definition for TypeScript-to-Lua
 */
const plugin: tstl.Plugin = {
	afterEmit: (
		_program: ts.Program,
		_options: tstl.CompilerOptions,
		emitHost: tstl.EmitHost,
		result: tstl.EmitFile[],
	) => {
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
export default plugin;
