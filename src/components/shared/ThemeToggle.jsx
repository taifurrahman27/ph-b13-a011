"use client";

import { Switch } from "@heroui/react";
import { HiMoon, HiSun } from "react-icons/hi2";
import { useState } from "react";

const getInitialTheme = () => {
    if (typeof window === "undefined") {
        return true;
    }

    return localStorage.getItem("theme") !== "light";
};

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(getInitialTheme);

    const handleThemeChange = (value) => {
        setIsDark(value);

        if (value) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <Switch
            isSelected={isDark}
            onChange={handleThemeChange}
            size="sm"
            aria-label="Toggle theme"
        >
            <Switch.Content>
                <Switch.Control>
                    <Switch.Thumb>
                        <Switch.Icon>
                            {isDark ? (
                                <HiMoon className="h-3 w-3" />
                            ) : (
                                <HiSun className="h-3 w-3" />
                            )}
                        </Switch.Icon>
                    </Switch.Thumb>
                </Switch.Control>
            </Switch.Content>
        </Switch>
    );
};

export default ThemeToggle;