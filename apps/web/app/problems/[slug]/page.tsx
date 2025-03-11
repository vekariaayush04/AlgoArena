import React from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const p = await params;
  return <div>{p.slug}</div>;
};

export default page;
