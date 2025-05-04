import React, { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";

interface CodingQuestion {
  title: string;
  description: string;
  example: string;
  starterCode: string;
  testCases: { input: any[]; output: any }[];
}

const codingQuestions: CodingQuestion[] = [
  {
    title: "Reverse a String",
    description: "Write a function that reverses a string.",
    example: "Example: reverseString('hello') → 'olleh'",
    starterCode: `function reverseString(str) {
  // Your code here
}`,
    testCases: [
      { input: ["hello"], output: "olleh" },
      { input: ["world"], output: "dlrow" }
    ]
  },
  {
    title: "Find the Largest Number",
    description: "Write a function that returns the largest number in an array.",
    example: "Example: findMax([1, 5, 3, 9, 2]) → 9",
    starterCode: `function findMax(arr) {
  // Your code here
}`,
    testCases: [
      { input: [[1, 5, 3, 9, 2]], output: 9 },
      { input: [[10, 20, 30]], output: 30 }
    ]
  },
  {
    title: "Sum of Array Elements",
    description: "Write a function that returns the sum of all elements in an array.",
    example: "Example: sumArray([1, 2, 3, 4]) → 10",
    starterCode: `function sumArray(arr) {
  // Your code here
}`,
    testCases: [
      { input: [[1, 2, 3, 4]], output: 10 },
      { input: [[5, 10, 15]], output: 30 }
    ]
  }
];

const CodingChallenge: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [code, setCode] = useState<string>(codingQuestions[0].starterCode);
  const [score, setScore] = useState<number>(0);
  const navigate = useNavigate();

  const handleSubmit = (): void => {
    try {
      const userFunction = new Function("return " + code)();
      const { testCases } = codingQuestions[currentQuestion];

      let isCorrect = true;
      for (const testCase of testCases) {
        const userOutput = userFunction(...testCase.input);
        if (JSON.stringify(userOutput) !== JSON.stringify(testCase.output)) {
          isCorrect = false;
          break;
        }
      }
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
    } catch (error) {
      console.error("Error executing function: ", error);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = (): void => {
    if (currentQuestion < codingQuestions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setCode(codingQuestions[currentQuestion + 1].starterCode);
    }
  };

  return (
    <>
      <Container sx={{ py: 5, minHeight: "100vh",width:"100vw",  color: "#fff", display: "flex", flexDirection: "column", alignItems: "center"}}>
        {currentQuestion < codingQuestions.length ? (
          <>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 3, color: "#00eaff" }}>🚀 Coding Challenge {currentQuestion + 1}/{codingQuestions.length}</Typography>
            <Box sx={{ background: "rgba(0, 0, 0, 0.7)", p: 3, borderRadius: 2, border: "2px solid #00eaff", width: { xs: "90%", md: "70%" } }}>
              <Typography variant="h6" sx={{ color: "#00ff99" }}>{codingQuestions[currentQuestion].title}</Typography>
              <Typography variant="body1">{codingQuestions[currentQuestion].description}</Typography>
              <Typography variant="body2" sx={{ fontStyle: "italic", color: "#bbb", mt: 1 }}>{codingQuestions[currentQuestion].example}</Typography>
            </Box>
            <Box sx={{ mt: 3, width: { xs: "90%", md: "70%" }, height: "300px", border: "2px solid #00eaff" }}>
              <Editor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={(value: string | undefined) => setCode(value || "")}
                options={{ fontSize: 16, minimap: { enabled: false } }}
              />
            </Box>
            <Button onClick={handleSubmit} variant="contained" sx={{ mt: 3, background: "linear-gradient(90deg, #00ff99, #00eaff)" }}>Submit</Button>
          </>
        ) : (
          <Box textAlign="center">
            <Typography variant="h3" sx={{ color: "#00ff99" }}>🎉 Well Done!</Typography>
            <Typography variant="h6" sx={{ color: "#bbb", mt: 2 }}>Your score: {(score / codingQuestions.length) * 100}%</Typography>
            <Button onClick={() => { setCurrentQuestion(0); setScore(0); setCode(codingQuestions[0].starterCode); }} variant="contained" sx={{ mt: 3, background: "linear-gradient(90deg, #00eaff, #00ff99)" }}>🔁 Restart</Button>
            <Button onClick={() => navigate('/end')} variant="contained" sx={{ mt: 3, background: "linear-gradient(90deg, #00eaff, #00ff99)" }}>✅ Apply</Button>
          </Box>
        )}
      </Container>
      

    </>
  );
};

export default CodingChallenge;
