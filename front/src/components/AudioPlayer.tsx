"use client"

import audioStyle from "@/styles/player.module.css"
import Image from "next/image"
import { useRef, useState } from "react"

const AudioPlayer = ({src} :{src: string}) => {

    const audioRef = useRef<HTMLAudioElement>(null)
    const [vol, setVol] = useState(0.3)

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

            <div className="mt-4 flex justify-evenly">
                <button onClick={restart}>
                    <Image
                        src={"/restart.svg"}
                        alt="戻る"
                        width={30}
                        height={30}
                     />
                </button>
                <button onClick={play}>
                    <Image
                        src={"/start.svg"}
                        alt="再生"
                        width={30}
                        height={30}
                     />
                </button>
                <button onClick={pause}>
                    <Image
                        src={"/pause.svg"}
                        alt="停止"
                        width={30}
                        height={30}
                     />
                </button>
            </div>
            <div>
                <label className="flex items-center mt-2">
                    <div>
                        <Image
                            src={"/volume.svg"}
                            alt="音量"
                            width={30}
                            height={30}
                        />
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={vol}
                        onChange={handleVolumeChange}
                        className={`${audioStyle.range}`}
                     />
                </label>
            </div>
        </div>
    )

}

export default AudioPlayer