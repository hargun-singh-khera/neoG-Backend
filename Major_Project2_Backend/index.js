const express = require("express")
const app = express()

require("dotenv").config()
const cors = require("cors")

const { connectDB } = require("./db/db.connect.js")
const SalesAgent = require("./models/agent.models.js")
const Lead = require("./models/lead.models.js")
const Comment = require("./models/comment.models.js")
const Tag = require("./models/tag.models.js")


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
        res.status(201).json({ message: "Sales agent created successfully", salesAgent })
    } catch (error) {
        res.status(500).json({ error: "Failed to create sales agent." })
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
        res.status(200).json({ message: "Sales agent fetched successfully.", salesAgent })
    } catch (error) {
        res.status(500).json({ error: "Faield to fetch sales agent." })
    }
})


// Lead API
const createLead = async (data) => {
    try {
        const lead = new Lead(data)
        return await lead.save()
    } catch (error) {
        throw error
    }
}

app.post("/api/leads", async (req, res) => {
    try {
        // const { salesAgent } = req.body
        // const salesAgentExists = await SalesAgent.findById(salesAgent)
        // if(!salesAgentExists) {
        //     return res.status(404).json({ error: "Sales agent not found." })
        // }
        console.log(req.body)
        const lead = await createLead(req.body)
        res.status(201).json({ message: "Lead created successfully", lead })
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ error: "Failed to create lead." })
    }
})


const getAllLeads = async (filters) => {
    try {
        console.log("filters", filters)
        const leads = await Lead.find(filters).populate("salesAgent").populate("tags")
        console.log("leads", leads)
        return leads
    } catch (error) {
        throw error
    }
}

app.get("/api/leads", async (req, res) => {
    try {
        console.log("req.query", req.query)
        // const { salesAgent, status, tags, source } = req.query
        // const filters = {}
        // if(salesAgent) filters.salesAgent = salesAgent
        // if(status) filters.status = status
        // if(tags) filters.tags = tags
        // if(source) filters.source = source
        const leads = await getAllLeads(req.query)
        res.status(200).json({ message: "Leads fetched successfully", leads })
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch leads." })
    }
})


const getLeadById = async (leadId) => {
    try {
        const lead = await Lead.findById(leadId).populate("salesAgent").populate("tags")
        return lead        
    } catch (error) {
        throw error
    }
}

app.get("/api/lead/:id", async (req, res) => {
    try {
        const lead = await getLeadById(req.params.id)
        res.status(200).json({ message: "Lead fetched successfully", lead })
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch lead."})
    }
})


const updateLead = async (leadId, data) => {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(leadId, data, { new: true })
        return updatedLead
    } catch (error) {
        console.log("Failed to update lead", error)
        throw error
    }
}

app.post("/api/leads/:id", async (req, res) => {
    try {
        const updatedLead = await updateLead(req.params.id, req.body)
        console.log("updatedLead", updatedLead)
        res.status(200).json({ message: "Lead updated successfully", updatedLead })
    } catch (error) {
        res.status(500).json({ error: "Failed to update lead." })
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
        res.status(200).json({ message: "Lead deleted successfully." })
    } catch (error) {
        res.status(500).json({ error: "Failed to delete lead.", error })
    }
})



// Comments API
const addLeadComment = async (data, lead) => {
    try {
        console.log("{lead, ...data}", {lead, ...data})
        const comment = new Comment({lead, ...data})
        await comment.save()
        return await comment.populate("author")
    } catch (error) {
        throw error
    }
}

app.post("/api/leads/:id/comments", async (req, res) => {
    try {
        console.log("req.body", req.body, req.params.id)
        const comment = await addLeadComment(req.body, req.params.id)
        console.log("comment", comment)
        res.status(201).json({ message: "Comment added successfully", comment })
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ error: "Failed to add a comment." })
    }
})

const getAllCommentByLead = async (lead) => {
    try {
        const comments = await Comment.find({ lead }).populate("author")
        return comments
    } catch (error) {
        console.log("Error", error)
        throw error
    }
}

app.get("/api/leads/:id/comments", async (req, res) => {
    try {
        const comments = await getAllCommentByLead(req.params.id)
        res.status(200).json({ message: "Comments for leads fetched successfully.", comments })
    } catch (error) {
        res.status(500).json({ error: "Failed to get comments for leads." })
    }
})



const addTag = async (data) => {
    try {
        const tag = new Tag(data)
        return await tag.save()        
    } catch (error) {
        throw error
    }
}

app.post("/api/tags", async (req, res) => {
    try {
        const tag = await addTag(req.body)
        res.status(201).json({ message: "Tag added successfully", tag })
    } catch (error) {
        res.status(500).json({ error: "Failed to add tag." })
    }
})

const getTags = async () => {
    try {
        const tags = await Tag.find()
        return tags
    } catch (error) {
        throw error
    }
}

app.get("/api/tags", async (req, res) => {
    try {
        const tags = await getTags()
        res.status(200).json({ message: "Tags fetched successfully", tags })
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tags." })
    }
})


// Reporting API
const getLeadsClosedLastWeek = async () => {
    try {
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        const leads = await Lead.find({ 
            status: "Closed",
            updatedAt: {
                $gte: sevenDaysAgo,
                $lte: new Date(),
            }
        })
        console.log("leads", leads)
        return leads.length
    } catch (error) {
        throw error
    }
}

app.get("/api/report/last-week", async (req, res) => {
    try {
        const leads = await getLeadsClosedLastWeek()
        res.status(200).json({ message: "Last week lead report fetched successfully.", leads })
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch last week report." })
    }
})

const getTotalLeadsInPipeline = async () => {
    try {
        const leads = await Lead.find({ status: { $ne: "closed" }})
        return leads.length
    } catch (error) {
        console.log("Error", error)
        throw error
    }
}

app.get("/api/report/pipeline", async (req, res) => {
    try {
        const leads = await getTotalLeadsInPipeline()
        res.status(200).json({ totalLeadsInPipeline: leads })
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch leads in pipeline." })
    }
})


app.listen(port, () => {
    console.log("Server is running on port " + port)
})