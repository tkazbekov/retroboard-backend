import express from 'express';
import { Server as wsServer } from 'socket.io';
import { createServer } from 'http';
import { ObjectId } from 'mongodb';

import { connectToDatabase, collections } from './services/db.service';
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from './models/Socket';
import Board, { Column, Note } from './models/Board';

const app = express();
const httpServer = createServer(app);
const port = 3000;

const io = new wsServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
    cors: {
        origin: '*'
    }
});

connectToDatabase().then(() => {

    io.on('connection', (socket) => {
        console.log('A new user has connected!', socket.id)

        socket.on('create_board', async () => {
            const newBoard = await createNewBoard();
            socket.emit('board_created', newBoard._id)
        })

        socket.on('get_board', async (id: string) => {

            console.log("get board", id);

            const query = { _id: new ObjectId(id) }

            let board = (await collections.boards.findOne(query)) as Board

            if (!board) {
                console.log("board not found, creating");
                await createNewBoard(new ObjectId(id)).then(res => board = res)
            }

            if (board) {
                let totalNotes = 0;
                board.columns = await Promise.all(board.columns.map(async col => {
                    const notes = collections.notes.find(
                        { columnId: col.id }
                    );

                    await notes.forEach((doc: unknown | Note) => {
                        col.notes.unshift(doc as Note)
                    })

                    totalNotes += await collections.notes.countDocuments({ columnId: col.id })

                    return col
                }));

                console.log(`board has ${board.columns.length} columns and ${totalNotes} notes `)

                socket.emit('board_found', board as Board)

            }


            socket.on('new_note', async (note, columnId) => {
                console.log("New Note arrived!");
                const newNote = new Note(
                    note,
                    new ObjectId(columnId)
                )
                await collections.notes.insertOne(newNote);
                io.emit('note_update', newNote, columnId);
            })
        })

    });

    httpServer.listen(port, () => {
        console.log(`App is running on port ${port}`)
    });
})

const createNewBoard = async (id?: ObjectId) => {
    const board = new Board();
    if (id) { board._id = id; }
    await collections.boards.insertOne(board)
    return board;
}
