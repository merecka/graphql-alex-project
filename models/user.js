module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      AllowNull: false
    },
    password: {
      type: DataTypes.STRING,
      AllowNull: false
    }
  });
  return User;
};
