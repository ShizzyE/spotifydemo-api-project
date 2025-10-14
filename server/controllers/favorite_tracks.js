const { FavoriteTrack } = require("../models/favoritetrack");

const index = async (req, res) => {
  try {
    const favorites = await FavoriteTrack.findAll();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ msg: console.error() });
  }
};

const create = async (req, res) => {
    try {
    
  } catch (error) {
    res.status(400).json({ msg: console.error() });
  }
};

const remove = async (req, res) => {
  const favorite = await FavoriteTrack.findByPk();
  favorite.destroy;
};

module.exports = {
  index,
  create,
  remove,
};
