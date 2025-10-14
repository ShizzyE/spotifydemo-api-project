"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      models.User.hasMany(models.FavoriteTrack)
      // hasMany
    }
  }
  User.init(
    {
      username: { 
        type: DataTypes.STRING,
        allowNull: true, // Optional for spotify users
        unique: {
          msg: "Username already taken."
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true // Optional for spotify users
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email already in use."
        },
        validate: {
          notNull: { msg: "Email is required" },
          isEmail: { msg: "Must be a valid email address" }
        }
      },
      spotifyId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user, options) => {
          if(user.password){
            // bcrypt hash password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async (user, options) => {
          if(user.changed("password")){
            // bcrypt hash password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      }
    }
  );
  return User;
};
