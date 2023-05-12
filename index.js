const express = require('express')
const app = express()
const path = require('path')
const multer  = require('multer')

const port = 3000
  

                                                                        
const storage = multer.diskStorage({ 
    destination : './images'
    ,
    filename: (req,file,cb)=>{
        console.log(file)
        cb(null, file.fieldname + file.originalname)
    }
}) 

const upload= multer({storage : storage})

app.set('view engine', 'ejs')

app.get('/upload', (req, res) => {
    res.render("upload");
});


app.post('/upload', upload.single('image'), (req,res)=> {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }
    
    res.send({ message: 'File uploaded successfully' });  
})



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})