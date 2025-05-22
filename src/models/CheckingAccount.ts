import { BankAccount } from "./BankAccount";

export class CheckingAccount extends BankAccount {
  public readonly accountType = "Checking";
  private overdraftLimit: number;

  constructor(ownerName: string, initialDeposit = 0, overdraftLimit = 100) {
    super(ownerName, initialDeposit);
    this.overdraftLimit = overdraftLimit;
  }

  public override withdraw(
    amount: number,
    description = "Withdrawal"
  ): boolean {
    if (amount <= 0 || this._balance + this.overdraftLimit < amount)
      return false;
    this._balance -= amount;
    this.transactions.push(
      new (require("./Transaction").Transaction)(
        require("../enums/TransactionType").TransactionType.Withdrawal,
        amount,
        description
      )
    );
    return true;
  }

  public getAccountSummary(): string {
    return `Checking Account #: ${this.accountNumber}, Owner: ${
      this.ownerName
    }, Balance: $${this._balance.toFixed(
      2
    )}, Overdraft Limit: $${this.overdraftLimit.toFixed(2)}`;
  }
}
