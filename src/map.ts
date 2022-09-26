export type Platform = {
    x: number;
    y: number;
    key: string;
    scale?: number;
}

export const platformMap: Platform[] = [
    {
        x: 400,
        y: 500,
        key: 'ground',
        scale: 2
    }, {
        x: 150,
        y: 350,
        key: 'ground',
    }, {
        x: 650,
        y: 250,
        key: 'ground',
    }, {
        x: 100,
        y: 150,
        key: 'ground',
    },
]
