"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { PostInterface } from "../interfaces/PostInterface";
import Image from "next/image";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import CommentIcon from "@mui/icons-material/Comment";
import img from "../../../src/images/images.png";

export default function Posts({
  postdata,
  allComments = false,
}: {
  postdata: PostInterface;
  allComments?: boolean;
}) {
  const router = useRouter();

  let handleProfile = (id: string) => {
    router.push(`/profile/${id}`);
  };

  let handleSinglePost = (id: string) => {
    router.push(`/post/${id}`);
  };

  return (
    <Box sx={{ marginBottom: 8 }}>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              onClick={() => {
                handleProfile(postdata?._id);
              }}
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
            >
              <Image
                src={postdata?.user?.photo ? postdata?.user?.photo : img}
                alt={postdata?.user.name}
                width={50}
                height={50}
              ></Image>
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={postdata?.user.name}
          subheader={postdata?.createdAt}
          titleTypographyProps={{
            style: { cursor: "pointer", width: "fit-content" },
            onClick: () => {
              handleProfile(postdata._id);
            },
          }}
        />
        {postdata?.image && typeof postdata?.image === "string" ? (
          <CardMedia
            component="img"
            height="194"
            image={postdata?.image}
            alt={postdata?.user.name}
          />
        ) : null}

        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {postdata?.body}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton
            onClick={() => handleSinglePost(postdata?._id)}
            aria-label="add to favorites"
          >
            <CommentIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ThumbUpAltIcon />
          </IconButton>
        </CardActions>
      </Card>
      {postdata?.comments.length > 0 && !allComments ? (
        <Box>
          <CardHeader
            avatar={
              <Avatar
                onClick={() => {
                  handleProfile(postdata?.comments[0]?.commentCreator._id);
                }}
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
              >
                <Image src={img} alt="img" width={50} height={50}></Image>
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={postdata?.comments[0]?.commentCreator.name}
            subheader={postdata?.comments[0]?.createdAt}
            titleTypographyProps={{
              style: { cursor: "pointer", width: "fit-content" },
              onClick: () => {
                handleProfile(postdata?.comments[0]?.commentCreator._id);
              },
            }}
          />
          <CardContent>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {postdata?.comments[0]?.content}
            </Typography>
          </CardContent>
        </Box>
      ) : null}

      {postdata?.comments.length > 0 && allComments
        ? postdata?.comments.map((comment) => (
            <Box key={comment._id}>
              <CardHeader
                avatar={
                  <Avatar
                    onClick={() => {
                      handleProfile(comment?.commentCreator?._id);
                    }}
                    sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                  >
                    <Image src={img} alt="img" width={50} height={50}></Image>
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={comment?.commentCreator?.name}
                subheader={comment?.createdAt}
                titleTypographyProps={{
                  style: { cursor: "pointer", width: "fit-content" },
                  onClick: () => {
                    handleProfile(comment?.commentCreator?._id);
                  },
                }}
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {comment?.content}
                </Typography>
              </CardContent>
            </Box>
          ))
        : null}
    </Box>
  );
}
