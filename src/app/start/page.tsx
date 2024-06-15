
// import { getServerAuthSession } from "~/server/auth";
import '~/styles/game.css';
import { Card } from "../_components/card";
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'; // <-- import the hook from our React package

const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ['♠', '♣', '♥', '♦'];

type Card = {
    suit: string,
    rank: string
}

gsap.registerPlugin(useGSAP);

export default async function Home() {
    // const session = await getServerAuthSession();
    const container = useRef<HTMLDivElement>(null);

    const [dealer, setDealer] = useState<Card[]>([]);
    const [player, setPlayer] = useState<Card[]>([]);

    const dealHand = () => {
        setDealer([
            { suit: suits[Math.floor(Math.random() * 4)] ?? '', rank: ranks[Math.floor(Math.random() * 13)] ?? '' },
            { suit: suits[Math.floor(Math.random() * 4)] ?? '', rank: ranks[Math.floor(Math.random() * 13)] ?? '' }
        ])
        setPlayer([
            { suit: suits[Math.floor(Math.random() * 4)] ?? '', rank: ranks[Math.floor(Math.random() * 13)] ?? '' },
            { suit: suits[Math.floor(Math.random() * 4)] ?? '', rank: ranks[Math.floor(Math.random() * 13)] ?? '' }
        ])
    }


    useGSAP(
        () => {
            // gsap code here...
            gsap.from('.card', { y: -300, x: -300, rotationX: 180 });
            gsap.to('.card', { x: 0, y: 0, rotationX: 0 }); // <-- automatically reverted
        },
        { scope: container }
    ); // <-- scope for selector text (optional)



    return <main className="min-h-screen flex-col items-center justify-center ">
        <div className="mx-auto container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <div className="">
                {ranks.flatMap(r => {
                    return suits.map(s => {
                        return <span className="">{r} {s}</span>
                    })
                })}
            </div>
            <div className="stage h-[50vh] flex flex-col w-full relative">
                <div ref={container} className="dealer flex gap-4 justify-center w-full">
                    {dealer.map(c => {
                        return <Card suit={c.suit} rank={c.rank} className="" />
                    })}
                </div>
                <div className="player mt-auto flex gap-4 justify-center w-full">
                    {player.map(c => {
                        return <Card suit={c.suit} rank={c.rank} className="" />
                    })}
                </div>
            </div>
            <div className="flex gap-8 mt-auto">
                <button type="button" onClick={dealHand}>Deal</button>
                <button type="button">Stand</button>
                <button type="button">Hit</button>
            </div>
        </div>
    </main>
}