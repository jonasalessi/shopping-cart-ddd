
export class Cpf {
    private CPF_SIZE = 11;

    private readonly digits: string;

    constructor(digits: string) { 
        if(!this.isValidCPF(digits)) {
            throw new CpfInvalid(`Cpf ${digits} is not a valid!`)
        } 
        this.digits = digits;
    }

    getValue() {
        return this.digits;
    }

    private isValidCPF(value: string): boolean {
        const cpf = this.cleanUp(value);
        if(!this.isValidSize(cpf)) return false;
        const nineDigits = cpf.split('').map(s => Number(s)).slice(0, 9)
        const firstDigit = this.calculateDigit(nineDigits, 10);
        const secondDigit = this.calculateDigit([...nineDigits, firstDigit], 11);
        const cpfRecalculated = [...nineDigits, firstDigit, secondDigit].join('')
        return cpfRecalculated === cpf;
    }

    private cleanUp(value: string) {
        return value.replace(/\D/mg, '');
    }

    private isValidSize(str: string) {
        return str.length == this.CPF_SIZE
    }  

    private calculateDigit(cpfDigits: number[], factor: number): number {
        const secondRest = cpfDigits
        .map((val, idx) => val * (factor - idx))
        .reduce((ac, v) => ac + v, 0) % this.CPF_SIZE;
        return this.calculateRestDigit(secondRest);
    }

    private calculateRestDigit(cpfDigits: number): number {
        return cpfDigits < 2 ?  0 : this.CPF_SIZE - cpfDigits; 
    }
} 

export class CpfInvalid extends Error {
}



