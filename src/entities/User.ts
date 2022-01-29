import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column("timestamp with time zone")
  createdOn!: Date;

  @Column("timestamp with time zone")
  updatedOn!: Date;

  @Column()
  isAdmin!: boolean;
}
