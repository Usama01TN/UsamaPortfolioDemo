import Image from "next/image";

export default function ProjectCover({ project, priority = false, sizes = "(min-width: 62rem) 40vw, 100vw", className }) {
  return (
    <Image
      className={className}
      src={`/projects/${project.slug}.svg`}
      alt={`Illustration of ${project.name}: ${project.summary}`}
      width={1200}
      height={750}
      sizes={sizes}
      priority={priority}
      unoptimized
    />
  );
}
