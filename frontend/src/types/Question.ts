import ResponseData from "./ResponseData.ts";

interface Question {
    id: number | null;
    type: string;
    question: string;
    responseData: ResponseData;
}

export default Question;