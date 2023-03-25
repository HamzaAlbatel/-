import express from 'express';
const router =express.Router();
import mongoose from 'mongoose';
//import genre from '../models/genre.js';


//modles
import genre from '../models/genre.js';

router.get('/',async(req,res) => {
    return res.status(200).json({
        message:`the API server is working amazing`
    });
})



// CRUD -> BY ID
router.get('/getgenrebyId', async(req,res) => {
    //==where
    genre.findById({})
    
    .then(results => {
     return res.status(200).json({
         message: results
     })
    })
    .catch(error => {
     return res.status(500).json({
         message: error.message
     })
    })
})

// CRUD -> BY VALUE
router.get('/getgenrebyvalue', async(req,res) => {
    //==where
    genre.find({isActive:true, genreName: 'Hamza'})
    
    .then(results => {
     return res.status(200).json({
         message: results
     })
    })
    .catch(error => {
     return res.status(500).json({
         message: error.message
     })
    })
})




// CRUD -> READ ALL
router.get('/getAllGenres', async(req,res) => {
    //option 1
    //const all_genres= await genre .find();
    //return res.status(200).json({
     //   all_genres: all_genres
   // })
   genre.find()
   .then(results => {
    return res.status(200).json({
        message: results
    })
   })
   .catch(error => {
    return res.status(500).json({
        message: error.message
    })
   })

})

// CRUD -> CREATE NEW
router.post('/addNewGenre', async(req,res) =>{
    const {genreName,genreOrder} = req.body;//get from postman
    const id = new mongoose.Types.ObjectId(); //create opbject to save id
    const _genre = new genre({
        _id: id,
        genreName: genreName,
        genreOrder: genreOrder

    })
    _genre.save()
    .then(result =>{
        return res.status(200).json({
            message: result
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        });
    })

})

// CRUD ->  UPDATE
router.put('/updateGenre', async(req,res) => {
    const {id, genreName, genreOrder,isActive} =req.body;
    const geenre = await genre.findById(id)
    try {
        if(geenre)
        {
            geenre.genreName = genreName;
            geenre.genreOrder = genreOrder;
            geenre.isActive = isActive;
            geenre.save()
            .then( genre_updated=>{
                return res.status(200).json({
                    message: genre_updated
                })
            })
            .catch(error =>{
                return res.status(500).json({
                    message : error.message
                })
            })

        }
        else
        {
            return res.status(500).json({
                message: "genre not found"
            })

        }

        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

})



// CRUD ->  DELETE
router.delete('/deleteGenre/:id', async(req,res) => {

    const genreid = req.params.id;
    genre.findByIdAndDelete(genreid)
    .then(genre_deleted =>{
        return res.status(200).json({
        message: genre_deleted
         })

    })
    .catch(eror => {
        return res.status(500).json({
            message: eror.message
        });
    })

})




export default router;