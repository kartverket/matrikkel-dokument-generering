import type { Pair } from "../types";

type HeaderProps = {
    title: string;
    pairs?: Pair[]
    
};

export function Header({ title, pairs }: HeaderProps) {
    return (
        <>
            <h1>{title}</h1>
            {pairs && pairs.map((pair) => (
                <p key={pair.key}>{pair.key}: {pair.value}</p>
            ))}
        </>
    );
}
