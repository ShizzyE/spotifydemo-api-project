'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteTrack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.FavoriteTrack.belongsToMany(models.User)
    }
  }
  FavoriteTrack.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    artist_name: DataTypes.STRING,
    artist_id: DataTypes.STRING,
    album_name: DataTypes.STRING,
    album_id: DataTypes.STRING,
    release_date: DataTypes.DATE,
    image_url: DataTypes.STRING,
    spotify_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FavoriteTrack',
  });
  return FavoriteTrack;
};