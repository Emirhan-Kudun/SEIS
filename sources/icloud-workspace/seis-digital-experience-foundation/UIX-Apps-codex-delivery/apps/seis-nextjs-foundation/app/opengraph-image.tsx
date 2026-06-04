import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0f0d0b",
          color: "#f1e8dc",
          padding: "64px"
        }}
      >
        <p style={{ margin: 0, fontSize: 22, letterSpacing: 2.4, textTransform: "uppercase", opacity: 0.82 }}>
          SEIS Supreme Website OS
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <h1 style={{ margin: 0, fontSize: 74, lineHeight: 1.05 }}>Cinematic premium website systems.</h1>
          <p style={{ margin: 0, fontSize: 30, opacity: 0.86 }}>
            AI-native design, fullstack, motion, product, and governance in one operating model.
          </p>
        </div>
        <p style={{ margin: 0, fontSize: 22, opacity: 0.76 }}>tr · en · fr · it · de</p>
      </div>
    ),
    size
  );
}
