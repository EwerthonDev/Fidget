import { useState } from "react";
import { CloseButton } from "../CloseButton";

import bugImageUrl from '../../assets/img/bug.svg';
import ideaImageUrl from '../../assets/img/idea.svg';
import thoughtImageUrl from '../../assets/img/thought.svg';
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
    BUG: {
        title: "Bug",
        image: {
            source: bugImageUrl,
            alt: 'A bug image'
        },
    },
    IDEA: {
        title: "Idea",
        image: {
            source: ideaImageUrl,
            alt: 'A light bulb image'
        },
    },
    OTHER: {
        title: "Other",
        image: {
            source: thoughtImageUrl,
            alt: 'A thought cloud image'
        },
    }
};

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false);
    function handleRestartFeedback() {
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return (
        <div className="bg-gray-800 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] sm:w-auto">
            { feedbackSent ? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                        <FeedbackContentStep
                            feedbackType={feedbackType} 
                            onFeedbackRestartRequested={handleRestartFeedback}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )}
                </>
            )}
            <footer className="text-xs text-zinc-200">
                Made with 💗 by <a className="underline underline-offset-2" href="https://github.com/EwerthonDev">Ewerthon</a>
            </footer>
        </div>
    );
}