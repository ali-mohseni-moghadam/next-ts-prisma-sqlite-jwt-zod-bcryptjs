import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const idSchema = z.object({
  id: z
    .string()
    .transform((val) => parseInt(val))
    .refine((val) => val > 0, {
      message: "شناسه باید یک عدد مثبت باشد",
    }),
});

const updateTaskSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است").optional(),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed"]).optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = idSchema.parse({ id: params.id });
    const body = await req.json();
    const validatedData = updateTaskSchema.parse(body);

    const task = await prisma.task.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "خطا در به‌روزرسانی وظیفه" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = idSchema.parse({ id: params.id });

    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "وظیفه با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "خطا در حذف وظیفه" }, { status: 500 });
  }
}
