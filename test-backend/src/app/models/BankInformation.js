import uuid from 'uuid/v4'

/**
 * @typedef BankInformation
 * @property {string} name
 * @property {string} swiftCode
 * @property {integer} branchCode
 * @property {string} accountNumber
 * @property {integer} amount
 * @property {string} iban
 * @property {string} typeOfCredit
 * @property {date} issuedDate
 * @property {date} expiryDate
 */

export default (sequelize, DataTypes) => {
  const BankInformation = sequelize.define('bankInformation', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuid()
    },
    name: DataTypes.STRING,
    swiftCode: DataTypes.STRING,
    branchCode: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    iban: DataTypes.STRING,
    typeOfCredit: DataTypes.STRING,
    issuedDate: DataTypes.DATE,
    expiryDate: DataTypes.DATE
  })
  BankInformation.associate = function({ File, User }) {
    BankInformation.hasOne(File, {
      as: 'letterOfCredit',
    })
    BankInformation.belongsTo(User)
  }
  return BankInformation
}
