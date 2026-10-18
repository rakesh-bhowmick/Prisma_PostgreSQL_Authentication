import { prisma } from "../db/db.config.js";

const addToWatchList = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "User not found",
      });
    }

    const { movieId, status, notes } = req.body;

    if (!movieId) {
      return res.status(400).json({
        message: "movieId is required",
      });
    }

    const findingMovie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!findingMovie) {
      return res.status(400).json({
        message: "Movie not found",
      });
    }

    const checkExistingMovie = await prisma.watchListItem.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    });

    if (checkExistingMovie) {
      return res.status(400).json({
        message: "Movie already exist",
      });
    }

    const createWatchList = await prisma.watchListItem.create({
      data: {
        userId,
        movieId,
        status,
        notes,
      },
    });

    return res.status(201).json({
      status: "success",
      data: createWatchList,
      message: "Movie added in watchlist!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const getWatchlistItem = async (req, res) => {
  try {
    const getWatchList = await prisma.watchListItem.findMany();

    if (!getWatchList) {
      return res.status(400).json({
        message: "Watchlist are empty!",
      });
    }

    return res.status(200).json({
      status: "success",
      data: getWatchList,
      message: "Waltch List Fetched successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteSingleWatchlistItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) {
      return res.status(401).json({
        message: "Watchlist ID missing",
      });
    }

    const item = await prisma.watchListItem.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!item) {
      return res.status(401).json({
        message: "Watchlist item not found",
      });
    }

    await prisma.watchListItem.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Watchlist item deleted successfully!",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteAllWatchlistItem = async (req, res) => {
  const userId = req.user.id;

  await prisma.watchListItem.deleteMany({
    where: { userId },
  });

  return res.status(200).json({
    message: "All watchlist items deleted",
  });
};

export {
  addToWatchList,
  getWatchlistItem,
  deleteSingleWatchlistItem,
  deleteAllWatchlistItem,
};
