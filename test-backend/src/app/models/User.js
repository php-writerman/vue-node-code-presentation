import uuid from 'uuid/v4'

/**
 * @typedef User
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 */

export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuid()
    },
    firstName: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      unique: true,
      allowNull: false,
    },
    password: DataTypes.STRING(255)
  })

  User.associate = ({ BankInformation, UserSession }) => {
    User.hasMany(BankInformation)
    User.hasMany(UserSession)
  }

  return User
}
