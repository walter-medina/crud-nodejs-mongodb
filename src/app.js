//ESTE ARCHIVO ES EL SERVIDOR DE NODEJS: video de ejemplo https://www.youtube.com/watch?v=3J925fRl_UE
//entro a la terminal de visual y estando dentro del proyecto ejectuo npm rurn dev  para ejecutar el el servidor de node

//estas lineas solo sirven para llamar el framework express e importar otras  librerias
const path=require('path');//importando path para las rutas de las carpetas
const morgan=require('morgan');//importando  morgan para poder usarlo en los middlewares
const express=require('express');
const mongoose=require('mongoose');//Mongoose es una librería para Node. js que nos permite escribir consultas para una base de datos de MongooDB
const app=express();

//conectando a la base de datos.
mongoose.connect('mongodb://localhost/crud-mongo')
.then(db=>console.log('Base de Datos conectada!!'))
.catch(err=>console.log(err));


//importando rutas:
const indexRoutes=require('./routes/index');//estoy llamando al archivo index donde está el enrutador


//configuraciones
app.set('port',process.env.PORT || 4000);//creo esto para que me tome el puerto del sistema, en caso contrario tome el 3000
app.set('views',path.join(__dirname,'views'));//para indicar en dónde esta alojado la carpeta views,el segundo views es la carpeta
app.set('view engine','ejs');//motor de plantilla para usar en html, express ya lo reconoce , no se importa, view engine:motor de plantilla ejs es javascript embedido


//middlewares:es una funcion que se ejecuta antes de llegar a las rutas,permite tomar deciciones sobre ir o no a una ruta por ejemplo
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));//permite poder entender los datos que me envía el usuario, ejemplo un formulario extend:false, para indicarle que solo envie texto

//routes
app.use('/',indexRoutes);// / ruta inicial de mi aplicacion

//para escuchar en el puerto:
app.listen(app.get('port'),()=>{
    console.log(`Corriendo en el puerto ${app.get('port')}`);

});

