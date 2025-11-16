import FileDropZone from "@/features/components/FileDropZone";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <FileDropZone />
    </div>
  );
}
