"use server";

import { getCurrentUser } from "@/features/auth/actions";
import { MessageRole, MessageType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/db";
import { generateSlug } from "random-word-slugs"

function generateSlugFromPrompt(prompt: string) {
    const words = prompt
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 3);
    
    const hash = Math.random().toString(36).substring(2, 6);
    
    if (words.length === 0) {
        return `${generateSlug(2, { format: "kebab" })}${hash}`;
    }
    
    return `${words.join("-")}${hash}`;
}

export async function createProject(value: string) {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("User not found")
    }

    try {
        const project = await prisma.project.create({
            data: {
                name: generateSlugFromPrompt(value),
                userId: user.id,
                description: value,
                messages: {
                    create: {
                        content: value,
                        role: MessageRole.USER,
                        type: MessageType.RESULT
                    }
                }
            }
        })

        return { project, username: user.name?.toLowerCase().replace(/\s+/g, '-') || user.id }
    } catch (error) {
        console.error("Error creating project:", error);

        return {
            error: "Failed to create project"
        }
    }

}

export async function getProject(id: string) {

    const user = await getCurrentUser()

    if (!user) {
        throw new Error("User not found")
    }

    try {
        const project = await prisma.project.findUnique({
            where: {
                id: id,
                userId: user.id
            },
            include: {
                messages: true
            }
        })

        if (!project) {
            throw new Error("Project not found")
        }

        return project
    } catch (error) {
       console.error("Error getting project:", error);

       return {
        error: "Failed to get project"
       }
    }



}

export async function getAllProject() {
    const user = await getCurrentUser()

    if (!user) {
        throw new Error("User not found")
    }

    try {
        const getAllProjects = await prisma.project.findMany({
            where: {
                userId: user.id
            },
            orderBy: {
                createdAt: "desc"
            },

        })

        return getAllProjects

    } catch (error) {
      console.error("Error getting all projects:", error);

      return {
        error: "Failed to get all projects"
      }
    }
}