import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface BranchesCreationArrts {
  name: string;
  logo: string;
  address: string;
}

@Table({ tableName: 'branches' })
export class Branches extends Model<Branches, BranchesCreationArrts> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id?: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  logo: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;
}
