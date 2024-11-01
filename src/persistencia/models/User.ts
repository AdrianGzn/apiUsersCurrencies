export class User {
    private id: number;
    private name: string;
    private password: string;
    private currency: string;
    private amount: number;

    constructor(id: number, name: string, password: string, currency: string, amount: number) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.currency = currency;
        this.amount = amount;
    }

}
