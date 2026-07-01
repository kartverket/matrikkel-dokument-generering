import { renderToStaticMarkup } from "react-dom/server";

const css = ""

function DocumentComponent({ data }: { data: unknown }) {
    return <div className="text-2xl font-bold">{JSON.stringify(data)}</div>;
}

export function renderDocument(data: unknown): string {
    const body = renderToStaticMarkup(<DocumentComponent data={data} />);
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="utf-8">
              <style>${css}</style>
            </head>
            <body>${body}</body>
            </html>`;
}