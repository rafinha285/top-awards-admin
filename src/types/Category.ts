import "./Event"

export interface Category {
    id: number| null;
    name: string;
    description: string;
    eventId: number| null;
    event: Event | null;
    nomineeIds: number[]
}