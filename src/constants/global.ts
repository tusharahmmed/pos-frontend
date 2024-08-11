export const quoteStatusOptions = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Canceled",
    value: "canceled",
  },
];
export const userRoleOptions = [
  {
    label: "Admin",
    value: "admin",
  },
];
export const userPermissionOptions = [
  {
    label: "Quote Manage",
    value: "quotes",
  },
  {
    label: "Driver Request",
    value: "drivers",
  },
  {
    label: "Customer Request",
    value: "customers",
  },
];

export enum USER_ROLE_PERMISSION {
  QUOTES = "quotes",
  DRIVERS = "drivers",
  CUSTOMERS = "customers",
}
