import { prisma } from "../db/db.config.js";

const createMovie = async (req, res) => {
  try {
    const { movieName, movieDesc, movieRuntime, realseDate, createdBy } =
      req.body;
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

export { createMovie };
