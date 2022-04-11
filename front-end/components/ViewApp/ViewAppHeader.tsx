import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Chip,
  Collapse,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { get } from "lodash";
import Head from "next/head";
import React, { useState } from "react";
import { App } from "../types";
import { formatDate } from "./common";
import ShareApp from "./ShareApp";

interface Props {
  app: App;
}

export default function ViewAppHeader({ app }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Grid container>
      <Head>
        <link
          key="favicon"
          rel="shortcut icon"
          href={get(app, "favicon_image", "")}
        />
        <meta
          key="ogTitle"
          property="og:title"
          content={`${get(app, "name")} | MecSimCalc`}
        />
        <meta
          key="ogImage"
          property="og:image"
          content={get(app, "primary_image", "")}
        />
        <meta
          key="ogDescription"
          property="og:description"
          content={get(app, "description")}
        />
        <meta
          key="ogType"
          property="og:type"
          content={get(app, "category.name", "") as string}
        />
      </Head>

      <Grid item md={8} xs={12}>
        <Typography
          variant="h5"
          padding="20px"
          alignItems="center"
          display="flex"
          sx={{ wordBreak: "break-word" }}
        >
          {get(app, "name")}
        </Typography>
      </Grid>
      <Grid item xs={8} md={4}>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              alt={get(app, "author.username", "Unknown Author")}
              src={get(app, "author.image")}
            />
          </ListItemAvatar>
          <ListItemText
            primary={get(app, "author.username", "Unknown Author")}
            secondary={`Updated at: ${formatDate(get(app, "updated_at"))}`}
          />
        </ListItem>
      </Grid>
      <Grid
        item
        xs={4}
        md={12}
        display="flex"
        justifyContent={{ xs: "center", md: "flex-end" }}
        alignItems="center"
        flexDirection={{ xs: "column", md: "row" }}
      >
        <ShareApp app={app} />
        <Button
          onClick={() => setOpen(!open)}
          startIcon={open ? <ExpandLess /> : <ExpandMore />}
        >
          More
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Collapse in={open} timeout="auto" sx={{ overflow: "hidden" }}>
          <Grid container px="40px">
            <Grid item xs={7} pr="50px" sx={{ overflowWrap: "break-word" }}>
              <ListItemText
                primary="Description"
                secondary={get(app, "description")}
              />
            </Grid>
            <Grid
              item
              xs={5}
              borderLeft="1px solid #D3D3D3"
              display="flex"
              flexDirection={{ md: "row", xs: "column" }}
              gap={{ md: "30px", xs: 0 }}
              justifyContent="space-around"
              pl="30px"
            >
              <div>
                <ListItemText
                  primary="Created on"
                  secondary={formatDate(get(app, "created_on"))}
                />
                <ListItemText primary="Category" />
                <Chip
                  label={get(app, "category.name")}
                  size="small"
                  sx={{ m: "2px" }}
                />
              </div>
              <div>
                <ListItemText primary="Tags" />
                {get(app, "tags", []).map((tag, i) => (
                  <Chip
                    key={`tag-${i}`}
                    label={tag.name}
                    size="small"
                    sx={{ m: "3px" }}
                  />
                ))}
              </div>
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </Grid>
  );
}
