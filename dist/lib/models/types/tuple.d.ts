import { Type } from './abstract';
export declare class TupleType extends Type {
    elements: Type[];
    readonly type = "tuple";
    constructor(elements: Type[]);
    clone(): Type;
    equals(type: TupleType): boolean;
    toString(): string;
}
