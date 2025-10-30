"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      spotifyId: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: DataTypes.STRING,
      accessToken: DataTypes.TEXT,
      refreshToken: DataTypes.TEXT,
      expiresIn: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
