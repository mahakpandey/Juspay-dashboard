"use client";

import React, { useCallback, useState } from "react";
import NextImage from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ImageProps extends React.ComponentProps<typeof NextImage> {
  containerProps?: React.ComponentProps<"div">;
  fallbackImage?: string;
}

const FALLBACK_IMAGE_URL = "/user-icon.png";
export default function Image({
  containerProps,
  width = 200,
  height = 200,
  alt = "User Image",
  fallbackImage = FALLBACK_IMAGE_URL,
  ...props
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setError(true);
  }, []);

  return (
    <div
      {...containerProps}
      className={cn(
        "relative size-full",
        props.className,
        containerProps?.className,
      )}
    >
      {isLoading && <Skeleton className="absolute inset-0 w-full" />}
      {error && (
        <div className="absolute inset-0 flex justify-end bg-neutral-800">
          <NextImage
            src={fallbackImage}
            height={100}
            width={100}
            className="size-full object-cover opacity-10"
            alt={alt || "fallback-image"}
          />
        </div>
      )}

      <NextImage
        width={width}
        height={height}
        {...props}
        onLoad={handleImageLoad}
        onError={handleImageError}
        alt={alt}
        className={cn(
          "size-full object-cover transition-opacity",
          isLoading || error ? "opacity-0" : "opacity-100",
          props.className,
        )}
      />
    </div>
  );
}
