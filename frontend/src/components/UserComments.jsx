import { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Box,
    Grid,
    Rating
} from "@mui/material";

export default function UserComments() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get("http://localhost:8888/users");
                const filtered = res.data.filter(
                    (user) => user.message && user.star && user.name && user.image
                );
                setUsers(filtered);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchComments();
    }, []);

    return (
        <Box sx={{ px: 3, py: 5 }}>
            <Typography variant="h5" gutterBottom fontWeight={600} align="center">
                What Our client Say
            </Typography>

            <Grid container spacing={4}>
                {users.map((user, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ p: 2, borderRadius: 4, boxShadow: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <Avatar
                                    src={`http://localhost:8888/uploads/${user.image}`}
                                    alt={user.name}
                                    sx={{ width: 56, height: 56, mr: 2 }}
                                />
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {user.name}
                                    </Typography>
                                    <Rating value={user.star} readOnly precision={0.5} />
                                </Box>
                            </Box>
                            <CardContent sx={{ pt: 0 }}>
                                <Typography variant="body2" color="text.secondary">
                                    {user.message}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
