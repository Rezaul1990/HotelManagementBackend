import { Router } from "express";

export const overviewRouter = Router();

overviewRouter.get("/", (_req, res) => {
  res.json({
    success: true,
    data: {
      metrics: [
        { label: "Occupancy", value: "78%", trend: "+12%" },
        { label: "Today check-ins", value: "18", trend: "+4" },
        { label: "Available rooms", value: "42", trend: "-6" },
        { label: "Revenue this month", value: "$84,260", trend: "+18%" }
      ],
      arrivals: [
        { guest: "Sarah Ahmed", room: "204", time: "12:30 PM", status: "confirmed" },
        { guest: "Arman Chowdhury", room: "512", time: "2:00 PM", status: "payment due" },
        { guest: "Nadia Khan", room: "318", time: "5:30 PM", status: "vip" }
      ],
      operations: [
        { area: "Housekeeping", open: 19, critical: 3 },
        { area: "Maintenance", open: 7, critical: 1 },
        { area: "Front desk", open: 11, critical: 0 }
      ]
    }
  });
});
