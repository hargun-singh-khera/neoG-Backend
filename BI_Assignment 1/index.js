const express = require("express")
const cors = require("cors")
const app = express()

const { connectDB } = require("./db/db.connect.js")
const Event = require("./models/event.models")
const Speaker = require("./models/speakers.model")

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json())
app.use(cors(corsOptions))
connectDB()

require("dotenv").config()

const port = process.env.PORT || 8000

app.get("/", (req, res) => {
    res.send("Meetup App API")
})

async function readEvents() {
    try {
        const events = await Event.find()
        return events
    } catch (error) {
        throw error
    }
}


app.get("/events", async (req, res) => {
    try {
        const events = await readEvents()
        res.status(200).json(events)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch events."})        
    }
})

async function readEventById(eventId) {
    try {
        const event = await Event.findById(eventId).populate("speakers")
        return event
    } catch (error) {
        throw error        
    }
}

app.get("/events/:id", async (req, res) => {
    try {
        const event = await readEventById(req.params.id)
        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch event by ID."})
    }    
})

async function createEvent(eventData) {
    try {
        const newEvent = new Event(eventData)
        return await newEvent.save()       
    } catch (error) {
        throw error
    }
}

app.post("/events", async (req, res) => {
    try {
        const newEvent = await createEvent(req.body)
        res.status(201).json({message: "Event created successfully.", event: newEvent})
    } catch (error) {
        res.status(500).json({error: "Failed to create new event."})
    }
})

async function readSpeakers() {
    try {
        const speakers = await Speaker.find()
        return speakers
    } catch (error) {
        throw error
    }
}

app.get("/speakers", async (req, res) => {
    try {
        const speakers = await readSpeakers()
        res.status(200).json(speakers)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch speakers."})
    }
})

async function createSpeaker(speakerData) {
    try {
        const newSpeaker = new Speaker(speakerData)
        return await newSpeaker.save()
    } catch (error) {
        throw error
    }
}

app.post("/speakers", async (req, res) => {
    try {
        const newSpeaker = await createSpeaker(req.body)
        res.status(201).json({message: "Speaker created successfully", speaker: newSpeaker})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Failed to create new speaker."})
    }
})

app.listen(port, () => {
    console.log("Server is running at port:", port)
})