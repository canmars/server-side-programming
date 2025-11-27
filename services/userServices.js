
export default class UserService{
// add fonksiyonu: user ekleme için
// list fonksiuonu: user listeleme için
// getbyid fonksiyonu: belirli bir id'ye göre user getirme.
constructor(){
    this.users=[]
}
add(user){
    this.users.push(user)
}
list(){
    return this.users
}
getByid(id){
    return this.users.find(u=>u.id===id)
}
}
