import { Transaction } from "./Transaction";
import { TransactionType } from "../enums/TransactionType";
import { generateId } from "../utils/generateId";

export interface IAccount {
  readonly accountNumber: string;
  readonly ownerName: string;
  deposit(amount: number, description?: string): boolean;
  withdraw(amount: number, description?: string): boolean;
  getBalance(): number;
  getTransactionHistory(): string[];
  getAccountSummary(): string;
}

export abstract class BankAccount implements IAccount {
  public readonly accountNumber: string;
  public readonly ownerName: string;
  protected _balance: number;
  protected transactions: Transaction[];

  constructor(ownerName: string, initialDeposit: number = 0) {
    this.accountNumber = generateId("acct_");
    this.ownerName = ownerName;
    this._balance = 0;
    this.transactions = [];

    if (initialDeposit > 0) {
      this.deposit(initialDeposit, "Initial deposit");
    }
  }

  public deposit(amount: number, description = "Deposit"): boolean {
    if (amount <= 0) return false;
    this._balance += amount;
    this.transactions.push(
      new Transaction(TransactionType.Deposit, amount, description)
    );
    return true;
  }

  public withdraw(amount: number, description = "Withdrawal"): boolean {
    if (amount <= 0 || this._balance < amount) return false;
    this._balance -= amount;
    this.transactions.push(
      new Transaction(TransactionType.Withdraw, amount, description)
    );
    return true;
  }

  public getBalance(): number {
    return this._balance;
  }

  public getTransactionHistory(): string[] {
    return this.transactions.map((txn) => txn.getDetails());
  }

  public abstract getAccountSummary(): string;
}
