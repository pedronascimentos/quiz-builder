import { Module } from '@nestjs/common';
import { QuizService } from './quizzes.service';
import { QuizController } from './quizzes.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [QuizController],
  providers: [QuizService, PrismaService],
})
export class QuizModule {}
