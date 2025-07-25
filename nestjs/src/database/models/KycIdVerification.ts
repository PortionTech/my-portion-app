import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  AllowNull,
  ForeignKey,
  CreatedAt, // Import CreatedAt for explicit createdAt column
  UpdatedAt, // Import UpdatedAt for explicit updatedAt column
  DeletedAt // Import DeletedAt for explicit deletedAt column (if using paranoid)
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CreationOptional } from 'sequelize';

// Import your shared types
import { KycIdVerificationAttribute } from '@shared/types/kyc-id-verification';

// Import related models for ForeignKey decorators (adjust paths as needed)
import { User } from './User'; // Assuming your User model is in './User.ts'

@Table({
  tableName: 'kyc_id_verification',
  modelName: 'kyc_id_verification',
  timestamps: true, // Let Sequelize manage createdAt and updatedAt automatically
  paranoid: true, // Set to true if you want Sequelize to manage deletedAt for soft deletes
})
export class KycIdVerification extends Model<KycIdVerificationAttribute> implements KycIdVerificationAttribute {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  declare id: CreationOptional<string>;

  @ForeignKey(() => User) // References the User model
  @AllowNull(false)
  @Column(DataTypes.UUID)
  declare user_id: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare id_type: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare id_number: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare id_front: string;

  @AllowNull(true) // This column is allowNull: true
  @Column(DataTypes.STRING)
  declare id_back: string; // Type can be string or null

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare passport: string;

  // Sequelize-typescript manages these automatically when `timestamps: true` and `paranoid: true`
  // You can declare them explicitly with their decorators for better type clarity
  @CreatedAt
  declare createdAt: CreationOptional<Date>; // Use CreationOptional for auto-managed dates

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>; // Use CreationOptional for auto-managed dates

  @DeletedAt
  declare deletedAt?: Date; // It's optional because it's only set on soft delete
}