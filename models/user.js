const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "User",
    {
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
    },
    {
      classMethods: {
        generateHash: user => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        },
        // generateHash(password) {
        //   return bcrypt.hash(password, bcrypt.genSaltSync(8));
        // },
        validPassword: password => {
          return bcrypt.compareSync(password, this.password);
        }
      }
    }
  );

  //   User.beforeCreate(async user => {
  //     user.password = await user.generatePasswordHash();
  //   });

  //   User.prototype.generatePasswordHash = async function() {
  //     const saltRounds = 10;
  //     return await bcrypt.hash(this.password, saltRounds);
  //   };
  return User;
};
