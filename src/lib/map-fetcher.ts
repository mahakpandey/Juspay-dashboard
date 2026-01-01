export type TCountryMarker = {
  countryName: string;
  point: [number, number];
  randomStat: number;
};

const topologicalJsonUrl = "/features.json";

export interface Topology {
  arcs: Arc[];
  bbox: [number, number, number, number];
  objects: Record<string, TopologyObject>;
  type: "Topology";
}

export interface TopologyObject {
  geometries: Geometry[];
  type: "GeometryCollection";
}

export type Geometry = PolygonGeometry | MultiPolygonGeometry;

export interface PolygonGeometry {
  arcs: number[][];
  // each polygon consists of one or more arcs
  id: string;
  properties: GeometryProperties;
  type: "Polygon";
}

export interface MultiPolygonGeometry {
  arcs: number[][][];
  // multipolygon = array of polygons = array of arcs
  id: string;
  properties: GeometryProperties;
  type: "MultiPolygon";
}

export interface GeometryProperties {
  name: string;
}

export type Arc = [number, number][]; // an arc is an array of coordinate pairs

export async function getRandomCountries(N: number = 50): Promise<{
  data: Topology | Record<string, never>;
  markers: TCountryMarker[];
}> {
  try {
    const res = await fetch(topologicalJsonUrl);
    if (!res.ok) {
      console.error("Failed to fetch topologicalJson");
      return { data: {}, markers: [] };
    }
    const topologicalJson = (await res.json()) as Topology;

    const geometries =
      topologicalJson.objects.world?.geometries ||
      topologicalJson.objects.countries?.geometries ||
      [];

    if (!Array.isArray(geometries) || geometries.length === 0) {
      console.error("No geometries found");
      return { data: {}, markers: [] };
    }

    const selected = geometries.sort(() => 0.5 - Math.random()).slice(0, N);

    const countries: TCountryMarker[] = selected.map((geo: Geometry) => {
      const name = geo.properties?.name || geo.id || "Unknown";

      const randomStat = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;

      let point: [number, number] = [0, 0];
      if (geo.arcs && topologicalJson.arcs) {
        const arcIndex =
          geo.arcs.flat()[Math.floor(Math.random() * geo.arcs.flat().length)];

        const arc = topologicalJson.arcs[arcIndex as number];
        if (arc) {
          point = arc[Math.floor(Math.random() * arc.length)];
        }
      }

      if (point[0] === 0 && point[1] === 0) {
        point = [Math.random() * 360 - 180, Math.random() * 180 - 90];
      }

      return { countryName: name, randomStat, point };
    });

    countries.sort((a, b) => b.randomStat - a.randomStat);

    return { data: topologicalJson, markers: countries };
  } catch (err) {
    console.error("Error fetching countries:", err);
    return { data: {}, markers: [] };
  }
}
