const express = require("express")
const app = express()

require("dotenv").config()
const cors = require("cors")

const { connectDB } = require("./db/db.connect.js")
const SalesAgent = require("./models/agent.models.js")
const Lead = require("./models/lead.models.js")
const Comment = require("./models/comment.models.js")


const port = process.env.PORT || 8000

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
}


connectDB()
app.use(express.json())
app.use(cors(corsOptions))


// Sales Agent API
const createSalesAgent = async (data) => {
    try {
        const salesAgent = new SalesAgent(data)
        return await salesAgent.save()        
    } catch (error) {
        throw error
    }
}

app.post("/api/agents", async (req, res) => {
    try {
        const salesAgent = await createSalesAgent(req.body)
        res.status(201).json({ message: "Sales agent created successfully", salesAgent})
    } catch (error) {
        res.status(500).json({ error: "Failed to create sales agent."})
    }
})

const getAllSalesAgent = async () => {
    try {
        const salesAgent = await SalesAgent.find()
        return salesAgent
    } catch (error) {
        throw error
    }
}

app.get("/api/agents", async (req, res) => {
    try {
        const salesAgent = await getAllSalesAgent()
        res.status(200).json({ message: "Sales agent fetched successfully.", salesAgent})
    } catch (error) {
        res.status(500).json({ error: "Faield to fetch sales agent."})
    }
})



// Lead API
const createLead = async (data) => {
    const { name } = data
    try {
        const lead = new Lead(data)
        return await lead.save()        
    } catch (error) {
        throw error
    }
}

app.post("/api/leads", async (req, res) => {
    try {
        const lead = await createLead(req.body)
        res.status(201).json({ message: "Lead created successfully", lead})
    } catch (error) {
        res.status(500).json({ error: "Failed to create lead."})
    }
})


const getAllLeads = async () => {
    try {
        const leads = await Lead.find()
        return leads        
    } catch (error) {
        throw error
    }
}

app.get("/api/leads", async (req, res) => {
    // const { salesAgent, status, tags, source } = req.query
    try {
        const leads = await getAllLeads()
        res.status(200).json({ message: "Leads fetched successfully", leads})
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch leads."})
    }
})

const updateLead = async (leadId) => {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(leadId)
        return updatedLead
    } catch (error) {
        throw error
    }
}

app.post("/api/leads/:id", async (req, res) => {
    try {
        const updatedLead = await updateLead(req.params.id)
        res.status(200).json({ message: "Lead updated successfully", updatedLead})
    } catch (error) {
        res.status(500).json({ error: "Failed to update lead."})
    }
})

const deleteLead = async (leadId) => {
    try {
        await Lead.findByIdAndDelete(leadId)   
    } catch (error) {
        throw error
    }
}

app.delete("/api/leads/:id", async (req, res) => {
    try {
        await deleteLead(req.params.id)
        res.status(200).json({ message: "Lead deleted successfully."})
    } catch (error) {
        res.status(500).json({ error: "Failed to delete lead."})
    }
})



// Comments API
const addLeadComment = async (data) => {
    try {
        const comment = new Comment(data)
        return await comment.save()
    } catch (error) {
        throw error
    }
}

app.post("/api/leads/:id/comments", async (req, res) => {
    try {
        const comment = await addLeadComment(req.body)
        res.status(201).json({ message: "Comment added successfully", comment})
    } catch (error) {
        res.status(500).json({ error: "Failed to add a comment."})
    }
})

const getAllCommentByLead = async (leadId) => {
    try {
        const comments = await find({ leadId })
        return comments        
    } catch (error) {
        throw error
    }
}

app.get("/api/leads/:id/comments", async (req, res) => {
    try {
        const comments = await getAllCommentByLead(req.params.id)
        res.status(200).json("Comments for leads fetched successfully.")
    } catch (error) {
        res.status(500).json({ error: "Failed to get comments for leads."})
    }
})


// Reporting API
const getLeadsClosedLastWeek = async () => {
    try {
        
    } catch (error) {
        throw error
    }
}

app.get("/api/report/last-week", async (req, res) => {
    try {
        const leads = await getLeadsClosedLastWeek()
        res.status(200).json({ message: "Last week lead report fetched successfully."})
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch last week report."})        
    }
})

const getTotalLeadsInPipeline = async () => {
    try {
        
    } catch (error) {
        
    }
}

app.get("/api/report/pipeline", async (req, res) => {
    try {
        const leads = await getTotalLeadsInPipeline()
        res.status(200).json({ message: "Total pipelines leads fetched successfully."})
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch leads in pipeline."})
    }
})


app.listen(port, () => {
    console.log("Server is running on port " +  port)
})