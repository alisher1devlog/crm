import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CourseCreationArrts {
  name: string;
  course_id: number;
  start_date: Date;
  endDate: Date;
  branch_id: number;
}

@Table({ tableName: 'groups' })
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
  course_id: number;
  @Column({
    type: DataType.DATE,
  })
  start_date: Date;
  @Column({
    type: DataType.DATE,
  })
  endDate: Date;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  branch_id: number;
}
