import {Sequelize,DataTypes,Model} from "sequelize";
import sequelize from "../config/db";




class Parent_navigation extends Model{
    public id!:number;
    public name!:string;
}

Parent_navigation.init(
    {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false

    }
},{
    sequelize,
    modelName: 'Parent_navigation',
    timestamps: true,
  }
)

export default Parent_navigation;