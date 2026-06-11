# TagGate Prototype Assumptions

- Mobile screenshots are the visual source of truth for resident-facing flows.
- No desktop screenshots were supplied, so desktop screens use the SRS modules and the same TagGate visual language.
- Authentication, payments, uploads, exports, assistant ticket creation, and smart-device alerts are simulated locally.
- All data is mock data in `src/data/mock-data.json`; no backend or API integration is used.
- Tablet rendering uses a dedicated `DeviceView` branch and favors compact desktop layouts where no tablet design was supplied.
