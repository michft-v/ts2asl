import * as ts from 'typescript';
import { ConverterOptions } from '../../convert';
import { ParserError } from '../../ParserError';

export const unsupportedStatementTransformer = (converterOptions: ConverterOptions) => <T extends ts.Node>(context: ts.TransformationContext) => (rootNode: T) => {
  function visit(node: ts.Node): ts.Node {
    node = ts.visitEachChild(node, visit, context);
    if (ts.isForInStatement(node)) throw new ParserError(`for ... in statement is not supported (for ... of statement is supported!)`, node);
    if (ts.isForStatement(node)) throw new ParserError(`for statement is not supported (for ... of statement is supported!)`, node);

    return node;
  }
  return ts.visitNode(rootNode, visit);
};
