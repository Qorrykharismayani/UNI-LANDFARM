"use client";

import dynamic from 'next/dynamic';

// Load existing single-page React client dynamically with SSR disabled
const App = dynamic(() => import('../App'), {
  ssr: false,
});

export default function Home() {
  return <App />;
}
