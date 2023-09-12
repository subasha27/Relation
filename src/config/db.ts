import { Sequelize } from "sequelize";

const sequelize = new Sequelize( 
    'class',
    'root',
    'rootpass',{
        host:'localhost',
        dialect:'mysql'
    }
)


sequelize.authenticate().then(()=>{
    console.log("Connection established Succesfully")
}).catch((error)=>{
    console.error("Connection Error",error)
})

export default sequelize;