import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const investigationRouter = createTRPCRouter({
  // Alle Fahndungen auflisten (öffentlich)
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.investigation.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  // Einzelne Fahndung abrufen (öffentlich)
  get: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return ctx.db.investigation.findUnique({
      where: { id: input.id },
    });
  }),

  // Fahndung erstellen (nur für eingeloggte Benutzer)
  create: protectedProcedure.input(z.object({
    caseNumber: z.string(),
    title: z.string(),
    shortInfo: z.string().optional(),
    description: z.string().optional(),
    category: z.enum(["WANTED_PERSON", "MISSING_PERSON", "UNKNOWN_DEAD", "STOLEN_GOODS"]),
    priority: z.enum(["NORMAL", "URGENT"]).default("NORMAL"),
    location: z.string(),
    date: z.date(),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
    age: z.number().optional(),
    height: z.string().optional(),
    build: z.string().optional(),
    hairColor: z.string().optional(),
    hairStyle: z.string().optional(),
    eyes: z.string().optional(),
    features: z.string().optional(),
    clothing: z.string().optional(),
    tel: z.string().optional(),
    station: z.string().optional(),
  })).mutation(async ({ ctx, input }) => {
    return ctx.db.investigation.create({
      data: input,
    });
  }),

  // Fahndung bearbeiten (nur für eingeloggte Benutzer)
  update: protectedProcedure.input(z.object({
    id: z.string(),
    caseNumber: z.string().optional(),
    title: z.string().optional(),
    shortInfo: z.string().optional(),
    description: z.string().optional(),
    category: z.enum(["WANTED_PERSON", "MISSING_PERSON", "UNKNOWN_DEAD", "STOLEN_GOODS"]).optional(),
    priority: z.enum(["NORMAL", "URGENT"]).optional(),
    location: z.string().optional(),
    date: z.date().optional(),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
    age: z.number().optional(),
    height: z.string().optional(),
    build: z.string().optional(),
    hairColor: z.string().optional(),
    hairStyle: z.string().optional(),
    eyes: z.string().optional(),
    features: z.string().optional(),
    clothing: z.string().optional(),
    tel: z.string().optional(),
    station: z.string().optional(),
  })).mutation(async ({ ctx, input }) => {
    const { id, ...data } = input;
    return ctx.db.investigation.update({
      where: { id },
      data,
    });
  }),

  // Fahndung löschen (nur für eingeloggte Benutzer)
  delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    return ctx.db.investigation.delete({
      where: { id: input.id },
    });
  }),
}); 