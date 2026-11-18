export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  iconName: "lightbulb" | "pen-tool" | "code" | "shield-check" | "cloud-upload" | "settings";
}

export const processSectionData: ProcessStep[] = [
  {
    id: "discovery",
    number: "01",
    title: "Discovery",
    description: "Understand your goals, requirements, and vision.",
    image: "/process/01-discovery.svg",
    iconName: "lightbulb",
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    description: "Create intuitive and user-focused designs that solve real problems.",
    image: "/process/02-design.svg",
    iconName: "pen-tool",
  },
  {
    id: "development",
    number: "03",
    title: "Development",
    description: "Build a scalable, secure, and high-performance solution.",
    image: "/process/03-development.svg",
    iconName: "code",
  },
  {
    id: "testing",
    number: "04",
    title: "Testing",
    description: "Ensure quality, performance, and a seamless user experience.",
    image: "/process/04-testing.svg",
    iconName: "shield-check",
  },
  {
    id: "deployment",
    number: "05",
    title: "Deployment",
    description: "Launch your solution with a smooth and reliable rollout.",
    image: "/process/05-deployment.svg",
    iconName: "cloud-upload",
  },
  {
    id: "maintenance",
    number: "06",
    title: "Maintenance",
    description: "Keep it secure, updated, and running at its best.",
    image: "/process/06-maintenance.svg",
    iconName: "settings",
  },
];

