module.exports = {
  stylesheet: [],
  css: `
    body { font-family: 'Segoe UI', sans-serif; font-size: 13px; color: #1e293b; max-width: 860px; margin: 0 auto; padding: 24px; }
    h1 { color: #1e3a8a; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; }
    h2 { color: #1d4ed8; margin-top: 32px; }
    h3 { color: #2563eb; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 12px; }
    pre { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; overflow-x: auto; }
    blockquote { border-left: 4px solid #3b82f6; margin: 0; padding-left: 16px; color: #475569; }
    hr { border: none; border-top: 1px solid #e2e8f0; margin: 24px 0; }
    .mermaid { text-align: center; margin: 20px 0; }
  `,
  script: [
    { url: 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js' },
    { content: 'mermaid.initialize({ startOnLoad: true, theme: "neutral" });' },
  ],
  pdf_options: {
    format: 'A4',
    margin: { top: '20mm', right: '18mm', bottom: '20mm', left: '18mm' },
    printBackground: true,
  },
  launch_options: {
    args: ['--no-sandbox'],
  },
};
