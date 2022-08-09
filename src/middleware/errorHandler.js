import DBError from "../errors/dberror.js"

const errorHandler = (error, req, res, next) => {     
    console.log('entrou 1 linha')
    if (error instanceof DBError) {
        console.log(`entrou no handler e no error ${DBError}`)
        return res
            .status(400)
            .send('Bad request')
    }else if (error) {
        console.log('entrou no next do errorhandler')
        return next(error);
    }else {
        console.log('entrou no next do next errorhandler')
       return next();
    };

}

export default errorHandler;