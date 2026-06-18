import Image from 'next/image';

const Logo = ({ className = "w-auto h-12" }: { className?: string }) => {
  return (
    <div className="flex items-center">
      <Image
        src="/logo.jpg"
        alt="LayerNLooms Logo"
        width={300}
        height={300}
        className={`${className} object-contain dark:invert`}
        priority
      />
    </div>
  );
};

export default Logo;
