"use client";
import { getSinglePost } from '@/lib/postsSlice';
import { dispatchType, stateType } from '@/lib/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Posts from '@/app/posts/page';




export default function PostPage(props:{params:{id:string}}) {

  let dispatch = useDispatch<dispatchType>()

  let {singlePost} = useSelector((state:stateType)=>state.post)

    useEffect(() => {

    dispatch(getSinglePost(props.params.id))

    }, [])


  return<>
  <Posts postdata = {singlePost} allComments={true}/>
  
  
  </>
}
