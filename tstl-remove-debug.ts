import * as ts from 'typescript';
import * as tstl from 'typescript-to-lua';

const plugin: tstl.Plugin = {
	visitors: {
		[ts.SyntaxKind.CallExpression]: (node, context) => {
			const expression = node.expression.getText();

			// Check if the expression is one of the specified functions
			const isSpecialFunction =
				expression === 'print' ||
				expression === 'pprint' ||
				expression === 'assert' ||
				expression.startsWith('debug.') ||
				expression.startsWith('profiler.');

			if (isSpecialFunction) {
				return tstl.createNilLiteral();
			}

			// Preserve other function calls
			return tstl.createCallExpression(
				tstl.createIdentifier(expression),
				node.arguments.map((arg) => context.transformExpression(arg)),
			);
		},
	},
};

export default plugin;
