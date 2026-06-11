import { useState } from 'react';

export default function ImageWithSkeleton({ src, alt, className = '' }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div className="absolute inset-0 skeleton" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      />
    </>
  );
}
