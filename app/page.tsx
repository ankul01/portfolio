export default function Home() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `window.location.replace('/about/');` }} />
      <noscript>
        <meta httpEquiv="refresh" content="0;url=/about/" />
      </noscript>
      <div className="min-h-screen flex items-center justify-center">
        <p>Redirecting to <a href="/about/" className="text-blue-600 underline">About</a>...</p>
      </div>
    </>
  );
}
