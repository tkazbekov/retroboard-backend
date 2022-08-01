import { ObjectId } from "mongodb";
import Board, { Note } from "./Board";

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  board_found: (board: Board) => void;
  note_update: (note: Note, columnId: string) => void;
  board_created: (id: ObjectId) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  get_board: (id) => void;
  new_note: (note: string, columnId: string) => void;
  create_board: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}