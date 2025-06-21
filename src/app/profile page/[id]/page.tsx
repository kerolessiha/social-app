import React from "react";

export default function Profilepage({
  props,
}: {
  props: { params: { id: string } };
}) {
  console.log("props", props?.params?.id);
  return (
    <div>
      <h3>Hello this is my profile</h3>
    </div>
  );
}
