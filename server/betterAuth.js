import { betterAuth } from "better-auth";
import { PostgresJSDialect } from "kysely-postgres-js";
import postgres from "postgres";
import { bearer, customSession } from "better-auth/plugins";
import { createAuthMiddleware } from "better-auth/api";

const sql = postgres();

const dialect = new PostgresJSDialect({
  postgres: sql,
});

const getUserRoles = async (userId) => {
  const result = await sql`
    SELECT role FROM user_roles WHERE user_id = ${userId}
  `;

  return result.map((row) => row.role);
};

export const auth = betterAuth({
  database: {
    dialect: dialect,
    type: "postgresql",
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  trustedOrigins: ["http://localhost:5173"],
  user: {
    modelName: "users",
    fields: {
      emailVerified: "email_verified",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  session: {
    modelName: "sessions",
    fields: {
      userId: "user_id",
      expiresAt: "expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
      ipAddress: "ip_address",
      userAgent: "user_agent",
    },
  },
  account: {
    modelName: "accounts",
    fields: {
      userId: "user_id",
      accountId: "account_id",
      providerId: "provider_id",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  hooks: {
    after: createAuthMiddleware(async ({ path, context }) => {
      if (path?.includes("/sign-in")) {
        const newSession = context.newSession;
        if (!newSession) {
          return;
        }

        const userId = newSession.user.id;
        const roles = await getUserRoles(userId);
        newSession.user.roles = roles;

        if (context.returned && context.returned.user) {
          context.returned.user.roles = roles;
        }
      }
    }),
  },
  plugins: [
    bearer(),
    customSession(async ({ user, session }) => {
      const roles = await getUserRoles(session.userId);
      return {
        user: {
          ...user,
          roles,
        },
        session,
      };
    }),
  ],
});