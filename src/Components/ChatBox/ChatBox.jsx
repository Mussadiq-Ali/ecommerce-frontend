import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export default function ChatBox({ socket }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  // ✅ Fetch user from local storage
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("auth-token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:4000/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("User Fetch Error:", error);
      }
    };

    fetchUser();
  }, []);

  const toggleDrawer = (open) => () => {
    setOpen(open);
  };

  const handleSendMessage = () => {
    if (!socket || message.trim() === "") return;

    const newMessage = {
      sender: user?.username || "Guest",
      text: message,
    };

    socket.emit("send_message", newMessage); // ✅ Sirf yeh karna hai
    setMessage(""); // ✅ Input field clear karna
  };

  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("show_message", handleIncomingMessage);
    return () => {
      socket.off("show_message", handleIncomingMessage);
    };
  }, [socket]);

  return (
    <div>
      <Button
        variant="contained"
        onClick={toggleDrawer(true)}
        startIcon={<ChatIcon />}
      >
        {user?.role === "admin" ? "Client Messages" : "Chat Admin"}
      </Button>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "320px",
            height: "400px",
            borderRadius: "15px 15px 0 0",
            backgroundColor: "#1E1E1E",
            color: "white",
            position: "fixed",
            right: 20,
            bottom: 0,
            zIndex: 1600,
            boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Chatbox Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              backgroundColor: "#F9A826",
              color: "white",
            }}
          >
            <Typography variant="h6">Chatbox</Typography>
            <IconButton onClick={toggleDrawer(false)} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Chat Messages */}
          <List
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.map((msg, index) => (
              <ListItem
                key={index}
                sx={{
                  alignSelf:
                    msg.sender === user?.username ? "flex-end" : "flex-start",
                  backgroundColor:
                    msg.sender === user?.username ? "#4CAF50" : "#292A2D",
                  color: "white",
                  borderRadius: "10px",
                  maxWidth: "70%",
                  p: 1,
                  mb: 1,
                }}
              >
                <Typography variant="body2">
                  <strong>{msg.sender}: </strong> {msg.text}
                </Typography>
              </ListItem>
            ))}
          </List>

          {/* Chat Input Box */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              borderTop: "1px solid #444",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              sx={{
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#666" },
                  "&:hover fieldset": { borderColor: "#999" },
                  "&.Mui-focused fieldset": { borderColor: "#F9A826" },
                },
              }}
            />
            <IconButton
              onClick={handleSendMessage}
              sx={{ ml: 1, color: "#F9A826" }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}
