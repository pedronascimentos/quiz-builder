// dto/create-quiz.dto.ts
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { QuestionType } from '@prisma/client';

class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsString()
  @IsOptional()
  options?: string;
}

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}

export { CreateQuestionDto };
