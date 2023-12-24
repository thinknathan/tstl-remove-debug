import * as ts from 'typescript';
import * as tstl from 'typescript-to-lua';

// Capture statements from the keyword, to the ending parenthesis
const pattern =
	/((?:print|pprint|assert|(?:debug|profiler)\.\w*)\s*\([^]*?(?:(?:(?:\([^()]*\))|[^()])*)\))/g;
// Variable to capture matches
let match: RegExpExecArray | null;
// Running only once doesn't find all values
// so we re-run the function this many times per file
const maxLoop = 100;

function removeDebug(file: tstl.EmitFile) {
	while ((match = pattern.exec(file.code)) !== null) {
		const statement = match[0];
		// @ts-expect-error Missing console definition
		console.log(`Removing ${statement}`);
		// Replace statement with an empty line
		file.code = file.code.replace(statement, '');
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
			for (let index = 0; index < maxLoop; index++) {
				removeDebug(file);
			}
			// Write the changed code
			emitHost.writeFile(file.outputPath, file.code, false);
		}
	},
};

// Export the plugin for use in TypeScript-to-Lua
export default plugin;
