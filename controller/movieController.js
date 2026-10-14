import { prisma } from "../db/db.config.js";

const createMovie = async (req, res) => {
  try {
    const { movieName, movieDesc, movieRuntime, realseDate } = req.body;

    const createdBy = req.user.id;

    const existingMovie = await prisma.movie.findUnique({
      where: {
        movieName,
      },
    });

    if (existingMovie) {
      return res.status(404).json({
        status: "error",
        message: "Movie already exists",
      });
    }

    const movie = await prisma.movie.create({
      data: { movieName, movieDesc, movieRuntime, realseDate, createdBy },
    });

    return res.status(200).json({
      status: "success",
      data: movie,
      message: "Movie has been created!",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const getMovie = async (req, res) => {
  try {
    const movie = await prisma.movie.findMany();

    res.status(200).json({
      status: "Success",
      data: movie,
      message: "Movie fetched successfully!",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};

const getSingleMovie = async (req, res) => {
  try {
    const id = req.params;

    const movie = await prisma.movie.findUnique({
      where: id,
    });

    if (!movie) {
      return res.status(400).json({
        status: "error",
        message: "Movie not found",
      });
    }

    return res.status(200).json({
      status: "sucess",
      data: movie,
      message: "Movie fetched by ID",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const deleteSingleMovie = async (req, res) => {
  try {
    const id = req.params;

    const movie = await prisma.movie.findUnique({
      where: id,
    });

    if (!movie) {
      return res.status(400).json({
        status: "error",
        message: "Movie not found!",
      });
    }

    const deleteMovie = await prisma.movie.delete({
      where: id,
    });

    return res.status(200).json({
      status: "success",
      data: deleteMovie,
      message: "Movie successfully deleted!",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Internal Server error",
    });
  }
};

export { createMovie, getMovie, getSingleMovie, deleteSingleMovie };
