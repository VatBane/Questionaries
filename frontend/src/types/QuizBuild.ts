interface QuestionBuild {
    question: string;
    type: string;
    response: string[];
    answer: string[];
}

interface QuizBuild {
    name: string;
    description: string | null;
    tasks: QuestionBuild[];
}

export type {QuestionBuild, QuizBuild};