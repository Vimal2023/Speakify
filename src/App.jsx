import React, { useState, useEffect } from "react";
import { useSpeechSynthesis, useSpeechRecognition } from "react-speech-kit";

function App() {
  const [text, setText] = useState("");
  const [recognizedText, setRecognizedText] = useState("");
  const [voice, setVoice] = useState(null);

  const { speak, cancel, speaking, voices, supported: synthesisSupported } =
    useSpeechSynthesis();

  const {
    listen,
    stop,
    listening,
    supported: recognitionSupported,
  } = useSpeechRecognition({
    onResult: (result) => setRecognizedText(result),
  });

  useEffect(() => {
    if (voices.length > 0) setVoice(voices[0]);
  }, [voices]);

  const handleSpeak = () => {
    if (text) speak({ text, voice });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-6 shadow-md">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            🎙️ Speakify
          </h1>
          <p className="text-sm text-green-100 mt-1">
            Convert Speech ↔ Text in Hindi + English seamlessly
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="w-full max-w-6xl grid md:grid-cols-2 gap-6 mt-10 px-6">
        {/* Text-to-Speech */}
        <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2 mb-4">
            🗣️ Text-to-Speech
          </h2>

          {synthesisSupported ? (
            <>
              <label className="block text-gray-700 font-medium mb-1">
                Enter Text:
              </label>
              <textarea
                className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                rows="4"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something here..."
              />
              <label className="block text-gray-700 font-medium mb-1">
                Select Voice:
              </label>
              <select
                className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={voice?.name}
                onChange={(e) =>
                  setVoice(voices.find((v) => v.name === e.target.value))
                }
              >
                {voices.map((v, idx) => (
                  <option key={idx} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
              <div className="flex gap-3">
                <button
                  onClick={handleSpeak}
                  disabled={speaking}
                  className="flex-1 bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
                >
                  {speaking ? "Speaking..." : "Speak"}
                </button>
                <button
                  onClick={cancel}
                  className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div className="text-red-600 text-sm">
              ❌ Speech Synthesis not supported in this browser.
            </div>
          )}
        </div>

        {/* Speech-to-Text */}
        <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2 mb-4">
            🎧 Speech-to-Text
          </h2>

          {recognitionSupported ? (
            <>
              <label className="block text-gray-700 font-medium mb-1">
                Recognized Text:
              </label>
              <textarea
                className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                rows="4"
                value={recognizedText}
                readOnly
              />
              <div className="flex gap-3">
                <button
                  onMouseDown={() => listen({ interimResults: true })}
                  onMouseUp={stop}
                  disabled={listening}
                  className="flex-1 bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
                >
                  {listening ? "Listening..." : "Start Listening"}
                </button>
                <button
                  onClick={stop}
                  className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Stop
                </button>
              </div>
              {listening && (
                <p className="text-sm text-green-600 mt-2 animate-pulse">
                  🎤 Listening... speak now!
                </p>
              )}
            </>
          ) : (
            <div className="text-red-600 text-sm">
              ❌ Speech Recognition not supported in this browser.
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 py-4 text-gray-600 text-sm">
        Built with <span className="text-red-500">❤️</span> by{" "}
        <span className="font-semibold text-green-600">Vimal Anand</span>
      </footer>
    </div>
  );
}

export default App;
