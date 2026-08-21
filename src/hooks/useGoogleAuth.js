"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { googleAuth } from "@/actions/googleAuth";

const GOOGLE_SCRIPT_URL = "https://accounts.google.com/gsi/client";

const useGoogleAuth = () => {
    const router = useRouter();

    const [googleLoading, setGoogleLoading] = useState(false);
    const [googleCredential, setGoogleCredential] = useState("");
    const [showRoleSelection, setShowRoleSelection] = useState(false);
    const [googleError, setGoogleError] = useState("");

    const initializedRef = useRef(false);
    const buttonContainerRef = useRef(null);

    const completeGoogleLogin = useCallback(
        (data) => {
            if (!data?.token || !data?.user) {
                throw new Error(
                    "Google authentication succeeded but authentication data was not received."
                );
            }

            localStorage.setItem("accessToken", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            window.dispatchEvent(new Event("auth-change"));

            router.push("/dashboard");
        },
        [router]
    );

    const handleGoogleResponse = useCallback(
        async (response) => {
            if (!response?.credential) {
                setGoogleLoading(false);
                setGoogleError(
                    "Google did not return an authentication credential."
                );
                return;
            }

            setGoogleError("");
            setGoogleLoading(true);

            try {
                const data = await googleAuth({
                    credential: response.credential,
                });

                if (!data) {
                    throw new Error(
                        "No response received from the server."
                    );
                }

                if (data.requiresRole) {
                    setGoogleCredential(response.credential);
                    setShowRoleSelection(true);
                    return;
                }

                completeGoogleLogin(data);
            } catch (error) {
                console.error("Google authentication error:", error);

                setGoogleError(
                    error?.message ||
                    "Something went wrong during Google authentication."
                );
            } finally {
                setGoogleLoading(false);
            }
        },
        [completeGoogleLogin]
    );

    useEffect(() => {
        let cancelled = false;

        const renderGoogleButton = () => {
            if (cancelled) {
                return;
            }

            if (!window.google?.accounts?.id) {
                setGoogleError(
                    "Google authentication could not be loaded."
                );
                return;
            }

            if (!buttonContainerRef.current) {
                return;
            }

            if (initializedRef.current) {
                return;
            }

            const clientId =
                process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

            if (!clientId) {
                setGoogleError(
                    "Google Client ID is not configured."
                );
                return;
            }

            try {
                window.google.accounts.id.initialize({
                    client_id: clientId,
                    callback: handleGoogleResponse,
                    auto_select: false,
                    cancel_on_tap_outside: true,
                    use_fedcm_for_button: true,
                });

                initializedRef.current = true;

                buttonContainerRef.current.innerHTML = "";

                window.google.accounts.id.renderButton(
                    buttonContainerRef.current,
                    {
                        type: "standard",
                        theme: "outline",
                        size: "large",
                        text: "continue_with",
                        shape: "rectangular",
                        width: 400,
                        logo_alignment: "left",
                    }
                );
            } catch (error) {
                console.error(
                    "Google initialization error:",
                    error
                );

                initializedRef.current = false;

                setGoogleError(
                    "Failed to initialize Google authentication."
                );
            }
        };

        const handleScriptLoad = () => {
            renderGoogleButton();
        };

        if (window.google?.accounts?.id) {
            renderGoogleButton();

            return () => {
                cancelled = true;
            };
        }

        const existingScript = document.querySelector(
            `script[src="${GOOGLE_SCRIPT_URL}"]`
        );

        if (existingScript) {
            existingScript.addEventListener(
                "load",
                handleScriptLoad
            );

            return () => {
                cancelled = true;

                existingScript.removeEventListener(
                    "load",
                    handleScriptLoad
                );
            };
        }

        const script = document.createElement("script");

        script.src = GOOGLE_SCRIPT_URL;
        script.async = true;
        script.defer = true;

        script.onload = handleScriptLoad;

        script.onerror = () => {
            if (!cancelled) {
                setGoogleError(
                    "Failed to load Google authentication."
                );
            }
        };

        document.head.appendChild(script);

        return () => {
            cancelled = true;

            script.onload = null;
            script.onerror = null;
        };
    }, [handleGoogleResponse]);

    const handleGoogleLogin = useCallback(() => {
        setGoogleError("");

        if (!window.google?.accounts?.id) {
            setGoogleError(
                "Google authentication is still loading. Please try again."
            );
            return;
        }

        if (!initializedRef.current) {
            setGoogleError(
                "Google authentication is still initializing. Please try again."
            );
            return;
        }

        if (!buttonContainerRef.current) {
            setGoogleError(
                "Google sign-in is not ready. Please try again."
            );
            return;
        }

        const iframe =
            buttonContainerRef.current.querySelector("iframe");

        if (!iframe) {
            setGoogleError(
                "Google sign-in is not ready. Please try again."
            );
            return;
        }

        setGoogleError("");
    }, []);

    const handleGoogleRoleSubmit = useCallback(
        async (role) => {
            if (!googleCredential) {
                setGoogleError(
                    "Google authentication session has expired. Please try again."
                );
                return;
            }

            setGoogleError("");
            setGoogleLoading(true);

            try {
                const data = await googleAuth({
                    credential: googleCredential,
                    role,
                });

                if (!data) {
                    throw new Error(
                        "No response received from the server."
                    );
                }

                completeGoogleLogin(data);

                setShowRoleSelection(false);
                setGoogleCredential("");
            } catch (error) {
                console.error(
                    "Google role authentication error:",
                    error
                );

                setGoogleError(
                    error?.message ||
                    "Something went wrong during Google authentication."
                );
            } finally {
                setGoogleLoading(false);
            }
        },
        [googleCredential, completeGoogleLogin]
    );

    const cancelGoogleRoleSelection = useCallback(() => {
        setShowRoleSelection(false);
        setGoogleCredential("");
        setGoogleError("");
        setGoogleLoading(false);
    }, []);

    return {
        googleLoading,
        googleCredential,
        showRoleSelection,
        googleError,
        handleGoogleLogin,
        handleGoogleResponse,
        handleGoogleRoleSubmit,
        cancelGoogleRoleSelection,
        buttonContainerRef,
        setShowRoleSelection,
    };
};

export default useGoogleAuth;
