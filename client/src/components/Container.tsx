import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        paddingLeft: "15px",
        paddingRight: "15px",
      }}
    >
      {children}
    </div>
  );
}
