"use client";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

interface TypewriterEffectDemoProps {
    data: {
        content: string;
    }[];
}

export function Typewriter({ data }: TypewriterEffectDemoProps) {

    const words = data.map(item => ({
        text: item.content,
    }));

    return (
        <TypewriterEffect words={words} />
    );
}
