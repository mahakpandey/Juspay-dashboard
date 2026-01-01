import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const slug = await params;
  if (!slug?.slug) {
    return null;
  }
  return (
    <div className="overflow-auto p-7">
      <h2 className="font-semibold uppercase opacity-20">
        {slug.slug.join(" / ")}
      </h2>
    </div>
  );
}
