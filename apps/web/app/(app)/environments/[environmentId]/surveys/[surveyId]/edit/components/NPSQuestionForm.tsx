"use client";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

import LocalizedInput from "@formbricks/ee/multiLanguage/components/LocalizedInput";
import { TSurvey, TSurveyNPSQuestion } from "@formbricks/types/surveys";
import { TI18nString } from "@formbricks/types/surveys";
import { Button } from "@formbricks/ui/Button";
import { Label } from "@formbricks/ui/Label";
import QuestionFormInput from "@formbricks/ui/QuestionFormInput";

interface NPSQuestionFormProps {
  localSurvey: TSurvey;
  question: TSurveyNPSQuestion;
  questionIdx: number;
  updateQuestion: (questionIdx: number, updatedAttributes: any) => void;
  lastQuestion: boolean;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  languages: string[][];
  isInvalid: boolean;
}

export default function NPSQuestionForm({
  question,
  questionIdx,
  updateQuestion,
  lastQuestion,
  isInvalid,
  localSurvey,
  selectedLanguage,
  setSelectedLanguage,
  languages,
}: NPSQuestionFormProps): JSX.Element {
  const [showSubheader, setShowSubheader] = useState(!!question.subheader);
  const environmentId = localSurvey.environmentId;

  return (
    <form>
      <QuestionFormInput
        localSurvey={localSurvey}
        environmentId={environmentId}
        isInvalid={isInvalid}
        questionId={question.id}
        questionIdx={questionIdx}
        updateQuestion={updateQuestion}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        languages={languages}
        type="headline"
      />

      <div>
        {showSubheader && (
          <>
            <Label htmlFor="subheader">Description</Label>
            <div className="mt-2 inline-flex w-full items-center">
              <LocalizedInput
                id="subheader"
                name="subheader"
                value={question.subheader as TI18nString}
                languages={languages}
                isInvalid={isInvalid}
                onChange={(e) => {
                  let translatedSubheader = {
                    ...(question.subheader as TI18nString),
                    [selectedLanguage]: e.target.value,
                  };
                  updateQuestion(questionIdx, { subheader: translatedSubheader });
                }}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
              />
              <TrashIcon
                className="ml-2 mt-10 h-4 w-4 cursor-pointer text-slate-400 hover:text-slate-500"
                onClick={() => {
                  setShowSubheader(false);
                  updateQuestion(questionIdx, { subheader: "" });
                }}
              />
            </div>
          </>
        )}
        {!showSubheader && (
          <Button
            size="sm"
            variant="minimal"
            className="mt-3"
            type="button"
            onClick={() => setShowSubheader(true)}>
            <PlusIcon className="mr-1 h-4 w-4" />
            Add Description
          </Button>
        )}
      </div>

      <div className="mt-3 flex justify-between space-x-2">
        <div className="w-full">
          <Label htmlFor="subheader">Lower label</Label>
          <div className="mt-2">
            <LocalizedInput
              id="lowerLabel"
              name="lowerLabel"
              value={question.lowerLabel as TI18nString}
              languages={languages}
              isInvalid={isInvalid}
              onChange={(e) => {
                let translatedLowerLabel = {
                  ...(question.lowerLabel as TI18nString),
                  [selectedLanguage]: e.target.value,
                };
                updateQuestion(questionIdx, { lowerLabel: translatedLowerLabel });
              }}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
          </div>
        </div>
        <div className="w-full">
          <Label htmlFor="subheader">Upper label</Label>
          <div className="mt-2">
            <LocalizedInput
              id="upperLabel"
              name="upperLabel"
              value={question.upperLabel as TI18nString}
              languages={languages}
              isInvalid={isInvalid}
              onChange={(e) => {
                let translatedUpperLabel = {
                  ...(question.upperLabel as TI18nString),
                  [selectedLanguage]: e.target.value,
                };
                updateQuestion(questionIdx, { upperLabel: translatedUpperLabel });
              }}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
          </div>
        </div>
      </div>

      {!question.required && (
        <div className="mt-3">
          <Label htmlFor="buttonLabel">Button Label</Label>
          <div className="mt-2">
            <LocalizedInput
              id="buttonLabel"
              name="buttonLabel"
              value={question.buttonLabel as TI18nString}
              placeholder={lastQuestion ? "Finish" : "Next"}
              languages={languages}
              isInvalid={isInvalid}
              onChange={(e) => {
                let translatedButtonLabel = {
                  ...(question.buttonLabel as TI18nString),
                  [selectedLanguage]: e.target.value,
                };
                updateQuestion(questionIdx, { buttonLabel: translatedButtonLabel });
              }}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
          </div>
        </div>
      )}
    </form>
  );
}
