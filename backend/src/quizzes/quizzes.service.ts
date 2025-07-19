import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuestionType } from '@prisma/client';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  // POST /quizzes – Creates a new quiz
  async create(createQuizDto: CreateQuizDto) {
    const { title, questions } = createQuizDto;

    return this.prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map((q) => ({
            text: q.text,
            type: q.type,
            options: this.getOptionsForQuestion(q.type, q.options),
          })),
        },
      },
      include: {
        questions: true,
      },
    });
  }

  // Helper method to handle options based on question type
  private getOptionsForQuestion(type: QuestionType, options?: string): string {
    if (options !== undefined && options !== null && options.trim() !== '') {
      return options;
    }

    switch (type) {
      case QuestionType.CHECKBOX:
        return JSON.stringify(['Option A', 'Option B', 'Option C', 'Option D']);

      case QuestionType.BOOLEAN:
        return JSON.stringify(['True', 'False']);

      case QuestionType.INPUT:
      default:
        return '';
    }
  }

  // GET /quizzes – Returns a list of all quizzes
  async findAll() {
    const quizzes = await this.prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        _count: {
          select: { questions: true },
        },
      },
    });

    return quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      questionCount: quiz._count.questions,
    }));
  }

  // GET /quizzes/:id – Returns quiz details
  async findOne(id: number) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    return quiz;
  }

  // DELETE /quizzes/:id – Deletes a quiz
  async remove(id: number) {
    try {
      const quiz = await this.prisma.quiz.delete({
        where: { id },
      });
      return quiz;
    } catch (error) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
  }
}
