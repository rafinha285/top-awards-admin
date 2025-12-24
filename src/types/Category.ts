import type Event from "./Event.ts"
import type {Nominee} from "./Nominee.ts";

export interface Category {
    id: number| null;
    name: string;
    description: string;
    eventId: number| null;
    event: Event | null;
    nomineeIds: number[];
    nominees: Nominee[] | null;
}