const theatreController = require("../controllers/theatre.controller")
const theatreMiddlrewares = require("../middlewares/theatre.middlewares")



const routes = (app) => {
    app.post("/mba/api/v1/theatres",
        theatreMiddlrewares.validateTheatreCreateRequest,
        theatreController.createTheatre
    )
}


module.exports = routes
