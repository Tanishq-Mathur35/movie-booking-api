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
}


module.exports = routes
