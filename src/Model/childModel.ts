import {Sequelize,DataTypes,Model} from "sequelize";
import sequelize from "../config/db";



class child_navigation extends Model{
    public id!:number;
    public name!:string;
    public parent_id!:number;

}


child_navigation.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false

    },
    parent_id:{
        type:DataTypes.INTEGER,

    }
},{
    sequelize,
    modelName: 'child_navigation',
    timestamps: true,
  }
)


export default child_navigation;