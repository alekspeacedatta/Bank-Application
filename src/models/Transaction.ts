import { generateId } from "../utils/generateId";
import { TransactionType } from "../data/customers";
export class Transaction{
    public readonly transactionId: string;
    public type: TransactionType;
    public amount: number;
    public description: string;
    public date: Date;
    constructor(type: TransactionType, amount: number, description: string = "No Description"){
        this.type = type;
        this.amount = amount;
        this.description = description;
        this.date = new Date();
        this.transactionId = generateId("txn_");
    }
    getDetails() {
        return `${this.date.toISOString().slice(0,10)} | ${this.type} | ${this.description} | $${this.amount.toFixed(2)}`;
    }
}