export class QuizAnswers {

    [questionNumber: number]: number;

    constructor(data?: { [key: string]: number }) {
        if (data) {
            Object.keys(data).forEach(key => {
                this[parseInt(key)] = data[key];
            });
        }
    }

    static fromJSON(jsonString: string): QuizAnswers {
        const data = JSON.parse(jsonString);
        return new QuizAnswers(data);
    }

    // Convert back to JSON string
    toJSON(): string {
        return JSON.stringify(this);
    }

    // Get all question numbers
    getQuestionNumbers(): number[] {
        return Object.keys(this)
            .filter(key => !isNaN(Number(key)))
            .map(key => parseInt(key));
    }

    countAnswers(): number {
        return this.getQuestionNumbers().length;
    }
}