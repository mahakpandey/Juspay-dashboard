/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { MapMarker } from "@/assets/svgs";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipComponent } from "@/components/ui/tooltip";
import useRevenueMap from "@/hooks/query/use-revenue-map";
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

export default function WorldMap() {
  const { data, isLoading } = useRevenueMap();
  if (isLoading) {
    return (
      <div className="size-full ~aspect-square my-2">
        <Skeleton className="size-full bg-foreground/10 duration-100" />
      </div>
    );
  }
  if (!data?.data) {
    return <div>No data available</div>;
  }
  return (
    <ComposableMap className="max-w-[200px] mx-auto">
      <Geographies geography={data.data}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              className="fill-secondary-cyan-custom"
              key={geo.rsmKey}
              geography={geo}
            />
          ))
        }
      </Geographies>
      {data.markers.slice(0, 10).map((marker) => (
        <Marker
          className="size-2"
          key={marker.countryName}
          coordinates={marker.point}
        >
          <TooltipComponent tooltip={marker.countryName}>
            <MapMarker />
          </TooltipComponent>
        </Marker>
      ))}
    </ComposableMap>
  );
}
