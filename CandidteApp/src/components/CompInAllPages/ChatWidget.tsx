// components/ChatWidget.tsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addUserMessage, sendMessage } from "../../store/ChatSlice";
import { Fab, Dialog, DialogContent, TextField, IconButton, Box, Typography, Slide } from "@mui/material";
import { Bot, Send } from "lucide-react";
import { Loader2 } from "lucide-react";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const ChatWidget=()=> {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state: RootState) => state.chat);

  const handleSend = () => {
    if (!input.trim()) return;
    dispatch(addUserMessage(input));
    dispatch(sendMessage(input) as any);
    setInput("");
  };

  return (
    <>
      {/* Floating Neon Chat Icon */}
      <Fab
        onClick={() => setIsOpen(true)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 70,
          height: 70,
          background: "linear-gradient(to right, #00f0ff, #00ff99)",
          color: "white",
          "&:hover": {
            transform: "scale(1.1)",
            background: "linear-gradient(to right, #00ffcc, #00ff66)",
          },
          boxShadow: "0 0 15px #00ffcc",
        }}
      >
        <Bot size={36} />
      </Fab>

      {/* Full Chat Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        fullWidth
        maxWidth="sm"
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
          },
        }}
      >
        <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column", height: "100%" }}>
          <Box sx={{ p: 2, backgroundColor: " #00ffcc", borderBottom: "1px solid #ddd" }}>
            <Typography fontWeight={600}>Hi, I'm Razi! I'm here to help you with your resume.</Typography>
          </Box>

          <Box sx={{ flex: 1, p: 2, overflowY: "auto", display: "flex", flexDirection: "column", gap: 1 }}>
            {messages.map((msg, i) => (
              <Box
                key={i}
                sx={{
                  alignSelf: msg.isUser ? "flex-end" : "flex-start",
                  bgcolor: msg.isUser ? "#cce4ff" : "#eeeeee",
                  p: 1,
                  borderRadius: 2,
                  maxWidth: "70%",
                }}
              >
                {msg.text}
              </Box>
            ))}
            {loading && (
              <Box sx={{ alignSelf: "center", mt: 1, color: "gray" }}>
                <Loader2 className="animate-spin" />
              </Box>
            )}
          </Box>

          <Box sx={{ p: 1.5, borderTop: "1px solid #ddd", display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <IconButton
              onClick={handleSend}
              color="primary"
              disabled={loading}
              sx={{ bgcolor: "#00d09d", color: "white", "&:hover": { bgcolor: "#00b388" } }}
            >
              <Send />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default ChatWidget