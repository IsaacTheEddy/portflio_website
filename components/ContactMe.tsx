"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { EnvelopeIcon, UserIcon, ChatBubbleBottomCenterTextIcon, PaperAirplaneIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function ContactMe() {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    useGSAP(() => {
        if (status === "idle") {
            gsap.fromTo(
                ".contact-element",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
            );
        }
    }, { scope: containerRef, dependencies: [status] });

    useGSAP(() => {
        if (status === "success") {
            const tl = gsap.timeline();
            tl.fromTo(".success-airplane",
                { x: -50, y: 50, opacity: 0, scale: 0.5 },
                { x: 150, y: -150, opacity: 0, scale: 1.5, duration: 1.2, ease: "power2.inOut" }
            )
            .fromTo(".success-content",
                { opacity: 0, y: 20, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
                "-=0.5"
            );
        }
    }, { scope: containerRef, dependencies: [status] });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch("https://formsubmit.co/ajax/isaactheedwards@gmail.com", {
                method: "POST",
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (response.ok) {
                // Animate out the form before switching state
                gsap.to(formRef.current, {
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    ease: "power2.in",
                    onComplete: () => setStatus("success")
                });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Form submission error", error);
            setStatus("error");
        }
    };

    return (
        <div ref={containerRef} className="w-full max-w-md mx-auto my-12 px-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-gray-800/50 backdrop-blur-xl border border-accent-neo/50 shadow-2xl relative overflow-hidden min-h-[460px] flex flex-col justify-center">
                {/* Decorative background glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent-neo/20 rounded-full blur-3xl pointer-events-none"></div>

                {status !== "success" ? (
                    <div className="relative z-10 w-full transition-opacity duration-300">
                        <div className="contact-element text-center mb-6">
                            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Let's Connect</h2>
                            <p className="text-gray-400 text-sm">Drop a message and I'll get back to you.</p>
                        </div>

                        <form 
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            {/* FormSubmit configurations */}
                            <input type="text" name="_honey" style={{ display: "none" }} />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_template" value="box" />
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="contact-element relative w-full group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-400 text-gray-500">
                                        <UserIcon className="h-5 w-5" />
                                    </div>
                                    <input 
                                        type="text" 
                                        name="First Name" 
                                        placeholder="First Name" 
                                        required 
                                        disabled={status === "submitting"}
                                        className="w-full pl-10 pr-3 py-2.5 bg-gray-900/50 border border-accent-neo/50 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-gray-800 transition-all duration-300 disabled:opacity-50"
                                    />
                                </div>
                                <div className="contact-element relative w-full group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-400 text-gray-500">
                                        <UserIcon className="h-5 w-5" />
                                    </div>
                                    <input 
                                        type="text" 
                                        name="Last Name" 
                                        placeholder="Last Name" 
                                        required 
                                        disabled={status === "submitting"}
                                        className="w-full pl-10 pr-3 py-2.5 bg-gray-900/50 border border-accent-neo/50 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-gray-800 transition-all duration-300 disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            <div className="contact-element relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-400 text-gray-500">
                                    <EnvelopeIcon className="h-5 w-5" />
                                </div>
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Email Address" 
                                    required 
                                    disabled={status === "submitting"}
                                    className="w-full pl-10 pr-3 py-2.5 bg-gray-900/50 border border-accent-neo/50 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-gray-800 transition-all duration-300 disabled:opacity-50"
                                />
                            </div>

                            <div className="contact-element relative group">
                                <div className="absolute top-3 left-3 pointer-events-none transition-colors group-focus-within:text-blue-400 text-gray-500">
                                    <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                                </div>
                                <textarea 
                                    name="message" 
                                    placeholder="Your Message" 
                                    rows={4}
                                    required 
                                    disabled={status === "submitting"}
                                    className="w-full pl-10 pr-3 py-2.5 bg-gray-900/50 border border-accent-neo/50 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-gray-800 transition-all duration-300 resize-none disabled:opacity-50"
                                ></textarea>
                            </div>

                            {status === "error" && (
                                <p className="text-red-400 text-sm text-center">Oops! Something went wrong. Please try again.</p>
                            )}

                            <div className="contact-element pt-2">
                                <button 
                                    type="submit" 
                                    disabled={status === "submitting"}
                                    className="group w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-accent-hard-neo to-accent-soft-neo hover:from-accent-soft-neo hover:to-accent-hard-neo text-white font-medium rounded-xl shadow-lg hover:shadow-blue-500/25 border border-accent-neo/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <span>{status === "submitting" ? "Sending..." : "Send Message"}</span>
                                    <PaperAirplaneIcon className={`h-5 w-5 transition-transform duration-300 ${status === "submitting" ? "translate-x-1 -translate-y-1" : "group-hover:translate-x-1 group-hover:-translate-y-1"}`} />
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="relative z-10 w-full flex flex-col items-center justify-center text-center">
                        <div className="success-airplane absolute text-accent-neo/40">
                            <PaperAirplaneIcon className="h-24 w-24" />
                        </div>
                        <div className="success-content flex flex-col items-center">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 border border-green-500/50">
                                <CheckCircleIcon className="h-8 w-8 text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                            <p className="text-gray-400 text-sm max-w-[250px]">
                                Thanks for reaching out. I'll get back to you as soon as possible.
                            </p>
                            <button 
                                onClick={() => setStatus("idle")}
                                className="mt-8 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-all duration-300"
                            >
                                Send another message
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}