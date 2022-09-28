import {Sequelize, Model} from 'sequelize';
import { iUserAttributes, iUserInstance } from '../src/interfaces/iUser'

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model<iUserAttributes, iUserInstance> implements iUserAttributes{
    id!: string;
    name!: string;
    hobby!: number;
    birthday!: Date;
    document!: string;
    status!: boolean

    static associate = (models: any) => {
      User.belongsTo(models.Hobby, {foreignKey: {name:'user_hobby', allowNull: true}});
      User.hasMany(models.UserPokemon, {foreignKey: {name:'user_pokemon', allowNull: false}});

    }
  }
  User.init({
    id: {type: DataTypes.UUID, primaryKey: true},
    name: {type: DataTypes.TEXT, allowNull: false},
    hobby: {type: DataTypes.INTEGER, field: 'user_hobby', allowNull: true},
    birthday: {type: DataTypes.DATEONLY, allowNull: false},
    document: {type: DataTypes.TEXT, allowNull: false},
    status: {type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true}
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true,
    tableName: 'User',
    underscored: true
  });
  return User;
};