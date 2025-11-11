"use server";

export function serializeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    orgId: user.orgId ?? null,
    kycStatus: user.kycStatus,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function serializeProject(project) {
  return {
    id: project.id,
    owner: project.owner?.toString?.() ?? project.owner,
    title: project.title,
    description: project.description,
    location: project.location,
    requestedAmount: project.requestedAmount,
    status: project.status,
    budgetItems: project.budgetItems,
    attachments: project.attachments,
    milestones: project.milestones,
    totalPledged: project.totalPledged,
    currentBalance: project.currentBalance,
    archived: project.archived,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

