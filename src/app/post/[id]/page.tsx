"use client";

import { getSinglePost } from "@/lib/postsSlice";
import { dispatchType, stateType } from "@/lib/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Posts from "@/app/posts/page";

type PostPageProps = {
  params: {
    id: string;
  };
};

export default function PostPage({ params }: PostPageProps) {
  const dispatch = useDispatch<dispatchType>();

  const { singlePost } = useSelector((state: stateType) => state.post);

  useEffect(() => {
    dispatch(getSinglePost(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      <Posts postdata={singlePost} allComments={true} />
    </>
  );
}
