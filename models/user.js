const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      AllowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      AllowNull: false
    },
    password: {
      type: DataTypes.STRING,
      AllowNull: false
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false
    },
    updatedAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false
    }
  });

  User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
  });

  User.prototype.validPassword = async function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
