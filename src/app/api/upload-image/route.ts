import { NextResponse } from "next/server";
import { writeFile } from "node:fs/promises";
import path from "node:path";

export async function POST (request: Request){
    // //first process files.
    const formdata = await request.formData();
    console.log(formdata);
    const logoFile = formdata.get("image") as File
    if(!logoFile)
        return NextResponse.json({error:'Images are missing'}, {status: 400});

    const logoBuffer = Buffer.from(await logoFile.arrayBuffer());

    try {
        await writeFile(
          path.join(process.cwd(), "public/uploads/" + logoFile.name.replaceAll(" ", "_")),
          logoBuffer
        );
        return NextResponse.json({ Message: "Success!", status: 200 });
        
      } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ Message: "Failed", status: 500 });
      }
}