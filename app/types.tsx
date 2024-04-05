export interface FormData {
    weight: number;
    height: number;
    age: number;
    len: number;
    level: number;
    fuzz: boolean;
    result: number;
};

export interface Results {
    result: number;
    skier: { codes: string[], weights: number[] };
    boot: { codes: number[], weights: number[] };
}
