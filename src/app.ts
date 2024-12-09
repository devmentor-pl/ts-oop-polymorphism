type OperationSymbol = string;
type OperationOperands = [number, number];

interface Operation {
    readonly symbol: OperationSymbol;
    calculate(operands: OperationOperands): number;
}

class SumOperation implements Operation {
    public readonly symbol = '+';

    calculate(operands: OperationOperands): number {
        return operands.reduce((acc, item) => acc + item);
    }
}

class PowerOperation implements Operation {
    public readonly symbol = '**';

    calculate(operands: OperationOperands): number {
        return operands[0] ** operands[1];
    }
}


class Calculator {
    private operations: Operation[] = [];

    addOperation(operation: Operation) {
        this.operations.push(operation);
    }

    execute(symbol: OperationSymbol, operands: OperationOperands): number | never {
        const operation = this.operations.find(o => o.symbol === symbol);
        if(operation) {
            return operation.calculate(operands);
        }

        throw new Error('Operation not found!');
    }
}

const calc = new Calculator();
calc.addOperation(new PowerOperation());
calc.addOperation(new SumOperation());

console.log(calc.execute('+', [1, 2])); // 3
console.log(calc.execute('**', [2, 3])); // 8
console.log(calc.execute('-', [2, 3])); // throw Error