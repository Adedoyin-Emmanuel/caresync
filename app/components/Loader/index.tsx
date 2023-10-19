interface LoaderProps {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}
const Loader = ({ size, className }: LoaderProps) => {
  const loaderSize = size || "lg";
  return (
    <div
      className={`loading loading-infinity loading-${loaderSize} bg-accent ${className}`}
    ></div>
  );
};

export default Loader;
