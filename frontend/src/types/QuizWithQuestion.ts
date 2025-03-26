export interface Task {
    id: number;
    type: string;
    question: string;
    response: string[];
    answer: string[];
}

export interface Quiz {
    id: number;
    name: string;
    description: string;
    tasks: Task[];
}
