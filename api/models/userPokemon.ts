import {Sequelize, Model} from 'sequelize';
import { iUserPokemonAttributes, iUserPokemonInstance } from '../src/interfaces/iUserPokemon'

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class UserPokemon extends Model<iUserPokemonAttributes, iUserPokemonInstance> implements iUserPokemonAttributes{
    id!: string;
    idUser!: string;
    idPokemon!: number;
    status!: boolean

    static associate = (models: any) => {
      UserPokemon.belongsTo(models.User, {foreignKey: {name:'user_pokemon', allowNull: false}});
    }
  }
  UserPokemon.init({
    id: {type: DataTypes.UUID, primaryKey: true},
    idUser: {type: DataTypes.UUID, field: 'user_pokemon', allowNull: false},
    idPokemon: {type: DataTypes.INTEGER, allowNull: false},
    status: {type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true}
  }, {
    sequelize,
    modelName: 'UserPokemon',
    freezeTableName: true,
    tableName: 'UserPokemon',
    underscored: true
  });
  return UserPokemon;
};