const User=require("../models/user");
const Post=require("../models/post");
const bcrypt = require("bcrypt");
const {setUser} = require("../services/auth");

async function handleCreateNewUser(req,res){
     const body=req.body;
        if(                                      
            !body || 
            !body.name ||                                  
            !body.email ||
            !body.passward
        ){
            return res.status(400).json({msg: "All fields are required."});    
        }

        //  hash password
         const hashedPassword = await bcrypt.hash(body.passward,10);

       const result= await User.create({      //Inserting input data in database and storing it in variable result
            name: body.name,
            email: body.email,
            passward: hashedPassword,

        })

       
        res.redirect("/login"); 
}



async function handleHome(req,res){
            const userId = req.user._id;

    // get only this user's notes
    const notes = await Post.find({ userId }).sort({ createdAt: -1 });

        res.render("home", {
        user: req.user,
        notes: notes
    });
}

async function handleRegistration(req,res){
            res.render("form");
}

async function handleLoginOpen(req,res){
            res.render("login");
}

async function handleNote(req,res){
            res.render("note",{ user: req.user });
}

async function  handleLogin(req,res){
            const {email,passward} = req.body;
            const user = await User.findOne({email});

            if(!user){
                return res.render("login",{ error:"Invalid email or passward"});
                
            }

              // ⭐ compare password
    const isMatch = await bcrypt.compare(passward,user.passward);

    if(!isMatch){
        return res.render("login",{ error:"Invalid email or password"});
    }
            
            const token = setUser(user);
            res.cookie("uid",token);
            return res.redirect("/home");
}

async function handlePost(req,res){
  const {title,content}=req.body;

  const result= await Post.create({      //Inserting input data in database and storing it in variable result
          title,
          content,
          userId: req.user._id 
        })

        res.redirect("/home");

}


async function handleLogout(req,res){

    // remove cookie
    res.clearCookie("uid");

    // redirect to login page
    return res.redirect("/login");
}

async function handleDelete(req,res){
        await Post.findByIdAndDelete(req.params.id);
        return res.redirect("/home");
}

async function handleEdit(req,res){
        const user = req.user;
        const post = await Post.findById(req.params.id);
        return res.render("edit", { post,user});
     
}

async function handleUpdate(req,res){
       const {title,content}=req.body;
       await Post.findOneAndUpdate({_id : req.params.id},{title,content});
       return res.redirect("/home");
}

async function handleView(req,res){
       const user = req.user;
       const post = await Post.findById(req.params.id);
       return res.render("viewPost", { post,user});
      
}



module.exports = {
    handleRegistration,
    handleCreateNewUser,
    handleHome,
    handleLogin,
    handleLoginOpen,
    handleLogout,
    handleNote,
    handlePost,
    handleEdit,
    handleDelete,
    handleUpdate,
    handleView,
}