"use client";

import * as Collapsible from "@radix-ui/react-collapsible";

import LocalizedInput from "@formbricks/ee/multiLanguage/components/LocalizedInput";
import { cn } from "@formbricks/lib/cn";
import { TSurvey } from "@formbricks/types/surveys";
import { TI18nString } from "@formbricks/types/surveys";
import { Label } from "@formbricks/ui/Label";
import { Switch } from "@formbricks/ui/Switch";

interface EditThankYouCardProps {
  localSurvey: TSurvey;
  setLocalSurvey: (survey: TSurvey) => void;
  setActiveQuestionId: (id: string | null) => void;
  activeQuestionId: string | null;
  isInvalid: boolean;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  languages: string[][];
}

export default function EditThankYouCard({
  localSurvey,
  setLocalSurvey,
  setActiveQuestionId,
  activeQuestionId,
  isInvalid,
  selectedLanguage,
  setSelectedLanguage,
  languages,
}: EditThankYouCardProps) {
  // const [open, setOpen] = useState(false);
  let open = activeQuestionId == "end";
  const setOpen = (e) => {
    if (e) {
      setActiveQuestionId("end");
    } else {
      setActiveQuestionId(null);
    }
  };

  const updateSurvey = (data) => {
    setLocalSurvey({
      ...localSurvey,
      thankYouCard: {
        ...localSurvey.thankYouCard,
        ...data,
      },
    });
  };

  return (
    <div
      className={cn(
        open ? "scale-100 shadow-lg " : "scale-97 shadow-md",
        "group z-20 flex flex-row rounded-lg bg-white transition-transform duration-300 ease-in-out"
      )}>
      <div
        className={cn(
          open ? "bg-slate-50" : "bg-white group-hover:bg-slate-50",
          "flex w-10 items-center justify-center rounded-l-lg border-b border-l border-t group-aria-expanded:rounded-bl-none"
        )}>
        <p>🙏</p>
      </div>
      <Collapsible.Root
        open={open}
        onOpenChange={setOpen}
        className="flex-1 rounded-r-lg border border-slate-200 transition-all duration-300 ease-in-out">
        <Collapsible.CollapsibleTrigger
          asChild
          className="flex cursor-pointer justify-between p-4 hover:bg-slate-50">
          <div>
            <div className="inline-flex">
              <div>
                <p className="text-sm font-semibold">Thank You Card</p>
                {!open && (
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {localSurvey?.thankYouCard?.enabled ? "Shown" : "Hidden"}
                  </p>
                )}
              </div>
            </div>

            {localSurvey.type !== "link" && (
              <div className="flex items-center space-x-2">
                <Label htmlFor="thank-you-toggle">Show</Label>

                <Switch
                  id="thank-you-toggle"
                  checked={localSurvey?.thankYouCard?.enabled}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateSurvey({ enabled: !localSurvey.thankYouCard?.enabled });
                  }}
                />
              </div>
            )}
          </div>
        </Collapsible.CollapsibleTrigger>
        <Collapsible.CollapsibleContent className="px-4 pb-6">
          <form>
            <div className="mt-3">
              <Label htmlFor="headline">Headline</Label>
              <div className="mt-2">
                <LocalizedInput
                  id="headline"
                  name="headline"
                  value={localSurvey?.thankYouCard?.headline as TI18nString}
                  languages={languages}
                  isInvalid={isInvalid}
                  onChange={(e) => {
                    let translatedHeadline = {
                      ...(localSurvey?.thankYouCard?.headline as TI18nString),
                      [selectedLanguage]: e.target.value,
                    };
                    updateSurvey({ headline: translatedHeadline });
                  }}
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                />
              </div>
            </div>

            <div className="mt-3">
              <Label htmlFor="subheader">Description</Label>
              <div className="mt-2">
                <LocalizedInput
                  id="subheader"
                  name="subheader"
                  value={localSurvey?.thankYouCard?.subheader as TI18nString}
                  languages={languages}
                  isInvalid={isInvalid}
                  onChange={(e) => {
                    let translatedSubheader = {
                      ...(localSurvey?.thankYouCard?.subheader as TI18nString),
                      [selectedLanguage]: e.target.value,
                    };
                    updateSurvey({ subheader: translatedSubheader });
                  }}
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                />
              </div>
            </div>
          </form>
        </Collapsible.CollapsibleContent>
      </Collapsible.Root>
    </div>
  );
}
