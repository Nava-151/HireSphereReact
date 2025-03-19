import React, { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Editor from "@monaco-editor/react";

// הגדרת טיפוס לשאלות
interface CodingQuestion {
  title: string;
  description: string;
  example: string;
  starterCode: string;
}

// רשימת שאלות
const codingQuestions: CodingQuestion[] = [
  {
    title: "Reverse a String",
    description: "Write a function in JavaScript that takes a string and returns its reverse.",
    example: "Example: reverseString('hello') → 'olleh'",
    starterCode: `function reverseString(str: string): string {\n  // Your code here\n}`,
  },
  {
    title: "Find the Largest Number",
    description: "Write a function that returns the largest number in an array.",
    example: "Example: findMax([1, 5, 3, 9, 2]) → 9",
    starterCode: `function findMax(arr: number[]): number {\n  // Your code here\n}`,
  },
  {
    title: "Check for Palindrome",
    description: "Write a function that checks if a string is a palindrome.",
    example: "Example: isPalindrome('racecar') → true",
    starterCode: `function isPalindrome(str: string): boolean {\n  // Your code here\n}`,
  },
];

const CodingChallenge: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [code, setCode] = useState<string>(codingQuestions[0].starterCode);

  const handleNextQuestion = (): void => {
    if (currentQuestion < codingQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCode(codingQuestions[currentQuestion + 1].starterCode);
    }
  };

  return (
    <Container
      sx={{
        py: 5,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #000 20%, #002b36 80%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {currentQuestion < codingQuestions.length ? (
        <>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              mb: 3,
              color: "#00eaff",
              textShadow: "0 0 15px #00eaff",
            }}
          >
            🚀 Coding Challenge {currentQuestion + 1}/{codingQuestions.length}
          </Typography>

          <Box
            sx={{
              background: "rgba(0, 0, 0, 0.7)",
              p: 3,
              borderRadius: 2,
              border: "2px solid #00eaff",
              boxShadow: "0px 0px 20px #00eaff",
              width: { xs: "90%", md: "70%" },
            }}
          >
            <Typography variant="h6" sx={{ color: "#00ff99", textShadow: "0 0 10px #00ff99" }}>
              {codingQuestions[currentQuestion].title}
            </Typography>
            <Typography variant="body1">{codingQuestions[currentQuestion].description}</Typography>
            <Typography variant="body2" sx={{ fontStyle: "italic", color: "#bbb", mt: 1 }}>
              {codingQuestions[currentQuestion].example}
            </Typography>
          </Box>

            <Box
            sx={{
              mt: 3,
              width: { xs: "90%", md: "70%" },
              height: "300px",
              borderRadius: 1,
              overflow: "hidden",
              border: "2px solid #00eaff",
              boxShadow: "0px 0px 15px #00eaff",
            }}
            >
            <Editor
              height="100%"
              defaultLanguage="typescript"
              theme="vs-dark"
              value={code}
              onChange={(value: string | undefined) => setCode(value || "")}
              options={{
              fontSize: 16,
              minimap: { enabled: false },
              }}
            />
            </Box>

          <Button
            onClick={handleNextQuestion}
            variant="contained"
            sx={{
              mt: 3,
              px: 4,
              py: 1.5,
              fontSize: "1.2rem",
              background: "linear-gradient(90deg, #00ff99, #00eaff)",
              color: "#000",
              borderRadius: "25px",
              transition: "0.3s",
              "&:hover": {
                background: "linear-gradient(90deg, #00eaff, #00ff99)",
                boxShadow: "0px 0px 15px #00eaff",
                transform: "scale(1.05)",
              },
            }}
          >
            {currentQuestion < codingQuestions.length - 1 ? "➡ Next Question" : "🏁 Finish"}
          </Button>
        </>
      ) : (
        <Box textAlign="center">
          <Typography variant="h3" sx={{ color: "#00ff99", textShadow: "0 0 15px #00ff99" }}>
            🎉 Well Done!
          </Typography>
          <Typography variant="h6" sx={{ color: "#bbb", mt: 2 }}>
            You've completed all coding challenges.
          </Typography>
          <Button
            onClick={() => setCurrentQuestion(0)}
            variant="contained"
            sx={{
              mt: 3,
              px: 4,
              py: 1.5,
              fontSize: "1.2rem",
              background: "linear-gradient(90deg, #00eaff, #00ff99)",
              color: "#000",
              borderRadius: "25px",
              transition: "0.3s",
              "&:hover": {
                background: "linear-gradient(90deg, #00ff99, #00eaff)",
                boxShadow: "0px 0px 15px #00ff99",
                transform: "scale(1.05)",
              },
            }}
          >
            🔁 Restart
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default CodingChallenge;
