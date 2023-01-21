import responseHandler from "../handlers/response.handler";
import favouriteModel from "../models/favourite.model";

const addFavourtites = async (req, res) => {
  try {
    const isFavourite = await favouriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });

    if (isFavourite) return responseHandler.ok(res, isFavourite);

    const favorite = new favouriteModel({
      ...req.body,
      user: req.user.id,
    });

    await favorite.save();
  } catch {
    responseHandler.error(res);
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { favouriteId } = req.params;

    const favorite = await favouriteModel.findOne({
      user: req.user.id,
      _id: favouriteId,
    });

    if (!favorite) return responseHandler.notFound(res);

    await favorite.remove();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getFavouritesOfUser = async (req, res) => {
  try {
    const favorite = await favouriteModel
      .find({
        user: req.user.id,
      })
      .sort("-createdAt");

    responseHandler.ok(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

export default { addFavourtites, removeFavorite, getFavouritesOfUser };
