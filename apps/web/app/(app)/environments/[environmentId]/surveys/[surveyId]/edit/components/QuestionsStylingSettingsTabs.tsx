import { Cog8ToothIcon, PaintBrushIcon, QueueListIcon } from "@heroicons/react/24/solid";
import { useMemo } from "react";

import { cn } from "@formbricks/lib/cn";
import { TSurveyEditorTabs } from "@formbricks/types/surveys";

type Tab = {
  id: TSurveyEditorTabs;
  label: string;
  icon: JSX.Element;
};

const tabs: Tab[] = [
  {
    id: "questions",
    label: "Questions",
    icon: <QueueListIcon />,
  },
  {
    id: "styling",
    label: "Styling",
    icon: <PaintBrushIcon />,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Cog8ToothIcon />,
  },
];

interface QuestionsAudienceTabsProps {
  activeId: TSurveyEditorTabs;
  setActiveId: React.Dispatch<React.SetStateAction<TSurveyEditorTabs>>;
  isStylingTabVisible?: boolean;
}

export default function QuestionsAudienceTabs({
  activeId,
  setActiveId,
  isStylingTabVisible,
}: QuestionsAudienceTabsProps) {
  const tabsComputed = useMemo(() => {
    if (isStylingTabVisible) {
      return tabs;
    }
    return tabs.filter((tab) => tab.id !== "styling");
  }, [isStylingTabVisible]);

  return (
    <div className="fixed z-10 flex h-14 w-full items-center justify-center border bg-white md:w-1/2">
      <nav className="flex h-full items-center space-x-4" aria-label="Tabs">
        {tabsComputed.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveId(tab.id)}
            className={cn(
              tab.id === activeId
                ? " border-brand-dark border-b-2 font-semibold text-slate-900"
                : "text-slate-500 hover:text-slate-700",
              "flex h-full items-center px-3 text-sm font-medium"
            )}
            aria-current={tab.id === activeId ? "page" : undefined}>
            {tab.icon && <div className="mr-2 h-5 w-5">{tab.icon}</div>}
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}