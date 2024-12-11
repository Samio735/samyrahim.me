import { useState } from "react";
import { Tilt } from "./motion-ui/Tilt";
import { Spotlight } from "./motion-ui/Spotlight";
import { Cursor } from "./motion-ui/Cursor";
import { MouseIcon } from "./MouseIcon";

const projects = [
    {
        title: "AI Voice Cold Calling System",
        image: "thalesVoice.png",
        description: [
            "An advanced AI system that handles cold calling operations autonomously, utilizing natural language processing and voice synthesis technology. The system employs state-of-the-art speech recognition and generation models to conduct natural conversations with potential customers.",
            "Through machine learning algorithms, it continuously improves its communication strategies based on customer interactions and feedback. The system includes real-time analytics, call monitoring, and integration capabilities with popular CRM platforms."
        ]
    },
    {
        title: "Meta Platforms AI Support Chatbot",
        image: "/chatbot.jpg",
        description: [
            "An intelligent chatbot solution for Meta Platforms that provides 24/7 customer support using advanced language models and conversation flow management. The chatbot handles multiple languages and complex query resolution, significantly reducing response times and improving user satisfaction.",
            "The system features dynamic learning capabilities, sentiment analysis, and seamless handover to human agents when needed. It integrates with Meta's existing support infrastructure and provides detailed analytics on user interactions and resolution rates."
        ]
    },
    {
        title: "AI Productivity Chrome Extension",
        image: "/intentional.png",
        description: [
            "A browser extension that leverages AI to boost productivity by analyzing browsing patterns and providing smart suggestions and automation. The extension learns from user behavior to identify time-wasting patterns and offers personalized productivity recommendations.",
            "Features include intelligent tab management, focus mode with AI-driven website blocking, and smart bookmarking that automatically organizes saved content. The extension also provides detailed productivity insights and integrates with popular task management tools."
        ]
    }
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    return (
        <>
            <section className="py-16 mt-40">
                <div className="container mx-auto max-w-screen-lg px-4">
                    <h2 className="text-4xl font-semibold text-center text-gray-950 dark:text-white mb-12">Projects Showcase</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        {projects.map((project, index) => (
                            <div 
                                key={index} 
                                className="aspect-video relative flex flex-col items-center"
                                onClick={() => setSelectedProject(project)}
                            >
                                <Tilt 
                                    rotationFactor={6} 
                                    isRevese 
                                    style={{ transformOrigin: 'center center' }}
                                    springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
                                    className="group relative rounded-lg overflow-hidden  max-w-96 cursor-none"
                                >
                                    <Cursor
                                        attachToParent
                                        variants={{
                                            initial: { scale: 0.3, opacity: 0 },
                                            animate: { scale: 1, opacity: 1 },
                                            exit: { scale: 0.3, opacity: 0 },
                                        }}
                                        transition={{
                                            duration: 0.2
                                        }}
                                        className="absolute z-50"
                                    >
                                        <div className="flex items-center">
                                            <MouseIcon className="h-6 w-6" />
                                            <div className="ml-2 rounded-[4px] bg-green-500 px-2 py-0.5 text-neutral-50 whitespace-nowrap">
                                                Click to view
                                            </div>
                                        </div>
                                    </Cursor>
                                    <Spotlight 
                                        className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
                                        size={248}
                                        springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
                                    />
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="h-48 w-full rounded-lg object-contain"
                                    />
                                </Tilt>
                                <div className="flex flex-col items-center space-y-0.5 pb-0 pt-4">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">{project.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {selectedProject && (
                <div 
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                    onClick={() => setSelectedProject(null)}
                >
                    <div 
                        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-screen-md w-full h-[95vh] overflow-auto relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            onClick={() => setSelectedProject(null)}
                        >
                            ✕
                        </button>
                        <div className="flex justify-center">
                            <img 
                                src={selectedProject.image} 
                                alt={selectedProject.title} 
                                className="  mt-2  mb-10"
                            />
                        </div>
                        <h3 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
                            {selectedProject.title}
                        </h3>
                        <div className="space-y-4">
                            {selectedProject.description.map((paragraph, index) => (
                                <p key={index} className="text-gray-700 dark:text-gray-300 text-lg">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}