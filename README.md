➡️ A production-ready full-stack Lead Management System built with Next.js and Supabase.This app allows businesses to capture leads, qualify them, and manage them through a clean admin dashboard..

• Live Demo: https://lead-management-system-psi.vercel.app/

• Repository: https://github.com/PayalSrivastava26/lead-management-system

## Features

• Lead capture form

• Intake & qualification logic

• Supabase database integration

• Admin dashboard to view all leads

• Real-time data fetching (no caching issues)

• Deployed on Vercel

## System Architecture

```
User
  │
  ▼
Frontend (Next.js)
  │
  ▼
API Route
  │
  ▼
Intake Agent
  │
  ▼
Qualification Agent
  │
  ▼
Dispatch Agent
  │
  ▼
Supabase Database
  │
  ▼
Admin Dashboard
```

📌 Future Improvements

• Admin authentication

• Lead status update feature

• Email notifications on new lead

• AI-powered lead scoring

• Role-based access control


## n8n Workflow Implementation (Conceptual)

This system can also be implemented using n8n by designing a structured automation workflow instead of writing backend code. A webhook node would receive the incoming lead data whenever the form is submitted. The next step would validate the email format, message length, and source. If the data does not meet the criteria, the workflow would store the lead in the database with a validation_failed status and stop further processing.
If the validation passes, the workflow would move to a qualification step where it checks whether the message contains words like urgent or immediately and assigns the appropriate priority. After qualification, an HTTP request node would send the lead email and priority to the external API. Retry logic can be configured to attempt the request up to two times in case of failure.
Finally, the workflow would update the database with the final status completed or api_failed along with the API response code and retry count. This approach mirrors the modular multi agent architecture implemented in the code version, but represents it visually through connected automation steps in n8n.
