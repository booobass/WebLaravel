"use client"

import { useRef, useState } from "react"

const AudioPlayer = ({src} :{src: string}) => {

    const audioRef = useRef<HTMLAudioElement>(null)
    const [vol, setVol] = useState(1.0)

    const play = () => audioRef.current?.play()
    const pause = () => audioRef.current?.pause()
    const restart = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play()
        }
    }
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value)
        setVol(newVolume)
        if (audioRef.current) {
            audioRef.current.volume = newVolume
        }
    }

    return (
        <div>
            <audio src={src} ref={audioRef}></audio>

            <div>
                <button onClick={play}>再生</button>
                <button onClick={pause}>停止</button>
                <button onClick={restart}>最初に戻る</button>
            </div>
            <div>
                <label>音量：
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={vol}
                        onChange={handleVolumeChange} />
                </label>
            </div>
        </div>
    )

}

export default AudioPlayer