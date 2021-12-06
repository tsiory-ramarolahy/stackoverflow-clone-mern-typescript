export interface Question {
    title: string;
    contents: string;
    votes: number;
    views: number;
    users: [];
    categories: string;
    answers: [];
    createAt: number;
}