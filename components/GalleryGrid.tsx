import Image from 'next/image';
import type { GalleryImage } from '@/lib/types';

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid grid-cols-3 max-[900px]:grid-cols-2 gap-4">
      {images.map((img) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          width={400}
          height={190}
          className="w-full h-[190px] object-cover rounded-xl border border-line block"
        />
      ))}
    </div>
  );
}
