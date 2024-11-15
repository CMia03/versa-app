import React from "react";
import { Typography } from "@/components/ui/Typography";
import Quiz from "../components/quiz";
import { MessageCircleQuestion } from 'lucide-react';
const QuizPages = () => {
    return (
        <div>
            <Typography variant="h1" className="text-center flex mb-3">Quiz <MessageCircleQuestion /></Typography>
            <Quiz />
        </div>
    )
}
export default QuizPages;