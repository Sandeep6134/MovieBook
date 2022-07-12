
const {MongoClient} =require("mongodb")
module.exports={
    db:null,
    async connect(){

        try{
        const connection=await MongoClient.connect("mongodb+srv://sand:sand@cluster0.1ukfijh.mongodb.net/?retryWrites=true&w=majority")
        this.db=connection.db("Database1")
        console.log("connected");
        
        }
        catch(err){
          
                console.log("error in db");
            }

        
    }
}
