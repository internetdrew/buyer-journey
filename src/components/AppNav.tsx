import { CircleQuestionMark } from 'lucide-react';

function AppNav() {
  return (
    <nav className="flex items-center justify-between py-4">
      <span className="text-lg font-semibold">Base Robotics</span>
      <CircleQuestionMark
        aria-label="Help"
        className="size-6 text-neutral-600"
        strokeWidth={2}
      />
    </nav>
  );
}

export default AppNav;
