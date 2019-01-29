/**
 * @typedef UserSession
 * @property {integer} id
 * @property {string} deviceId
 * @property {string} id
 */
export default (sequelize, DataTypes) => {
  const UserSession = sequelize.define('userSession', {
    accessToken: DataTypes.STRING
  })

  UserSession.associate = ({ User }) => {
    UserSession.belongsTo(User)
  }

  return UserSession
}
