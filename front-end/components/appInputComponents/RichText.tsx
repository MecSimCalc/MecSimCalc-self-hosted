import React from "react";
import { renderHTML } from "../ViewApp/ViewAppOutputs";
import { DefaultProps } from "./constants";

interface Props {
  richText: string;
  richtext?: string; // alternative to solve DOM error
}
// Apply QuillJS styles outside editor https://stackoverflow.com/a/62778545
export default function RichText({ richText, richtext, ...rest }: Props) {
  return (
    <div className="ql-snow" style={{ width: "100%" }}>
      <div
        className="ql-editor"
        style={{ height: "fit-content", fontSize: "16px", padding: 0 }}
        dangerouslySetInnerHTML={{
          __html: renderHTML({ html: richtext || richText }),
        }}
        suppressHydrationWarning
      />
    </div>
  );
}

export const defaultProps: DefaultProps = {
  required: {
    richText: "<strong>Rich</strong> <em>Text</em> {{ 'x^2'|katex }}",
  },
};
