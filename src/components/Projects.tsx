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
      `<strong>Project Vision</strong>`,
      `A cutting-edge automated outreach solution leveraging AI to transform how businesses connect with potential leads through intelligent, conversational communication across phone and WhatsApp platforms.`,
      " ",
      `<strong>The Challenge</strong>`,
      `Traditional outreach methods are:`,
      `<ul class="list-disc pl-6">
        <li>Time-consuming</li>
        <li>Inconsistent</li>
        <li>Heavily reliant on manual human intervention</li>
        <li>Limited by human bandwidth and potential for human error</li>
      </ul>`,
      " ",
      `<strong>Innovative Solution: AI-Driven Engagement Platform</strong>`,
      `<strong>Technical Architecture</strong>`,
      `Core Technologies:`,
      `<ul class="list-disc pl-6">
        <li>OpenAI AI Agents</li>
        <li>n8n Workflow Automation</li>
        <li>VAPI Voice AI Platform</li>
      </ul>`,
      " ",
      `<strong>Key Capabilities</strong>`,
      `<ul class="list-disc pl-6">
        <li>Intelligent Conversational Agents: AI-powered communication that adapts to lead responses</li>
        <li>Multi-Channel Outreach: Seamless engagement via phone and WhatsApp</li>
        <li>Automated Meeting Scheduling: Intelligent booking system that understands context and intent</li>
        <li>Real-time Interaction Management: Dynamic response generation</li>
      </ul>`,
      " ",
      `<strong>Technological Innovation</strong>`,
      `The system represents a breakthrough in automated sales engagement by:`,
      `<ul class="list-disc pl-6">
        <li>Applying advanced AI to conversational interfaces</li>
        <li>Creating human-like interaction at scale</li>
        <li>Reducing manual outreach overhead</li>
        <li>Providing consistent, intelligent communication</li>
      </ul>`,
      " ",
      `<strong>Potential Business Impact</strong>`,
      `<ul class="list-disc pl-6">
        <li>Efficiency Gains: Dramatically reduce time spent on initial lead contact</li>
        <li>Scalability: Enable consistent outreach across large lead databases</li>
        <li>Personalization: Deliver tailored communication at unprecedented scale</li>
        <li>Cost Optimization: Minimize human resource allocation in initial outreach</li>
      </ul>`,
      " ",
      `<strong>Technical Challenges Being Addressed</strong>`,
      `<ul class="list-disc pl-6">
        <li>Natural language understanding in diverse communication contexts</li>
        <li>Maintaining conversational authenticity</li>
        <li>Intelligent intent recognition</li>
        <li>Seamless multi-channel integration</li>
      </ul>`,
      " ",
      `<strong>Future Development Roadmap</strong>`,
      `<ul class="list-disc pl-6">
              <li>Intelligent Conversation Routing</li>
        <li>Advanced analytics and performance tracking</li>
      </ul>`,

      " ",
      `<strong>Pioneering the Future of Intelligent Business Communication</strong>`,
    ],
  },
  {
    title: "Meta Platforms AI Support Chatbot",
    image: "/chatbot.jpg",
    description: [
      `As a freelance AI solutions engineer, I developed an AI-powered chatbot to provide customer service and support for a major retail clothing store chain. The goal was to streamline their customer service operations, improve response times, and enhance overall customer satisfaction.`,
      " ",
      `<strong>Key Features</strong>`,
      `<ul class="list-disc pl-6">
        <li>Natural language processing to understand customer inquiries and intents</li>
        <li>Access to real-time product information, order status, and inventory data</li>
        <li>Ability to handle common customer requests like order placement, returns, and account management</li>
        <li>Integration with human agents to escalate complex issues</li>
        <li>Computer vision to identify products from photos and provide detailed information</li>
      </ul>`,
      " ",
      `<strong>Business Impact</strong>`,
      `The AI chatbot had a significant positive impact on the retailer's customer service operations:`,
      `<ol class="list-decimal pl-6">
        <li>80% improvement in support efficiency - Customers could resolve most issues without human agent intervention</li>
        <li>Response times reduced from days to seconds for common inquiries</li>
        <li>Customer satisfaction increased by 25% due to faster, more accurate support</li>
        <li>Human agents could focus on more complex issues, leading to higher job satisfaction</li>
      </ol>`,
      `The retailer was able to maintain high-quality customer service while reducing staffing costs and overhead. The chatbot's ability to handle routine tasks allowed human agents to provide more personalized attention to customers with unique needs.`,
    ],
  },
  {
    title: "AI Productivity Chrome Extension",
    image: "/intentional.png",
    description: [
      `Intentional AI is a groundbreaking Chrome extension that leverages artificial intelligence to help professionals achieve deep work and maintain laser-focused productivity. By intelligently blocking distracting websites and aligning digital environments with user-defined goals, the application represents a cutting-edge approach to personal productivity optimization.`,
      " ",
      `<strong>The Problem</strong>`,
      `In today's hyper-connected digital landscape, professionals face unprecedented challenges:`,
      `<ul class="list-disc pl-6">
        <li>Constant digital distractions fragment attention</li>
        <li>Meaningful work often gets postponed due to browser-based interruptions</li>
        <li>Traditional productivity tools lack adaptive, intelligent mechanisms to support deep work</li>
      </ul>`,
      " ",
      `<strong>Solution: AI-Powered Intelligent Focus Management</strong>`,
      `Intentional AI introduces a revolutionary approach to productivity:`,
      `<strong>Key Features</strong>`,
      `<ul class="list-disc pl-6">
        <li>Intelligent Goal Setting: Users define specific work objectives for each session</li>
        <li>Dynamic Website Blocking: AI analyzes and restricts access to sites unrelated to current goals</li>
        <li>Seamless Chrome Integration: Lightweight, non-intrusive extension design</li>
      </ul>`,
      " ",
      `<strong>Technical Implementation</strong>`,
      `Core Technologies:`,
      `<ul class="list-disc pl-6">
        <li>Chrome Extension Architecture</li>
        <li>gpt-3.5 based AI Agent for Intelligent Content Filtering</li>
        <li>Real-time Website Blocking Mechanism</li>
      </ul>`,
      " ",
      `<strong>Impact and Achievements</strong>`,
      `<ul class="list-disc pl-6">
        <li>User Adoption: 100+ active users within first launch cycle</li>
        <li>Community Recognition: #2 Product of the Day on Product Hunt</li>
        <li>User Feedback: Significant productivity improvements reported</li>
      </ul>`,
      " ",
      `This was the first AI agent that I created and I fell in love with them ever since`,
    ],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  return (
    <>
      <section className="py-16 mt-40">
        <div className="container mx-auto max-w-screen-lg px-4">
          <h2 className="text-4xl font-semibold text-center text-gray-950 dark:text-white mb-12">
            Projects Showcase
          </h2>
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
                  style={{ transformOrigin: "center center" }}
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
                      duration: 0.2,
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
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                    {project.title}
                  </h3>
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
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-screen-md w-full h-[95vh] overflow-auto relative 
            scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 
            scrollbar-track-gray-100 dark:scrollbar-track-gray-800 
            scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>

            <h3 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
              {selectedProject.title}
            </h3>
            <div className="flex justify-center">
              {selectedProject.title === "AI Productivity Chrome Extension" ? (
                <div className="w-full aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/SFdi0T8Fapk"
                    title="Intentional AI Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded mt-2 mb-4"
                  ></iframe>
                </div>
              ) : (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="mt-2 mb-4 rounded"
                />
              )}
            </div>
            <div className="space-y-4">
              {selectedProject.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 dark:text-gray-300 text-lg"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                ></p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
