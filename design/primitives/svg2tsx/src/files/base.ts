import { atomicWrite } from "@/lib/atomicWrite";

export abstract class FileToWrite {
  protected outPath: string;
  protected lines: string[];
  protected content: string = "";

  constructor(outPath: string, lines: string[] = []) {
    this.outPath = outPath;
    this.lines = lines;
  }

  public addLine(line: string) {
    this.lines.push(line);
  }

  public abstract prepare(): void | Promise<void>;

  public async save() {
    await atomicWrite(this.outPath, this.content);
  }
}
