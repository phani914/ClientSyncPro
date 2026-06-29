# ClientSync Pro UAT Guide

## Purpose

Use this guide to run user acceptance testing for ClientSync Pro before release
or stakeholder sign-off. It focuses on business workflows, responsive behavior,
and regression checks for the dashboard, management screens, authentication, and
API-backed CRUD flows.

## Test Environment

- App URL: `http://localhost:3000` for local UAT, or the shared deployment URL.
- Browser coverage: latest Chrome, Safari, and Edge.
- Viewports: desktop, tablet, and mobile widths.
- Default local credentials:

```bash
Email: admin@clientsync.pro
Password: ClientSync@123
```

For deployed UAT, confirm `AUTH_EMAIL`, `AUTH_PASSWORD`, and `AUTH_SECRET` are
set in the target environment.

## Pre-UAT Checklist

- Run `npm run uat:check` and confirm all checks pass.
- Start the app with `npm run dev` for local exploratory UAT.
- Confirm the optimized logo loads on login, forgot password, and dashboard
  navigation.
- Confirm protected pages redirect to login when no session is present.
- Confirm a successful login opens the dashboard.

## Core Smoke Scenarios

| Area | Scenario | Expected Result |
| --- | --- | --- |
| Authentication | Sign in with valid credentials | User lands on Dashboard |
| Authentication | Submit empty login form | Field validation messages appear |
| Authentication | Request password reset details | Inline UAT confirmation appears without leaving the page |
| Authentication | Use Logout from dashboard navigation | User returns to login |
| Dashboard | Review summary cards and tables | Metrics and sections render without overlap |
| Clients | Search, filter, update status/plan, add, delete | List updates and status messages reflect the action |
| Projects | Search, filter, adjust progress, update status, add | Portfolio updates without page reloads |
| Users | Search users and activate/suspend accounts | Buttons disable appropriately after status changes |
| Roles | Create draft role, edit existing role, complete review | Role directory and review queue update |
| Reports | Filter reports, update cadence/status, export, delete | Report library and messages update |
| Settings | Update settings and save | Inline UAT confirmation appears |
| Responsive | Open management pages on mobile width | Card layouts replace wide tables and controls remain usable |

## Detailed UAT Scenarios

### Client Management

1. Open Clients.
2. Search for `RetailOps`.
3. Change its status to `Active`.
4. Change its plan to `Enterprise`.
5. Add a new client with valid contact details.
6. Delete the new client.

Acceptance: filters narrow the list, updates persist in the current session,
and destructive actions require confirmation.

### Project Management

1. Open Projects.
2. Filter to `At Risk`.
3. Increase a project by `+10%`.
4. Decrease it by `-10%`.
5. Create a new project with valid dates.

Acceptance: progress bars and values remain consistent, due-date validation
prevents invalid schedules, and the portfolio returns to a usable state.

### Report Management

1. Open Reports.
2. Search by owner or report name.
3. Change cadence and status.
4. Export a report.
5. Delete a temporary report.

Acceptance: export count increments, filters combine correctly, and report
cards/tables show the same data.

### Mobile Acceptance

1. Test at 375px width.
2. Navigate through Dashboard, Clients, Projects, Users, Roles, and Reports.
3. Confirm primary actions remain visible and full width where needed.
4. Confirm tables are replaced by mobile cards on management pages.

Acceptance: no clipped text, unusable controls, horizontal page scrolling, or
overlapping sticky navigation.

## Automated Coverage

The integration suite currently verifies:

- unauthenticated protected-route redirects
- authenticated dashboard access
- authenticated login-page redirects
- client API create/update/duplicate/delete flow
- project API validation errors

Run it directly with:

```bash
npm run test:integration
```

Run the full UAT readiness command with:

```bash
npm run uat:check
```

## Defect Reporting

For every defect, include:

- title and severity
- environment URL
- browser and viewport
- steps to reproduce
- expected result
- actual result
- screenshot or screen recording when visual
- test data used

Suggested severities:

- Blocker: prevents sign-in or a core workflow
- High: corrupts data or blocks a major workflow
- Medium: workflow works with a workaround
- Low: visual polish, copy, or minor usability issue

## Exit Criteria

UAT is ready for sign-off when:

- all blocker and high defects are resolved
- `npm run uat:check` passes
- authentication, dashboard, clients, projects, users, roles, and reports smoke
  scenarios pass
- desktop and mobile layouts are accepted by stakeholders
