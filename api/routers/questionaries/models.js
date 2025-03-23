const ValidationError = require('../../errors/validation')
const taskTypes = ['text', 'single', 'multiple']


class TaskInput {
    constructor(task) {
        if (Object.keys(task).length === 0) {
            throw new ValidationError('Task must be defined!');
        }
        if (!taskTypes.includes(task?.type)) {
            throw new ValidationError('Incorrect task type!');
        }
        if (!task?.question) {
            throw new ValidationError('Question must be provided!');
        }
        if (!task.answer) {
            throw new ValidationError('Answer must be provided!');
        }

        if (task?.type === 'text') {
            this.validate_text_task(task);
        } else if (task?.type === 'single') {
            this.validate_single_task(task);
        } else if (task?.type === 'multiple') {
            this.validate_multiple_task(task);
        } else {
            throw new ValidationError('Task type is incorrect!');
        }

        this.type = task.type;
        this.question = task.question;
    }

    validate_text_task(task) {
        this.answer = task.answer;
        this.response = ""
    }

    validate_single_task(task) {
        if (!task.response) {
            throw new ValidationError('Response must be provided!');
        }
        if (!(task.response instanceof Array)) {
            throw new ValidationError('Response must be an array!');
        }
        if (task.response.length <= 1) {
            throw new ValidationError('Must be at least 2 responses!');
        }

        this.answer = task.answer;
        this.response = task.response.toString();
    }

    validate_multiple_task(task) {
        if (!task.response) {
            throw new ValidationError('Response must be provided!');
        }
        if (!(task.response instanceof Array)) {
            throw new ValidationError('Response must be an array!');
        }
        if (task.response.length <= 1) {
            throw new ValidationError('Must be at least 2 responses!');
        }

        if (!(task.answer instanceof Array)) {
            throw new ValidationError('Use "single" type or provide several correct answers!');
        }
        if (task.answer.length <= 1) {
            throw new ValidationError('Must be at least 2 correct answers!');
        }

        this.response = task.response.toString();
        this.answer = task.answer.toString();
    }
}


class QuestionaryInput {
    constructor (obj) {
        // validation
        if (!obj?.name) {
            throw new ValidationError('Missing name!');
        }
        if (!obj?.tasks) {
            throw new ValidationError('Missing tasks!');
        } else if (obj.tasks.length === 0) {
            throw new ValidationError('Missing tasks!');
        }

        this.name = obj?.name;
        this.description = obj?.description;

        this.tasks = obj.tasks.map(task => new TaskInput(task));
    }
}


class TaskResponse {
    constructor(task) {
        console.log(task)
        this.id = task.id;
        this.questionaryId = task.questionaryId;
        this.type = task.type;
        this.question = task.question;
        this.response = task.response.split(',')
        this.answer = task.answer.split(',')
    }
}

class QuestionaryResponse {
    constructor(questionary) {
        this.id = questionary.id;
        this.name = questionary.name;
        this.description = questionary.description;
    }

    setTasks(tasks) {
        this.tasks = tasks.map(task => new TaskResponse(task));
    }
}


module.exports = {
    QuestionaryInput,
    QuestionaryResponse
};