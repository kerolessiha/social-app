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

export default async function PostPage({ params }: PostPageProps) {
  return <ClientPostPage id={params.id} />;
}

function ClientPostPage({ id }: { id: string }) {
  const dispatch = useDispatch<dispatchType>();
  const { singlePost } = useSelector((state: stateType) => state.post);

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [dispatch, id]);

  return <Posts postdata={singlePost} allComments={true} />;
}
