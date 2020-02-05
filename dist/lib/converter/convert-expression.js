"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
function convertDefaultValue(node) {
    if (node.initializer) {
        return convertExpression(node.initializer);
    }
    else {
        return undefined;
    }
}
exports.convertDefaultValue = convertDefaultValue;
function convertExpression(expression) {
    switch (expression.kind) {
        case ts.SyntaxKind.StringLiteral:
            return '"' + expression.text + '"';
        case ts.SyntaxKind.NumericLiteral:
            return expression.text;
        case ts.SyntaxKind.TrueKeyword:
            return 'true';
        case ts.SyntaxKind.FalseKeyword:
            return 'false';
        case ts.SyntaxKind.NullKeyword:
            return 'null';
        default:
            return expression.getText(expression.getSourceFile());
    }
}
exports.convertExpression = convertExpression;
//# sourceMappingURL=convert-expression.js.map