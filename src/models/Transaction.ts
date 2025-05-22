import { TransactionType } from "../enums/TransactionType";
import { generateId } from "../utils/generateId";
export interface ITransaction {
    readonly transactionId: string;
    readonly type: TransactionType;
    readonly amount: number;
    readonly description: string;
    readonly date: Date;
    getDetails(): string;
}
export class Transaction implements ITransaction {
  public readonly transactionId: string;
  public readonly type: TransactionType;
  public readonly amount: number;
  public readonly description: string;
  public readonly date: Date;
  constructor(
    type: TransactionType,
    amount: number,
    description: string,
    date: Date = new Date()
  ) {
    this.transactionId = generateId("txn_");
    this.type = type;
    this.amount = amount;
    this.description = description;
    this.date = date;
  }
  public getDetails(): string {
    const typeStr = this.type ?? "";
    return `${this.date.toISOString().slice(0, 10)} | ${typeStr
      .toString()
      .padEnd(12)} | ${this.description.padEnd(30)} | $${this.amount.toFixed(
      2
    )}`;
  }
}