const express=require('express');
const router=express.Router();

//como ya se que está capaturando los datos el servidor del formulario, entonces traigo el esquema para almacenar en bd

const Task=require('../models/task');

//ruta principal, el servidor me muestra la info en la pagina principal
router.get('/',async(req,res)=>{//cuando me pidan algo en la ruta principal, responder con lo creado en index.ejs
    const tasks=await Task.find();//para obtener los datos de la base de datos mongo
    //console.log(tasks);
    res.render('index',{
        tasks //para pasar los datos a la vista, a la interface

    });
});

//ruta para adicionar registros, le envío datos al servidor
router.post('/add',async(req,res)=>{//req para solicitar,res para respuesta
    //console.log(new Task(req.body)); esto para mirar que si se está creando el objeto
    //ahora vamos a guardar el objeto que capturamos por formulario en bd:
    const task=new Task(req.body);
    await task.save(); //await y async es para guardar de manera asicrona, cuando se hacen operaciones con base de datos, eliminar, guardar, actualizar, etc
    //res.send("recibido");
    res.redirect('/');//para que cuando guarde me direccione nuevamente a la pagina principal
});

//ruta para eliminar un registro de la bd:
router.get('/delete/:id',async(req,res)=>{

    const {id}=req.params;//id que viene desde el navegador
    await Task.remove({_id:id});
    res.redirect('/');


});

//ruta para cambiar de estado el boton done:
router.get('/btndone/:id', async(req,res)=>{
    const {id}=req.params;
    const tarea=await Task.findById(id);//busco el id en la tabla y me traigo todo el objeto
    tarea.status=!tarea.status;//este estatus es atributo de la tabla que se llama asi
    await tarea.save();// guardo nuevamente el estado del objeto
    res.redirect('/');


});

//ruta para editar un registro:

//este captura la informacion y lo coloca en un formulario
router.get('/editar/:id', async(req, res)=>{
    const {id}=req.params;
    const tarea=await Task.findById(id);
    res.render('editar',{//render es para indexar con un ruta, en este caso con editar.ejs
        tarea//coloqueme este objeto en la plantilla editar

    });

});

//este segundo lo actualiza en la bd

router.post('/editar/:id', async(req,res)=>{
    const {id}=req.params;
    await Task.update({_id:id},req.body);//busque en la tabla y luego actualice
    res.redirect('/');

});



module.exports=router;