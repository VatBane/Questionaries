const {underscoredIf} = require("sequelize/lib/utils");
const calculateSingleResponseRate = (answer, correctAnswer) => {
    return (answer === correctAnswer) ? 1 : 0
}


const calculateMultipleResponseRate = (answer, correctAnswer) => {
    let rate = 0
    let k = 1 / correctAnswer.length
    let delta = answer.length - correctAnswer.length

    delta = (delta <= 0 ? 0 : delta)
    rate -= delta * k / 2

    answer.map((an) => {
        if (correctAnswer.includes(an)) {
            rate += k
        }
    })

    return (rate > 0) ? rate : 0
}


const calculateSubmitionRate = (userAnswers, tasks) => {
    const oneQuestionRate = 100 / tasks.length

    let total = 0

    for (let task of tasks) {
        let k = 0
        let answer = userAnswers.find((answer) => answer.taskId === task.dataValues.id)

        if (task.type === "multiple") {
            k = calculateMultipleResponseRate(answer.answer, task.dataValues.answer.split(','))
        } else {
            k = calculateSingleResponseRate(answer.answer[0], task.dataValues.answer)
        }

        total += oneQuestionRate * k
    }

    return total
}

module.exports = {
    calculateSubmitionRate,
}