export default class Bank {
  id;
  name;
  swiftCode;
  iban;
  branchCode;
  amount;
  accountNumber;
  typeOfCredit;
  letterOfCredit;
  issuedDate;
  expiryDate;

  constructor({id, name, swiftCode, iban, branchCode, amount, accountNumber, typeOfCredit, letterOfCredit, issuedDate, expiryDate} = {}) {
    this.id = id;
    this.name = name;
    this.swiftCode = swiftCode;
    this.iban = iban;
    this.branchCode = branchCode;
    this.amount = amount;
    this.accountNumber = accountNumber;
    this.typeOfCredit = typeOfCredit;
    this.letterOfCredit = letterOfCredit;
    this.issuedDate = issuedDate;
    this.expiryDate = expiryDate;
  }
}
