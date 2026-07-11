const express=require("express");
const {restrictToLoggedInUserOnly} = require("../middleware/auth");
const {handleCreateNewUser,handleRegistration,handleLogin,handleHome,handleLoginOpen,handleLogout,handleNote,handlePost,handleDelete,handleEdit,handleUpdate,handleView} =require("../controllers/user");
const router=express.Router();


router.post("/addUser", handleCreateNewUser );        
router.get("/form",handleRegistration);
router.post("/login1",handleLogin);           
router.get("/home",restrictToLoggedInUserOnly, handleHome );
router.get("/note",restrictToLoggedInUserOnly, handleNote );
router.post("/post",restrictToLoggedInUserOnly, handlePost );        
router.get("/login", handleLoginOpen);
router.get("/logout",handleLogout);
router.get("/delete/:id",restrictToLoggedInUserOnly,handleDelete);
router.get("/edit/:id",restrictToLoggedInUserOnly,handleEdit);
router.post("/update/:id",restrictToLoggedInUserOnly,handleUpdate);
router.get("/view/:id",restrictToLoggedInUserOnly,handleView);
                                        
module.exports = router;