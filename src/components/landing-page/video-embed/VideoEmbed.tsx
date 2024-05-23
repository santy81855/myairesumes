"use client";
import styles from "./VideoEmbed.module.css";
import YouTube, { YouTubeProps } from "react-youtube";
import { useEffect, useState } from "react";

type VideoEmbedProps = {
    link: string;
};

const VideoEmbed = ({ link }: VideoEmbedProps) => {
    const [opts, setOpts] = useState<YouTubeProps["opts"]>({});

    // use effect that detects the user's screen size
    useEffect(() => {
        const handleResize = () => {
            setOpts({
                height:
                    window.innerWidth > 768
                        ? "360"
                        : window.innerWidth < 540
                        ? window.innerWidth < 412
                            ? "169"
                            : "180"
                        : "270",
                width:
                    window.innerWidth > 768
                        ? "640"
                        : window.innerWidth < 540
                        ? window.innerWidth < 412
                            ? "300"
                            : "360"
                        : "480",
            });
        };
        setOpts({
            height:
                window.innerWidth > 768
                    ? "360"
                    : window.innerWidth < 540
                    ? "180"
                    : "270",
            width:
                window.innerWidth > 768
                    ? "640"
                    : window.innerWidth < 540
                    ? "360"
                    : "480",
        });
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className={styles.videoContainer}>
            <YouTube videoId={link} opts={opts} />
        </section>
    );
};

export default VideoEmbed;
