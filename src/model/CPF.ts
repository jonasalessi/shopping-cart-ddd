export class CPF {

    digits: string;

    constructor(digits: string) { 
        this.digits = this.requireValidCPF(digits);
    }

    private requireValidCPF(value: string): string {
        const str = this.cleanUp(value);
        this.requireSize(str);
        const nineDigits = str.substring(0, 9); 
        const firstDigit = this.calculateFirstDigit(nineDigits);
        const secondDigit = this.calculateSecondDigit(nineDigits + firstDigit);
        if (nineDigits + firstDigit + secondDigit === str) {
            return str;
        }  
        throw new CpfInvalid(`Cpf ${value} invalid!`)
    }

    private cleanUp(value: string) {
        return value.replace(/([^\d])/mg, '');
    }

    private requireSize(str: string) {
        if (str.length != 11) {
            throw new CpfInvalid('Cpf requires 11 numbers!');
        }
    } 

    private calculateFirstDigit(nineDigits: string): string {
        const firstRest = nineDigits
        .split('')
        .map((val, idx) => Number(val) * (10 - idx))
        .reduce((ac, v) => ac + v, 0) % 11; 
        return (firstRest < 2 ?  0 : 11 - firstRest).toString();
    }

    private calculateSecondDigit(tenDigits: string): string {
        const secondRest = tenDigits
        .split('')
        .map((val, idx) => Number(val) * (11 - idx))
        .reduce((ac, v) => ac + v, 0) % 11;
        return  (secondRest < 2 ?  0 : 11 - secondRest).toString(); 
    }
} 

export class CpfInvalid {
    message: string;
    constructor(message: string) {
        this.message = message
    }
}



