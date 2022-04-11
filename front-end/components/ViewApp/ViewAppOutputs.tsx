import { Alert, AlertTitle, Card, CardContent, Divider } from "@mui/material";
import React from "react";
import { App } from "../types";
import DOMPurify from "isomorphic-dompurify";
import katex from "katex";
import { parse } from "node-html-parser";
import nunjucks from "nunjucks";

interface Props {
  app: App;
  innerRef: any;
  data: any;
}

/**
 * Convert string to HTML
 * 1. Sanitize code with DOMPurify
 * 2. Wrap code blocks with {% raw %}
 * 3. Replace &lt; and &gt; for > and < to work
 * 4. Apply nunjucks with katex filter
 * @param html string to convert to HTML
 * @param throwOnError throw an error or suppress errors
 * @param context nunjuck context variables
 * @returns nunjucks string
 */
export function renderHTML({
  html: dirtyHtml,
  throwOnError = false,
  context = {},
}: {
  html: string;
  throwOnError?: boolean;
  context?: object;
}): string {
  // (1) Purify the HTML string
  const purifiedStr = DOMPurify.sanitize(dirtyHtml);
  // (2) Wrap code blocks with {% raw %}
  const purifiedHtml = parse(purifiedStr); // convert string to DOM elements
  purifiedHtml.querySelectorAll("pre").forEach((element) => {
    element.innerHTML = `{% raw %}${element.innerHTML}{% endraw %}`;
  });
  const rawAppliedStr = purifiedHtml.toString();

  // (3) QuillJS and DOMPurify escapes `>` to `&gt;` and `<` to `&lt`
  const html = rawAppliedStr.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  // (4) Build environment
  // set autoescape to `false` to render HTML without the `safe` filter
  const nunjucksEnv = new nunjucks.Environment(null, {
    autoescape: false,
    throwOnUndefined: false,
  }).addFilter("katex", (value: string) =>
    // (4.1) Katex filter: render to katex
    katex.renderToString(String(value), { throwOnError })
  );
  // (5) Render string to HTML with user context
  try {
    return nunjucksEnv.renderString(html, context);
  } catch (e: any) {
    if (throwOnError) throw new Error(e);
    return String(e);
  }
}

export default function ViewAppOutputs({
  app: { output_html },
  innerRef,
  data: { outputs, stdout, error },
  ...rest
}: Props) {
  const html = renderHTML({ html: output_html, context: { outputs } });

  return (
    <Card raised elevation={2} sx={{ mt: "100px" }} ref={innerRef}>
      <CardContent>
        {!!error ? (
          <Alert severity="error">
            <AlertTitle>Unexpected Error</AlertTitle>
            <pre>{error}</pre>
            <Divider />
            <pre>{stdout}</pre>
          </Alert>
        ) : (
          <div className="ql-snow">
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
// Apply QuillJS styles outside editor https://stackoverflow.com/a/62778545
