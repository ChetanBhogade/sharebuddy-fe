import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ImageUrls } from "@/constants/images";

function UserCard({ userId, username, userImage }) {
  return (
    <Card sx={{ padding: 1.5, borderRadius: 2 }}>
      <CardMedia
        sx={{
          height: 140,
          width: 140,
          margin: "auto",
          borderRadius: 12,
          objectFit: "cover",
        }}
        image={userImage || ImageUrls.defaultAvatar}
        title="green iguana"
      />
      <CardContent>
        <Typography align="center" gutterBottom variant="h5" component="div">
          {username}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button fullWidth size="small" variant="outlined" color="primary">
          Accept
        </Button>
        <Button fullWidth size="small" variant="outlined" color="error">
          Reject
        </Button>
      </CardActions>
    </Card>
  );
}

export default UserCard;
