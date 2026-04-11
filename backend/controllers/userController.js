// const User = require("../models/User");


// // ================= GET PROFILE =================
// exports.getUserProfile = async (req, res) => {
//   try {
//     const user = req.user; // comes from JWT middleware

//     res.json({
//       success: true,
//       user
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// // ================= UPDATE PROFILE =================
// exports.updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (user) {
//       user.name = req.body.name || user.name;
//       user.location = req.body.location || user.location;
//       user.skills = req.body.skills || user.skills;
//       user.interests = req.body.interests || user.interests;

//       const updatedUser = await user.save();

//       res.json({
//         success: true,
//         user: updatedUser
//       });
//     }

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };