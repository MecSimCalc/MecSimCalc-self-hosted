import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Skeleton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { get } from "lodash";
import Link from "next/link";
import { App } from "./types";

export const APP_CARD_WIDTH = 250;
export const APP_CARD_HEIGHT = 250;
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minWidth: APP_CARD_WIDTH,
  width: APP_CARD_WIDTH,
  height: APP_CARD_HEIGHT,
  margin: "5px",
}));

export default function AppCard({ app }: { app?: App }) {
  // Loading if app is not defined
  if (!app)
    return (
      <Skeleton
        variant="rectangular"
        width={APP_CARD_WIDTH}
        height={APP_CARD_HEIGHT}
        sx={{ margin: "8px" }}
      />
    );

  return (
    <StyledCard>
      <Link href={`/app/${get(app, "app_id")}`} passHref>
        <CardActionArea sx={{ height: "100%" }}>
          <CardMedia
            image={get(
              app,
              "primary_image",
              "https://source.unsplash.com/random/" // fallback to random image
            )}
            sx={{ height: "70px" }}
          />
          <Avatar
            src={get(app, "author.image", get(app, "favicon_image"))}
            sx={{ position: "absolute", top: "15px", left: "10px" }}
          />
          <CardContent sx={{ pb: 0 }}>
            <Box display="flex" justifyContent="space-between">
              <Typography
                variant="h6"
                lineHeight={1.2}
                gutterBottom
                sx={{
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {get(app, "name")}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                WebkitLineClamp: get(app, "name", "").length > 45 ? 2 : 3, // 2 lines if `name` is long
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
              }}
            >
              {get(app, "description")}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Stack direction="row" spacing={1}>
          <Chip
            avatar={<Avatar src={get(app, "author.image")} />}
            label={get(app, "author.username", "?")}
            size="small"
          />
          <Chip
            label={get(app, "category.name")}
            color="primary"
            size="small"
            sx={{ mx: "6px" }}
          />
          {get(app, "tags", []).map((tag, i) => (
            <Chip
              key={`tag-${i}`}
              label={get(tag, "name")}
              color="secondary"
              size="small"
              variant="outlined"
            />
          ))}
        </Stack>
      </CardActions>
    </StyledCard>
  );
}
