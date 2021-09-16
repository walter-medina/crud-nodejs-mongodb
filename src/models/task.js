//definiendo cómo va a quedar el esquema de la bd, que campos va a conforma cada tarea, DEFINIR LA TABLA
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//creando el esquema (tabla)
const TaskSchema=new Schema({
    title:String,
    description:String,
    status:{
        type:Boolean,
        default:false
    }    
});

//usando el esquema
module.exports=mongoose.model('task',TaskSchema);