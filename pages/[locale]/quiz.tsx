import React from "react";
import { Typography } from "@/components/ui/Typography";
import Quiz from "../components/quiz";
import Layout from "../layout";
import { MessageCircleQuestion } from 'lucide-react';
const QuizPages = () => {
    return (
        <Layout>
            <Typography variant="h1" className="text-center flex mb-3">Quiz <MessageCircleQuestion /></Typography>
            <Quiz />
        </Layout>
    )
}
export default QuizPages;