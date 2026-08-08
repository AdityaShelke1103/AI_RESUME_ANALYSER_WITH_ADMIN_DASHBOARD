const UserModel = require('../Models/user');

exports.register = async (req, res) => {
    try {
        const { name, email, role, photoUrl } = req.body;
        const userExist = await UserModel.findOne({ email });
        if (!userExist) {
            const newuser = new UserModel({ name, email, role, photoUrl });
            await newuser.save();
            res.status(201).json({ message: "User registered successfully", success: true, user: newuser });
        }
        else {
            res.status(200).json({ message: "User already exists", success: false, user: userExist });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}
