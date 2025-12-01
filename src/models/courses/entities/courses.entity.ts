import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CourseCreationArrts {
  name: string;
  price: number;
  lavel: number;
  duration_month: string;
  branch_id: number;
}

@Table({ tableName: 'courses' })
export class Courses extends Model<Courses, CourseCreationArrts> {
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
  price: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  lavel: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  duration_month: string;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  branch_id: number;
}
