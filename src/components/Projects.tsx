import { Tilt } from "./motion-ui/Tilt";
import { Spotlight } from "./motion-ui/Spotlight";
import { Cursor } from "./motion-ui/Cursor";
import { MouseIcon } from "./MouseIcon";

const projects = [
    {
        title: "AI Voice Cold Calling System",
        image: "thalesVoice.png"
    },
    {
        title: "Meta Platforms AI Support Chatbot",
        image: "/chatbot.jpg"
    },
    {
        title: "AI Productivity Chrome Extension",
        image: "/intentional.png"
    }
];

export default function Projects() {
    return (
        <section className="py-16 mt-40">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-semibold text-center text-gray-950 dark:text-white mb-12">Projects Showcase</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="aspect-video relative">
                            <Tilt 
                                rotationFactor={6} 
                                isRevese 
                                style={{ transformOrigin: 'center center' }}
                                springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
                                className="group relative rounded-lg overflow-hidden cursor-none"
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
                                    className="h-48 w-full rounded-lg object-cover"
                                />
                            </Tilt>
                            <div className="flex flex-col space-y-0.5 pb-0 pt-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}