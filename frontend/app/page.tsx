import Button from "@/components/Button";
import Input from "@/components/Input";
import Card from "@/components/Card";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-screen">
      <Card className="flex flex-col gap-4 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-center" style={{ color: 'var(--accent)' }}>
          Component Playground
        </h1>
        <Input label="Task title" placeholder="e.g. Design homepage" />
        <div className="flex gap-2">
          <Button variant="primary">Continue as Guest</Button>
          <Button variant="secondary">Login with Google</Button>
        </div>
      </Card>
    </div>
  );
}