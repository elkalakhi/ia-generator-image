import React, { useState, useRef } from "react";
import default_image from "../assets/default_image.svg";
import "./Style.css";

const OPENAI_API_KEY = "";

const ImageGenerator = () => {
    const [imageUrl, setImageUrl] = useState("/");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const generateImage = async () => {
        const prompt = inputRef.current?.value?.trim();
        if (!prompt) return;

        setLoading(true);

        try {
            const response = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer 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",
                    "ser-agent": "Chrome",
                },
                body: JSON.stringify({
                    prompt: prompt,
                    n:1,
                    size: "512x512",
                }),
            });

            const data = await response.json();
            if (data.data && data.data[0]?.url) {
                setImageUrl(data.data[0].url);
                inputRef.current!.value = "";
            } else {
                console.error("Erreur API :", data);
                alert("Erreur lors de la génération d'image");
            }
        } catch (error) {
            console.error("Erreur :", error);
            alert("Erreur lors de la connexion à OpenAI");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ia-image-generator">
            <div className="header">
                IA Image <span>Generator</span>
            </div>

            <div className="img-loading">
                <div className="image">
                    <img
                        src={imageUrl === "/" ? default_image : imageUrl}
                        alt="Generated"
                    />
                </div>
                {loading && <p>⏳ Génération en cours...</p>}
            </div>

            <div className="search-box">
                <input
                    type="text"
                    ref={inputRef}
                    className="search-input"
                    placeholder="Décris ton image..."
                />
                <div className="generate-btn" onClick={generateImage}>
                    Generate
                </div>
            </div>
        </div>
    );
};

export default ImageGenerator;
