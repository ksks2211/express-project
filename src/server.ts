import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import path from 'path';
import createError, { HttpError } from 'http-errors'
import indexRouter from './routes'

// create app
const app = express();

app.listen()

/**
 * middleware
 */


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
if (process.env.NODE_ENV === 'production'){
  app.use(morgan('combined'))
}

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));



app.use('/',indexRouter)


app.use(function(req:Request,res:Response,next:NextFunction){
  next(createError(404))
})

app.use(function(err:HttpError, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err?.status || 500);
  res.render('error');
});


export default app;
