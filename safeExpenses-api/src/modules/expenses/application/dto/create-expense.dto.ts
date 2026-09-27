import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsString()
  @IsNotEmpty()
  account!: string;

  @Type(() => Number)
  @IsNumber()
  value!: number;

  @Type(() => Boolean)
  @IsBoolean()
  consolidated!: boolean;

  @IsDateString()
  transactionDate!: string;
}
