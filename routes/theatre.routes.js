const theatreController = require("../controllers/theatre.controller")
const theatreMiddlrewares = require("../middlewares/theatre.middlewares")



const routes = (app) => {
    app.post("/mba/api/v1/theatres",
        theatreMiddlrewares.validateTheatreCreateRequest,
        theatreController.createTheatre
    )

    app.delete("/mba/api/v1/theatres/:id",
        theatreController.destroy
    )

    app.get("/mba/api/v1/theatres/:id",
        theatreController.getTheatre
    )

    app.get("/mba/api/v1/theatres",
        theatreController.getTheatres
    )

    app.patch("/mba/api/v1/theatres/:id",
        theatreController.update
    )

    app.put("/mba/api/v1/theatres/:id",
        theatreController.update
    )

    app.patch("/mba/api/v1/theatres/:id/movies",
        theatreMiddlrewares.validateUpdateMovies,
        theatreController.updateMovies
    )
}


module.exports = routes
