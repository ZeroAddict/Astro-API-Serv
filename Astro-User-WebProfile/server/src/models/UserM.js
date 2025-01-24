const mongoose =require("mongoose");
const bcrypt= require("bcrypt");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
},
{
  timestamps: true
})

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next()
    }
    const hashedPWd = await bcrypt.hash(this.password, 10);
    return (this.password = hashed);
  } catch (error) {
    return next(error)
  }
})

UserSchema.pre('updateOne', async function(next){
  try {
    if (this._update.password){
      const hashedPwd = await bcrypt.hash(this._update.password, 12);
      this._update.password = hashedPwd;

      return next();
    }
    const hashedPwd = await bcrypt.hash(this._update.password, 12);
    return (this.password = hashed)
  } catch (error) {
    return next(error)
  }
})
UserSchema.methods.verifyPassword = async function (plain_password){
  return bcrypt.compare( plain_password, this.password)
}
const User = mongoose.model("User", UserSchema);

module.exports = User