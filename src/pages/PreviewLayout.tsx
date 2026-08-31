import type React from "react"

export interface PreviewLayoutProps {
  title: string
  children: React.ReactNode
}

export const PreviewLayout: React.FC<PreviewLayoutProps> = ({
  title,
  children,
}) => {
  return (
    <html lang="nb">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          html, body {
            width: 100%;
            height: 100%;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: #f5f5f5;
            padding: 2rem;
          }

          .container {
            max-width: 900px;
            margin: 0 auto;
          }

          h1 {
            color: #1a1a1a;
            margin-bottom: 1rem;
            font-size: 2rem;
          }

          .subtitle {
            color: #666;
            margin-bottom: 2rem;
            font-size: 1.1rem;
          }

          .back-link {
            margin-bottom: 2rem;
          }

          .back-link a {
            color: #007acc;
            text-decoration: none;
            font-weight: 500;
          }

          .back-link a:hover {
            text-decoration: underline;
          }

          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 1.5rem;
          }

          .card {
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: box-shadow 0.2s, transform 0.2s;
          }

          .card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateY(-2px);
          }

          .rapport-card {
            cursor: pointer;
            text-decoration: none;
            color: inherit;
            display: block;
            padding: 2rem;
          }

          .rapport-card:hover {
            background-color: #fafafa;
          }

          .rapport-kode {
            display: inline-block;
            background: #007acc;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
          }

          .rapport-tittel {
            font-size: 1.4rem;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 0.5rem;
          }

          .rapport-beskrivelse {
            color: #666;
            font-size: 0.95rem;
            line-height: 1.5;
          }

          .scenario-card {
            padding: 1.5rem;
          }

          .scenario-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 0.5rem;
          }

          .scenario-description {
            color: #666;
            margin-bottom: 1rem;
            font-size: 0.95rem;
            line-height: 1.5;
          }

          .scenario-meta {
            color: #999;
            font-size: 0.85rem;
            margin-bottom: 1rem;
          }

          .scenario-meta code {
            background: #f0f0f0;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            font-family: "Courier New", monospace;
          }

          .scenario-links {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
          }

          .btn {
            display: inline-block;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            border: 1px solid transparent;
            cursor: pointer;
            transition: all 0.2s;
          }

          .btn-html {
            background: #007acc;
            color: white;
          }

          .btn-html:hover {
            background: #005a9e;
          }

          .btn-pdf {
            background: #d32f2f;
            color: white;
          }

          .btn-pdf:hover {
            background: #b71c1c;
          }

          .footer {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid #ddd;
            color: #999;
            font-size: 0.9rem;
          }

          .footer code {
            background: #f0f0f0;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            font-family: "Courier New", monospace;
          }
        `}</style>
      </head>
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  )
}
