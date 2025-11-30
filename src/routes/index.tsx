import FileDropZone from "@/features/components/FileDropZone";
import NavigationTabs from "@/features/components/NavigationTabs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <FileDropZone />
      <NavigationTabs />
    </div>
  );
}
