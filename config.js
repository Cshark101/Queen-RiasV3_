const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1BNNWRNRzJpQVVidjd5MUUraWdwUWwwU3REL05ya3ZvNGo3VHU3OEcwYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU04wbHFVQU05MVU3UzZRdmlDRUcxdzZQYjg3Uy9WQVNpaEkyUmJGem1Xdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpTktwL2dNSVJ4VmxiaG4zSmNRWlNIaGNYNzFVWEdBaW4wSFhjUXBtK0VFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrT1dmK2JocXZ6LzlKRXNNT0Fzcjc5TjdiVWZKbi9DQnRQdGdBa3ZGeTJJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNNNXBLb1RPYnNkay9KSzJTd1BpN0NyRXF0RXoxa2c3WFU1YmVXSXo5RVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkczUFJ3WmYzSExUWFR0NzJhamlzTUluV20vcWdXVFJtSjZNWFhrM3R4UUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUFRbVkrcU5TeDdCSzRMaDNCbklwOVJ5dmh5cGU4TmRFZGxkeHF6SFhuND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVWE1M25nc2EvM2lxcW96aUp6d2xtNml5Q1kwbEhzZGxwbGVnUzFyTDh6ND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVERTlJUTVPOGRvMFVEL2V2TlFLQUlwSHBrazVmSXBlWFNLNUlVNGxwYXdrVjZ6UU4zZkxoOXdOY3p1ZkgwNEpGQmU1Qm9WWHZYd051c21VRHVXa0F3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc2LCJhZHZTZWNyZXRLZXkiOiJJSFRyd0g3eDR5R2VHOFJlbS83TEV1eUh6ZW1OYmgvN0NUUWo2WjAzaktVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI3SlI4OUJITiIsIm1lIjp7ImlkIjoiMjM0ODEwMTY2ODA1MDozM0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjQyNDQzNDg3NTgwMzE1OjMzQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSTNxdmVVQ0VOMlB4YjhHR0FjZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRHZPbXJxenczSk9RdTVXZmZxTnRPN2pEc3EzeTVxeEY3RkxlQVBhVGZqbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiaVBCL0I1R2xhOCs2TjdVbWxvdk1JdFFaUlNrZWtONEM0eGhlS3ZyY205ajNWalVpZ2srQUgreDhGSU56K0lNQUVuN2pzZDZlUFpmb3lpWUFDcmNkQXc9PSIsImRldmljZVNpZ25hdHVyZSI6IkVUc0dqZTJuVXplV2lQM3JFQ0lZUVFtNTlIQmFsblhtVEJraytoM2w3M21xZ25DS21XREpzQjJMMXB1UWlITGxSREhEMkxOdjhSUXIvaVREUVJ3S0NRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODEwMTY2ODA1MDozM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRN3pwcTZzOE55VGtMdVZuMzZqYlR1NHc3S3Q4dWFzUmV4UzNnRDJrMzQ2In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDM4NjU4MzQsImxhc3RQcm9wSGFzaCI6Im5tM0JiIn0=",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
