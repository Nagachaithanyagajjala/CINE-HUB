const express = require('express');
const mongoose = require('mongoose');
const Registeruser = require('./model');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const routes=require('./routes');
const cors = require('cors');
const app = express();
const schedule=require('node-schedule');
const User = require("./model.js");
mongoose.connect("mongodb+srv://hemanth:hemanth@cluster0.pvc0zft.mongodb.net/?retryWrites=true&w=majority").then(
    () => console.log('DB Connection established')
)

app.use(express.json());

app.use(cors({origin:"*"}))

app.use("/api/user",routes)

app.post('/register',async (req, res) =>{
    try{
        const {username,email,password,confirmpassword} = req.body;
        let exist = await Registeruser.findOne({email})
        if(exist){
            return res.status(400).send('User Already Exist')
        }
        if(password !== confirmpassword){
            return res.status(400).send('Passwords are not matching');
        }
        let newUser = new Registeruser({
            username,
            email,
            password,
            confirmpassword
        })
        await newUser.save();
        res.status(200).send('Registered Successfully')

    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
})

app.post('/login',async (req, res) => {
    try{
        const {email,password} = req.body;
        let exist = await Registeruser.findOne({email});
        if(!exist) {
            return res.status(400).send('User Not Found');
        }
        if(exist.password !== password) {
            return res.status(400).send('Invalid credentials');
        }
        let payload={
            user:{
                id: exist.id
            }
        }
        jwt.sign(payload, 'jwtSecret', {expiresIn:3600000},
            (err, token)=>{
                if(err){
                    throw err;
                }
                return res.json({token})
            }  
        )
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.get('/myprofile',middleware,async(req, res)=>{
    try{
        let exist = await Registeruser.findById(req.user.id);
        if(!exist){
            return res.status(400).send('User not found');
        }
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})
// app.post('/rent', async(req,res)=>{
//     schedule.scheduleJob('December 13, 2022 22:46:00',()=>{
//         console.log("job ran");
//         const { email, movie } = req.body;
//         const removeFromLikedMovies=async(email,movie)=>{
//             try {    
//                 console.log("hi")    
//                 const user = await User.findOne({ email });
//                 console.log(user);
//                 if (user) {
//                     console.log("ehe")
//                     const { likedMovies } = user;
//                 //   const movieids=user.likedMoviesids;
//                   const movieIndex = likedMovies.find(({ id }) => id === movie.id);
//                   console.log(movieIndex)
//                 //   const movieIndex1 = movieids.findIndex(movie.id);
//                   if (!movieIndex) {
//                     console.log("eror")
//                     res.status(400).send({ msg: "Movie not found." });
//                   }
//                 //   movies.splice(movieIndex, 1);
//                 //   movieids.splice(movieIndex1,1);
//                   console.log(likedMovies);
//                 //   await User.findByIdAndUpdate(
//                 //     user._id,
//                 //     {
//                 //       likedMovies: movies,
//                 //       likedMoviesids:movieids
//                 //     },
//                 //     { new: true }
//                 //   );
//                   return res.json({ msg: "Movie successfully removed.", movies });
//                 } else return res.json({ msg: "User with given email not found." });
//               } catch (error) {
//                 return res.json({ msg: "Error removing movie to the liked list" });
//               }
//         }
//         removeFromLikedMovies(email,movie);
//     })
// })
app.listen(5000,()=>{
    console.log('Server running...')
})