import { BankAccount } from "./BankAccount";
import { Transaction } from "./Transaction";
import { TransactionType } from "../enums/TransactionType";

export class SavingsAccount extends BankAccount {
  public readonly accountType = "Savings";
  private interestRate: number;

  constructor(ownerName: string, initialDeposit = 0, interestRate = 0.01) {
    super(ownerName, initialDeposit);
    this.interestRate = interestRate;
  }

  public applyInterest(): boolean {
    const interestAmount = this._balance * this.interestRate;
    if (interestAmount > 0) {
      this._balance += interestAmount;
      this.transactions.push(
        new Transaction(
          TransactionType.Interest,
          interestAmount,
          `Annual interest @ ${(this.interestRate * 100).toFixed(2)}%`
        )
      );
      return true;
    }
    return false;
  }

  public getAccountSummary(): string {
    return `Savings Account #: ${this.accountNumber}, Owner: ${
      this.ownerName
    }, Balance: $${this._balance.toFixed(2)}, Interest Rate: ${(
      this.interestRate * 100
    ).toFixed(2)}%`;
  }
}
