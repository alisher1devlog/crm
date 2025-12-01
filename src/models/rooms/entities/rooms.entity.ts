import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface RoomsCreationArrts {
  name: string;
  capacity: number;
  branch_id: number;
}

@Table({ tableName: 'rooms' })
export class Rooms extends Model<Rooms, RoomsCreationArrts> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id?: number;
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  name: string;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  capacity: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  branch_id: number;
}
