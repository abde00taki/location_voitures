import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Rating } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MessageUser() {
    const [message, setMessage] = useState("");
    const [star, setStar] = useState(0);
    const navigate = useNavigate();
    const [id_user, setIdUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser.id_user) {
            navigate("/"); // تحويل إذا ماكانش user
        } else {
            setIdUser(storedUser.id_user);
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id_user) return;

        try {
            const res = await axios.put(`http://localhost:8888/users/coment/${id_user}`, {
                message,
                star,
            });
            alert("Your message and rating were submitted successfully!");
            setMessage("");
            setStar(0);
        } catch (error) {
            console.error("Error while sending data:", error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
            <Typography className="text-dark" variant="h6" gutterBottom>
                Rate Our Service
            </Typography>
            <Rating
                name="user-rating"
                value={star}
                onChange={(e, newValue) => setStar(newValue)}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                multiline
                minRows={4}
                label="Write your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Send Feedback
            </Button>
        </Box>
    );
}
