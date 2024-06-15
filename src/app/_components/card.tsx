interface Props {
    suit?: string;
    rank?: string;
    className?: string;
}
export function Card({ suit, rank, className }: Props) {
    return (
        <div className={`card border border-black rounded-md h-24 bg-white w-[4.25rem] ${className}`}>
            <div className="flex flex-col justify-center items-center h-full relative">
                <h2 className="text-5xl z-10">{rank}</h2>
            </div>
        </div>
    )
}