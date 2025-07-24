const User = require("./model.js");

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.likedMovies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};
module.exports.isLiked=async(req,res)=>{
  try{
    const {email,movie}=req.body;
    const user = await await User.findOne({ email });
    if(user){
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if(movieAlreadyLiked){
        return res.json({flag:true});
      }else{
        return res.json({flag:false});
      }
    }
  }
  catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" });
  }
}
module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
            likedMoviesids: [...user.likedMoviesids, data.id]
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list." });
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ msg: "Movie successfully added to liked list." });
  } catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    console.log("ellehe")
    const { email, movieId } = req.body;
    // console.log(email)
    // console.log(movieId)
    const user = await User.findOne({ email });
    if (user) {
      const a = user.rented;
      const b=user.rentedids;
      // console.log(a)
      // console.log(b)
      const movieIndex = a.findIndex(({ id }) => id === movieId);
      console.log("check 1")
      console.log(movieIndex)
      let movieIndex1=-1;
      for(var i = 0; i < b.length; i++) {
        console.log("check 2")
        if(b[i] === movieId) {
          console.log("check 3")
            movieIndex1=i;
            console.log("check 4")
            break;
        }
    } 
      console.log("hi")
      console.log(movieIndex)
      console.log(movieIndex1)
      if (!movieIndex) {
        res.status(400).send({ msg: "Movie not found." });
      }
      a.splice(movieIndex, 1);
      b.splice(movieIndex1,1);
      console.log("check 5")
      await User.findByIdAndUpdate(
        user._id,
        {
          rented: a,
          rentedids: b
        },
        { new: true }
      );
      console.log("check 6")
    } else console.log("check 8");
  } catch (error) {
    // return res.json({ msg: "Error removing movie to the liked list" });
    console.log("error")
  }
};
module.exports.addToRent = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await await User.findOne({ email });
    if (user) {
      const { rented } = user;
      const movieAlreadyLiked = rented.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            rented: [...user.rented, data],
            rentedids: [...user.rentedids, data.id]
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list." });
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ msg: "Movie successfully added to liked list." });
  } catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" });
  }
};