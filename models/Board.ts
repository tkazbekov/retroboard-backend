import { ObjectId } from "mongodb";


export class Note {
    constructor(
        public text: string,
        public columnId: ObjectId,
        public votes: number = 0,
        public id: ObjectId = new ObjectId()
    ) { }
}

export class Column {
    constructor(
        public title: string = "New Column",
        public id: ObjectId = new ObjectId(),
        public notes: Note[] = []
    ) { }
}



export default class Board {
    constructor(
        public title: string = "New Board",
        public columns: Column[] = [new Column("What went well"), new Column("What could be improved"), new Column("Action points")],
        public _id?: ObjectId
    ) { }
}
