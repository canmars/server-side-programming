import User from "../models/user.js";
import UserService from "../services/userServices.js";

console.log("User Service Yüklendi")

let userService = new UserService()
let user1 = new User(1,"Can","Arslan","Bursa")
let user2 = new User(2,"Metin","Kara","Ankara")

userService.add(user1)
userService.add(user2)

console.log(userService.list())
console.log(userService.getByid(1))