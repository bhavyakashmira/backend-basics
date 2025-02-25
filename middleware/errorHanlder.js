const { constants } = require("../constant");

constants
const errorHandler = (err, req, res, next) => {

    const statuscode = res.statuscode ? res.statuscode : 500;

    switch (statuscode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation error", message: err.message, stackTrace: err.stack });
            break
        case constants.NOT_FOUND:
            res.json({ title: "Not found", message: err.message, stackTrace: err.stack });
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "UNAUTHORIZED", message: err.message, stackTrace: err.stack });
            break;
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
            break;
        default:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
            break;




    }


    
};

module.exports = errorHandler