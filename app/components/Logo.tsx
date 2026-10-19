import Image from 'next/image';

interface LogoProps {
  className?: string;
  priority?: boolean;
}

const Logo = ({ className = "w-auto h-12", priority = false }: LogoProps) => {
  return (
    <div className="flex items-center">
      <Image
        src="/logo.jpg"
        alt="LayerNLooms Logo"
        width={180}
        height={48}
        className={`${className} object-contain dark:invert`}
        priority={priority}
      />
    </div>
  );
};

export default Logo;

