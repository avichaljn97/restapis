const express= require('express')
const path=require('path')

const fs=require('fs')


const app=express()
const port=5500
app.use(express.json());

initital();
function initital(){
    fs.exists("./emp.json",(exists)=>{
        if(!exists){
            fs.appendFile("./emp.json",'{}',(err)=>{
                if(err) throw err;
                console.log("employee db created.")
            })
        }
    });
}

app.get('/',function(request,response){
    var all;
    fs.readFile("./emp.json",(error,data)=>{
        if(error) throw error;
        all=JSON.parse(data);
        response.json(all);
    })
});

app.get('/:id',function(request,response){
    var all;
    var id=request.params.id;
    fs.readFile("./emp.json",(error,data)=>{
        if(error) throw error;
        all=JSON.parse(data);
        if(all[id]){
            response.json(all[id]);
        }
        else{
            response.send("ID "+id+" does not exists.");
        }
    })
});

app.delete('/:id',function(request,response){
    var all;
    var id=request.params.id;
    fs.readFile("./emp.json",(error,data)=>{
        if(error) throw error;
        all=JSON.parse(data);
        if(all[id]){
            delete all[id];
            fs.writeFile("./emp.json",JSON.stringify(all,null,2),(error)=>{
                if(error)throw error;
                response.send("DELETED.");
            })
        }
        else{
            response.send("ID "+id+" does not exists.");
        }
    })
});

app.post('/',function(request,response){

    var all;
    fs.readFile("emp.json",(error,data)=>{
        if(error) throw error;
        all=JSON.parse(data);
        
        var body=request.body;
        if(all[body.id]){
            response.send("Data with id "+body.id+" already exists.")
            return;
        }
        all[body.id]=body;
        
        fs.writeFile("./emp.json",JSON.stringify(all,null,2),(error)=>{
            if(error)throw error;
            response.send("data written");
        })
    })
});

app.listen(port,function(){
    console.log("Connected to 0.0.0.0:"+port);
});