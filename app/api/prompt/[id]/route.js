
import {connectToDB} from '@utils/database';
import Prompt from '@models/prompt';

//GET (read)
export const GET = async (request,{params}) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt) return new Response("Prompt not found!", {status: 404})         
        
        return new Response(JSON.stringify(prompt),{status: 200})         
    } catch (error) {
        return new Response("Failed to fetch data.",{status: 500})  
    }
}

//PATCH (update)
export const PATCH = async (request, {params}) => {
    const {prompt, tag} = await request.json();

    try {
        await connectToDB();
        const exsistingPrompt = await Prompt.findById(params.id);

        if(!exsistingPrompt) return new Response("Prompt not found!", {status: 404})         

        exsistingPrompt.prompt = prompt;
        exsistingPrompt.tag = tag;

        await exsistingPrompt.save();

        return new Response(JSON.stringify(exsistingPrompt),{status:200})
    } catch (error) {
        return new Response("Failed to update prompt!",{status:500})
        
    }

}

//DELETE (delete)
export const DELETE = async (request, {params}) =>{
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Reposnse("Prompt deleted successfully", {status: 200})

    } catch (error) {
        return new Response("Failed to delete prompt",{status: 500})        
    }
}