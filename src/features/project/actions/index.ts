import { getCurrentUser } from "@/features/auth/actions";
import { MessageRole, MessageType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/db";

import { generateSlug } from "random-word-slugs";




export async function createProject(value: string) {
    const user = await getCurrentUser()


    if (!user) return { error: "Unauthorized" }

    try {
        const project = await prisma.project.create({
            data: {
                name: generateSlug(2, { format: 'kebab' }),
                userId: user.id,

                messages: {
                    create: {
                        content: value,
                        role: MessageRole.USER,
                        type: MessageType.RESULT
                    }
                }
            }
        })

        return project
    } catch (error) {
        console.log("❌ Error creating project:", error);
        return { error: "Failed to create project" };
    }
}

export async function  getProjectById(id : string) {
    const user = await getCurrentUser()

    if(!user) return {error : "unauthorized" }


    try {
        const projects = await prisma.project.findUnique({
            where : {
                id ,
                userId : user.id
            } , 
            include :{
                messages : true
            }
        })

        if(!projects){
            return {error : "Project not found"}
        }

        return projects
    } catch (error) {
        console.log("❌ Error getting project:", error);
        return { error: "Failed to get project" };
    }
    
    
}